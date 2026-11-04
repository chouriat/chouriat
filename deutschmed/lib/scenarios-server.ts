import "server-only";

import { MEDICAL_CASES } from "@/lib/medical-cases";
import { STATIC_ID_PREFIX, scenarioFromCase, scenarioFromRow, type Scenario } from "@/lib/scenarios";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { isSupabaseConfigured } from "@/lib/supabase";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ScenarioList = {
  scenarios: Scenario[];
  /** Where the list came from, so the UI can say when it is showing fallback cases. */
  source: "supabase" | "static";
};

function staticScenarios(): Scenario[] {
  return MEDICAL_CASES.map(scenarioFromCase);
}

/**
 * Anamnese cases from public.medical_scenarios, or the static fallback when
 * Supabase is not configured, unreachable, or returns no rows. medical_scenarios
 * is readable only by signed-in users (RLS), so before auth exists this returns
 * the fallback on a real project too.
 */
export async function loadScenarios(): Promise<ScenarioList> {
  if (!isSupabaseConfigured()) return { scenarios: staticScenarios(), source: "static" };

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("medical_scenarios")
      .select("*")
      .order("difficulty")
      .order("title");
    if (error) throw error;
    if (data && data.length > 0) return { scenarios: data.map(scenarioFromRow), source: "supabase" };
  } catch (err) {
    console.error("[scenarios] Supabase query failed, using static cases:", err);
  }
  return { scenarios: staticScenarios(), source: "static" };
}

/** Resolves one case on the server, so the AI route never trusts clinical facts sent by the browser. */
export async function getScenarioById(id: string): Promise<Scenario | null> {
  if (id.startsWith(STATIC_ID_PREFIX)) {
    return staticScenarios().find((s) => s.id === id) ?? null;
  }
  if (!UUID_RE.test(id) || !isSupabaseConfigured()) return null;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("medical_scenarios").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data ? scenarioFromRow(data) : null;
  } catch (err) {
    console.error("[scenarios] Supabase lookup failed:", err);
    return null;
  }
}
