'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MEDICAL_CASES } from '@/lib/medical-cases';
import { useProgressStore } from '@/lib/store';
import { onExerciseCompleted } from '@/lib/ads';
import { CaseSelector } from '@/components/case-selector';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UebergabePage() {
  const [selectedCaseId, setSelectedCaseId] = useState(MEDICAL_CASES[0].id);
  const [revealedSteps, setRevealedSteps] = useState<string[]>([]);
  const { progress, markUebergabeCompleted } = useProgressStore();

  const currentCase =
    MEDICAL_CASES.find((c) => c.id === selectedCaseId) || MEDICAL_CASES[0];
  const isCompleted = progress.completedUebergabeCases.includes(currentCase.id);

  const toggleStep = (step: string) => {
    setRevealedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Zurück zum Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          FSP Teil 3: Klinische Übergabe (ISBAR-Standard)
        </h1>
        <p className="text-sm text-slate-600">
          Strukturierte Patientenvorstellung im Arzt-Arzt-Gespräch
        </p>
      </div>

      <CaseSelector
        selectedCaseId={selectedCaseId}
        onSelectCase={(id) => {
          setSelectedCaseId(id);
          setRevealedSteps([]);
        }}
        completedIds={progress.completedUebergabeCases}
      />

      <div className="space-y-4">
        {currentCase.isbarSteps.map((item) => {
          const isOpen = revealedSteps.includes(item.step);
          return (
            <Card key={item.step}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                      {item.step}
                    </span>
                    <CardTitle className="text-base">{item.label}</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toggleStep(item.step)}>
                    {isOpen ? 'Musterformulierung verbergen' : 'C1-Formulierung zeigen'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-slate-600">{item.guidance}</p>
                {isOpen && (
                  <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-slate-800">
                    <strong>Muster-Übergabe:</strong> „{item.sampleSpeech}“
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => {
          if (!isCompleted) void onExerciseCompleted();
          markUebergabeCompleted(currentCase.id);
        }}>
          {isCompleted ? '✓ Übergabe abgeschlossen (+50 XP)' : 'Übergabe als trainiert markieren (+50 XP)'}
        </Button>
      </div>
    </main>
  );
}
