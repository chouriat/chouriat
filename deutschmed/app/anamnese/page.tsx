'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MEDICAL_CASES } from '@/lib/medical-cases';
import { useProgressStore } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ChatMessage {
  role: 'doctor' | 'patient';
  text: string;
  feedback?: string;
}

export default function AnamnesePage() {
  const [selectedCaseId, setSelectedCaseId] = useState(MEDICAL_CASES[0].id);
  const [mode, setMode] = useState<'guided' | 'ai'>('ai');

  // State für Geführtes Training
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  // State für KI-Sprachsimulator
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { progress, markAnamneseCompleted } = useProgressStore();

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

    // Lokales C1-Feedback & realistische Patienten-Antwort
    const usesJargon =
      /dyspnoe|retrosternal|emesis|vomitus|nausea|pyrexie|appendizitis|cepahlgie|vertigo|inappetenz/i.test(
        doctorQuestion
      );

    const feedback = usesJargon
      ? '⚠️ FSP-Hinweis: Sie haben medizinische Fachbegriffe im Patientengespräch verwendet. Nutzen Sie gegenüber Patienten bitte verständliche Alltagssprache!'
      : '✓ Gute C1-Arzt-Patienten-Kommunikation: Klare und verständliche Fragestellung.';

    let patientReply = `Ich verstehe Ihre Frage. Also zu meinen Beschwerden: ${currentCase.patient.chiefComplaint}`;

    const lowerQ = doctorQuestion.toLowerCase();
    if (lowerQ.includes('name') || lowerQ.includes('heißen') || lowerQ.includes('wer sind')) {
      patientReply = `Mein Name ist ${currentCase.patient.name}, ich bin ${currentCase.patient.age} Jahre alt und arbeite als ${currentCase.patient.occupation}.`;
    } else if (
      lowerQ.includes('schmerz') ||
      lowerQ.includes('beschwerde') ||
      lowerQ.includes('was führt') ||
      lowerQ.includes('problem')
    ) {
      patientReply =
        questions[0]?.patientResponse || currentCase.patient.chiefComplaint;
    } else if (
      lowerQ.includes('übel') ||
      lowerQ.includes('erbrech') ||
      lowerQ.includes('fieber') ||
      lowerQ.includes('luft') ||
      lowerQ.includes('schwitz') ||
      lowerQ.includes('begleit')
    ) {
      patientReply =
        questions[1]?.patientResponse || currentCase.patient.historyDetails;
    } else if (
      lowerQ.includes('medikament') ||
      lowerQ.includes('vorerkrank') ||
      lowerQ.includes('allergi') ||
      lowerQ.includes('rauch')
    ) {
      patientReply =
        questions[2]?.patientResponse || currentCase.patient.historyDetails;
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'doctor', text: doctorQuestion, feedback },
        { role: 'patient', text: patientReply },
      ]);
      setIsLoading(false);
    }, 400);
  };

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header & Fallauswahl */}
      <div className="flex flex-wrap items-center justify-between gap-4">
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

        <div className="flex flex-wrap gap-2">
          {MEDICAL_CASES.map((c) => (
            <Button
              key={c.id}
              variant={c.id === selectedCaseId ? 'default' : 'outline'}
              onClick={() => handleCaseChange(c.id)}
            >
              {c.patient.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Modus-Umschalter */}
      <div className="flex items-center justify-between bg-slate-100 p-2 rounded-xl">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={mode === 'ai' ? 'default' : 'outline'}
            onClick={() => setMode('ai')}
          >
            💬 Freier Anamnese-Simulator (Chat)
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
        {/* Linke Spalte: Patientenakte */}
        <Card className="md:col-span-1">
          <CardHeader>
            <Badge className="w-fit">{currentCase.specialty}</Badge>
            <CardTitle className="text-lg mt-2">{currentCase.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>
              <strong>Patient:</strong> {currentCase.patient.name} ({currentCase.patient.age} J.,{' '}
              {currentCase.patient.occupation})
            </p>
            <p>
              <strong>Leitsymptom:</strong> {currentCase.patient.chiefComplaint}
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

        {/* Rechte Spalte: Simulator oder Geführtes Training */}
        <Card className="md:col-span-2">
          {mode === 'ai' ? (
            <>
              <CardHeader>
                <CardTitle className="text-lg">
                  Gespräch mit {currentCase.patient.name}
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Stellen Sie Ihre Anamnesefragen auf Deutsch (z.B. nach Schmerzcharakter, Begleitsymptomen, Vorerkrankungen, Medikamenten oder Allergien).
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
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
                            msg.role === 'doctor'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border text-slate-800'
                          }`}
                        >
                          <div className="text-[10px] font-semibold opacity-75 mb-1">
                            {msg.role === 'doctor' ? 'Sie (Arzt/Ärztin)' : currentCase.patient.name}
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
                    {isLoading ? 'Sendet...' : 'Frage stellen'}
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
