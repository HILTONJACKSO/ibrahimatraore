import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/config/site';
import { en } from './en';
import { fr } from './fr';
import { es } from './es';
import type { SiteDictionary } from './types';

const dictionaries: Record<Locale, SiteDictionary> = {
  en,
  fr,
  es,
};

export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: string): SiteDictionary {
  if (isValidLocale(locale)) {
    return dictionaries[locale];
  }
  return dictionaries[DEFAULT_LOCALE];
}

/**
 * Replaces the leading locale segment (/en/, /fr/, /es/) in a pathname
 * while preserving the exact subpage so visitors stay on the equivalent page
 * when switching language.
 */
export function switchLocaleInPath(pathname: string, targetLocale: Locale): string {
  const clean = pathname || '/';
  const segments = clean.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}/`;
  }

  if (isValidLocale(segments[0])) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }

  return `/${segments.join('/')}/`;
}

export { LOCALES, DEFAULT_LOCALE, type Locale, type SiteDictionary };
