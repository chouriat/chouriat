# Draft training content (needs clinical review)

> **Status: DRAFT.** Everything in this folder was written as learning material and has
> **not** been checked by a doctor or nurse. Vitals, lab values and units, drug names and
> doses, diagnoses and differentials can contain errors. Do not show it to learners as
> correct until a clinician has reviewed it.

| Folder | Contents |
| --- | --- |
| `cases/*.json` | 59 FSP/KP patient cases (53 doctor, 6 nurse), grouped by specialty |
| `dialogues/*.json` | Natural patient answers per Anamnese topic, keyed by case slug (17 cases so far) |
| `vocabulary/*.csv` | 652 terms, one file per category, `;`-separated (opens directly in German Excel / LibreOffice) |

None of these repeat the 3 cases or 17 words in `supabase/seed.sql`; the build script refuses duplicates.

## How the content gets into the database

```bash
python3 scripts/build_draft_content.py          # writes supabase/migrations/20261104000200_draft_content.sql
python3 scripts/build_draft_content.py --check  # CI-style check that the SQL matches the sources
```

The script validates every case (levels, roles, required vitals and history fields) and every
vocabulary row, then writes one migration. All rows go in with `content_status = 'draft'`.
Existing rows with the same title or Fachbegriff are skipped, so the migration is safe to re-run.

## How the content gets into the app

The app reads its cases from `lib/medical-cases.ts`, not from Supabase. After editing a case
or a dialogue, regenerate that file (it also updates `../deutschmed-mobile/lib/medical-cases.ts`):

```bash
python3 scripts/build_app_cases.py          # rewrites the MEDICAL_CASES array
python3 scripts/build_app_cases.py --check  # fails if the TS file is out of date
```

It includes the seed cases from `supabase/seed.sql` (ACS, Appendizitis, Apoplex) first.

## Dialogue format

`dialogues/*.json` maps a case slug to `{ "speaker"?: "...", "answers": { topic: "answer" } }`.
The answers are what the patient (or relative, for Fremdanamnese) says in their own words.
They drive the offline chat simulator (no AI key needed) and the multiple-choice training,
and are passed to the AI as examples of tone. `beschwerden` is required; every other topic
is optional. Topics:

`beschwerden`, `beginn`, `lokalisation`, `charakter`, `intensitaet`, `ausstrahlung`, `verlauf`,
`ausloeser`, `begleitsymptome`, `fieber`, `appetit_gewicht`, `verdauung`, `wasserlassen`, `schlaf`,
`vorerkrankungen`, `operationen`, `medikamente`, `allergien`, `rauchen`, `alkohol`, `drogen`,
`beruf`, `wohnen`, `familie`, `gyn`, `impfungen`, `reisen`, `sorgen`

The keywords that map a question to a topic live in `lib/local-patient.ts`.
Keep the answers consistent with the case's `clinical_facts`.

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
