import { NextResponse } from 'next/server';
import { MEDICAL_CASES } from '@/lib/medical-cases';

interface ChatTurn {
  role: 'doctor' | 'patient';
  text: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { caseId, message, history = [] } = body as {
      caseId: string;
      message: string;
      history: ChatTurn[];
    };

    const currentCase =
      MEDICAL_CASES.find((c) => c.id === caseId) || MEDICAL_CASES[0];

    const systemPrompt = `Du bist ein zweifacher KI-Assistent für die deutsche ärztliche Fachsprachprüfung (FSP C1):
1. ROLLE PATIENT: Du spielst den Patienten / die Patientin "${currentCase.patient.name}" (${currentCase.patient.age} Jahre alt, Beruf: ${currentCase.patient.occupation}).
   - Dein Leitsymptom (in eigenen Worten): "${currentCase.patient.chiefComplaint}"
   - Deine vollständige Krankenakte & Hintergrund: "${currentCase.patient.historyDetails}"
   - Vitalparameter: RR ${currentCase.patient.vitalSigns.bp}, HF ${currentCase.patient.vitalSigns.hr}, Temp ${currentCase.patient.vitalSigns.temp}, SpO2 ${currentCase.patient.vitalSigns.spo2}.
   - WICHTIG: Antworte als Patient natürlich, authentisch und in Alltagssprache (keine medizinischen Fachbegriffe verwenden, außer der Arzt erklärt sie dir). Verrate nicht sofort alle Details auf einmal, sondern antworte gezielt auf das, wonach der Arzt / die Ärztin gerade gefragt hat.

2. ROLLE FSP-PRÜFER (Feedback): Bewerte kurz (1-2 Sätze) die letzte Frage des Arztes / der Ärztin:
   - Lob ("✓ ..."), wenn die Frage empathisch, offen/strukturiert und in verständlicher Patientensprache formuliert wurde.
   - Hinweis ("⚠️ FSP-Hinweis: ..."), wenn der Arzt unverständlichen medizinischen Fachjargon (z.B. Dyspnoe, Emesis, Cephalgie, Noxen, Komorbiditäten) gegenüber dem Patienten verwendet hat, und schlage die passende deutsche Patientenformulierung vor.

Antworte AUSSCHLIESSLICH im folgenden JSON-Format:
{
  "patientReply": "Deine Antwort als Patient/in in natürlicher Alltagssprache",
  "feedback": "Kurzes FSP-Prüfer-Feedback zur Frage des Arztes"
}`;

    // Auto-detect Gemini key even if stored under GEMINI_API_KEY, GOOGLE_API_KEY, or OPENAI_API_KEY
    const rawGeminiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      (process.env.OPENAI_API_KEY?.startsWith('AIza')
        ? process.env.OPENAI_API_KEY
        : undefined) ||
      (process.env.ANTHROPIC_API_KEY?.startsWith('AIza')
        ? process.env.ANTHROPIC_API_KEY
        : undefined);

    const openAiKey =
      process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.startsWith('AIza')
        ? process.env.OPENAI_API_KEY
        : undefined;

    const anthropicKey =
      process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY.startsWith('AIza')
        ? process.env.ANTHROPIC_API_KEY
        : undefined;

