'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MEDICAL_CASES } from '@/lib/medical-cases';
import { useProgressStore } from '@/lib/store';
import { localFeedback, localPatientReply } from '@/lib/local-patient';
import { CaseSelector } from '@/components/case-selector';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AiKeySettings } from '@/components/ai-key-settings';
import { aiKeyHeaders, useUserAiKey } from '@/lib/ai-key';

// The web app calls its own API route. The mobile (static export) build sets
// NEXT_PUBLIC_API_BASE_URL to the deployed web app, e.g. https://example.vercel.app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://chouriat-q4g8.vercel.app';

interface ChatMessage {
  role: 'doctor' | 'patient';
  text: string;
  feedback?: string;
  isError?: boolean;
}

export default function AnamnesePage() {
  const [selectedCaseId, setSelectedCaseId] = useState(MEDICAL_CASES[0].id);
  const [mode, setMode] = useState<'guided' | 'ai'>('ai');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiProvider, setAiProvider] = useState<string | null>(null);

  const { progress, markAnamneseCompleted } = useProgressStore();
  const { aiKey, saveKey, clearKey } = useUserAiKey();

  const currentCase =
    MEDICAL_CASES.find((c) => c.id === selectedCaseId) || MEDICAL_CASES[0];
  const isCompleted = progress.completedAnamneseCases.includes(currentCase.id);
  const questions = currentCase.anamneseQuestions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleCaseChange = (id: string) => {
    setSelectedCaseId(id);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setMessages([]);
    setInputText('');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const doctorQuestion = inputText.trim();
    setInputText('');
    setIsLoading(true);

    // Optimistic UI: show the doctor's question immediately.
    const history = messages
      .filter((m) => !m.isError)
      .map((m) => ({ role: m.role, text: m.text }));
    setMessages((prev) => [...prev, { role: 'doctor', text: doctorQuestion }]);

    try {
      const response = await fetch(`${API_BASE_URL}/api/anamnese`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...aiKeyHeaders(aiKey) },
        body: JSON.stringify({
          caseId: currentCase.id,
          message: doctorQuestion,
          history,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.patientReply) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'patient',
            text:
              data.error ||
              'Die Anfrage ist fehlgeschlagen. Bitte versuchen Sie es erneut.',
            isError: true,
          },
        ]);
        return;
      }

      if (data.provider) {
        setAiProvider(data.provider);
      }

      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.role === 'doctor' && last.text === doctorQuestion) {
          next[next.length - 1] = { ...last, feedback: data.feedback };
        }
        return [...next, { role: 'patient', text: data.patientReply }];
      });
    } catch {
      if (!aiKey) {
        // No AI key and no connection (e.g. mobile offline): answer locally
        // from the case's written patient dialogue.
        setAiProvider('fallback');
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === 'doctor' && last.text === doctorQuestion) {
            next[next.length - 1] = { ...last, feedback: localFeedback(doctorQuestion) };
          }
          return [
            ...next,
            { role: 'patient', text: localPatientReply(currentCase, doctorQuestion, history.length === 0) },
          ];
        });
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          role: 'patient',
          text: 'Keine Verbindung zum Server. Bitte prüfen Sie Ihre Internetverbindung.',
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Zurück zum Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          FSP Teil 1: Arzt-Patienten-Gespräch (Anamnese)
        </h1>
        <p className="text-sm text-slate-600">
          Strukturierte Anamneseerhebung in empathischer, verständlicher Patientensprache
        </p>
      </div>

      <CaseSelector
        selectedCaseId={selectedCaseId}
        onSelectCase={handleCaseChange}
        completedIds={progress.completedAnamneseCases}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100 p-2 rounded-xl">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={mode === 'ai' ? 'default' : 'outline'}
            onClick={() => setMode('ai')}
          >
            💬 Freier KI-Anamnese-Simulator (Chat)
          </Button>
          <Button
            size="sm"
            variant={mode === 'guided' ? 'default' : 'outline'}
            onClick={() => setMode('guided')}
          >
            🎯 Geführtes FSP-Training (Multiple-Choice)
          </Button>
        </div>

        <Button
          size="sm"
          variant={isCompleted ? 'outline' : 'default'}
          onClick={() => markAnamneseCompleted(currentCase.id)}
        >
          {isCompleted ? '✓ Fall abgeschlossen (+50 XP)' : 'Anamnese abschließen (+50 XP)'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge>{currentCase.specialty}</Badge>
              <Badge variant="outline">{currentCase.difficulty}</Badge>
            </div>
            <CardTitle className="text-lg mt-2">{currentCase.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>
              <strong>Patient:</strong> {currentCase.patient.name} ({currentCase.patient.age} J.,{' '}
              {currentCase.patient.occupation})
            </p>
            {currentCase.speaker && (
              <p>
                <strong>Gesprächspartner:</strong> {currentCase.speaker}
              </p>
            )}
            <p>
              <strong>Leitsymptom:</strong> „{currentCase.patient.chiefComplaint}“
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border text-xs space-y-1">
              <div className="font-semibold text-slate-900">Vitalparameter bei Aufnahme:</div>
              <div>RR: {currentCase.patient.vitalSigns.bp}</div>
              <div>HF: {currentCase.patient.vitalSigns.hr}</div>
              <div>Temp: {currentCase.patient.vitalSigns.temp}</div>
              <div>SpO₂: {currentCase.patient.vitalSigns.spo2}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          {mode === 'ai' ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Gespräch mit {currentCase.patient.name}
                  </CardTitle>
                  {aiProvider && (
                    <Badge variant="outline" className="text-[11px]">
                      {aiProvider === 'gemini'
                        ? '⚡ Gemini AI aktiv'
                        : aiProvider === 'openai'
                        ? '⚡ OpenAI aktiv'
                        : aiProvider === 'anthropic'
                        ? '⚡ Claude AI aktiv'
                        : '💡 Lokaler Simulator (ohne KI)'}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Stellen Sie Ihre Anamnesefragen auf Deutsch (aktuelle Beschwerden, Vorerkrankungen, Medikamente, Allergien, Sozial- & Familienanamnese).
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <AiKeySettings
                  aiKey={aiKey}
                  onSave={(key) => {
                    saveKey(key);
                    setAiProvider(null);
                  }}
                  onClear={() => {
                    clearKey();
                    setAiProvider(null);
                  }}
                />
                <div className="h-80 overflow-y-auto rounded-xl border bg-slate-50 p-4 space-y-3">
                  {messages.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-12">
                      Beginnen Sie das Gespräch! Stellen Sie sich vor und fragen Sie {currentCase.patient.name} nach den aktuellen Beschwerden.
                    </p>
                  ) : (
                    messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col ${
                          msg.role === 'doctor' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                            msg.isError
                              ? 'bg-red-50 border border-red-200 text-red-800'
                              : msg.role === 'doctor'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border text-slate-800'
                          }`}
                        >
                          <div className="text-[10px] font-semibold opacity-75 mb-1">
                            {msg.isError
                              ? '⚠️ Hinweis'
                              : msg.role === 'doctor'
                              ? 'Sie (Arzt/Ärztin)'
                              : currentCase.speaker
                              ? currentCase.speaker.replace(/\s*\(Fremdanamnese\)/, '')
                              : currentCase.patient.name}
                          </div>
                          {msg.text}
                        </div>
                        {msg.feedback && (
                          <div className="mt-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 max-w-[85%]">
                            {msg.feedback}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ihre Frage an den Patienten eingeben..."
                    className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Patient antwortet...' : 'Frage stellen'}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    Frage {currentQuestionIndex + 1} von {questions.length}
                  </Badge>
                  <span className="text-xs text-slate-500">{currentQuestion?.phase}</span>
                </div>
                <CardTitle className="text-lg mt-2">
                  Wählen Sie die optimale ärztliche Formulierung:
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuestion && (
                  <>
                    <div className="space-y-3">
                      {currentQuestion.doctorOptions.map((opt, idx) => {
                        const isSelected = selectedOptionIndex === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedOptionIndex(idx)}
                            className={`cursor-pointer rounded-xl border p-3.5 text-sm transition ${
                              isSelected
                                ? opt.isOptimal
                                  ? 'border-emerald-600 bg-emerald-50'
                                  : 'border-amber-600 bg-amber-50'
                                : 'hover:border-blue-400'
                            }`}
                          >
                            <p className="font-medium text-slate-900">„{opt.text}“</p>
                            {isSelected && (
                              <p className="mt-2 text-xs text-slate-700">{opt.feedback}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {selectedOptionIndex !== null && (
                      <div className="rounded-xl bg-slate-100 p-4 text-sm space-y-1">
                        <div className="text-xs font-semibold text-slate-600">
                          Antwort von {currentCase.patient.name}:
                        </div>
                        <p className="text-slate-900">„{currentQuestion.patientResponse}“</p>
                      </div>
                    )}

                    <div className="flex justify-between pt-2">
                      <Button
                        variant="outline"
                        disabled={currentQuestionIndex === 0}
                        onClick={() => {
                          setCurrentQuestionIndex((i) => i - 1);
                          setSelectedOptionIndex(null);
                        }}
                      >
                        ← Vorherige Phase
                      </Button>
                      <Button
                        disabled={currentQuestionIndex >= questions.length - 1}
                        onClick={() => {
                          setCurrentQuestionIndex((i) => i + 1);
                          setSelectedOptionIndex(null);
                        }}
                      >
                        Nächste Phase →
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
