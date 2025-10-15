import type { ReactNode } from 'react';
import '@/styles/globals.css';
import SiteLayout, { metadata } from './(site)/layout';

export { metadata };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-black text-zinc-100 antialiased">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
