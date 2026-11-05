import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ModulePlaceholderProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  plannedFeatures: string[];
};

/** Temporary page body for modules that are scheduled for a later PR. */
export function ModulePlaceholder({ icon: Icon, title, description, plannedFeatures }: ModulePlaceholderProps) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
        <Link href="/">
          <ArrowLeft />
          Übersicht
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-lg">
              <Icon className="size-5" />
            </span>
            <div className="grid gap-1">
              <CardTitle className="text-xl">{title}</CardTitle>
              <Badge variant="secondary">In Entwicklung</Badge>
            </div>
          </div>
          <CardDescription className="pt-2 text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2 text-sm font-medium">Geplant:</p>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {plannedFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
