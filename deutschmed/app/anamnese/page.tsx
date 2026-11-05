import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/module-placeholder";
import { TRAINING_MODULES } from "@/lib/modules";

const trainingModule = TRAINING_MODULES.find((m) => m.href === "/anamnese")!;

export const metadata: Metadata = { title: trainingModule.shortTitle };

export default function Page() {
  return (
    <ModulePlaceholder
      icon={trainingModule.icon}
      title={trainingModule.title}
      description={trainingModule.description}
      plannedFeatures={[
        "Verzweigter Chat mit KI-Patient (ACS, Appendizitis, Apoplex …)",
        "Echtzeit-Korrektur von Grammatik und Arzt-Patient-Kommunikation",
        "Später: Spracheingabe"
      ]}
    />
  );
}
