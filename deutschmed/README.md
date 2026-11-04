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

## Database

Migrations live in `supabase/migrations/` and are applied in filename order:

| File | What it does |
| --- | --- |
| `20261104000000_initial_schema.sql` | Enums, `profiles`, `medical_scenarios`, `simulation_sessions`, `vocabulary_dictionary`, `user_flashcards`, RLS policies |
| `20261104000100_profile_signup_and_indexes.sql` | Creates a `profiles` row on sign-up, pins function `search_path`, adds indexes for due cards and recent sessions |
| `20261104000200_draft_content.sql` | Adds `content_status` (`draft` / `reviewed`) to cases and vocabulary, and inserts the **draft** content set: 45 cases and 653 vocabulary entries. Not clinically reviewed, see `supabase/content/README.md` |

`supabase/seed.sql` adds the training data: 5 cases (3 for doctors, 2 for nurses) and 17
vocabulary entries.

**Hosted project (quickest):** open the Supabase SQL editor and run the migration
files in order, then `seed.sql`.

The draft migration is generated. Edit the JSON/CSV files in `supabase/content/` and run
`python3 scripts/build_draft_content.py` instead of editing the SQL. Until a clinician has
reviewed them, filter learner-facing queries with `.eq("content_status", "reviewed")` or show
an "Entwurf" badge.

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
lib/modules.ts        training module list (dashboard + sidebar)
lib/store.ts          Zustand preferences store
supabase/             migrations and seed data
```
