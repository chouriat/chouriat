'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MEDICAL_CASES } from '@/lib/medical-cases';
import { useProgressStore } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ArztbriefPage() {
  const [selectedCaseId, setSelectedCaseId] = useState(MEDICAL_CASES[0].id);
  const [draft, setDraft] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const { progress, markArztbriefCompleted } = useProgressStore();

  const currentCase =
    MEDICAL_CASES.find((c) => c.id === selectedCaseId) || MEDICAL_CASES[0];
  const requiredTerms = currentCase.arztbriefTemplate?.requiredTerms || [];
  const isCompleted = progress.completedArztbriefCases.includes(currentCase.id);

  const matchedTerms = requiredTerms.filter((term) =>
    draft.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Zurück zum Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            FSP Teil 2: Arztbrief & Dokumentation
          </h1>
          <p className="text-sm text-slate-600">
            Schriftliche Fallzusammenfassung im medizinischen Fachstil (Konjunktiv I)
          </p>
        </div>

        <div className="flex gap-2">
          {MEDICAL_CASES.map((c) => (
            <Button
              key={c.id}
              variant={c.id === selectedCaseId ? 'default' : 'outline'}
              onClick={() => {
                setSelectedCaseId(c.id);
                setDraft('');
                setShowSolution(false);
              }}
            >
              {c.patient.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <strong>Vorstellungsgrund:</strong> {currentCase.patient.chiefComplaint}
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border text-xs space-y-1">
              <div className="font-semibold text-slate-900">Vitalparameter:</div>
              <div>RR: {currentCase.patient.vitalSigns.bp}</div>
              <div>HF: {currentCase.patient.vitalSigns.hr}</div>
              <div>Temp: {currentCase.patient.vitalSigns.temp}</div>
              <div>SpO₂: {currentCase.patient.vitalSigns.spo2}</div>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              <strong>Anamnese-Notizen:</strong> {currentCase.patient.historyDetails}
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Anamnese & Epikrise verfassen</CardTitle>
              {isCompleted && (
                <Badge className="bg-emerald-600 text-white">✓ Abgeschlossen (+75 XP)</Badge>
              )}
            </div>
            <p className="text-xs text-slate-500">{currentCase.arztbriefTemplate.prompt}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-700">
                Empfohlene C1-Fachbegriffe ({matchedTerms.length}/{requiredTerms.length} verwendet):
              </div>
              <div className="flex flex-wrap gap-2">
                {requiredTerms.map((term) => {
                  const used = draft.toLowerCase().includes(term.toLowerCase());
                  return (
                    <Badge
                      key={term}
                      variant="outline"
                      className={
                        used
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-600'
                          : 'text-slate-600'
                      }
                    >
                      {used ? `✓ ${term}` : term}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={8}
              placeholder="Schreiben Sie hier Ihren Arztbrief-Abschnitt (z.B. Herr Müller stellte sich mit seit zwei Stunden bestehenden retrosternalen Thoraxschmerzen vor...)"
              className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button variant="outline" onClick={() => setShowSolution(!showSolution)}>
                {showSolution ? 'Musterlösung ausblenden' : 'C1-Musterlösung anzeigen'}
              </Button>
              <Button onClick={() => markArztbriefCompleted(currentCase.id)}>
                {isCompleted ? 'Erneut speichern' : 'Arztbrief abschließen (+75 XP)'}
              </Button>
            </div>

            {showSolution && (
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 text-sm text-slate-800 space-y-2">
                <div className="font-semibold text-blue-900">
                  Musterlösung (FSP C1-Standard):
                </div>
                <p className="leading-relaxed">{currentCase.arztbriefTemplate.sampleSolution}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
