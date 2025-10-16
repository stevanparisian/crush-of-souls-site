import type { ReactNode } from 'react';
import '@/styles/globals.css';
export { metadata } from './(site)/layout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-black text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
