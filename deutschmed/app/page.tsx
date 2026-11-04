import Link from "next/link";
import { Stethoscope } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MEDICAL_CASES } from "@/lib/medical-cases";
import { TRAINING_MODULES } from "@/lib/modules";

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8 flex items-center gap-3">
        <span className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg">
          <Stethoscope className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">DeutschMed</h1>
          <p className="text-muted-foreground text-sm">
            Medizinisches Deutsch für FSP und Kenntnisprüfung
          </p>
        </div>
      </header>

      <section aria-labelledby="modules-heading">
        <h2 id="modules-heading" className="mb-4 text-lg font-medium">
          Trainingsmodule
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {TRAINING_MODULES.map(({ href, title, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="focus-visible:ring-ring/50 rounded-xl outline-none focus-visible:ring-[3px]"
            >
              <Card className="hover:border-primary/40 h-full transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="bg-accent text-accent-foreground flex size-9 items-center justify-center rounded-md">
                      <Icon className="size-4" />
                    </span>
                    <CardTitle>{title}</CardTitle>
                  </div>
                  <CardDescription className="pt-1">{description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="cases-heading" className="mt-10">
        <h2 id="cases-heading" className="mb-4 text-lg font-medium">
          Verfügbare Fälle
        </h2>
        <ul className="bg-card divide-y rounded-xl border">
          {MEDICAL_CASES.map((c) => (
            <li key={c.slug} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <div>
                <p className="font-medium">{c.title}</p>
                <p className="text-muted-foreground text-sm">{c.specialty}</p>
              </div>
              <Badge variant="outline">{c.difficulty}</Badge>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
