# Draft training content (needs clinical review)

> **Status: DRAFT.** Everything in this folder was written as learning material and has
> **not** been checked by a doctor or nurse. Vitals, lab values and units, drug names and
> doses, diagnoses and differentials can contain errors. Do not show it to learners as
> correct until a clinician has reviewed it.

| Folder | Contents |
| --- | --- |
| `cases/*.json` | 45 FSP/KP patient cases (40 doctor, 5 nurse), grouped by specialty |
| `vocabulary/*.csv` | 653 terms, one file per category, `;`-separated (opens directly in German Excel / LibreOffice) |

None of these repeat the 5 cases or 17 words in `supabase/seed.sql`; the build script refuses duplicates.

## How the content gets into the database

```bash
python3 scripts/build_draft_content.py          # writes supabase/migrations/20261104000200_draft_content.sql
python3 scripts/build_draft_content.py --check  # CI-style check that the SQL matches the sources
```

The script validates every case (levels, roles, required vitals and history fields) and every
vocabulary row, then writes one migration. All rows go in with `content_status = 'draft'`.
Existing rows with the same title or Fachbegriff are skipped, so the migration is safe to re-run.

## Case format

Same shape as `ClinicalFacts` in `lib/medical-cases.ts`:

- `patient_demographics`: `name`, `age`, `gender` (M/W/D), `occupation`
- `chief_complaint`: the opening line in the patient's own colloquial German (or the relative's, for Fremdanamnese)
- `clinical_facts`: `diagnosis`, `differentials`, `vitals` (`rr`, `hf`, `af`, `temp`, `spo2`),
  `history` (`current`, `previous`, `medication`, `allergies`, `social`, `family`), `exam`, `labs`
- Optional: `speaker` (who the AI plays), `nursing_goals` (nurse cases), `teaching_note`
  (a pitfall the evaluator should check, e.g. a drug interaction hidden in the history)

Medication is written the way it appears in a German Medikationsplan (`Ramipril 5 mg 1-0-0`).
Lab units follow common German hospital practice (Hb g/dl, Kreatinin mg/dl, Leukozyten /nl, CRP mg/l).

## Vocabulary format

`fachbegriff;gemeinsprache;umgangssprache;example_sentence`, with the category coming from the file name.
`umgangssprache` and `example_sentence` may be empty. Keep `;` out of the text.

## Review checklist

For each case:
- [ ] Diagnosis matches the history, exam, vitals and labs
- [ ] Lab values and units are plausible and marked (erhöht/erniedrigt) correctly
- [ ] Drug names, doses and schedules are realistic for Germany
- [ ] Chief complaint sounds like a real patient at the right language level (B1/B2/C1)
- [ ] `teaching_note` / `nursing_goals` match current German guidelines

For vocabulary:
- [ ] Gemeinsprache is what a doctor would say to a patient
- [ ] Umgangssprache is what patients actually say (regional variants are fine)
- [ ] Example sentence is correct Arztbrief / Pflegebericht German

Once reviewed, mark rows as reviewed in the database, for example:

```sql
UPDATE public.medical_scenarios SET content_status = 'reviewed'
WHERE clinical_facts->>'slug' IN ('ambulant-erworbene-pneumonie', 'akute-pyelonephritis');
```
