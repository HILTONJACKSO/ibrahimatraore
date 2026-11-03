export const LOCALES = ['en', 'fr', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const SITE_CONFIG = {
  name: 'Ibrahima Traore',
  brandTitle: 'Ibrahima Traore | CEO of Sport World Africa & Kouankan IV SL',
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://ibrahimatraore.net').replace(/\/+$/, ''),
  enforceHttps: process.env.NEXT_PUBLIC_ENFORCE_HTTPS === 'true',
  preferredHost: process.env.NEXT_PUBLIC_PREFERRED_HOST || 'ibrahimatraore.net',
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google78ed1f30c8cef2cf',
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
  verifiedEmail: process.env.NEXT_PUBLIC_VERIFIED_EMAIL || '',
  socialLinks: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
  },
  features: {
    enableInsights: process.env.NEXT_PUBLIC_ENABLE_INSIGHTS === 'true',
    enableCaseStudies: process.env.NEXT_PUBLIC_ENABLE_CASE_STUDIES === 'true',
    portraitPath:
      process.env.NEXT_PUBLIC_PORTRAIT_PATH || '/images/ibrahima-traore-desk-portrait.jpg',
  },
  portraits: {
    heroDesk: '/images/ibrahima-traore-desk-portrait.jpg',
    deskWide: '/images/ibrahima-traore-desk.jpg',
    officeStanding: '/images/ibrahima-traore-office-portrait.jpg',
    officeWide: '/images/ibrahima-traore-office.jpg',
    leadership: '/images/ibrahima-traore-leadership.jpg',
  },
  contextImages: {
    sportWorldAfrica: '/images/context-sport-world-africa.jpg',
    kouankanBoardroom: '/images/context-kouankan-boardroom.jpg',
    spainCorridor: '/images/context-spain-corridor.jpg',
    partnershipsLounge: '/images/context-partnerships-lounge.jpg',
  },
  companies: [
    {
      name: 'Sport World Africa',
      legalCountry: 'ES',
      registrationLocation: 'Spain',
      role: 'CEO',
      focus: 'Football representation, talent identification, and European club opportunities, particularly in Spain.',
    },
    {
      name: 'Kouankan IV SL',
      legalCountry: 'ES',
      registrationLocation: 'Spain',
      role: 'CEO',
      focus: 'Sporting investment and other investment activities.',
    },
  ],
  colors: {
    primary: '#173B38', // Deep forest green
    background: '#F7F5EF', // Warm ivory
    text: '#172522', // Dark charcoal
    accent: '#A17D43', // Muted gold
    secondaryBackground: '#E8E9E0', // Soft sage
    supportingText: '#56645D', // Slate green
  },
} as const;

export type PageKey = 'home' | 'profile' | 'companies' | 'partnerships' | 'contact' | 'privacy';

export const PAGE_SLUGS: Record<PageKey, string> = {
  home: '',
  profile: 'profile',
  companies: 'companies',
  partnerships: 'partnerships',
  contact: 'contact',
  privacy: 'privacy',
};

export function getLocalizedPath(locale: Locale, page: PageKey = 'home', query?: string): string {
  const slug = PAGE_SLUGS[page];
  const base = slug ? `/${locale}/${slug}/` : `/${locale}/`;
  return query ? `${base}?${query}` : base;
}

export function getCanonicalUrl(locale: Locale, page: PageKey = 'home'): string {
  return `${SITE_CONFIG.siteUrl}${getLocalizedPath(locale, page)}`;
}

export function getLanguageAlternates(page: PageKey = 'home'): Record<string, string> {
  return {
    en: getCanonicalUrl('en', page),
    fr: getCanonicalUrl('fr', page),
    es: getCanonicalUrl('es', page),
    'x-default': getCanonicalUrl('en', page),
  };
}
