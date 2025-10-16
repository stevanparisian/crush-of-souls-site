'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/tour', label: 'DATES' },
  { href: '/music', label: 'MUSIC' },
  { href: '/news', label: 'NEWS' },
  { href: '/media', label: 'VIDEO' },
  { href: '/contact', label: 'CONTACTS' },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-black/70 font-['Gothic_A1'] backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <nav className="flex items-center justify-between py-4">
        {pathname !== '/' ? (
          <Link href="/" className="font-black tracking-wide text-xl">
            Crush of Souls
          </Link>
        ) : (
          <span />
        )}
        <ul
          className="flex flex-1 list-none justify-center text-[1.5rem] font-semibold uppercase tracking-[0.4em]"
          style={{ columnGap: '4rem', color: '#000000', letterSpacing: '0.45em' }}
        >
          {links.map((link) => (
            <li key={link.href} className="list-none" style={{ color: '#000000' }}>
              <Link
                href={link.href}
                className={`no-underline hover:no-underline focus:no-underline active:no-underline visited:no-underline hover:text-black focus:text-black active:text-black visited:text-black transition-opacity duration-200 ${
                  pathname === link.href ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
                style={{ color: '#000000' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
