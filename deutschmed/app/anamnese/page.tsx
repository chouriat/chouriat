import type { Metadata } from "next";

import AnamneseSimulator from "@/components/anamnese-simulator";
import { TRAINING_MODULES } from "@/lib/modules";
import { loadScenarios } from "@/lib/scenarios-server";

const trainingModule = TRAINING_MODULES.find((m) => m.href === "/anamnese")!;

export const metadata: Metadata = { title: trainingModule.shortTitle };

// Cases come from Supabase per request (RLS depends on the signed-in user).
export const dynamic = "force-dynamic";

export default async function Page() {
  const { scenarios, source } = await loadScenarios();
  return (
    <AnamneseSimulator
      scenarios={scenarios}
      source={source}
      aiEnabled={Boolean(process.env.ANTHROPIC_API_KEY)}
    />
  );
}
