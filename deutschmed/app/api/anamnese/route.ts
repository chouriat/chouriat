import { NextResponse } from 'next/server';
import { MEDICAL_CASES } from '@/lib/medical-cases';
import { localFeedback, localPatientReply } from '@/lib/local-patient';

interface ChatTurn {
  role: 'doctor' | 'patient';
  text: string;
}

type AiProvider = 'gemini' | 'openai' | 'anthropic';

type ProviderResult =
  | { patientReply: string; feedback: string }
  | { error: string; status: number };

function isAiProvider(value: string): value is AiProvider {
  return value === 'gemini' || value === 'openai' || value === 'anthropic';
}

function parseJsonReply(rawText: string): { patientReply: string; feedback: string } | null {
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    const parsed = JSON.parse(jsonMatch[0]);
    if (typeof parsed.patientReply !== 'string') return null;
    return {
      patientReply: parsed.patientReply,
      feedback: typeof parsed.feedback === 'string' ? parsed.feedback : '',
    };
  } catch {
    return null;
  }
}

/** Turns a provider HTTP error into a clear German message for the user. */
// Tried in order; later entries are fallbacks when Google is overloaded.
const GEMINI_MODELS = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.5-flash-lite'];
const GEMINI_RETRY_STATUSES = new Set([404, 500, 503, 504]);

function providerError(status: number, providerName: string): ProviderResult {
  if (status === 400 || status === 401 || status === 403) {
    return {
      error: `Ihr ${providerName}-Schlüssel wurde abgelehnt. Bitte prüfen Sie den Schlüssel in den KI-Einstellungen.`,
      status: 401,
    };
  }
  if (status === 429) {
    return {
      error: `Ihr ${providerName}-Kontingent ist aufgebraucht oder das Limit wurde erreicht. Bitte später erneut versuchen.`,
      status: 429,
    };
  }
  return {
    error: `${providerName} ist gerade nicht erreichbar (Fehler ${status}). Bitte später erneut versuchen.`,
    status: 502,
  };
}

