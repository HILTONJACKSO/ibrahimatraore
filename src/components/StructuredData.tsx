import React from 'react';
import { SITE_CONFIG, getCanonicalUrl, type Locale, type PageKey } from '@/config/site';
import type { SiteDictionary } from '@/i18n';

interface StructuredDataProps {
  locale: Locale;
  dict: SiteDictionary;
  page: PageKey;
}

export function StructuredData({ locale, dict, page }: StructuredDataProps) {
  const siteUrl = SITE_CONFIG.siteUrl;
  const pageUrl = getCanonicalUrl(locale, page);
  const personId = `${siteUrl}/#ibrahima-traore`;
  const swaId = `${siteUrl}/#sport-world-africa`;
  const kouankanId = `${siteUrl}/#kouankan-iv-sl`;
  const websiteId = `${siteUrl}/#website`;

  const sameAsLinks = Object.values(SITE_CONFIG.socialLinks).filter(Boolean);

  const sportWorldAfricaOrg = {
    '@type': 'Organization',
    '@id': swaId,
    name: 'Sport World Africa',
    description: dict.home.companiesOverview.sportWorldAfrica.copy,
    url: getCanonicalUrl(locale, 'companies'),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    founder: { '@id': personId },
  };

  const kouankanOrg = {
    '@type': 'Organization',
    '@id': kouankanId,
    name: 'Kouankan IV SL',
    legalName: 'Kouankan IV SL',
    description: dict.home.companiesOverview.kouankan.copy,
    url: getCanonicalUrl(locale, 'companies'),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    founder: { '@id': personId },
  };

  const personEntity: Record<string, unknown> = {
    '@type': 'Person',
    '@id': personId,
    name: 'Ibrahima Traore',
    jobTitle: dict.home.hero.role,
    description: dict.meta.home.description,
    url: getCanonicalUrl(locale, 'profile'),
    mainEntityOfPage: getCanonicalUrl(locale, 'profile'),
    image: [
      `${siteUrl}${SITE_CONFIG.portraits.heroDesk}`,
      `${siteUrl}${SITE_CONFIG.portraits.officeStanding}`,
      `${siteUrl}${SITE_CONFIG.portraits.leadership}`,
    ],
    worksFor: [{ '@id': swaId }, { '@id': kouankanId }],
    affiliation: [{ '@id': swaId }, { '@id': kouankanId }],
    knowsLanguage: ['en', 'fr', 'es'],
    knowsAbout: [
      'Football representation',
      'Talent identification',
      'European football club opportunities',
      'Spanish football',
      'Sporting investment',
      'Business investment',
    ],
  };

  if (SITE_CONFIG.verifiedEmail) {
    personEntity.email = `mailto:${SITE_CONFIG.verifiedEmail}`;
  }
  if (sameAsLinks.length > 0) {
    personEntity.sameAs = sameAsLinks;
  }

  const pageType =
    page === 'home' || page === 'profile'
      ? 'ProfilePage'
      : page === 'contact'
      ? 'ContactPage'
      : 'WebPage';

  const pageMeta = dict.meta[page];

  const graph = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: siteUrl,
      name: 'Ibrahima Traore',
      description: dict.meta.home.description,
      inLanguage: ['en', 'fr', 'es'],
      publisher: { '@id': personId },
    },
    sportWorldAfricaOrg,
    kouankanOrg,
    personEntity,
    {
      '@type': pageType,
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageMeta.title,
      description: pageMeta.description,
      inLanguage: dict.htmlLang,
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': personId },
      about: [{ '@id': personId }, { '@id': swaId }, { '@id': kouankanId }],
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
