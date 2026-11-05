import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ModulePlaceholder({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            {Icon && (
              <span className="bg-blue-50 text-blue-600 flex size-10 items-center justify-center rounded-lg">
                <Icon className="size-5" />
              </span>
            )}
            <div className="grid gap-1">
              <CardTitle className="text-xl">{title}</CardTitle>
              {description && <p className="text-sm text-slate-600">{description}</p>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Link href="/">
            <Button variant="outline">← Zurück zum Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
export default ModulePlaceholder;
