import "server-only";

import { z } from "zod";

import { MAX_MESSAGE_CHARS, MAX_TURNS, type AnamneseRequest, type Correction } from "@/lib/anamnese";

export const CorrectionSchema = z.object({
  has_error: z.boolean(),
  better_phrasing: z.string(),
  explanation: z.string(),
}) satisfies z.ZodType<Correction>;

export const AnamneseRequestSchema = z.object({
  scenarioId: z.string().min(1).max(100),
  chatHistory: z
    .array(
      z.object({
        role: z.enum(["patient", "user"]),
        content: z.string().trim().min(1).max(MAX_MESSAGE_CHARS),
      })
    )
    .min(1)
    .max(MAX_TURNS),
}) satisfies z.ZodType<AnamneseRequest>;
