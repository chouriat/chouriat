'use client';

// "Bring your own key": each user stores their OWN AI provider key on their own
// device (localStorage). The app owner never needs to put an AI key on the server.
// The key is only sent along with the user's own chat requests and is never
// stored or logged by the server.

import { useCallback, useEffect, useState } from 'react';

export type AiProvider = 'gemini' | 'openai' | 'anthropic';

export interface UserAiKey {
  provider: AiProvider;
  apiKey: string;
}

export const AI_PROVIDERS: Record<
  AiProvider,
  { label: string; keyUrl: string; hint: string; placeholder: string }
> = {
  gemini: {
    label: 'Google Gemini (kostenloser Schlüssel)',
    keyUrl: 'https://aistudio.google.com/app/apikey',
    hint: 'Kostenlos in ca. 1 Minute bei Google AI Studio erstellen.',
    placeholder: 'AIza...',
  },
  openai: {
    label: 'OpenAI',
    keyUrl: 'https://platform.openai.com/api-keys',
    hint: 'Kostenpflichtig, wird über Ihr OpenAI-Konto abgerechnet.',
    placeholder: 'sk-...',
  },
  anthropic: {
    label: 'Anthropic Claude',
    keyUrl: 'https://console.anthropic.com/settings/keys',
    hint: 'Kostenpflichtig, wird über Ihr Anthropic-Konto abgerechnet.',
    placeholder: 'sk-ant-...',
  },
};

const STORAGE_KEY = 'deutschmed_user_ai_key_v1';

function readStoredKey(): UserAiKey | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<UserAiKey>;
    if (
      parsed &&
      typeof parsed.apiKey === 'string' &&
      parsed.apiKey.trim() &&
      (parsed.provider === 'gemini' ||
        parsed.provider === 'openai' ||
        parsed.provider === 'anthropic')
    ) {
      return { provider: parsed.provider, apiKey: parsed.apiKey.trim() };
    }
  } catch {
    // Storage blocked or corrupt: behave as if no key is set.
  }
  return null;
}

export function useUserAiKey() {
  const [aiKey, setAiKey] = useState<UserAiKey | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setAiKey(readStoredKey());
    setIsLoaded(true);
  }, []);

  const saveKey = useCallback((key: UserAiKey) => {
    const clean = { provider: key.provider, apiKey: key.apiKey.trim() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    } catch {
      // Still keep it for this session if storage is unavailable.
    }
    setAiKey(clean);
  }, []);

  const clearKey = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setAiKey(null);
  }, []);

  return { aiKey, isLoaded, saveKey, clearKey };
}

/** Headers that carry the user's own key with a single request. */
export function aiKeyHeaders(key: UserAiKey | null): Record<string, string> {
  if (!key) return {};
  return { 'x-ai-provider': key.provider, 'x-ai-key': key.apiKey };
}
