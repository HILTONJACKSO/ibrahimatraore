import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_CONFIG, getLocalizedPath } from '@/config/site';
import { getDictionary, isValidLocale } from '@/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ExecutivePortraitCard } from '@/components/PitchGeometry';
import { StructuredData } from '@/components/StructuredData';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : 'en';
  return buildPageMetadata(locale, 'partnerships');
}

export default async function PartnershipsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const p = dict.partnerships;

  return (
    <>
      <StructuredData locale={lang} dict={dict} page="partnerships" />
      <Breadcrumbs
        locale={lang}
        dict={dict}
        currentPage="partnerships"
        currentLabel={dict.nav.partnerships}
      />

      {/* PAGE HEADER WITH EXECUTIVE PORTRAIT */}
      <section className="section section-ivory animate-editorial">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">{p.eyebrow}</span>
              <h1 className="page-heading" style={{ marginBottom: '1.5rem' }}>
                {p.title}
              </h1>
              <p className="lead-copy">{p.introduction}</p>
            </div>

            <aside aria-label={dict.profile.portraitCaption}>
              <ExecutivePortraitCard
                src={SITE_CONFIG.portraits.deskWide}
                alt={`${dict.profile.portraitCaption} — ${p.title}`}
                caption={dict.profile.portraitCaption}
                subcaption={dict.profile.portraitNote}
                aspectRatio="16 / 11"
              />
            </aside>
          </div>
        </div>
      </section>

      {/* THREE SUBSTANTIAL PARTNERSHIP SECTIONS */}
      {p.sections.map((sec, idx) => {
        const bgClass = idx % 2 === 0 ? 'section-sage' : 'section-ivory';
        return (
          <section key={sec.number} className={`section ${bgClass}`}>
            <div className="container">
              <div className="split-editorial">
                <div>
                  <span className="eyebrow">
                    {sec.number} / {sec.companyContext}
                  </span>
                  <h2 className="section-heading">{sec.audience}</h2>
                </div>

                <div>
                  <p className="body-copy" style={{ marginBottom: '2rem' }}>
                    {sec.description}
                  </p>

                  <div
                    style={{
                      backgroundColor: 'var(--color-bg-main)',
                      border: '1px solid var(--color-rule-strong)',
                      padding: '1.75rem 2rem',
                      marginBottom: '2rem',
                    }}
                  >
                    <h3 className="panel-category" style={{ marginBottom: '1rem' }}>
                      {sec.topicsLabel}
                    </h3>
                    <ul
                      style={{
                        listStyle: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                      }}
                    >
                      {sec.topics.map((topic) => (
                        <li
                          key={topic}
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.75rem',
                            color: 'var(--color-text-main)',
                          }}
                        >
                          <span
                            style={{ color: 'var(--color-accent)', fontWeight: 700 }}
                            aria-hidden="true"
                          >
                            •
                          </span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={getLocalizedPath(
                      lang,
                      'contact',
                      `category=${sec.categoryParam}`
                    )}
                    className="editorial-link"
                  >
                    <span>{sec.action}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* PREPARATION GUIDE WITH EXECUTIVE SALON PHOTOGRAPH */}
      <section className="section section-sage">
        <div className="container">
          <div className="split-editorial">
            <div>
              <span className="eyebrow">{p.preparationGuide.label}</span>
              <h2 className="section-heading" style={{ marginBottom: '2rem' }}>
                {p.preparationGuide.heading}
              </h2>
              <ExecutivePortraitCard
                src={SITE_CONFIG.contextImages.partnershipsLounge}
                alt={p.preparationGuide.heading}
                aspectRatio="16 / 10"
              />
            </div>

            <div className="editorial-panel">
              <p className="lead-copy" style={{ marginBottom: '1.5rem' }}>
                {p.preparationGuide.intro}
              </p>
              <ol
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {p.preparationGuide.items.map((item, index) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '1rem',
                      paddingBottom: '0.85rem',
                      borderBottom:
                        index < p.preparationGuide.items.length - 1
                          ? '1px solid var(--color-rule-light)'
                          : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        color: 'var(--color-accent-accessible-light)',
                      }}
                    >
                      0{index + 1}
                    </span>
                    <span style={{ color: 'var(--color-text-main)', fontWeight: 500 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section section-dark">
        <div className="container">
          <div className="cta-banner-split">
            <h2 className="section-heading" style={{ maxWidth: '24ch' }}>
              {p.closing.heading}
            </h2>
            <Link
              href={getLocalizedPath(lang, 'contact')}
              className="btn btn-ivory"
            >
              <span>{p.closing.action}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
