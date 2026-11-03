import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG, getLocalizedPath, type Locale } from '@/config/site';
import type { SiteDictionary } from '@/i18n';
import type { EditorialArticle } from '@/content/expansion';
import { SignatureLogo } from '@/components/SignatureLogo';

interface ArticleTemplateProps {
  locale: Locale;
  dict: SiteDictionary;
  article: EditorialArticle;
}

export function ArticleTemplate({ locale, dict, article }: ArticleTemplateProps) {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    inLanguage: dict.htmlLang,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      url: `${SITE_CONFIG.siteUrl}${getLocalizedPath(locale, 'profile')}`,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
  };

  return (
    <article className="section section-ivory animate-editorial">
      <div className="container" style={{ maxWidth: '860px' }}>
        <span className="eyebrow">
          {article.companyAssociation} · {article.category}
        </span>
        <h1 className="page-heading" style={{ marginBottom: '1.5rem' }}>
          {article.title}
        </h1>
        <p className="lead-copy" style={{ marginBottom: '2rem' }}>
          {article.summary}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 0',
            borderTop: '1px solid var(--color-rule-light)',
            borderBottom: '1px solid var(--color-rule-light)',
            marginBottom: '3rem',
            fontSize: '0.875rem',
            color: 'var(--color-text-supporting)',
          }}
        >
          <span>{SITE_CONFIG.name}</span>
          <time dateTime={article.publishedAt}>{article.publishedAt}</time>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {article.sections.map((section, idx) => (
            <section key={idx}>
              {section.heading && (
                <h2 className="card-heading" style={{ marginBottom: '1rem' }}>
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="body-copy" style={{ marginBottom: '1.25rem' }}>
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <footer
          style={{
            marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--color-rule-strong)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div>
            <SignatureLogo variant="forest" className="brand-signature-svg" />
            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-supporting)',
                marginTop: '0.5rem',
              }}
            >
              {dict.home.hero.role}
            </p>
          </div>
          <Link href={getLocalizedPath(locale, 'contact')} className="btn btn-primary">
            <span>{dict.nav.contact}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </article>
  );
}
