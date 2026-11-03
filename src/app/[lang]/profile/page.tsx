import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_CONFIG, getLocalizedPath } from '@/config/site';
import { getDictionary, isValidLocale } from '@/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CeoMessageSection } from '@/components/CeoMessageSection';
import { ExecutivePortraitCard } from '@/components/PitchGeometry';
import { StructuredData } from '@/components/StructuredData';
import { SignatureLogo } from '@/components/SignatureLogo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : 'en';
  return buildPageMetadata(locale, 'profile');
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const p = dict.profile;

  return (
    <>
      <StructuredData locale={lang} dict={dict} page="profile" />
      <Breadcrumbs
        locale={lang}
        dict={dict}
        currentPage="profile"
        currentLabel={dict.nav.profile}
      />

      {/* PROFILE HEADER & OPENING EDITORIAL */}
      <section className="section section-ivory animate-editorial">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">{p.eyebrow}</span>
              <h1 className="page-heading" style={{ marginBottom: '1.25rem' }}>
                {p.title}
              </h1>
              <p
                className="lead-copy"
                style={{
                  color: 'var(--color-primary)',
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                }}
              >
                {p.subtitle}
              </p>
              <p className="body-copy" style={{ marginBottom: '2.25rem' }}>
                {p.openingCopy}
              </p>

              <div style={{ paddingTop: '0.5rem' }}>
                <SignatureLogo
                  variant="forest"
                  className="brand-signature-svg"
                  ariaLabel="Ibrahima Traore"
                />
              </div>
            </div>

            {/* Official Executive Portrait */}
            <aside aria-label={p.portraitCaption}>
              <ExecutivePortraitCard
                src={SITE_CONFIG.portraits.officeStanding}
                alt={p.portraitCaption}
                caption={p.portraitCaption}
                subcaption={p.portraitNote}
                aspectRatio="4 / 4.5"
              />
            </aside>
          </div>
        </div>
      </section>

      {/* TWO EDITORIAL SECTIONS: FOOTBALL REPRESENTATION & INVESTMENT ACTIVITIES */}
      <section className="section section-sage">
        <div className="container">
          <div className="two-panel-grid" style={{ marginTop: 0 }}>
            {/* Editorial Section 1: Football Representation */}
            <article className="editorial-panel">
              <div>
                <span className="eyebrow">{p.footballSection.label}</span>
                <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>
                  {p.footballSection.heading}
                </h2>
                <p className="body-copy" style={{ marginBottom: '1.75rem' }}>
                  {p.footballSection.copy}
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    borderTop: '1px solid var(--color-rule-light)',
                    paddingTop: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {p.footballSection.highlights.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.75rem',
                        fontSize: '0.98rem',
                        color: 'var(--color-text-main)',
                      }}
                    >
                      <span style={{ color: 'var(--color-accent)', fontWeight: 700 }} aria-hidden="true">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Editorial Section 2: Investment Activities */}
            <article className="editorial-panel">
              <div>
                <span className="eyebrow">{p.investmentSection.label}</span>
                <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>
                  {p.investmentSection.heading}
                </h2>
                <p className="body-copy" style={{ marginBottom: '1.75rem' }}>
                  {p.investmentSection.copy}
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    borderTop: '1px solid var(--color-rule-light)',
                    paddingTop: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {p.investmentSection.highlights.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.75rem',
                        fontSize: '0.98rem',
                        color: 'var(--color-text-main)',
                      }}
                    >
                      <span style={{ color: 'var(--color-accent)', fontWeight: 700 }} aria-hidden="true">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* A MESSAGE FROM THE CEO */}
      <CeoMessageSection locale={lang} dict={dict} sectionTheme="ivory" />

      {/* LEADERSHIP SUMMARY TABLE & EXECUTIVE PORTRAIT STUDY */}
      <section className="section section-sage">
        <div className="container">
          <h2 className="section-heading" style={{ marginBottom: '0.5rem' }}>
            {p.leadershipSummary.heading}
          </h2>
          <p className="body-copy">{p.leadershipSummary.caption}</p>

          <div className="table-wrapper" style={{ marginBottom: '3.5rem' }}>
            <table className="leadership-table">
              <caption className="sr-only">{p.leadershipSummary.caption}</caption>
              <thead>
                <tr>
                  <th scope="col">{p.leadershipSummary.columns.company}</th>
                  <th scope="col">{p.leadershipSummary.columns.role}</th>
                  <th scope="col">{p.leadershipSummary.columns.focus}</th>
                  <th scope="col">{p.leadershipSummary.columns.registration}</th>
                </tr>
              </thead>
              <tbody>
                {p.leadershipSummary.rows.map((row) => (
                  <tr key={row.company}>
                    <td>{row.company}</td>
                    <td
                      data-label={p.leadershipSummary.columns.role}
                      style={{ fontWeight: 600 }}
                    >
                      {row.role}
                    </td>
                    <td data-label={p.leadershipSummary.columns.focus}>
                      {row.focus}
                    </td>
                    <td data-label={p.leadershipSummary.columns.registration}>
                      {row.registration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="two-panel-grid" style={{ marginTop: 0 }}>
            <ExecutivePortraitCard
              src={SITE_CONFIG.portraits.deskWide}
              alt="Ibrahima Traore — Executive Office, Sport World Africa & Kouankan IV SL"
              caption="Sport World Africa"
              subcaption={p.footballSection.heading}
              aspectRatio="16 / 10.5"
            />
            <ExecutivePortraitCard
              src={SITE_CONFIG.portraits.officeWide}
              alt="Ibrahima Traore — CEO of Kouankan IV SL and Sport World Africa"
              caption="Kouankan IV SL"
              subcaption={p.investmentSection.heading}
              aspectRatio="16 / 10.5"
              objectPosition="right top"
            />
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section section-dark">
        <div className="container">
          <div className="cta-banner-split">
            <h2 className="section-heading" style={{ maxWidth: '22ch' }}>
              {p.closing.heading}
            </h2>
            <Link
              href={getLocalizedPath(lang, 'companies')}
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
