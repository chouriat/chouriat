'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AI_PROVIDERS, type AiProvider, type UserAiKey } from '@/lib/ai-key';

interface AiKeySettingsProps {
  aiKey: UserAiKey | null;
  onSave: (key: UserAiKey) => void;
  onClear: () => void;
}

function maskKey(key: string) {
  if (key.length <= 8) return '••••';
  return `${key.slice(0, 4)}••••${key.slice(-4)}`;
}

export function AiKeySettings({ aiKey, onSave, onClear }: AiKeySettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [provider, setProvider] = useState<AiProvider>(aiKey?.provider ?? 'gemini');
  const [apiKey, setApiKey] = useState('');

  const info = AI_PROVIDERS[provider];

  if (aiKey && !isEditing) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
        <span>
          🔑 Eigener KI-Schlüssel aktiv: <strong>{AI_PROVIDERS[aiKey.provider].label}</strong>{' '}
          ({maskKey(aiKey.apiKey)}). Nur auf diesem Gerät gespeichert.
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            Ändern
          </Button>
          <Button size="sm" variant="outline" onClick={onClear}>
            Entfernen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="space-y-2 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-slate-800"
      onSubmit={(e) => {
        e.preventDefault();
        if (!apiKey.trim()) return;
        onSave({ provider, apiKey });
        setApiKey('');
        setIsEditing(false);
      }}
    >
      <p className="font-semibold text-slate-900">
        Echte KI-Patienten mit Ihrem eigenen KI-Schlüssel
      </p>
      <p>
        Ohne Schlüssel üben Sie mit dem lokalen Simulator (einfache Antworten). Für freie
        KI-Gespräche hinterlegen Sie Ihren eigenen API-Schlüssel. Er wird nur auf diesem Gerät
        gespeichert und nur mit Ihren eigenen Anfragen gesendet, nie auf unserem Server
        gespeichert.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value as AiProvider)}
          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5"
          aria-label="KI-Anbieter"
        >
          {(Object.keys(AI_PROVIDERS) as AiProvider[]).map((p) => (
            <option key={p} value={p}>
              {AI_PROVIDERS[p].label}
            </option>
          ))}
        </select>
        <input
          type="password"
          autoComplete="off"
          spellCheck={false}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={info.placeholder}
          aria-label="API-Schlüssel"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1.5 font-mono"
        />
        <Button size="sm" type="submit" disabled={!apiKey.trim()}>
          Speichern
        </Button>
        {isEditing && (
          <Button size="sm" type="button" variant="outline" onClick={() => setIsEditing(false)}>
            Abbrechen
          </Button>
        )}
      </div>
      <p className="text-slate-600">
        {info.hint}{' '}
        <a href={info.keyUrl} target="_blank" rel="noreferrer" className="text-blue-700 underline">
          Schlüssel erstellen →
        </a>
      </p>
    </form>
  );
}
