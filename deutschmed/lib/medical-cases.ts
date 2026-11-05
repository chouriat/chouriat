import type { LanguageLevel, MedicalRole } from "@/lib/database.types";

/**
 * Static fallback cases, shaped like rows in public.medical_scenarios.
 * Used when Supabase is not configured (local dev, offline) and as a
 * reference shape for the AI patient. Database content lives in supabase/seed.sql.
 */

export type PatientDemographics = {
  name: string;
  age: number;
  gender: "M" | "W" | "D";
  occupation?: string;
};

export type ClinicalFacts = {
  diagnosis: string;
  differentials: string[];
  vitals: {
    rr: string; // Blutdruck, mmHg
    hf: number; // Herzfrequenz, /min
    af?: number; // Atemfrequenz, /min
    temp: number; // °C
    spo2?: number; // %
  };
  history: {
    current: string; // Aktuelle Anamnese
    previous: string[]; // Vorerkrankungen
    medication: string[];
    allergies: string[];
    social: string;
    family: string;
  };
  labs?: Record<string, string>;
};

export type MedicalCase = {
  slug: string;
  title: string;
  difficulty: LanguageLevel;
  target_role: MedicalRole;
  specialty: string;
  patient_demographics: PatientDemographics;
  chief_complaint: string;
  clinical_facts: ClinicalFacts;
};

export const MEDICAL_CASES: MedicalCase[] = [
  {
    slug: "akutes-koronarsyndrom",
    title: "Akutes Koronarsyndrom (ACS)",
    difficulty: "B2",
    target_role: "doctor",
    specialty: "Kardiologie",
    patient_demographics: { name: "Herr Klaus Schmidt", age: 62, gender: "M", occupation: "Busfahrer" },
    chief_complaint:
      "Herr Doktor, mir drückt's seit heute Morgen so auf der Brust, als ob ein Elefant drauf sitzt. Und es zieht bis in den linken Arm.",
    clinical_facts: {
      diagnosis: "NSTEMI",
      differentials: ["Lungenarterienembolie", "Aortendissektion", "Perikarditis", "Refluxösophagitis"],
      vitals: { rr: "160/95", hf: 98, af: 20, temp: 36.8, spo2: 95 },
      history: {
        current:
          "Seit ca. 3 Stunden retrosternaler Druckschmerz mit Ausstrahlung in den linken Arm, Kaltschweißigkeit und Übelkeit. Schmerz in Ruhe aufgetreten.",
        previous: ["Arterielle Hypertonie", "Diabetes mellitus Typ 2", "Hypercholesterinämie"],
        medication: ["Ramipril 5 mg 1-0-0", "Metformin 1000 mg 1-0-1", "Simvastatin 20 mg 0-0-1"],
        allergies: ["Penicillin (Exanthem)"],
        social: "Raucher, 30 pack years. Alkohol gelegentlich. Verheiratet, zwei Kinder.",
        family: "Vater mit 58 Jahren an Herzinfarkt verstorben.",
      },
      labs: { "hs-Troponin T": "84 ng/l (erhöht)", "CK-MB": "leicht erhöht", Kalium: "4,1 mmol/l" },
    },
  },
  {
    slug: "appendizitis",
    title: "Akute Appendizitis",
    difficulty: "B2",
    target_role: "doctor",
    specialty: "Chirurgie",
    patient_demographics: { name: "Frau Lena Weber", age: 24, gender: "W", occupation: "Studentin" },
    chief_complaint:
      "Gestern Abend hat's erst so um den Bauchnabel rum wehgetan, und jetzt sticht es richtig doll unten rechts. Mir ist auch total übel.",
    clinical_facts: {
      diagnosis: "Akute Appendizitis",
      differentials: ["Extrauteringravidität", "Ovarialtorsion", "Adnexitis", "Gastroenteritis", "Harnwegsinfekt"],
      vitals: { rr: "120/75", hf: 104, af: 18, temp: 38.4, spo2: 98 },
      history: {
        current:
          "Seit ca. 18 Stunden Bauchschmerzen, initial periumbilikal, jetzt im rechten Unterbauch lokalisiert. Übelkeit, einmaliges Erbrechen, Appetitlosigkeit.",
        previous: ["Keine"],
        medication: ["Orale Kontrazeption"],
        allergies: ["Keine bekannt"],
        social: "Nichtraucherin, Alkohol am Wochenende. Letzte Regelblutung vor 2 Wochen.",
        family: "Unauffällig.",
      },
      labs: { Leukozyten: "14,2 /nl (erhöht)", CRP: "48 mg/l (erhöht)", "β-HCG": "negativ" },
    },
  },
  {
    slug: "apoplex",
    title: "Apoplex (ischämischer Schlaganfall)",
    difficulty: "C1",
    target_role: "doctor",
    specialty: "Neurologie",
    patient_demographics: { name: "Frau Ingrid Becker", age: 74, gender: "W", occupation: "Rentnerin" },
    chief_complaint:
      "Meine Tochter sagt, ich red so komisch. Und mein rechter Arm, der will einfach nicht mehr so wie ich.",
    clinical_facts: {
      diagnosis: "Ischämischer Schlaganfall im Stromgebiet der A. cerebri media links",
      differentials: ["Intrazerebrale Blutung", "Hypoglykämie", "Todd-Parese nach Krampfanfall", "Migräne mit Aura"],
      vitals: { rr: "185/100", hf: 88, af: 16, temp: 36.6, spo2: 96 },
      history: {
        current:
          "Seit ca. 90 Minuten (Symptombeginn beobachtet durch Tochter) Armparese rechts und Wortfindungsstörungen. Keine Kopfschmerzen, kein Trauma.",
        previous: ["Vorhofflimmern", "Arterielle Hypertonie"],
        medication: ["Bisoprolol 5 mg 1-0-0", "Amlodipin 5 mg 1-0-0", "Apixaban vor 1 Woche eigenständig abgesetzt"],
        allergies: ["Keine bekannt"],
        social: "Verwitwet, lebt allein, selbstständig. Nichtraucherin.",
        family: "Mutter hatte einen Schlaganfall.",
      },
      labs: { Blutzucker: "128 mg/dl", INR: "1,0", Thrombozyten: "245 /nl" },
    },
  },
];

export function getCaseBySlug(slug: string): MedicalCase | undefined {
  return MEDICAL_CASES.find((c) => c.slug === slug);
}