    // Option A: Google Gemini API (gemini-2.5-flash)
    if (rawGeminiKey) {
      const geminiContents = [
        ...history.map((m) => ({
          role: m.role === 'doctor' ? 'user' : 'model',
          parts: [{ text: m.text }],
        })),
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ];

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${rawGeminiKey}`;

      const res = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.5,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const rawText =
          data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({
            patientReply: parsed.patientReply,
            feedback: parsed.feedback,
            provider: 'gemini',
          });
        }
      }
    }

    // Option B: OpenAI API (gpt-4o-mini)
    if (openAiKey) {
      const openAiMessages = [
        { role: 'system', content: systemPrompt },
        ...history.map((m) => ({
          role: m.role === 'doctor' ? 'user' : 'assistant',
          content: m.text,
        })),
        { role: 'user', content: message },
      ];

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: openAiMessages,
          temperature: 0.5,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          return NextResponse.json({
            patientReply: parsed.patientReply,
            feedback: parsed.feedback,
            provider: 'openai',
          });
        }
      }
    }

    // Option C: Anthropic Claude API
    if (anthropicKey) {
      const claudeMessages = [
        ...history.map((m) => ({
          role: m.role === 'doctor' ? 'user' : 'assistant',
          content: m.text,
        })),
        {
          role: 'user',
          content: `${message}\n\n(Bitte antworte ausschließlich als valides JSON-Objekt mit "patientReply" und "feedback".)`,
        },
      ];

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-latest',
          max_tokens: 500,
          system: systemPrompt,
          messages: claudeMessages,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const rawText = data.content?.[0]?.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({
            patientReply: parsed.patientReply,
            feedback: parsed.feedback,
            provider: 'anthropic',
          });
        }
      }
    }

    // Option D: Smart Clinical Fallback (if no API key is configured yet)
    const usesJargon =
      /dyspnoe|retrosternal|emesis|vomitus|nausea|pyrexie|appendizitis|cephalgie|vertigo|inappetenz|cholezystitis|pankreatitis|komorbidit|noxen|miktion|defäkation|synkope|expektoration|hämoptyse/i.test(
        message
      );

    const feedback = usesJargon
      ? '⚠️ FSP-Hinweis: Sie haben medizinische Fachbegriffe im Patientengespräch verwendet. Nutzen Sie gegenüber Patienten bitte verständliche Alltagssprache!'
      : '✓ Gute C1-Arzt-Patienten-Kommunikation: Klare und verständliche Fragestellung.';

    const lowerQ = message.toLowerCase();
    const questions = currentCase.anamneseQuestions || [];
    let patientReply = `Zu meinen aktuellen Beschwerden: ${currentCase.patient.chiefComplaint}`;

    if (
      lowerQ.includes('name') ||
      lowerQ.includes('heißen') ||
      lowerQ.includes('alt') ||
      lowerQ.includes('geburt') ||
      lowerQ.includes('beruf') ||
      lowerQ.includes('arbeit')
    ) {
      patientReply = `Ich heiße ${currentCase.patient.name}, bin ${currentCase.patient.age} Jahre alt und arbeite als ${currentCase.patient.occupation}.`;
    } else if (
      lowerQ.includes('vorerkrank') ||
      lowerQ.includes('krankheit') ||
      lowerQ.includes('medikament') ||
      lowerQ.includes('tablette') ||
      lowerQ.includes('operation') ||
      lowerQ.includes('früher')
    ) {
      patientReply =
        questions[1]?.patientResponse || currentCase.patient.historyDetails;
    } else if (
      lowerQ.includes('allergi') ||
      lowerQ.includes('unverträglich') ||
      lowerQ.includes('rauch') ||
      lowerQ.includes('zigarett') ||
      lowerQ.includes('alkohol') ||
      lowerQ.includes('familie') ||
      lowerQ.includes('eltern')
    ) {
      patientReply =
        questions[2]?.patientResponse || currentCase.patient.historyDetails;
    } else if (
      lowerQ.includes('schmerz') ||
      lowerQ.includes('beschwerde') ||
      lowerQ.includes('was führt') ||
      lowerQ.includes('seit wann') ||
      lowerQ.includes('wo tut') ||
      lowerQ.includes('ausstrahl')
    ) {
      patientReply =
        questions[0]?.patientResponse || currentCase.patient.chiefComplaint;
    }

    return NextResponse.json({
      patientReply,
      feedback,
      provider: 'fallback',
    });
  } catch (error) {
    console.error('Anamnese API Error:', error);
    return NextResponse.json(
      { error: 'Fehler bei der Anfrageverarbeitung' },
      { status: 500 }
    );
  }
}
