import { ar, type Dict } from './ar';
import { en } from './en';

export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ar';

const dicts: Record<Locale, Dict> = { ar, en };

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export function getDict(locale: string): Dict {
  return dicts[isLocale(locale) ? locale : defaultLocale];
}

export type { Dict };