async function callProvider(
  provider: AiProvider,
  apiKey: string,
  systemPrompt: string,
  history: ChatTurn[],
  message: string
): Promise<ProviderResult> {
  if (provider === 'gemini') {
    const body = JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [
        ...history.map((m) => ({
          role: m.role === 'doctor' ? 'user' : 'model',
          parts: [{ text: m.text }],
        })),
        { role: 'user', parts: [{ text: message }] },
      ],
      generationConfig: {
        temperature: 0.5,
        responseMimeType: 'application/json',
      },
    });

    // Google often answers 503 ("model overloaded") at peak times, and older
    // models return 404 for new keys. Try the next model in that case.
    let lastStatus = 503;
    for (const model of GEMINI_MODELS) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Header instead of ?key= so the key never ends up in URL logs.
            'x-goog-api-key': apiKey,
          },
          body,
        }
      );
      if (!res.ok) {
        lastStatus = res.status;
        if (GEMINI_RETRY_STATUSES.has(res.status)) continue;
        return providerError(res.status, 'Gemini');
      }
      const data = await res.json();
      const parsed = parseJsonReply(data.candidates?.[0]?.content?.parts?.[0]?.text || '');
      return parsed ?? { error: 'Die KI-Antwort war unvollständig. Bitte erneut senden.', status: 502 };
    }
    return providerError(lastStatus, 'Gemini');
  }

  if (provider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        response_format: { type: 'json_object' },
        temperature: 0.5,
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.map((m) => ({
            role: m.role === 'doctor' ? 'user' : 'assistant',
            content: m.text,
          })),
          { role: 'user', content: message },
        ],
      }),
    });
    if (!res.ok) return providerError(res.status, 'OpenAI');
    const data = await res.json();
    const parsed = parseJsonReply(data.choices?.[0]?.message?.content || '');
    return parsed ?? { error: 'Die KI-Antwort war unvollständig. Bitte erneut senden.', status: 502 };
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 800,
      system: systemPrompt,
      messages: [
        ...history.map((m) => ({
          role: m.role === 'doctor' ? 'user' : 'assistant',
          content: m.text,
        })),
        {
          role: 'user',
          content: `${message}\n\n(Bitte antworte ausschließlich als valides JSON-Objekt mit "patientReply" und "feedback".)`,
        },
      ],
    }),
  });
  if (!res.ok) return providerError(res.status, 'Claude');
  const data = await res.json();
  const parsed = parseJsonReply(data.content?.[0]?.text || '');
  return parsed ?? { error: 'Die KI-Antwort war unvollständig. Bitte erneut senden.', status: 502 };
}


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-ai-provider, x-ai-key",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { caseId, message, history: rawHistory } = body as {
      caseId: string;
      message: string;
      history?: ChatTurn[];
    };

    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Leere Nachricht.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Keep only well-formed turns, and only the most recent ones, to bound cost.
    const history: ChatTurn[] = (Array.isArray(rawHistory) ? rawHistory : [])
      .filter(
        (m) =>
          m &&
          (m.role === 'doctor' || m.role === 'patient') &&
          typeof m.text === 'string'
      )
      .slice(-30);

    const currentCase =
      MEDICAL_CASES.find((c) => c.id === caseId) || MEDICAL_CASES[0];

    const systemPrompt = `Du bist ein zweifacher KI-Assistent für die deutsche ärztliche Fachsprachprüfung (FSP C1):
1. ROLLE PATIENT: Du spielst den Patienten / die Patientin "${currentCase.patient.name}" (${currentCase.patient.age} Jahre alt, Beruf: ${currentCase.patient.occupation}).
   - Dein Leitsymptom (in eigenen Worten): "${currentCase.patient.chiefComplaint}"
   - Deine vollständige Krankenakte & Hintergrund: "${currentCase.patient.historyDetails}"
   - Vitalparameter: RR ${currentCase.patient.vitalSigns.bp}, HF ${currentCase.patient.vitalSigns.hr}, Temp ${currentCase.patient.vitalSigns.temp}, SpO2 ${currentCase.patient.vitalSigns.spo2}.
${currentCase.speaker ? `   - Fremdanamnese: Du antwortest als ${currentCase.speaker}, nicht als Patient selbst.\n` : ''}${currentCase.patientDialogue ? `   - So spricht die Person (Beispielantworten, nutze Inhalt und Ton): ${JSON.stringify(currentCase.patientDialogue)}\n` : ''}   - WICHTIG: Antworte als Patient natürlich, authentisch und in Alltagssprache (keine medizinischen Fachbegriffe verwenden, außer der Arzt erklärt sie dir). Verrate nicht sofort alle Details auf einmal, sondern antworte gezielt auf das, wonach der Arzt / die Ärztin gerade gefragt hat.

2. ROLLE FSP-PRÜFER (Feedback): Bewerte kurz (1-2 Sätze) die letzte Frage des Arztes / der Ärztin:
   - Lob ("✓ ..."), wenn die Frage empathisch, offen/strukturiert und in verständlicher Patientensprache formuliert wurde.
   - Hinweis ("⚠️ FSP-Hinweis: ..."), wenn der Arzt unverständlichen medizinischen Fachjargon (z.B. Dyspnoe, Emesis, Cephalgie, Noxen, Komorbiditäten) gegenüber dem Patienten verwendet hat, und schlage die passende deutsche Patientenformulierung vor.

Antworte AUSSCHLIESSLICH im folgenden JSON-Format:
{
  "patientReply": "Deine Antwort als Patient/in in natürlicher Alltagssprache",
  "feedback": "Kurzes FSP-Prüfer-Feedback zur Frage des Arztes"
}`;

    // Bring-your-own-key: the user's own provider key arrives with this single
    // request. It is used only for this call and is never stored or logged.
    // The server deliberately has no AI key of its own.
    const providerHeader = req.headers.get('x-ai-provider');
    const userKey = req.headers.get('x-ai-key')?.trim();

    if (providerHeader && userKey) {
      if (!isAiProvider(providerHeader)) {
        return NextResponse.json(
          { error: 'Unbekannter KI-Anbieter.' },
          { status: 400, headers: corsHeaders }
        );
      }
      const result = await callProvider(
        providerHeader,
        userKey,
        systemPrompt,
        history,
        message
      );
      if ('error' in result) {
        return NextResponse.json(
          { error: result.error, provider: providerHeader },
          { status: result.status, headers: corsHeaders }
        );
      }
      return NextResponse.json(
        { ...result, provider: providerHeader },
        { headers: corsHeaders }
      );
    }

    // Offline fallback: no user key, so answer from the case's written
    // patient dialogue (lib/local-patient.ts).
    const patientReply = localPatientReply(currentCase, message, history.length === 0);
    const feedback = localFeedback(message);

    return NextResponse.json({
      patientReply,
      feedback,
      provider: 'fallback',
    }, { headers: corsHeaders });
  } catch (error) {
    // Log only the error message: never the request, which may contain a key.
    console.error(
      'Anamnese API Error:',
      error instanceof Error ? error.message : 'unknown error'
    );
    return NextResponse.json(
      { error: 'Fehler bei der Anfrageverarbeitung' },
      { status: 500, headers: corsHeaders }
    );
  }
}
