#!/usr/bin/env python3
"""Build the draft-content migration from supabase/content/.

Source of truth (edit these, then re-run this script):
  supabase/content/cases/*.json       one list of cases per file
  supabase/content/vocabulary/*.csv   ';'-separated, header row, one category per file

Output:
  supabase/migrations/20261104000200_draft_content.sql
  supabase/training-data-combined.sql  (seed.sql + draft content, for one paste
                                        into the Supabase SQL Editor)

Every row is inserted with content_status = 'draft'. A clinician flips rows
to 'reviewed' after checking them (see supabase/content/README.md).

Usage: python3 scripts/build_draft_content.py [--check]
  --check  fail if the committed migration is out of date instead of writing it
"""

from __future__ import annotations

import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "supabase" / "content"
SEED = ROOT / "supabase" / "seed.sql"
OUT = ROOT / "supabase" / "migrations" / "20261104000200_draft_content.sql"
COMBINED = ROOT / "supabase" / "training-data-combined.sql"

LEVELS = {"B1", "B2", "C1"}
ROLES = {"doctor", "nurse"}
GENDERS = {"M", "W", "D"}
VITAL_KEYS = {"rr", "hf", "af", "temp", "spo2"}
HISTORY_KEYS = {"current", "previous", "medication", "allergies", "social", "family"}

CATEGORY_BY_FILE = {
    "symptome": "Symptome",
    "anatomie": "Anatomie",
    "diagnosen": "Diagnosen",
    "eingriffe-untersuchungen": "Eingriffe & Untersuchungen",
    "labor": "Labor",
    "medikamente": "Medikamente",
    "abkuerzungen": "Abkürzungen",
    "pflege": "Pflege",
}

errors: list[str] = []


def norm(term: str) -> str:
    return re.sub(r"\s+", " ", term).strip().lower()


def sql_str(value: str | None) -> str:
    if value is None or value == "":
        return "NULL"
    return "'" + value.replace("'", "''") + "'"


def sql_json(value: object) -> str:
    return sql_str(json.dumps(value, ensure_ascii=False)) + "::jsonb"


def seed_terms() -> tuple[set[str], set[str]]:
    """Titles and fachbegriffe already in seed.sql, so drafts never duplicate them."""
    text = SEED.read_text(encoding="utf-8")
    titles: set[str] = set()
    terms: set[str] = set()
    scen = text.split("vocabulary_dictionary", 1)[0]
    vocab = text.split("vocabulary_dictionary", 1)[1] if "vocabulary_dictionary" in text else ""
    for m in re.finditer(r"^\(\s*\n\s*'((?:[^']|'')*)'", scen, re.M):
        titles.add(norm(m.group(1).replace("''", "'")))
    for m in re.finditer(r"^\('((?:[^']|'')*)'", vocab, re.M):
        terms.add(norm(m.group(1).replace("''", "'")))
    return titles, terms


def load_cases(seed_titles: set[str]) -> list[dict]:
    cases: list[dict] = []
    seen_slugs: set[str] = set()
    seen_titles: set[str] = set()
    for path in sorted((CONTENT / "cases").glob("*.json")):
        for i, c in enumerate(json.loads(path.read_text(encoding="utf-8"))):
            where = f"{path.name}[{i}] {c.get('slug', '?')}"
            for key in ("slug", "title", "difficulty", "target_role", "specialty",
                        "patient_demographics", "chief_complaint", "clinical_facts"):
                if not c.get(key):
                    errors.append(f"{where}: missing {key}")
            if c.get("difficulty") not in LEVELS:
                errors.append(f"{where}: difficulty must be one of {sorted(LEVELS)}")
            if c.get("target_role") not in ROLES:
                errors.append(f"{where}: target_role must be one of {sorted(ROLES)}")
            demo = c.get("patient_demographics", {})
            if not demo.get("name") or not isinstance(demo.get("age"), int) or demo.get("gender") not in GENDERS:
                errors.append(f"{where}: patient_demographics needs name, integer age, gender M/W/D")
            facts = c.get("clinical_facts", {})
            if not facts.get("diagnosis") or not facts.get("differentials"):
                errors.append(f"{where}: clinical_facts needs diagnosis and differentials")
            missing_vitals = VITAL_KEYS - set(facts.get("vitals", {}))
            if missing_vitals:
                errors.append(f"{where}: vitals missing {sorted(missing_vitals)}")
            missing_hist = HISTORY_KEYS - set(facts.get("history", {}))
            if missing_hist:
                errors.append(f"{where}: history missing {sorted(missing_hist)}")
            if c.get("slug") in seen_slugs:
                errors.append(f"{where}: duplicate slug")
            t = norm(c.get("title", ""))
            if t in seen_titles:
                errors.append(f"{where}: duplicate title")
            if t in seed_titles:
                errors.append(f"{where}: title already in seed.sql")
            seen_slugs.add(c.get("slug"))
            seen_titles.add(t)
            cases.append(c)
    return cases


