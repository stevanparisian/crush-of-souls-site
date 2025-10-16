'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/tour', label: 'TOUR' },
  { href: '/music', label: 'MUSIC' },
  { href: '/news', label: 'NEWS' },
  { href: '/media', label: 'VIDEO' },
  { href: '/contact', label: 'CONTACTS' },
];

export function NavBar() {
  const pathname = usePathname();

  return (
   <header
  className="sticky top-0 z-50 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40"
  style={{ fontFamily: "'VT323', monospace" }}
>
      <nav className="flex items-center justify-between py-4">
        {pathname !== '/' ? (
          <Link href="/" className="font-black tracking-wide text-xl">
            Crush of Souls
          </Link>
        ) : (
          <span />
        )}
        <ul
          className="flex flex-1 list-none justify-center text-[2rem] font-semibold uppercase tracking-[0.4em]"
          style={{ columnGap: '4rem', color: '#ffffffff', letterSpacing: '0.45em', textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000', filter: 'blur(1px)' }}
        >
          {links.map((link) => (
            <li
              key={link.href}
              className="list-none"
              style={{ color: '#000000', textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000', filter: 'blur(0.35px)' }}
            >
              <Link
                href={link.href}
                className={`no-underline hover:no-underline focus:no-underline active:no-underline visited:no-underline hover:text-black focus:text-black active:text-black visited:text-black transition-opacity duration-200 ${
                  pathname === link.href ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
                style={{ color: 'rgba(255, 255, 255, 1)', textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000', filter: 'blur(0.35px)' }}
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
