import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/module-placeholder";
import { TRAINING_MODULES } from "@/lib/modules";

const trainingModule = TRAINING_MODULES.find((m) => m.href === "/vocabulary")!;

export const metadata: Metadata = { title: trainingModule.shortTitle };

export default function Page() {
  return (
    <ModulePlaceholder
      icon={trainingModule.icon}
      title={trainingModule.title}
      description={trainingModule.description}
      plannedFeatures={[
        "Karteikarten: Fachbegriff → Gemeinsprache → Umgangssprache",
        "Wiederholungsplan nach SM-2 / Leitner"
      ]}
    />
  );
}
