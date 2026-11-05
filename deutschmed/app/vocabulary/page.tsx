'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { VOCABULARY_LIST } from '@/lib/medical-cases';
import { useProgressStore } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function VocabularyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const { progress, toggleVocabularyMastered } = useProgressStore();

  const categories = [
    'Alle',
    ...Array.from(new Set(VOCABULARY_LIST.map((v) => v.category))),
  ];

  const filtered =
    selectedCategory === 'Alle'
      ? VOCABULARY_LIST
      : VOCABULARY_LIST.filter((v) => v.category === selectedCategory);

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Zurück zum Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Medizinische Terminologie (Fachbegriffe ↔ Patientensprache)
          </h1>
          <p className="text-sm text-slate-600">
            Gelernt: {progress.masteredVocabularyIds.length} / {VOCABULARY_LIST.length} Begriffe
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const mastered = progress.masteredVocabularyIds.includes(item.id);
          return (
            <Card
              key={item.id}
              className={mastered ? 'border-emerald-500 bg-emerald-50/30' : ''}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{item.category}</Badge>
                  <Button
                    size="sm"
                    variant={mastered ? 'default' : 'outline'}
                    onClick={() => toggleVocabularyMastered(item.id)}
                  >
                    {mastered ? '✓ Gelernt (+10 XP)' : 'Als gelernt markieren'}
                  </Button>
                </div>
                <CardTitle className="text-lg mt-2">{item.fachbegriff}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-blue-700 font-medium">
                  Patientensprache: {item.patientensprache}
                </p>
                {item.example && (
                  <p className="text-xs text-slate-600 italic">„{item.example}“</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