def load_vocab(seed_terms_: set[str]) -> list[dict]:
    rows: list[dict] = []
    seen: dict[str, str] = {}
    for path in sorted((CONTENT / "vocabulary").glob("*.csv")):
        category = CATEGORY_BY_FILE.get(path.stem)
        if not category:
            errors.append(f"{path.name}: add it to CATEGORY_BY_FILE")
            continue
        with path.open(encoding="utf-8", newline="") as f:
            reader = csv.DictReader(f, delimiter=";")
            expected = ["fachbegriff", "gemeinsprache", "umgangssprache", "example_sentence"]
            if reader.fieldnames != expected:
                errors.append(f"{path.name}: header must be {';'.join(expected)}")
                continue
            for line_no, r in enumerate(reader, start=2):
                where = f"{path.name}:{line_no}"
                if None in r:
                    errors.append(f"{where}: too many ';' in row")
                    continue
                fb = (r["fachbegriff"] or "").strip()
                gs = (r["gemeinsprache"] or "").strip()
                if not fb or not gs:
                    errors.append(f"{where}: fachbegriff and gemeinsprache are required")
                    continue
                key = norm(fb)
                if key in seed_terms_:
                    errors.append(f"{where}: '{fb}' already in seed.sql")
                if key in seen:
                    errors.append(f"{where}: '{fb}' duplicates {seen[key]}")
                seen[key] = where
                rows.append({
                    "fachbegriff": fb,
                    "gemeinsprache": gs,
                    "umgangssprache": (r["umgangssprache"] or "").strip() or None,
                    "example_sentence": (r["example_sentence"] or "").strip() or None,
                    "category": category,
                })
    return rows


def render(cases: list[dict], vocab: list[dict]) -> str:
    doctor = sum(1 for c in cases if c["target_role"] == "doctor")
    out = [
        "-- =====================================================================",
        "-- DRAFT CONTENT: NOT CLINICALLY REVIEWED",
        "-- =====================================================================",
        "-- Generated by scripts/build_draft_content.py from supabase/content/.",
        "-- Do not edit by hand: edit the JSON/CSV sources and re-run the script.",
        "--",
        f"-- {len(cases)} cases ({doctor} doctor, {len(cases) - doctor} nurse) and {len(vocab)} vocabulary entries,",
        "-- all inserted with content_status = 'draft'. They were written as",
        "-- learning material and have not been checked by a clinician. Vitals,",
        "-- lab values, doses and diagnoses must be reviewed before learners rely",
        "-- on them. Flip a row to 'reviewed' once it has been checked.",
        "--",
        "-- Rows that already exist (same title / same fachbegriff, case-insensitive)",
        "-- are skipped, so this migration is safe to re-run.",
        "-- =====================================================================",
        "",
        "-- ---------------------------------------------------------------------",
        "-- 1. content_status: lets the app hide or badge unreviewed content.",
        "--    Existing rows (the curated seed) default to 'reviewed'.",
        "-- ---------------------------------------------------------------------",
        "ALTER TABLE public.medical_scenarios",
        "    ADD COLUMN IF NOT EXISTS content_status TEXT NOT NULL DEFAULT 'reviewed'",
        "    CONSTRAINT medical_scenarios_content_status_check CHECK (content_status IN ('draft', 'reviewed'));",
        "",
        "ALTER TABLE public.vocabulary_dictionary",
        "    ADD COLUMN IF NOT EXISTS content_status TEXT NOT NULL DEFAULT 'reviewed'",
        "    CONSTRAINT vocabulary_dictionary_content_status_check CHECK (content_status IN ('draft', 'reviewed'));",
        "",
        "-- ---------------------------------------------------------------------",
        f"-- 2. Draft cases ({len(cases)})",
        "-- ---------------------------------------------------------------------",
        "INSERT INTO public.medical_scenarios",
        "    (title, difficulty, target_role, specialty, patient_demographics, chief_complaint, clinical_facts, content_status)",
        "SELECT v.title, v.difficulty::language_level, v.target_role::medical_role, v.specialty,",
        "       v.patient_demographics, v.chief_complaint, v.clinical_facts, 'draft'",
        "FROM (VALUES",
    ]
    case_rows = []
    for c in cases:
        facts = dict(c["clinical_facts"])
        facts["slug"] = c["slug"]
        case_rows.append(
            "    (" + ",\n     ".join([
                sql_str(c["title"]), sql_str(c["difficulty"]), sql_str(c["target_role"]),
                sql_str(c["specialty"]), sql_json(c["patient_demographics"]),
                sql_str(c["chief_complaint"]), sql_json(facts),
            ]) + ")"
        )
    out.append(",\n".join(case_rows))
    out += [
        ") AS v(title, difficulty, target_role, specialty, patient_demographics, chief_complaint, clinical_facts)",
        "WHERE NOT EXISTS (",
        "    SELECT 1 FROM public.medical_scenarios s WHERE lower(s.title) = lower(v.title)",
        ");",
        "",
        "-- ---------------------------------------------------------------------",
        f"-- 3. Draft vocabulary ({len(vocab)})",
        "-- ---------------------------------------------------------------------",
        "INSERT INTO public.vocabulary_dictionary",
        "    (fachbegriff, gemeinsprache, umgangssprache, example_sentence, category, content_status)",
        "SELECT v.fachbegriff, v.gemeinsprache, v.umgangssprache, v.example_sentence, v.category, 'draft'",
        "FROM (VALUES",
    ]
    current = None
    vocab_rows = []
    for r in vocab:
        prefix = ""
        if r["category"] != current:
            current = r["category"]
            prefix = f"    -- {current}\n"
        vocab_rows.append(prefix + "    (" + ", ".join([
            sql_str(r["fachbegriff"]), sql_str(r["gemeinsprache"]), sql_str(r["umgangssprache"]),
            sql_str(r["example_sentence"]), sql_str(r["category"]),
        ]) + ")")
    out.append(",\n".join(vocab_rows))
    out += [
        ") AS v(fachbegriff, gemeinsprache, umgangssprache, example_sentence, category)",
        "WHERE NOT EXISTS (",
        "    SELECT 1 FROM public.vocabulary_dictionary d WHERE lower(d.fachbegriff) = lower(v.fachbegriff)",
        ");",
        "",
    ]
    return "\n".join(out)


