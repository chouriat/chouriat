// deutschmed/lib/store.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase';

export interface UserProgress {
  completedAnamneseCases: string[];
  completedArztbriefCases: string[];
  completedUebergabeCases: string[];
  masteredVocabularyIds: string[];
  xp: number;
}

const STORAGE_KEY = 'deutschmed_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  completedAnamneseCases: [],
  completedArztbriefCases: [],
  completedUebergabeCases: [],
  masteredVocabularyIds: [],
  xp: 0,
};

export function useProgressStore() {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProgress() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && isMounted) {
          setProgress(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Failed to load progress from localStorage:', e);
      }

      try {
        const configured =
          typeof isSupabaseConfigured === 'function'
            ? isSupabaseConfigured()
            : Boolean(isSupabaseConfigured);
        if (configured && isMounted) {
          setIsCloudSynced(true);
        }
      } catch {
        // Fallback silently to localStorage
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    }

    loadProgress();

    return () => {
      isMounted = false;
    };
  }, []);

  const saveProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save progress:', e);
      }
      return next;
    });
  }, []);

  const markAnamneseCompleted = useCallback(
    (caseId: string) => {
      saveProgress((prev) => {
        if (prev.completedAnamneseCases.includes(caseId)) return prev;
        return {
          ...prev,
          completedAnamneseCases: [...prev.completedAnamneseCases, caseId],
          xp: prev.xp + 50,
        };
      });
    },
    [saveProgress]
  );

  const markArztbriefCompleted = useCallback(
    (caseId: string) => {
      saveProgress((prev) => {
        if (prev.completedArztbriefCases.includes(caseId)) return prev;
        return {
          ...prev,
          completedArztbriefCases: [...prev.completedArztbriefCases, caseId],
          xp: prev.xp + 75,
        };
      });
    },
    [saveProgress]
  );

  const markUebergabeCompleted = useCallback(
    (caseId: string) => {
      saveProgress((prev) => {
        if (prev.completedUebergabeCases.includes(caseId)) return prev;
        return {
          ...prev,
          completedUebergabeCases: [...prev.completedUebergabeCases, caseId],
          xp: prev.xp + 50,
        };
      });
    },
    [saveProgress]
  );

  const toggleVocabularyMastered = useCallback(
    (vocabId: string) => {
      saveProgress((prev) => {
        const exists = prev.masteredVocabularyIds.includes(vocabId);
        const nextIds = exists
          ? prev.masteredVocabularyIds.filter((id) => id !== vocabId)
          : [...prev.masteredVocabularyIds, vocabId];
        return {
          ...prev,
          masteredVocabularyIds: nextIds,
          xp: exists ? Math.max(0, prev.xp - 10) : prev.xp + 10,
        };
      });
    },
    [saveProgress]
  );

  return {
    progress,
    isLoaded,
    isCloudSynced,
    markAnamneseCompleted,
    markArztbriefCompleted,
    markUebergabeCompleted,
    toggleVocabularyMastered,
  };
}
