import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDictionary, isValidLocale } from '@/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : 'en';
  return buildPageMetadata(locale, 'privacy');
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const pr = dict.privacy;

  return (
    <>
      <StructuredData locale={lang} dict={dict} page="privacy" />
      <Breadcrumbs
        locale={lang}
        dict={dict}
        currentPage="privacy"
        currentLabel={dict.nav.privacy}
      />

      <section className="section section-ivory animate-editorial">
        <div className="container" style={{ maxWidth: '900px' }}>
          <span className="eyebrow">{pr.eyebrow}</span>
          <h1 className="page-heading" style={{ marginBottom: '1.25rem' }}>
            {pr.title}
          </h1>
          <p className="lead-copy" style={{ marginBottom: '1rem' }}>
            {pr.subtitle}
          </p>
          <p
            style={{
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-supporting)',
              marginBottom: '3.5rem',
            }}
          >
            {pr.lastUpdatedLabel}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {pr.sections.map((section) => (
              <article
                key={section.heading}
                style={{
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--color-rule-light)',
                }}
              >
                <h2 className="card-heading" style={{ marginBottom: '1rem' }}>
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="body-copy"
                    style={{ marginBottom: '1rem' }}
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
