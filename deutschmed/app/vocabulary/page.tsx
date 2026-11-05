'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { VOCABULARY_LIST } from '@/lib/medical-cases';
import { useProgressStore } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function VocabularyPage() {
  const { progress, toggleVocabularyMastered } = useProgressStore();

  // View Mode: 'flashcards' | 'list'
  const [viewMode, setViewMode] = useState<'flashcards' | 'list'>('flashcards');
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlearned' | 'learned'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Flashcard state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [direction, setDirection] = useState<'fach-to-pat' | 'pat-to-fach'>('fach-to-pat');

  // List pagination state
  const [visibleCount, setVisibleCount] = useState<number>(30);

  const categories = useMemo(() => {
    return ['Alle', ...Array.from(new Set(VOCABULARY_LIST.map((v) => v.category)))];
  }, []);

  const filteredList = useMemo(() => {
    return VOCABULARY_LIST.filter((item) => {
      const matchesCat =
        selectedCategory === 'Alle' || item.category === selectedCategory;

      const isMastered = progress.masteredVocabularyIds.includes(item.id);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'learned' && isMastered) ||
        (statusFilter === 'unlearned' && !isMastered);

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.fachbegriff.toLowerCase().includes(q) ||
        item.patientensprache.toLowerCase().includes(q) ||
        (item.example || '').toLowerCase().includes(q);

      return matchesCat && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, statusFilter, searchQuery, progress.masteredVocabularyIds]);

  const safeIndex =
    filteredList.length > 0 ? Math.min(currentIndex, filteredList.length - 1) : 0;
  const currentCard = filteredList[safeIndex];

  const handleFilterReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setVisibleCount(30);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    if (filteredList.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % filteredList.length);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (filteredList.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
    }
  };

  const handleRandomCard = () => {
    setIsFlipped(false);
    if (filteredList.length > 1) {
      const rand = Math.floor(Math.random() * filteredList.length);
      setCurrentIndex(rand);
    }
  };

  const masteredPercentage =
    VOCABULARY_LIST.length > 0
      ? Math.round((progress.masteredVocabularyIds.length / VOCABULARY_LIST.length) * 100)
      : 0;

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Zurück zum Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Medizinische Terminologie (Fachbegriffe ↔ Patientensprache)
          </h1>
          <p className="text-sm text-slate-600">
            Gelernt: <strong>{progress.masteredVocabularyIds.length}</strong> /{' '}
            {VOCABULARY_LIST.length} Begriffe ({masteredPercentage}%)
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl">
          <Button
            size="sm"
            variant={viewMode === 'flashcards' ? 'default' : 'outline'}
            onClick={() => setViewMode('flashcards')}
          >
            🎴 Karteikarten-Trainer (Quiz)
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            📖 Wörterbuch-Liste ({filteredList.length})
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleFilterReset();
              }}
              placeholder="🔍 Fachbegriff, Übersetzung oder Beispielsatz suchen..."
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="md:col-span-6 flex flex-wrap items-center justify-end gap-1.5">
            <Button
              size="sm"
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => {
                setStatusFilter('all');
                handleFilterReset();
              }}
            >
              Alle ({VOCABULARY_LIST.length})
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'unlearned' ? 'default' : 'outline'}
              onClick={() => {
                setStatusFilter('unlearned');
                handleFilterReset();
              }}
            >
              Noch offen ({VOCABULARY_LIST.length - progress.masteredVocabularyIds.length})
            </Button>
            <Button
              size="sm"
              variant={statusFilter === 'learned' ? 'default' : 'outline'}
              onClick={() => {
                setStatusFilter('learned');
                handleFilterReset();
              }}
            >
              ✓ Gelernt ({progress.masteredVocabularyIds.length})
            </Button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                handleFilterReset();
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Flashcard Trainer OR Dictionary List */}
      {filteredList.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center space-y-3">
            <p className="text-slate-600">
              Keine Begriffe für den aktuellen Filter gefunden.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('Alle');
                setStatusFilter('all');
                setSearchQuery('');
                handleFilterReset();
              }}
            >
              Filter zurücksetzen
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === 'flashcards' && currentCard ? (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Karte <strong>{safeIndex + 1}</strong> von <strong>{filteredList.length}</strong>
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setDirection((d) =>
                    d === 'fach-to-pat' ? 'pat-to-fach' : 'fach-to-pat'
                  );
                  setIsFlipped(false);
                }}
              >
                ⇄ Richtung:{' '}
                {direction === 'fach-to-pat'
                  ? 'Fachbegriff → Patientensprache'
                  : 'Patientensprache → Fachbegriff'}
              </Button>
              <Button size="sm" variant="outline" onClick={handleRandomCard}>
                🎲 Zufallskarte
              </Button>
            </div>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`cursor-pointer rounded-2xl border-2 p-8 sm:p-10 transition-all shadow-sm min-h-[260px] flex flex-col justify-between ${
              isFlipped
                ? 'border-blue-500 bg-blue-50/40'
                : 'border-slate-200 bg-white hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <Badge variant="outline">{currentCard.category}</Badge>
              <Badge
                className={
                  progress.masteredVocabularyIds.includes(currentCard.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }
              >
                {progress.masteredVocabularyIds.includes(currentCard.id)
                  ? '✓ Gelernt'
                  : 'Zum Umdrehen klicken'}
              </Badge>
            </div>

            <div className="my-6 text-center space-y-4">
              {!isFlipped ? (
                <>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    {direction === 'fach-to-pat'
                      ? 'Medizinischer Fachbegriff'
                      : 'Patientensprache / Alltagssprache'}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {direction === 'fach-to-pat'
                      ? currentCard.fachbegriff
                      : currentCard.patientensprache}
                  </h2>
                  <p className="text-xs text-blue-600 pt-2">
                    👆 Klicken, um die Lösung aufzudecken
                  </p>
                </>
              ) : (
                <>
                  <div className="text-xs uppercase tracking-wider text-blue-600 font-semibold">
                    {direction === 'fach-to-pat'
                      ? 'Übersetzung in Patientensprache'
                      : 'Gesuchter Fachbegriff'}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">
                    {direction === 'fach-to-pat'
                      ? currentCard.patientensprache
                      : currentCard.fachbegriff}
                  </h2>
                  <div className="text-sm text-slate-600 pt-1">
                    ({direction === 'fach-to-pat' ? currentCard.fachbegriff : currentCard.patientensprache})
                  </div>
                  {currentCard.example && (
                    <div className="mt-4 rounded-xl bg-white/90 border border-blue-200 p-3 text-xs sm:text-sm text-slate-700 italic">
                      <strong>Klinisches Beispiel:</strong> „{currentCard.example}“
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="text-center text-[11px] text-slate-400">
              Tipp: Klicken Sie auf die Karte, um zwischen Vorder- und Rückseite zu wechseln
            </div>
          </div>

          {/* Card Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Button variant="outline" onClick={handlePrevCard}>
              ← Vorherige Karte
            </Button>

            <div className="flex gap-2">
              <Button
                variant={
                  progress.masteredVocabularyIds.includes(currentCard.id)
                    ? 'outline'
                    : 'default'
                }
                onClick={() => {
                  toggleVocabularyMastered(currentCard.id);
                  if (!progress.masteredVocabularyIds.includes(currentCard.id)) {
                    handleNextCard();
                  }
                }}
              >
                {progress.masteredVocabularyIds.includes(currentCard.id)
                  ? '✓ Als gelernt markiert (Status aufheben)'
                  : '✓ Gewusst & Nächste Karte (+10 XP)'}
              </Button>
            </div>

            <Button variant="outline" onClick={handleNextCard}>
              Nächste Karte →
            </Button>
          </div>
        </div>
      ) : (
        /* Dictionary List Mode */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredList.slice(0, visibleCount).map((item) => {
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

          {visibleCount < filteredList.length && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => setVisibleCount((prev) => prev + 30)}
              >
                Weitere Begriffe laden ({filteredList.length - visibleCount} verbleibend)
              </Button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
