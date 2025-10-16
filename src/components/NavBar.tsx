'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/tour', label: 'TOUR' },
  { href: '/music', label: 'MUSIC' },
  { href: '/news', label: 'NEWS' },
  { href: '/media', label: 'VIDEO' },
  { href: '/contact', label: 'CONTACT' },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40"
      style={{ fontFamily: '"VT323", monospace' }}
    >
      <nav className="flex items-center justify-between py-4">
        <div className="flex flex-1 items-center gap-4" style={{ marginLeft: pathname !== '/' ? '10rem' : 0 }}>
          {pathname !== '/' ? (
            <Link href="/" className="flex h-10 w-10 items-center justify-center opacity-80 transition hover:opacity-100">
              <Image
                src="/logo_cos_copie.webp"
                alt="Crush of Souls logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </Link>
          ) : null}
          {pathname !== '/' ? (
            null
          ) : (
            <span className="h-10 w-10" />
          )}
        </div>

        <ul
          className="flex flex-1 list-none justify-center text-[2rem] font-semibold uppercase tracking-[0.4em]"
          style={{ columnGap: '3.25rem', color: '#ffffffff', letterSpacing: '0.4em', textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000', filter: 'blur(1.5px)' }}
        >
          {links.map((link) => (
            <li
              key={link.href}
              className="list-none"
              style={{ color: '#000000', textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000', filter: 'blur(0.4px)' }}
            >
              <Link
                href={link.href}
                className="no-underline transition-opacity duration-200 hover:opacity-100 focus:opacity-100 active:opacity-100 visited:opacity-100"
                style={{ color: 'rgba(255, 255, 255, 1)', textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000', filter: 'blur(0.4px)' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 justify-end" style={{ marginRight: pathname !== '/' ? '6rem' : 0 }} />
      </nav>
    </header>
  );
}
