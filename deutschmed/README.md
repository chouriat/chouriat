# DeutschMed

Medical German training for international doctors and nurses preparing for the
Fachsprachenprüfung (FSP) and Kenntnisprüfung (KP) in Germany.

**Stack:** Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · shadcn/ui · Zustand · Supabase

## Getting started

```bash
cd deutschmed
npm install
cp .env.example .env.local   # add your Supabase URL and anon key
npm run dev                  # http://localhost:3000
```

The app runs without Supabase credentials; pages fall back to the static cases in
`lib/medical-cases.ts`.

## Anamnese simulator

`/anamnese` is a chat where you take a history from an AI patient. Each of your
messages gets feedback on Sie-Form, tone, grammar and patient-friendly wording.

- **Cases** load from `public.medical_scenarios`. Without Supabase, without a
  signed-in user (the table is readable only by `authenticated`), or with an
  empty table, the static cases in `lib/medical-cases.ts` are used.
- **AI patient:** `app/api/chat/route.ts` calls Claude with the case's
  `clinical_facts` as ground truth and returns
  `{ mode, patient_reply, correction: { has_error, better_phrasing, explanation } }`.
  Set `ANTHROPIC_API_KEY` in `.env.local` (optional `ANTHROPIC_MODEL`).
- **Without a key** the route answers with a rule-based offline patient
  (`lib/anamnese-demo.ts`), so the UI works for local development.

## Database

Migrations live in `supabase/migrations/` and are applied in filename order:

| File | What it does |
| --- | --- |
| `20261104000000_initial_schema.sql` | Enums, `profiles`, `medical_scenarios`, `simulation_sessions`, `vocabulary_dictionary`, `user_flashcards`, RLS policies |
| `20261104000100_profile_signup_and_indexes.sql` | Creates a `profiles` row on sign-up, pins function `search_path`, adds indexes for due cards and recent sessions |

`supabase/seed.sql` adds the training data: 5 cases (3 for doctors, 2 for nurses) and 17
vocabulary entries.

**Hosted project (quickest):** open the Supabase SQL editor and run both migration
files in order, then `seed.sql`.

**With the Supabase CLI:**

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push                     # applies migrations
npx supabase gen types typescript --linked > lib/database.types.ts
```

Sign-up should pass the user's name so the profile gets it:

```ts
await supabase.auth.signUp({ email, password, options: { data: { full_name } } });
```

## Project layout

```
app/                  routes: / (dashboard), /anamnese, /arztbrief, /vocabulary, /uebergabe
components/ui/        shadcn/ui components
lib/supabase.ts       browser Supabase client
lib/supabase-server.ts server Supabase client (Server Components, Route Handlers)
lib/database.types.ts typed schema
lib/medical-cases.ts  static fallback cases
lib/scenarios*.ts     case loading (Supabase or fallback) and display helpers
lib/anamnese*.ts      chat API contract and the offline demo patient
app/api/chat/         AI patient route (Claude)
lib/modules.ts        training module list (dashboard + sidebar)
lib/store.ts          Zustand preferences store
supabase/             migrations and seed data
```
