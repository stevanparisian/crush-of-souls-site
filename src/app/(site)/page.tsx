import Image from 'next/image';
import { Section } from '@/components/Section';

export default function HomePage() {
  return (
    <>
      <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl border border-zinc-800">
        <Image src="/og-image.jpg" alt="Crush of Souls" fill className="object-cover" priority />
      </div>

      <Section title="À propos">
        <p className="leading-relaxed text-zinc-300">
          Crush of Souls — post‑punk / cold‑wave nébuleux. Ce site agrège automatiquement concerts, sorties,
          clips et presse via APIs. Esthétique brute, DIY, noir & blanc.
        </p>
      </Section>
    </>
  );
}

