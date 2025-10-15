import type { ReactNode } from 'react';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold uppercase tracking-wide">{title}</h2>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}

