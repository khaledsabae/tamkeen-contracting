'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Locale switch: /ar ⇄ /en, preserving the current section hash (#capabilities…).
 */
export default function LocaleSwitch({ to, label, ariaLabel }: { to: string; label: string; ariaLabel: string }) {
  const pathname = usePathname() || `/${to}`;
  const [hash, setHash] = useState('');
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  const target = pathname.replace(/^\/(ar|en)/, `/${to}`) || `/${to}`;
  return (
    <Link className="localeSwitch" href={target + hash} aria-label={ariaLabel} title={ariaLabel}>
      {label}
    </Link>
  );
}
