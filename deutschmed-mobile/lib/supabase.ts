import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/database.types";

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and add your Supabase project values.`
    );
  }
  return value;
}

/**
 * Supabase client for Client Components ("use client").
 * For Server Components, Route Handlers and Server Actions use
 * createSupabaseServerClient from "@/lib/supabase-server".
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
