'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/tour', label: 'Tour' },
  { href: '/music', label: 'Music' },
  { href: '/news', label: 'News' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <nav className="flex items-center justify-between py-4">
        <Link href="/" className="font-black tracking-wide text-xl">
          Crush of Souls
        </Link>
        <ul className="flex gap-5 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`uppercase tracking-wide hover:opacity-80 ${
                  pathname === link.href ? 'text-white' : 'text-zinc-400'
                }`}
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

