import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { BackgroundVideo } from '@/components/BackgroundVideo';

export const metadata: Metadata = {
  title: 'Crush of Souls',
  description: 'Site officiel — concerts, musique, news, media',
  openGraph: {
    title: 'Crush of Souls',
    description: 'Post‑punk noir & brut.',
  },
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BackgroundVideo />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4">
        <NavBar />
        <main className="flex-1 py-10">{children}</main>
        <Footer />
      </div>
    </>
  );
}
