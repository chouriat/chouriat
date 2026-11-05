'use client';

import React, { useState, useMemo } from 'react';
import { MEDICAL_CASES, MedicalCase } from '@/lib/medical-cases';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CaseSelectorProps {
  selectedCaseId: string;
  onSelectCase: (id: string) => void;
  completedIds?: string[];
}

export function CaseSelector({
  selectedCaseId,
  onSelectCase,
  completedIds = [],
}: CaseSelectorProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Alle');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const specialties = useMemo(() => {
    const set = new Set<string>();
    MEDICAL_CASES.forEach((c) => {
      if (c.specialty) set.add(c.specialty);
    });
    return ['Alle', ...Array.from(set).sort()];
  }, []);

  const filteredCases = useMemo(() => {
    return MEDICAL_CASES.filter((c) => {
      const matchesSpecialty =
        selectedSpecialty === 'Alle' || c.specialty === selectedSpecialty;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        c.title.toLowerCase().includes(query) ||
        c.patient.name.toLowerCase().includes(query) ||
        c.specialty.toLowerCase().includes(query) ||
        c.patient.chiefComplaint.toLowerCase().includes(query);
      return matchesSpecialty && matchesSearch;
    });
  }, [selectedSpecialty, searchQuery]);

  const currentIndex = filteredCases.findIndex((c) => c.id === selectedCaseId);

  const handleSpecialtyChange = (spec: string) => {
    setSelectedSpecialty(spec);
    const nextList = MEDICAL_CASES.filter((c) =>
      spec === 'Alle' ? true : c.specialty === spec
    );
    if (nextList.length > 0 && !nextList.some((c) => c.id === selectedCaseId)) {
      onSelectCase(nextList[0].id);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Klinischen Prüfungsfall auswählen ({filteredCases.length} von {MEDICAL_CASES.length} Fällen)
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Abgeschlossen in diesem Modul:</span>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300">
            {completedIds.length} / {MEDICAL_CASES.length}
          </Badge>
        </div>
      </div>

      {/* Specialty Pills */}
      <div className="flex flex-wrap gap-1.5">
        {specialties.map((spec) => (
          <button
            key={spec}
            type="button"
            onClick={() => handleSpecialtyChange(spec)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
              selectedSpecialty === spec
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Search + Case Dropdown + Prev/Next */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 pt-1">
        <div className="md:col-span-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Fall, Diagnose oder Patient suchen..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="md:col-span-6">
          <select
            value={selectedCaseId}
            onChange={(e) => onSelectCase(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {filteredCases.length === 0 ? (
              <option disabled value="">
                Keine passenden Fälle gefunden
              </option>
            ) : (
              filteredCases.map((c: MedicalCase, idx: number) => {
                const done = completedIds.includes(c.id);
                return (
                  <option key={c.id} value={c.id}>
                    {done ? '✓ ' : '○ '}
                    {idx + 1}. {c.title} — {c.patient.name} ({c.specialty})
                  </option>
                );
              })
            )}
          </select>
        </div>

        <div className="md:col-span-2 flex gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 h-9"
            disabled={currentIndex <= 0}
            onClick={() => {
              if (currentIndex > 0) {
                onSelectCase(filteredCases[currentIndex - 1].id);
              }
            }}
          >
            ← Vorheriger
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 h-9"
            disabled={currentIndex < 0 || currentIndex >= filteredCases.length - 1}
            onClick={() => {
              if (currentIndex >= 0 && currentIndex < filteredCases.length - 1) {
                onSelectCase(filteredCases[currentIndex + 1].id);
              }
            }}
          >
            Nächster →
          </Button>
        </div>
      </div>
    </div>
  );
}
