import type { AnamneseResponse, Correction, TranscriptMessage } from "@/lib/anamnese";
import { factLines, type Scenario } from "@/lib/scenarios";

/**
 * Offline patient used when ANTHROPIC_API_KEY is not set. It is deliberately
 * simple: it spots the topic of the question, answers from clinical_facts, and
 * checks for the most common mistakes (du-Form, casual tone). Good enough to
 * click through the UI and to keep the app usable without an API key.
 */

type Topic = {
  id: string;
  match: RegExp;
  factKeys: string[];
  ask: string; // a model question in professional German
  intro: string; // how the patient starts the answer
};

const TOPICS: Topic[] = [
  {
    id: "allergies",
    match: /allerg|unverträglich/i,
    factKeys: ["allergies"],
    ask: "Sind bei Ihnen Allergien oder Unverträglichkeiten bekannt, zum Beispiel gegen Medikamente?",
    intro: "Allergien … ",
  },
  {
    id: "medication",
    match: /medikament|tablette|nehmen sie|nimmst|pille|arznei/i,
    factKeys: ["medication"],
    ask: "Welche Medikamente nehmen Sie regelmäßig ein, und in welcher Dosierung?",
    intro: "Ich nehme ",
  },
  {
    id: "history",
    match: /vorerkrank|erkrankung|krankheit|operation|operiert|früher/i,
    factKeys: ["previous", "history"],
    ask: "Haben Sie Vorerkrankungen, oder wurden Sie schon einmal operiert?",
    intro: "Also, bekannt ist bei mir: ",
  },
  {
    id: "social",
    match: /rauch|zigarett|alkohol|trink|beruf|arbeit|wohn|lebe/i,
    factKeys: ["social"],
    ask: "Rauchen Sie oder trinken Sie Alkohol? Und was machen Sie beruflich?",
    intro: "",
  },
  {
    id: "family",
    match: /famili|eltern|vater|mutter|geschwister/i,
    factKeys: ["family"],
    ask: "Gibt es in Ihrer Familie Erkrankungen, zum Beispiel Herzinfarkte oder Schlaganfälle?",
    intro: "In der Familie … ",
  },
  {
    id: "onset",
    match: /seit wann|wann|wie lange|angefangen|begonnen/i,
    factKeys: ["onset_time", "current"],
    ask: "Seit wann haben Sie diese Beschwerden, und wie haben sie angefangen?",
    intro: "",
  },
  {
    id: "meal",
    match: /gegessen|mahlzeit|nüchtern|essen/i,
    factKeys: ["last_meal"],
    ask: "Wann haben Sie zuletzt etwas gegessen oder getrunken?",
    intro: "Zuletzt gegessen habe ich ",
  },
  {
    id: "pain",
    match: /schmerz|weh|ausstrahl|wo genau|stärke|skala/i,
    factKeys: ["local_status", "current", "status"],
    ask: "Können Sie mir bitte zeigen, wo genau die Schmerzen sind, und ob sie irgendwohin ausstrahlen?",
    intro: "",
  },
];

const DU_FORM = /\b(du|dich|dir|dein|deine|deinen|deinem|deiner|hast du|bist du|kannst du|nimmst)\b/i;
const CASUAL =
  /\b(hey|hi|hallo na|na\b|was geht|was ist los|was hast du|krass|okay cool|alles klar\?|jo|yo|sag mal|erzähl mal)\b/i;
const GREETING = /\b(guten (tag|morgen|abend)|grüß gott|mein name ist|ich bin (dr|doktor|der|die|ihr|ihre))/i;

function findFact(value: unknown, keys: string[]): string | null {
  if (!value || typeof value !== "object") return null;
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    if (keys.includes(k)) {
      const lines = factLines(v);
      if (lines.length) return lines.join(", ");
    }
  }
  for (const v of Object.values(value as Record<string, unknown>)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const found = findFact(v, keys);
      if (found) return found;
    }
  }
  return null;
}

function detectTopic(text: string): Topic | null {
  return TOPICS.find((t) => t.match.test(text)) ?? null;
}

export function demoCorrection(text: string, isFirstDoctorTurn: boolean): Correction {
  const topic = detectTopic(text);
  const better = topic?.ask ?? "Können Sie mir bitte genauer beschreiben, was Sie heute zu uns führt?";

  if (DU_FORM.test(text)) {
    return {
      has_error: true,
      better_phrasing: better,
      explanation:
        "Sprechen Sie erwachsene Patientinnen und Patienten immer mit „Sie“ an. Das „du“ wirkt im Krankenhaus respektlos.",
    };
  }
  if (CASUAL.test(text)) {
    return {
      has_error: true,
      better_phrasing: better,
      explanation:
        "Der Ton ist zu umgangssprachlich. Formulieren Sie höflich und vollständig, zum Beispiel mit „Können Sie mir bitte …“.",
    };
  }
  if (isFirstDoctorTurn && !GREETING.test(text)) {
    return {
      has_error: true,
      better_phrasing: `Guten Tag, mein Name ist Dr. … , ich bin die Assistenzärztin / der Assistenzarzt hier. ${better}`,
      explanation:
        "Zu Beginn des Gesprächs sollten Sie sich mit Namen und Funktion vorstellen. Das gehört in der FSP zur Gesprächsstruktur.",
    };
  }
  return { has_error: false, better_phrasing: "", explanation: "" };
}

export function demoReply(scenario: Scenario, messages: TranscriptMessage[]): AnamneseResponse {
  const last = messages[messages.length - 1];
  const doctorTurns = messages.filter((m) => m.role === "user").length;
  const topic = detectTopic(last.content);

  let reply: string;
  const fact = topic ? findFact(scenario.clinical_facts, topic.factKeys) : null;
  if (topic && fact) {
    reply = `${topic.intro}${fact.replace(/[.\s]+$/, "")}.`;
  } else if (topic) {
    reply = "Hm, da fällt mir nichts Besonderes ein, Herr Doktor / Frau Doktorin.";
  } else if (doctorTurns === 1) {
    reply = `Ja … also, wie gesagt: ${scenario.chief_complaint}`;
  } else {
    reply = "Entschuldigung, das habe ich nicht ganz verstanden. Können Sie das bitte anders fragen?";
  }

  return {
    mode: "demo",
    patient_reply: reply,
    correction: demoCorrection(last.content, doctorTurns === 1),
  };
}
