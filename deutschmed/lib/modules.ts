import { BookOpenText, FileText, MessagesSquare, Radio, type LucideIcon } from "lucide-react";

/** Training modules. Single source for the dashboard and the (upcoming) sidebar. */
export type TrainingModule = {
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
};

export const TRAINING_MODULES: TrainingModule[] = [
  {
    href: "/anamnese",
    title: "Anamnese-Simulator",
    shortTitle: "Anamnese",
    description: "Führen Sie ein Anamnesegespräch mit einem KI-Patienten und erhalten Sie sofort Korrekturen.",
    icon: MessagesSquare,
  },
  {
    href: "/arztbrief",
    title: "Arztbrief-Trainer",
    shortTitle: "Arztbrief",
    description: "Schreiben Sie Arztbriefe und Pflegeberichte mit KI-Feedback zu Struktur und Abkürzungen.",
    icon: FileText,
  },
  {
    href: "/vocabulary",
    title: "Fachwortschatz",
    shortTitle: "Vokabeln",
    description: "Karteikarten mit Wiederholungsplan: Fachbegriff, Gemeinsprache und Patientensprache.",
    icon: BookOpenText,
  },
  {
    href: "/uebergabe",
    title: "Übergabe-Training",
    shortTitle: "Übergabe",
    description: "Hören Sie realistische Schichtübergaben und beantworten Sie Fragen zu Werten und Dosierungen.",
    icon: Radio,
  },
];
