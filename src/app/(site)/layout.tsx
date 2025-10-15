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
      <div className="relative mx-auto max-w-6xl px-4">
        <NavBar />
        <main className="py-10">{children}</main>
        <Footer />
      </div>
    </>
  );
}
