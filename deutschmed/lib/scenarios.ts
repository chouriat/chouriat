import type { Database, LanguageLevel, MedicalRole } from "@/lib/database.types";
import type { MedicalCase } from "@/lib/medical-cases";

/**
 * One shape for a training case, whether it came from public.medical_scenarios
 * or from the static fallback in lib/medical-cases.ts.
 *
 * clinical_facts is kept as free-form JSON on purpose: the seed cases use
 * different keys per case (vitals, history, local_status, speaker, ...), and the
 * AI patient reads the whole object as its ground truth.
 */
export type Scenario = {
  id: string; // a UUID for database rows, "static:<slug>" for fallback cases
  source: "supabase" | "static";
  title: string;
  difficulty: LanguageLevel;
  target_role: MedicalRole;
  specialty: string;
  patient: {
    name: string;
    age: number | null;
    gender: string;
    profession: string | null;
  };
  chief_complaint: string;
  clinical_facts: Record<string, unknown>;
};

export const STATIC_ID_PREFIX = "static:";

type ScenarioRow = Database["public"]["Tables"]["medical_scenarios"]["Row"];

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

export function scenarioFromRow(row: ScenarioRow): Scenario {
  const demo = asRecord(row.patient_demographics);
  const age = Number(demo.age);
  return {
    id: row.id,
    source: "supabase",
    title: row.title,
    difficulty: row.difficulty,
    target_role: row.target_role,
    specialty: row.specialty,
    patient: {
      name: typeof demo.name === "string" ? demo.name : "Unbekannt",
      age: Number.isFinite(age) ? age : null,
      gender: typeof demo.gender === "string" ? demo.gender : "",
      profession:
        typeof demo.profession === "string"
          ? demo.profession
          : typeof demo.occupation === "string"
            ? demo.occupation
            : null,
    },
    chief_complaint: row.chief_complaint,
    clinical_facts: asRecord(row.clinical_facts),
  };
}

export function scenarioFromCase(c: MedicalCase): Scenario {
  return {
    id: `${STATIC_ID_PREFIX}${c.slug}`,
    source: "static",
    title: c.title,
    difficulty: c.difficulty,
    target_role: c.target_role,
    specialty: c.specialty,
    patient: {
      name: c.patient_demographics.name,
      age: c.patient_demographics.age,
      gender: c.patient_demographics.gender,
      profession: c.patient_demographics.occupation ?? null,
    },
    chief_complaint: c.chief_complaint,
    clinical_facts: c.clinical_facts as unknown as Record<string, unknown>,
  };
}

/** Who speaks for the patient. The Apoplex seed case is a Fremdanamnese with the daughter. */
export function getSpeaker(s: Scenario): string | null {
  const speaker = s.clinical_facts.speaker;
  return typeof speaker === "string" && speaker.trim() ? speaker : null;
}

// ---------------------------------------------------------------------------
// Display helpers for the patient file
// ---------------------------------------------------------------------------

export type VitalSign = { label: string; value: string };

const VITAL_LABELS: { keys: string[]; label: string; unit?: string }[] = [
  { keys: ["bp", "rr"], label: "Blutdruck (RR)", unit: "mmHg" },
  { keys: ["hr", "hf"], label: "Herzfrequenz (HF)", unit: "/min" },
  { keys: ["af", "rf"], label: "Atemfrequenz (AF)", unit: "/min" },
  { keys: ["spo2"], label: "Sauerstoffsättigung (SpO₂)", unit: "%" },
  { keys: ["temp"], label: "Temperatur", unit: "°C" },
];

/** Reads clinical_facts.vitals in either the seed shape (bp, hr) or the static shape (rr, hf). */
export function getVitals(s: Scenario): VitalSign[] {
  const vitals = asRecord(s.clinical_facts.vitals);
  const out: VitalSign[] = [];
  for (const { keys, label, unit } of VITAL_LABELS) {
    const key = keys.find((k) => vitals[k] !== undefined && vitals[k] !== null);
    if (!key) continue;
    const raw = String(vitals[key]).trim();
    // Add the unit only when the value is a bare number or ratio ("155/95", "92", "38.2").
    const value = unit && /^[\d.,/]+$/.test(raw) ? `${raw} ${unit}`.replace(" %", "%") : raw;
    out.push({ label, value });
  }
  return out;
}

const FACT_LABELS: Record<string, string> = {
  diagnosis: "Diagnose",
  differentials: "Differentialdiagnosen",
  history: "Anamnese",
  current: "Aktuelle Anamnese",
  previous: "Vorerkrankungen",
  medication: "Medikation",
  allergies: "Allergien",
  social: "Sozialanamnese",
  family: "Familienanamnese",
  labs: "Labor",
  local_status: "Lokalbefund",
  last_meal: "Letzte Mahlzeit",
  onset_time: "Symptombeginn",
  status: "Neurologischer Status",
  context: "Kontext",
  speaker: "Gesprächspartner",
  nursing_goals: "Pflegeziele",
};

export function factLabel(key: string): string {
  return FACT_LABELS[key] ?? key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

/** Flattens a fact value into display lines. */
export function factLines(value: unknown): string[] {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value.flatMap(factLines);
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) => {
      const inner = factLines(v);
      return inner.length ? [`${factLabel(k)}: ${inner.join(", ")}`] : [];
    });
  }
  return [String(value)];
}

/** The facts shown behind "Lösung aufdecken", in a stable order, vitals excluded. */
export function getHiddenFacts(s: Scenario): { label: string; lines: string[] }[] {
  const entries = Object.entries(s.clinical_facts).filter(([k]) => k !== "vitals");
  entries.sort(([a], [b]) => (a === "diagnosis" ? -1 : b === "diagnosis" ? 1 : 0));
  return entries
    .map(([k, v]) => ({ label: factLabel(k), lines: factLines(v) }))
    .filter((f) => f.lines.length > 0);
}
