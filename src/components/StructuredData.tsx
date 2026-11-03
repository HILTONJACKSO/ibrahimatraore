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

  const portraitImages = [
    {
      '@type': 'ImageObject',
      '@id': `${siteUrl}/#portrait-desk`,
      url: `${siteUrl}${SITE_CONFIG.portraits.heroDesk}`,
      contentUrl: `${siteUrl}${SITE_CONFIG.portraits.heroDesk}`,
      caption: `Ibrahima Traore — ${dict.home.hero.role}`,
      name: 'Ibrahima Traore — Official Executive Portrait',
      description: dict.meta.home.description,
      representativeOfPage: true,
      width: 1200,
      height: 1500,
      creditText: 'Ibrahima Traore',
      copyrightNotice: '© Ibrahima Traore',
    },
    {
      '@type': 'ImageObject',
      '@id': `${siteUrl}/#portrait-office`,
      url: `${siteUrl}${SITE_CONFIG.portraits.officeStanding}`,
      contentUrl: `${siteUrl}${SITE_CONFIG.portraits.officeStanding}`,
      caption: `Ibrahima Traore — Executive Profile (${dict.home.hero.role})`,
      name: 'Ibrahima Traore — Office Portrait',
      description: dict.meta.profile.description,
      width: 1200,
      height: 1500,
      creditText: 'Ibrahima Traore',
      copyrightNotice: '© Ibrahima Traore',
    },
    {
      '@type': 'ImageObject',
      '@id': `${siteUrl}/#portrait-leadership`,
      url: `${siteUrl}${SITE_CONFIG.portraits.leadership}`,
      contentUrl: `${siteUrl}${SITE_CONFIG.portraits.leadership}`,
      caption: 'Ibrahima Traore — CEO of Sport World Africa & Kouankan IV SL',
      name: 'Ibrahima Traore — Leadership Portrait',
      description: dict.meta.companies.description,
      width: 1200,
      height: 1500,
      creditText: 'Ibrahima Traore',
      copyrightNotice: '© Ibrahima Traore',
    },
  ];

  const personEntity: Record<string, unknown> = {
    '@type': 'Person',
    '@id': personId,
    name: 'Ibrahima Traore',
    givenName: 'Ibrahima',
    familyName: 'Traore',
    alternateName: [
      'Ibrahima Traoré',
      'Ibrahima Traore CEO',
      'Ibrahima Traore — Sport World Africa',
      'Ibrahima Traore — Kouankan IV SL',
    ],
    jobTitle: dict.home.hero.role,
    description: dict.meta.home.description,
    url: getCanonicalUrl(locale, 'home'),
    mainEntityOfPage: getCanonicalUrl(locale, 'home'),
    image: portraitImages,
    worksFor: [{ '@id': swaId }, { '@id': kouankanId }],
    founder: [{ '@id': swaId }, { '@id': kouankanId }],
    affiliation: [{ '@id': swaId }, { '@id': kouankanId }],
    workLocation: {
      '@type': 'Country',
      name: 'Spain',
      identifier: 'ES',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Chief Executive Officer (CEO)',
      occupationLocation: {
        '@type': 'Country',
        name: 'Spain',
      },
    },
    knowsLanguage: ['en', 'fr', 'es'],
    knowsAbout: [
      'Football representation',
      'Talent identification',
      'European football club opportunities',
      'Spanish football',
      'Sporting investment',
      'Business investment',
      'Sport World Africa',
      'Kouankan IV SL',
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

  const breadcrumbItems: Array<Record<string, unknown>> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Ibrahima Traore',
      item: getCanonicalUrl(locale, 'home'),
    },
  ];

  if (page !== 'home') {
    const pageLabel =
      page === 'profile'
        ? dict.nav.profile
        : page === 'companies'
        ? dict.nav.companies
        : page === 'partnerships'
        ? dict.nav.partnerships
        : page === 'contact'
        ? dict.nav.contact
        : dict.nav.privacy;

    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: pageLabel,
      item: pageUrl,
    });
  }

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  };

  const faqByLocale = {
    en: [
      {
        q: 'Who is Ibrahima Traore?',
        a: 'Ibrahima Traore is an international football and investment executive serving as Chief Executive Officer (CEO) of Sport World Africa and Kouankan IV SL, two companies registered in Spain.',
      },
      {
        q: 'What companies does Ibrahima Traore lead as CEO?',
        a: 'Ibrahima Traore is the CEO of Sport World Africa, which focuses on football representation, talent identification, and European club opportunities (particularly in Spain), and Kouankan IV SL, a Spain-registered company dedicated to sporting and business investment.',
      },
      {
        q: 'How can football clubs, investors, or business partners contact Ibrahima Traore?',
        a: 'Football clubs, institutional partners, and investors can initiate direct executive dialogue with Ibrahima Traore through the official enquiry portal at https://ibrahimatraore.net/en/contact/.',
      },
    ],
    fr: [
      {
        q: 'Qui est Ibrahima Traore ?',
        a: 'Ibrahima Traore est un dirigeant international actif dans le football et l’investissement, Président-Directeur Général (PDG) de Sport World Africa et de Kouankan IV SL, deux sociétés immatriculées en Espagne.',
      },
      {
        q: 'Quelles sociétés Ibrahima Traore dirige-t-il ?',
        a: 'Ibrahima Traore dirige Sport World Africa (représentation de footballeurs, détection de talents et opportunités auprès de clubs européens, notamment en Espagne) ainsi que Kouankan IV SL (investissement sportif et entrepreneurial).',
      },
      {
        q: 'Comment contacter Ibrahima Traore pour un partenariat ou un investissement ?',
        a: 'Les clubs de football, investisseurs et partenaires institutionnels peuvent contacter directement Ibrahima Traore via le portail officiel sur https://ibrahimatraore.net/fr/contact/.',
      },
    ],
    es: [
      {
        q: '¿Quién es Ibrahima Traore?',
        a: 'Ibrahima Traore es un directivo internacional del ámbito del fútbol y la inversión, Consejero Delegado (CEO) de Sport World Africa y Kouankan IV SL, dos sociedades registradas en España.',
      },
      {
        q: '¿Qué empresas dirige Ibrahima Traore como CEO?',
        a: 'Ibrahima Traore dirige Sport World Africa (representación de futbolistas, identificación de talento y oportunidades en clubes europeos, especialmente en España) y Kouankan IV SL (inversión deportiva y empresarial).',
      },
      {
        q: '¿Cómo contactar con Ibrahima Traore para colaboraciones o inversión?',
        a: 'Los clubes de fútbol, inversores y socios estratégicos pueden contactar directamente con Ibrahima Traore a través del portal oficial en https://ibrahimatraore.net/es/contact/.',
      },
    ],
  };

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: siteUrl,
      name: 'Ibrahima Traore',
      alternateName: [
        'Ibrahima Traore Official Website',
        'Ibrahima Traoré',
        'Ibrahima Traore — CEO of Sport World Africa & Kouankan IV SL',
      ],
      description: dict.meta.home.description,
      inLanguage: ['en', 'fr', 'es'],
      publisher: { '@id': personId },
    },
    sportWorldAfricaOrg,
    kouankanOrg,
    personEntity,
    breadcrumbSchema,
    {
      '@type': pageType,
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageMeta.title,
      description: pageMeta.description,
      inLanguage: dict.htmlLang,
      isPartOf: { '@id': websiteId },
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      mainEntity: { '@id': personId },
      primaryImageOfPage: { '@id': `${siteUrl}/#portrait-desk` },
      about: [{ '@id': personId }, { '@id': swaId }, { '@id': kouankanId }],
    },
  ];

  if (page === 'home' || page === 'profile') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqByLocale[locale].map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    });
  }

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
