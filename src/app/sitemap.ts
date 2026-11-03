import type { MetadataRoute } from 'next';
import {
  LOCALES,
  PAGE_SLUGS,
  getCanonicalUrl,
  getLanguageAlternates,
  type PageKey,
} from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.keys(PAGE_SLUGS) as PageKey[];
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const priority =
      page === 'home'
        ? 1.0
        : page === 'profile' || page === 'companies'
        ? 0.9
        : page === 'partnerships' || page === 'contact'
        ? 0.8
        : 0.4;

    const changeFrequency = page === 'privacy' ? 'yearly' : 'monthly';
    const languages = getLanguageAlternates(page);

    for (const locale of LOCALES) {
      entries.push({
        url: getCanonicalUrl(locale, page),
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
