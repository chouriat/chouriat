/**
 * Shared contract between the Anamnese simulator UI and /api/chat.
 * Plain types only, so the client bundle does not pull in zod.
 * The matching runtime validation lives in lib/anamnese-schema.ts.
 */

export const MAX_MESSAGE_CHARS = 1000;
export const MAX_TURNS = 80;

export type Correction = {
  has_error: boolean;
  better_phrasing: string;
  explanation: string;
};

export type TranscriptMessage = {
  role: "patient" | "user";
  content: string;
};

export type AnamneseRequest = {
  scenarioId: string;
  /** Full conversation so far, ending with the user's new message. */
  chatHistory: TranscriptMessage[];
};

export type AnamneseResponse = {
  /** "ai" when Claude answered, "demo" when the offline rule-based patient did. */
  mode: "ai" | "demo";
  patient_reply: string;
  /** Feedback on the user's last message. */
  correction: Correction;
};

export type AnamneseError = { error: string };

/** A message as the UI holds it. Corrections belong to the user message they judge. */
export type ChatMessage = TranscriptMessage & {
  id: string;
  status: "sending" | "sent" | "failed";
  correction?: Correction;
};
