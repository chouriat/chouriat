import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { LanguageLevel, MedicalRole } from "@/lib/database.types";

/**
 * Lightweight client-side preferences. Mirrors the editable fields of
 * public.profiles so the UI can adapt before (or without) a signed-in user.
 */
type PreferencesState = {
  role: MedicalRole;
  targetLevel: LanguageLevel;
  setRole: (role: MedicalRole) => void;
  setTargetLevel: (level: LanguageLevel) => void;
};

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      role: "doctor",
      targetLevel: "B2",
      setRole: (role) => set({ role }),
      setTargetLevel: (targetLevel) => set({ targetLevel }),
    }),
    { name: "deutschmed-preferences" }
  )
);