def render_combined(migration_sql: str) -> str:
    """seed.sql and the draft content in one transaction, for the SQL Editor."""
    marker = "-- ---------------------------------------------------------------------\n-- 2. Draft cases"
    head, tail = migration_sql.split(marker, 1)
    alter = head.split("-- 1. content_status", 1)[1]
    seed = SEED.read_text(encoding="utf-8").strip()
    return "\n".join([
        "-- =====================================================================",
        "-- DeutschMed training data: Taha's seed + DRAFT content, in one file",
        "-- =====================================================================",
        "-- Generated by scripts/build_draft_content.py. Do not edit by hand.",
        "--",
        "-- Paste into the Supabase SQL Editor and run ONCE, after these two",
        "-- migrations have been run:",
        "--   supabase/migrations/20261104000000_initial_schema.sql",
        "--   supabase/migrations/20261104000100_profile_signup_and_indexes.sql",
        "--",
        "-- Part A (seed.sql) is marked content_status = 'reviewed'.",
        "-- Part B is DRAFT content that has NOT been clinically reviewed",
        "-- (content_status = 'draft'). See supabase/content/README.md.",
        "--",
        "-- Everything runs in one transaction: if any statement fails, nothing",
        "-- is inserted. Running it a second time would duplicate Part A, because",
        "-- seed.sql has no duplicate check; Part B skips rows that already exist.",
        "-- =====================================================================",
        "",
        "BEGIN;",
        "",
        "-- ---------------------------------------------------------------------",
        "-- 0. content_status" + alter.rstrip(),
        "",
        "-- =====================================================================",
        "-- PART A: seed.sql",
        "-- =====================================================================",
        seed,
        "",
        "-- =====================================================================",
        "-- PART B: DRAFT content (not clinically reviewed)",
        "-- =====================================================================",
        marker + tail.rstrip(),
        "",
        "COMMIT;",
        "",
    ])


def main() -> int:
    titles, terms = seed_terms()
    if not terms:
        errors.append("could not read any vocabulary from seed.sql (format changed?)")
    cases = load_cases(titles)
    vocab = load_vocab(terms)
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    sql = render(cases, vocab)
    outputs = {OUT: sql, COMBINED: render_combined(sql)}
    if "--check" in sys.argv:
        stale = [p for p, text in outputs.items() if not p.exists() or p.read_text(encoding="utf-8") != text]
        for p in stale:
            print(f"{p.relative_to(ROOT)} is out of date: run scripts/build_draft_content.py", file=sys.stderr)
        if stale:
            return 1
        print("up to date")
        return 0
    for p, text in outputs.items():
        p.write_text(text, encoding="utf-8")
        print(f"wrote {p.relative_to(ROOT)}")
    print(f"{len(cases)} draft cases, {len(vocab)} draft vocabulary entries "
          f"(seed has {len(titles)} cases, {len(terms)} words)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
