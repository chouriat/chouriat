// deutschmed/lib/modules.ts

export interface TrainingModule {
  id: 'anamnese' | 'arztbrief' | 'uebergabe' | 'vocabulary';
  title: string;
  subtitle: string;
  fspPart: string;
  description: string;
  href: string;
  badgeText: string;
}

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'anamnese',
    title: 'Anamnese-Simulator',
    subtitle: 'Arzt-Patienten-Gespräch (KI & Geführt)',
    fspPart: 'FSP Teil 1 (20 Min.)',
    description:
      'Trainieren Sie die strukturierte Patientenbefragung mit Spracheingabe, empathischer Kommunikation und Echtzeit-C1-Feedback ohne Fachjargon.',
    href: '/anamnese',
    badgeText: 'KI-Sprachsimulator aktiv',
  },
  {
    id: 'arztbrief',
    title: 'Arztbrief & Dokumentation',
    subtitle: 'Schriftliche Fallzusammenfassung',
    fspPart: 'FSP Teil 2 (20 Min.)',
    description:
      'Verfassen Sie präzise Anamnese- und Epikrise-Abschnitte im medizinischen Fachstil (Konjunktiv I) mit automatischer Fachbegriff-Prüfung.',
    href: '/arztbrief',
    badgeText: 'C1-Musterlösungen',
  },
  {
    id: 'uebergabe',
    title: 'Klinische Übergabe (ISBAR)',
    subtitle: 'Arzt-Arzt-Gespräch & Patientenvorstellung',
    fspPart: 'FSP Teil 3 (20 Min.)',
    description:
      'Präsentieren Sie den Patienten strukturiert nach dem ISBAR-Standard gegenüber Oberärzten und Kollegen.',
    href: '/uebergabe',
    badgeText: 'ISBAR-Standard',
  },
  {
    id: 'vocabulary',
    title: 'Medizinische Terminologie',
    subtitle: 'Fachbegriffe ↔ Patientensprache',
    fspPart: 'Grundlagen & Fachwortschatz',
    description:
      'Lernen Sie die wichtigsten lateinisch-griechischen Fachbegriffe und ihre exakten deutschen Übersetzungen im Selbsttest-Modus.',
    href: '/vocabulary',
    badgeText: 'Lernkarten & Quiz',
  },
];
