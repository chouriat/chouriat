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

`supabase/seed.sql` adds the three starter cases (ACS, Appendizitis, Apoplex) and a
starter vocabulary deck.

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
lib/modules.ts        training module list (dashboard + sidebar)
lib/store.ts          Zustand preferences store
supabase/             migrations and seed data
```

## Ads (Google AdMob)

The iOS and Android apps show an adaptive banner at the bottom and, after every third finished exercise (at most once every 3 minutes), a full-screen ad. Before any ad loads, Google's consent form asks EU users for GDPR consent; the dashboard shows a "Datenschutz-Einstellungen für Werbung" link so users can change it later. In the browser (`npm run dev`) ads are off.

Code: `lib/ads.ts` (logic and limits), `components/ads.tsx`, and the native setup script `scripts/setup-admob-native.mjs`.

Until you add real IDs, the app shows Google's **test ads**, which never pay out. To go live:

1. In [AdMob](https://admob.google.com), add the iOS app and the Android app (bundle ID `de.deutschmed.fsp`). Each gets an **app ID** (`ca-app-pub-…~…`).
2. For each app, create a **Banner** and an **Interstitial** ad unit (`ca-app-pub-…/…`).
3. Put the ad unit IDs in `.env.local` (see `.env.example`) and rebuild: `npm run build`.
4. Put the app IDs into the native projects, then sync:
   ```bash
   ADMOB_ANDROID_APP_ID=ca-app-pub-…~… ADMOB_IOS_APP_ID=ca-app-pub-…~… node scripts/setup-admob-native.mjs
   npx cap sync
   ```
   Run the script again after recreating `android/` or `ios/` with `npx cap add`.
5. **GDPR:** AdMob > Privacy & messaging: create and publish a European regulations (GDPR) message for both apps. Optionally add an IDFA explainer message for iOS.
6. Add an `app-ads.txt` file to the root of the website listed in the store entries, with the line AdMob shows you.

Never tap your own live ads; test on a device with the test IDs, or register it as a test device in AdMob.
