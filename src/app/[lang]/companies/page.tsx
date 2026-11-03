import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_CONFIG, getLocalizedPath } from '@/config/site';
import { getDictionary, isValidLocale } from '@/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BusinessPartnerCTA } from '@/components/BusinessPartnerCTA';
import { ExecutivePortraitCard } from '@/components/PitchGeometry';
import { StructuredData } from '@/components/StructuredData';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : 'en';
  return buildPageMetadata(locale, 'companies');
}

export default async function CompaniesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const c = dict.companies;

  return (
    <>
      <StructuredData locale={lang} dict={dict} page="companies" />
      <Breadcrumbs
        locale={lang}
        dict={dict}
        currentPage="companies"
        currentLabel={dict.nav.companies}
      />

      {/* PAGE HEADER WITH EXECUTIVE PORTRAIT */}
      <section className="section section-ivory animate-editorial">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">{c.eyebrow}</span>
              <h1 className="page-heading" style={{ marginBottom: '1.5rem' }}>
                {c.title}
              </h1>
              <p className="lead-copy" style={{ marginBottom: '1.75rem' }}>
                {c.introduction}
              </p>
              <p
                style={{
                  display: 'inline-block',
                  fontSize: 'var(--size-label)',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-rule-strong)',
                  padding: '0.45rem 0.9rem',
                }}
              >
                {c.registrationBadge}
              </p>
            </div>

            <aside aria-label={dict.profile.portraitCaption}>
              <ExecutivePortraitCard
                src={SITE_CONFIG.portraits.leadership}
                alt={`${dict.profile.portraitCaption} — ${c.title}`}
                caption={dict.profile.portraitCaption}
                subcaption={c.registrationBadge}
                aspectRatio="4 / 4.4"
              />
            </aside>
          </div>
        </div>
      </section>

      {/* COMPANY 1: SPORT WORLD AFRICA */}
      <section id="sport-world-africa" className="section section-sage">
        <div className="container">
          <div className="editorial-media-split" style={{ marginBottom: '3rem' }}>
            <div>
              <span className="eyebrow">{c.sportWorldAfrica.label}</span>
              <h2
                className="section-heading"
                style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}
              >
                {c.sportWorldAfrica.name}
              </h2>
              <p className="panel-category" style={{ marginBottom: '1.25rem' }}>
                {c.sportWorldAfrica.category}
              </p>
              <h3 className="card-heading" style={{ marginBottom: '1rem' }}>
                {c.sportWorldAfrica.heading}
              </h3>
              <p className="body-copy">{c.sportWorldAfrica.copy}</p>
            </div>

            <div className="editorial-media-col-wide">
              <ExecutivePortraitCard
                src={SITE_CONFIG.contextImages.sportWorldAfrica}
                alt={`${c.sportWorldAfrica.name} — ${c.sportWorldAfrica.heading}`}
                caption={c.sportWorldAfrica.name}
                subcaption={c.sportWorldAfrica.category}
                aspectRatio="16 / 10"
              />
            </div>
          </div>

          <div className="three-column-grid" style={{ marginTop: 0 }}>
            {c.sportWorldAfrica.blocks.map((block, idx) => (
              <article key={block.title} className="editorial-panel">
                <div>
                  <span className="panel-category">0{idx + 1}</span>
                  <h4 className="card-heading" style={{ marginBottom: '0.75rem' }}>
                    {block.title}
                  </h4>
                  <p className="body-copy">{block.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '2.75rem' }}>
            <Link
              href={getLocalizedPath(
                lang,
                'contact',
                `category=${c.sportWorldAfrica.categoryParam}`
              )}
              className="btn btn-primary"
            >
              <span>{c.sportWorldAfrica.action}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* COMPANY 2: KOUANKAN IV SL */}
      <section id="kouankan-iv-sl" className="section section-ivory">
        <div className="container">
          <div className="editorial-media-split" style={{ marginBottom: '3rem' }}>
            <div>
              <span className="eyebrow">{c.kouankan.label}</span>
              <h2
                className="section-heading"
                style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}
              >
                {c.kouankan.name}
              </h2>
              <p className="panel-category" style={{ marginBottom: '1.25rem' }}>
                {c.kouankan.category}
              </p>
              <h3 className="card-heading" style={{ marginBottom: '1rem' }}>
                {c.kouankan.heading}
              </h3>
              <p className="body-copy">{c.kouankan.copy}</p>
            </div>

            <div className="editorial-media-col-wide">
              <ExecutivePortraitCard
                src={SITE_CONFIG.contextImages.kouankanBoardroom}
                alt={`${c.kouankan.name} — ${c.kouankan.heading}`}
                caption={c.kouankan.name}
                subcaption={c.kouankan.category}
                aspectRatio="16 / 10"
              />
            </div>
          </div>

          <div className="three-column-grid" style={{ marginTop: 0 }}>
            {c.kouankan.blocks.map((block, idx) => (
              <article key={block.title} className="editorial-panel">
                <div>
                  <span className="panel-category">0{idx + 1}</span>
                  <h4 className="card-heading" style={{ marginBottom: '0.75rem' }}>
                    {block.title}
                  </h4>
                  <p className="body-copy">{block.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '2.75rem' }}>
            <Link
              href={getLocalizedPath(
                lang,
                'contact',
                `category=${c.kouankan.categoryParam}`
              )}
              className="btn btn-primary"
            >
              <span>{c.kouankan.action}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* BUSINESS PARTNER CALL-TO-ACTION SECTION */}
      <BusinessPartnerCTA locale={lang} dict={dict} />
    </>
  );
}
