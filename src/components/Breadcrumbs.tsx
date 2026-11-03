import React from 'react';
import Link from 'next/link';
import { getCanonicalUrl, getLocalizedPath, type Locale, type PageKey } from '@/config/site';
import type { SiteDictionary } from '@/i18n';

interface BreadcrumbsProps {
  locale: Locale;
  dict: SiteDictionary;
  currentPage: Exclude<PageKey, 'home'>;
  currentLabel: string;
}

export function Breadcrumbs({
  locale,
  dict,
  currentPage,
  currentLabel,
}: BreadcrumbsProps) {
  const homeUrl = getCanonicalUrl(locale, 'home');
  const currentUrl = getCanonicalUrl(locale, currentPage);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dict.nav.home,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: currentLabel,
        item: currentUrl,
      },
    ],
  };

  return (
    <div className="breadcrumb-bar">
      <div className="container">
        <nav aria-label={dict.a11y.breadcrumbLabel}>
          <ol className="breadcrumb-list">
            <li>
              <Link href={getLocalizedPath(locale, 'home')}>
                {dict.nav.home}
              </Link>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">
              /
            </li>
            <li>
              <span className="breadcrumb-current" aria-current="page">
                {currentLabel}
              </span>
            </li>
          </ol>
        </nav>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </div>
  );
}
