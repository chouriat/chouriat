#!/usr/bin/env python3
"""Build the MEDICAL_CASES array in lib/medical-cases.ts from supabase/content/.

The app reads cases from lib/medical-cases.ts (it does not query Supabase yet),
so this script keeps the TypeScript file in sync with the JSON sources:

  supabase/seed.sql                 the curated seed cases (ACS, Appendizitis, Apoplex)
  supabase/content/cases/*.json     the draft cases
  supabase/content/dialogues/*.json natural patient answers per Anamnese topic,
                                    keyed by case slug (optional per case)

Only the MEDICAL_CASES array is rewritten. Everything else in the file
(interfaces, VOCABULARY_LIST) is kept as it is. The same file is copied to
../deutschmed-mobile/lib/medical-cases.ts when that app exists.

Usage: python3 scripts/build_app_cases.py [--check]
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "supabase" / "content"
SEED = ROOT / "supabase" / "seed.sql"
TS = ROOT / "lib" / "medical-cases.ts"
MOBILE_TS = ROOT.parent / "deutschmed-mobile" / "lib" / "medical-cases.ts"

START = "export const MEDICAL_CASES: MedicalCase[] = "
END = ";\n\nexport const VOCABULARY_LIST"

# Anamnese topics a dialogue may answer. Must match lib/anamnese-topics.ts.
TOPICS = [
    "beschwerden", "beginn", "lokalisation", "charakter", "intensitaet",
    "ausstrahlung", "verlauf", "ausloeser", "begleitsymptome", "fieber",
    "appetit_gewicht", "verdauung", "wasserlassen", "schlaf",
    "vorerkrankungen", "operationen", "medikamente", "allergien",
    "rauchen", "alkohol", "drogen", "beruf", "wohnen", "familie",
    "gyn", "impfungen", "reisen", "sorgen",
]

SEED_SLUGS = {
    "Akutes Koronarsyndrom (ACS)": "akutes-koronarsyndrom",
    "Akute Appendizitis": "akute-appendizitis",
    "Apoplex (ischämischer Schlaganfall)": "apoplex-ischaemischer-schlaganfall",
}

errors: list[str] = []


def num(value: float | int) -> str:
    return str(value).replace(".", ",")


def seed_cases() -> list[dict]:
    """Parse the scenario rows of seed.sql into the same shape as the JSON cases."""
    text = SEED.read_text(encoding="utf-8").split("vocabulary_dictionary", 1)[0]
    lit = r"'((?:[^']|'')*)'"
    row = re.compile(r"^\(\s*" + r",\s*".join([lit] * 7) + r"\s*\)", re.M)
    out = []
    for m in row.finditer(text):
        title, level, role, specialty, demo, complaint, facts = (g.replace("''", "'") for g in m.groups())
        if title not in SEED_SLUGS:
            errors.append(f"seed.sql: no slug for case {title!r} (add it to SEED_SLUGS)")
            continue
        out.append({
            "slug": SEED_SLUGS[title], "title": title, "difficulty": level, "target_role": role,
            "specialty": specialty, "patient_demographics": json.loads(demo),
            "chief_complaint": complaint, "clinical_facts": json.loads(facts),
        })
    if len(out) != len(SEED_SLUGS):
        errors.append(f"seed.sql: expected {len(SEED_SLUGS)} cases, parsed {len(out)}")
    return out


def draft_cases() -> list[dict]:
    cases = []
    for path in sorted((CONTENT / "cases").glob("*.json")):
        cases += json.loads(path.read_text(encoding="utf-8"))
    return cases


def dialogues() -> dict[str, dict]:
    out: dict[str, dict] = {}
    for path in sorted((CONTENT / "dialogues").glob("*.json")):
        for slug, d in json.loads(path.read_text(encoding="utf-8")).items():
            if slug in out:
                errors.append(f"{path.name}: duplicate dialogue for {slug}")
            unknown = set(d.get("answers", {})) - set(TOPICS)
            if unknown:
                errors.append(f"{path.name} {slug}: unknown topics {sorted(unknown)}")
            if not d.get("answers", {}).get("beschwerden"):
                errors.append(f"{path.name} {slug}: answers.beschwerden is required")
            out[slug] = d
    return out


def vital_signs(v: dict) -> dict:
    return {
        "bp": f"{v['rr']} mmHg",
        "hr": f"{v['hf']} /min",
        "temp": f"{num(v['temp'])} °C",
        "spo2": f"{v['spo2']} % (Raumluft)",
    }


def labs_text(labs: dict) -> str:
    return ", ".join(f"{k}: {v}" for k, v in labs.items())


def legacy_questions(slug: str, name: str, diagnosis: str, h: dict, complaint: str) -> list[dict]:
    return [
        {
            "id": f"{slug}-q1",
            "phase": "Aktuelle Beschwerden & Leitsymptom",
            "doctorOptions": [
                {"text": f"Guten Tag {name}, was führt Sie heute zu uns? Schildern Sie mir bitte genau Ihre aktuellen Beschwerden.",
                 "isOptimal": True, "feedback": "Sehr gut! Offene, empathische Einstiegsfrage in verständlicher Patientensprache."},
                {"text": f"Liegt bei Ihnen klinisch die Symptomatik für {diagnosis} vor?",
                 "isOptimal": False, "feedback": "Achtung FSP-Fehler: Stellen Sie keine geschlossene Fachdiagnose-Frage zu Gesprächsbeginn."},
            ],
            "patientResponse": complaint,
        },
        {
            "id": f"{slug}-q2",
            "phase": "Vorerkrankungen & Dauermedikation",
            "doctorOptions": [
                {"text": "Sind bei Ihnen chronische Vorerkrankungen bekannt und nehmen Sie regelmäßig Medikamente ein?",
                 "isOptimal": True, "feedback": "Exzellent! Klare Erfragung von Vorerkrankungen und Medikation."},
                {"text": "Welche vorbestehenden Komorbiditäten und pharmakologischen Regime bestehen anamnestisch?",
                 "isOptimal": False, "feedback": "Zu viel Fachjargon! Nutzen Sie im Patientengespräch „Vorerkrankungen“ und „Medikamente“."},
            ],
            "patientResponse": f"An Vorerkrankungen habe ich: {', '.join(h['previous'])}. Meine Medikamente sind: {', '.join(h['medication'])}.",
        },
        {
            "id": f"{slug}-q3",
            "phase": "Allergien, Sozial- & Familienanamnese",
            "doctorOptions": [
                {"text": "Haben Sie Allergien gegen Medikamente, wie sieht Ihr Lebensstil (Rauchen, Alkohol, Beruf) aus und gibt es Erkrankungen in der Familie?",
                 "isOptimal": True, "feedback": "Sehr strukturiert! Allergien sowie Sozial- und Familienanamnese vollständig abgedeckt."},
                {"text": "Bestehen Medikamenten-Hypersensitivitäten, Noxenabusus oder eine familiäre Prädisposition?",
                 "isOptimal": False, "feedback": "Vermeiden Sie Begriffe wie „Noxenabusus“ oder „Prädisposition“ gegenüber Patienten."},
            ],
            "patientResponse": f"Allergien: {', '.join(h['allergies'])}. Zu meinem Alltag: {h['social']} In der Familie: {h['family']}",
        },
    ]


# Guided (multiple-choice) phases for cases that have a written dialogue.
# Each phase joins the patient's answers to the listed topics.
GUIDED_PHASES = [
    ("Gesprächseinstieg & Leitsymptom", ["beschwerden"],
     ("Guten Tag, mein Name ist … , ich bin hier die Ärztin / der Arzt. Was führt Sie heute zu uns?",
      "Sehr gut! Vorstellung mit Namen und Funktion, dann eine offene Einstiegsfrage."),
     ("Liegt bei Ihnen die typische Symptomatik für {diagnosis} vor?",
      "FSP-Fehler: Keine geschlossene Diagnose-Frage zu Beginn. Lassen Sie den Patienten zuerst frei erzählen.")),
    ("Beginn, Ort & Art der Beschwerden", ["beginn", "lokalisation", "charakter", "ausstrahlung"],
     ("Seit wann haben Sie die Beschwerden genau, wo spüren Sie sie und wie fühlen sie sich an? Strahlen sie irgendwohin aus?",
      "Gut strukturiert: Beginn, Lokalisation, Qualität und Ausstrahlung in verständlichen Worten erfragt."),
     ("Beschreiben Sie Onset, Lokalisation, Qualität und Irradiation der Symptomatik.",
      "Zu viel Fachjargon. „Ausstrahlen“ statt „Irradiation“, „Seit wann?“ statt „Onset“.")),
    ("Intensität, Verlauf & Auslöser", ["intensitaet", "verlauf", "ausloeser"],
     ("Wie stark sind die Beschwerden auf einer Skala von 0 bis 10? Sind sie besser oder schlimmer geworden, und gibt es etwas, das sie auslöst oder lindert?",
      "Sehr gut! Die Schmerzskala 0–10 ist im deutschen Klinikalltag Standard."),
     ("Ist es sehr schlimm?",
      "Zu unpräzise. Fragen Sie nach der Stärke auf einer Skala von 0 bis 10 und nach dem Verlauf.")),
    ("Begleitsymptome & vegetative Anamnese", ["begleitsymptome", "fieber", "appetit_gewicht", "verdauung", "wasserlassen", "schlaf"],
     ("Haben Sie noch andere Beschwerden bemerkt, zum Beispiel Fieber, Übelkeit, Gewichtsverlust oder Probleme beim Stuhlgang oder Wasserlassen?",
      "Exzellent! Begleitsymptome und vegetative Anamnese in Patientensprache abgefragt."),
     ("Bestehen B-Symptomatik, Nausea, Emesis oder Miktionsbeschwerden?",
      "Fachjargon! Sagen Sie „Fieber, Nachtschweiß, Gewichtsverlust“, „Übelkeit“, „Erbrechen“ und „Probleme beim Wasserlassen“.")),
    ("Vorerkrankungen, Operationen & Medikamente", ["vorerkrankungen", "operationen", "medikamente", "allergien"],
     ("Haben Sie Vorerkrankungen oder wurden Sie schon einmal operiert? Welche Medikamente nehmen Sie regelmäßig ein, und haben Sie Allergien?",
      "Sehr gut! Vorerkrankungen, Operationen, Medikation und Allergien vollständig erfragt."),
     ("Welche Komorbiditäten, Voroperationen und Dauermedikation bestehen? Gibt es Unverträglichkeiten?",
      "„Komorbiditäten“ versteht kaum ein Patient. Sagen Sie „andere Erkrankungen“.")),
    ("Sozial- & Familienanamnese", ["rauchen", "alkohol", "drogen", "beruf", "wohnen", "familie", "gyn", "reisen", "impfungen"],
     ("Darf ich Sie noch etwas Persönliches fragen: Rauchen Sie, trinken Sie Alkohol, was machen Sie beruflich, wie wohnen Sie, und gibt es Krankheiten in Ihrer Familie?",
      "Sehr empathisch! Sie kündigen die persönlichen Fragen an und decken Noxen, Beruf, Wohnsituation und Familie ab."),
     ("Wie ist Ihr Noxenabusus und gibt es eine familiäre Belastung?",
      "Vermeiden Sie „Noxenabusus“. Fragen Sie direkt nach Rauchen, Alkohol und Drogen.")),
    ("Sorgen des Patienten & Gesprächsabschluss", ["sorgen"],
     ("Haben Sie selbst eine Vermutung oder machen Sie sich über etwas besonders Sorgen? Haben Sie noch Fragen an mich?",
      "Sehr gut! Die Sorgen des Patienten zu erfragen gehört zu einem patientenzentrierten FSP-Gespräch."),
     ("Gut, das war's. Sie hören dann von uns.",
      "Zu abrupt. Fragen Sie nach Sorgen und offenen Fragen und erklären Sie das weitere Vorgehen.")),
]


def guided_questions(slug: str, diagnosis: str, answers: dict) -> list[dict]:
    out = []
    for phase, topics, good, bad in GUIDED_PHASES:
        parts = [answers[t] for t in topics if answers.get(t)]
        if not parts:
            continue
        out.append({
            "id": f"{slug}-q{len(out) + 1}",
            "phase": phase,
            "doctorOptions": [
                {"text": good[0], "isOptimal": True, "feedback": good[1]},
                {"text": bad[0].format(diagnosis=diagnosis), "isOptimal": False, "feedback": bad[1]},
            ],
            "patientResponse": " ".join(parts),
        })
    return out


def app_case(c: dict, dialogue: dict | None) -> dict:
    f = c["clinical_facts"]
    h = f["history"]
    d = c["patient_demographics"]
    name, age, slug, dx = d["name"], d["age"], c["slug"], f["diagnosis"]
    exam = f.get("exam", "")
    labs = labs_text(f.get("labs", {}))
    vs = vital_signs(f["vitals"])
    prev, med, allg = ", ".join(h["previous"]), ", ".join(h["medication"]), ", ".join(h["allergies"])
    diffs = ", ".join(f["differentials"][:3])

    history_details = " ".join(x for x in [
        h["current"],
        f"Vorerkrankungen: {prev}.",
        f"Medikation: {med}.",
        f"Allergien: {allg}.",
        f"Sozialanamnese: {h['social']}",
        f"Familienanamnese: {h['family']}",
        f"Körperliche Untersuchung: {exam}" if exam else "",
        f"Labor: {labs}." if labs else "",
    ] if x)

    case = {
        "id": slug,
        "title": c["title"],
        "specialty": c["specialty"],
        "category": c["specialty"],
        "difficulty": c["difficulty"],
        "patientName": name,
        "patientAge": age,
        "chiefComplaint": c["chief_complaint"],
        "patient": {
            "name": name,
            "age": age,
            "gender": "w" if d["gender"] == "W" else "m",
            "occupation": d["occupation"],
            "chiefComplaint": c["chief_complaint"],
            "vitalSigns": vs,
            "historyDetails": history_details,
        },
    }
    if dialogue:
        case["speaker"] = dialogue.get("speaker") or c.get("speaker")
        if not case["speaker"]:
            del case["speaker"]
        case["patientDialogue"] = dialogue["answers"]
        case["anamneseQuestions"] = guided_questions(slug, dx, dialogue["answers"])
    else:
        case["anamneseQuestions"] = legacy_questions(slug, name, dx, h, c["chief_complaint"])
    case["arztbriefTemplate"] = {
        "prompt": f"Verfassen Sie die Anamnese und Epikrise für {name} ({age} J.) mit Verdacht auf {dx} im C1-Fachstil.",
        "requiredTerms": [dx, h["previous"][0].split()[0], f["differentials"][0], "Anamnese", "Vitalparameter"],
        "sampleSolution": " ".join(x for x in [
            f"{name} ({age} J., {d['occupation']}) stellte sich mit folgender aktueller Anamnese vor: {h['current']}",
            f"An Vorerkrankungen seien bekannt: {prev}.",
            f"Die Dauermedikation umfasse: {med}.",
            f"Allergien: {allg}.",
            f"Sozial- und Familienanamnese: {h['social']} {h['family']}",
            f"Klinische Untersuchung: {exam}" if exam else "",
            f"Zusammenfassend ergibt sich der dringende Verdacht auf: {dx} (Differenzialdiagnosen: {diffs}).",
        ] if x),
    }
    vitals_line = f"Vitalparameter: RR {vs['bp']}, HF {vs['hr']}, Temp {vs['temp']}, SpO₂ {vs['spo2']}."
    case["isbarSteps"] = [
        {"step": "I", "label": "Identify (Identifikation)",
         "guidance": "Nennen Sie Name, Alter und aktuellen Bereich des Patienten / der Patientin.",
         "sampleSpeech": f"Ich übergebe {name}, {age} Jahre alt, aktuell in der Aufnahme ({c['specialty']})."},
        {"step": "S", "label": "Situation (Aktuelle Situation)",
         "guidance": "Benennen Sie Leitsymptom und Hauptverdachtsdiagnose.",
         "sampleSpeech": f"Vorstellungsgrund: {h['current']} Es besteht der dringende Verdacht auf {dx}."},
        {"step": "B", "label": "Background (Klinischer Hintergrund)",
         "guidance": "Fassen Sie Vorerkrankungen, Dauermedikation und Allergien zusammen.",
         "sampleSpeech": f"Anamnestisch bekannt sind: {prev}. Medikation: {med}. Allergien: {allg}."},
        {"step": "A", "label": "Assessment (Aktuelle Einschätzung & Vitalparameter)",
         "guidance": "Berichten Sie über Vitalparameter, Untersuchungsbefund und Labor.",
         "sampleSpeech": " ".join(x for x in [vitals_line, exam, f"Labor: {labs}" if labs else ""] if x)},
        {"step": "R", "label": "Recommendation (Empfehlung & weiteres Vorgehen)",
         "guidance": "Schlagen Sie die weitere Diagnostik und Therapie unter Berücksichtigung der Differenzialdiagnosen vor.",
         "sampleSpeech": f"Ich empfehle die zielgerichtete Weiterbehandlung bezüglich {dx} sowie den Ausschluss der wichtigsten Differenzialdiagnosen ({diffs})."},
    ]
    return case


def main() -> int:
    seeds = seed_cases()
    drafts = draft_cases()
    dlg = dialogues()
    all_cases = seeds + drafts
    slugs = {c["slug"] for c in all_cases}
    for slug in sorted(set(dlg) - slugs):
        errors.append(f"dialogue for unknown case slug {slug}")
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    arr = [app_case(c, dlg.get(c["slug"])) for c in all_cases]
    text = TS.read_text(encoding="utf-8")
    a = text.index(START) + len(START)
    b = text.index(END)
    header_count = f"// Auto-generiert aus supabase/content ({len(arr)} klinische Fälle"
    new = text[:a] + json.dumps(arr, ensure_ascii=False, indent=2) + text[b:]
    new = re.sub(r"^// Auto-generiert aus supabase/content \(\d+ klinische Fälle", header_count, new, count=1)
    targets = [TS] + ([MOBILE_TS] if MOBILE_TS.exists() else [])
    if "--check" in sys.argv:
        stale = [p for p in targets if p.read_text(encoding="utf-8") != new]
        for p in stale:
            print(f"{p} is out of date: run scripts/build_app_cases.py", file=sys.stderr)
        return 1 if stale else 0
    for p in targets:
        p.write_text(new, encoding="utf-8")
        print(f"wrote {p.relative_to(ROOT.parent)}")
    with_dialogue = sum(1 for c in arr if "patientDialogue" in c)
    print(f"{len(arr)} cases ({len(seeds)} seed, {len(drafts)} draft), {with_dialogue} with patient dialogue")
    return 0


if __name__ == "__main__":
    sys.exit(main())
