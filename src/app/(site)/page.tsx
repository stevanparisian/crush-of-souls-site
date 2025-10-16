import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="page-wrapper flex min-h-[90vh] flex-col items-center justify-center">
      <Image
        src="/logo_cos_copie.webp"
        alt="Crush of Souls logo"
        width={420}
        height={420}
        className="h-auto w-auto object-contain opacity-60 blur-[2px] drop-shadow-[0_0_30px_rgba(0,0,0,0.55)]"
        priority
      />
    </main>
  );
}
