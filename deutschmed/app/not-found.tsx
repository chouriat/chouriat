import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-xl font-semibold">Seite nicht gefunden</h1>
      <p className="text-muted-foreground text-sm">Diese Seite existiert (noch) nicht.</p>
      <Button asChild>
        <Link href="/">Zur Übersicht</Link>
      </Button>
    </main>
  );
}
