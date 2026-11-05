'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TRAINING_MODULES } from '@/lib/modules';
import { MEDICAL_CASES, VOCABULARY_LIST } from '@/lib/medical-cases';
import { useProgressStore } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const { progress, isLoaded } = useProgressStore();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Alle');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllCases, setShowAllCases] = useState<boolean>(false);

  const totalCases = MEDICAL_CASES.length;
  const totalVocab = VOCABULARY_LIST?.length || 0;

  const totalTasks = totalCases * 3 + totalVocab;
  const completedTasks =
    progress.completedAnamneseCases.length +
    progress.completedArztbriefCases.length +
    progress.completedUebergabeCases.length +
    progress.masteredVocabularyIds.length;

  const overallPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const specialties = useMemo(() => {
    const set = new Set<string>();
    MEDICAL_CASES.forEach((c) => {
      if (c.specialty) set.add(c.specialty);
    });
    return ['Alle', ...Array.from(set).sort()];
  }, []);

  const filteredCases = useMemo(() => {
    return MEDICAL_CASES.filter((c: any) => {
      const matchesSpec =
        selectedSpecialty === 'Alle' || c.specialty === selectedSpecialty;
      const q = searchQuery.trim().toLowerCase();
      const pName = c.patient?.name || c.patientName || '';
      const complaint = c.patient?.chiefComplaint || c.chiefComplaint || '';
      const matchesSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        pName.toLowerCase().includes(q) ||
        (c.specialty || '').toLowerCase().includes(q) ||
        complaint.toLowerCase().includes(q);
      return matchesSpec && matchesSearch;
    });
  }, [selectedSpecialty, searchQuery]);

  const displayedCases = showAllCases ? filteredCases : filteredCases.slice(0, 8);

  const getModuleProgress = (id: string) => {
    switch (id) {
      case 'anamnese':
        return `${progress.completedAnamneseCases.length} / ${totalCases} Fälle`;
      case 'arztbrief':
        return `${progress.completedArztbriefCases.length} / ${totalCases} Briefe`;
      case 'uebergabe':
        return `${progress.completedUebergabeCases.length} / ${totalCases} Übergaben`;
      case 'vocabulary':
        return `${progress.masteredVocabularyIds.length} / ${totalVocab} Begriffe`;
      default:
        return '';
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Hero & Fortschritts-Banner */}
      <section className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <Badge className="bg-blue-600 text-white">
              DeutschMed • Vorbereitung Fachsprachprüfung (FSP)
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Medizinisches C1-Kommunikations- & Dokumentationstraining
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Trainieren Sie alle drei Teile der ärztlichen Fachsprachprüfung praxisnah an {totalCases} klinischen Fällen und {totalVocab} Fachbegriffen.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 min-w-[240px] space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Gesamtfortschritt</span>
              <span className="font-semibold text-emerald-400">
                {isLoaded ? `${progress.xp} XP` : '...'}
              </span>
            </div>
            <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${isLoaded ? overallPercentage : 0}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
              <span>FSP-Bereitschaft</span>
              <span className="font-bold">{isLoaded ? `${overallPercentage}%` : '0%'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Die 4 Trainingsmodule */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">FSP-Trainingsmodule</h2>
          <span className="text-xs text-slate-500">
            Wählen Sie einen Prüfungsteil zum Trainieren
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TRAINING_MODULES.map((mod) => (
            <Card key={mod.id} className="flex flex-col justify-between hover:border-blue-500/60 transition">
              <CardHeader className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="outline">{mod.fspPart}</Badge>
                  <Badge className="bg-blue-50 text-blue-700 border border-blue-200">
                    {isLoaded ? getModuleProgress(mod.id) : '...'}
                  </Badge>
                </div>
                <CardTitle className="text-xl pt-1">{mod.title}</CardTitle>
                <p className="text-xs font-medium text-blue-600">{mod.subtitle}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">{mod.description}</p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{mod.badgeText}</span>
                  <Link href={mod.href}>
                    <Button>Training starten →</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Klinische Fallübersicht mit Fachgebiets-Filter & Suche */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Verfügbare klinische Prüfungsfälle ({filteredCases.length})
            </h2>
            <p className="text-xs text-slate-500">
              Filtern Sie nach Fachgebiet oder suchen Sie gezielt nach Diagnosen und Symptomen
            </p>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Fall oder Diagnose suchen..."
            className="w-full sm:w-72 rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Specialty Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {specialties.map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedSpecialty === spec
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedCases.map((medCase: any) => {
            const anamneseDone = progress.completedAnamneseCases.includes(medCase.id);
            const arztbriefDone = progress.completedArztbriefCases.includes(medCase.id);
            const uebergabeDone = progress.completedUebergabeCases.includes(medCase.id);

            const patientName = medCase.patient?.name || medCase.patientName || 'Patient/in';
            const patientAge = medCase.patient?.age || medCase.patientAge || '–';
            const complaint =
              medCase.patient?.chiefComplaint ||
              medCase.chiefComplaint ||
              '';

            return (
              <Card key={medCase.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge>{medCase.specialty || 'Klinik'}</Badge>
                    <Badge variant="outline">{medCase.difficulty || 'FSP C1'}</Badge>
                  </div>
                  <CardTitle className="text-base mt-2">{medCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <p className="line-clamp-2">
                    <strong>Patient:</strong> {patientName} ({patientAge} J.)
                    {complaint ? ` – „${complaint}“` : ''}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Badge
                      variant="outline"
                      className={anamneseDone ? 'border-emerald-600 text-emerald-700 bg-emerald-50' : ''}
                    >
                      {anamneseDone ? '✓ Anamnese' : '○ Anamnese'}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={arztbriefDone ? 'border-emerald-600 text-emerald-700 bg-emerald-50' : ''}
                    >
                      {arztbriefDone ? '✓ Arztbrief' : '○ Arztbrief'}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={uebergabeDone ? 'border-emerald-600 text-emerald-700 bg-emerald-50' : ''}
                    >
                      {uebergabeDone ? '✓ Übergabe' : '○ Übergabe'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCases.length > 8 && (
          <div className="flex justify-center pt-2">
            <Button variant="outline" onClick={() => setShowAllCases(!showAllCases)}>
              {showAllCases
                ? 'Weniger Fälle anzeigen'
                : `Alle ${filteredCases.length} Fälle anzeigen`}
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
