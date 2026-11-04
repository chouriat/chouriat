"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-full">
        <AlertTriangle className="size-6" />
      </span>
      <h1 className="text-xl font-semibold">Etwas ist schiefgelaufen</h1>
      <p className="text-muted-foreground text-sm">
        Die Seite konnte nicht geladen werden. Bitte versuchen Sie es erneut.
      </p>
      <Button onClick={reset}>Erneut versuchen</Button>
    </main>
  );
}
