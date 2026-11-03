import type { Metadata } from 'next';
import {
  SITE_CONFIG,
  getCanonicalUrl,
  getLanguageAlternates,
  type Locale,
  type PageKey,
} from '@/config/site';
import { getDictionary } from '@/i18n';

export function buildPageMetadata(locale: Locale, page: PageKey): Metadata {
  const dict = getDictionary(locale);
  const meta = dict.meta[page];
  const canonicalUrl = getCanonicalUrl(locale, page);
  const alternates = getLanguageAlternates(page);
  const ogImageUrl = `${SITE_CONFIG.siteUrl}/brand/og-${locale}.png`;

  const verificationOther: Record<string, string> = {};
  if (SITE_CONFIG.bingSiteVerification) {
    verificationOther['msvalidate.01'] = SITE_CONFIG.bingSiteVerification;
  }

  return {
    metadataBase: new URL(SITE_CONFIG.siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: dict.ogLocale,
      alternateLocale: ['en_US', 'fr_FR', 'es_ES'].filter((l) => l !== dict.ogLocale),
      type: page === 'profile' ? 'profile' : 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} — ${dict.home.hero.role}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImageUrl],
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(SITE_CONFIG.googleSiteVerification || Object.keys(verificationOther).length > 0
      ? {
          verification: {
            ...(SITE_CONFIG.googleSiteVerification
              ? { google: SITE_CONFIG.googleSiteVerification }
              : {}),
            ...(Object.keys(verificationOther).length > 0 ? { other: verificationOther } : {}),
          },
        }
      : {}),
  };
}
