import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_CONFIG, getLocalizedPath } from '@/config/site';
import { getDictionary, isValidLocale } from '@/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import {
  ExecutivePortraitCard,
  HeroPitchComposition,
  StatementPitchGraphic,
} from '@/components/PitchGeometry';
import { BusinessPartnerCTA } from '@/components/BusinessPartnerCTA';
import { CeoMessageSection } from '@/components/CeoMessageSection';
import { SignatureLogo } from '@/components/SignatureLogo';
import { StructuredData } from '@/components/StructuredData';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : 'en';
  return buildPageMetadata(locale, 'home');
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const {
    hero,
    executiveIntro,
    companiesOverview,
    geographicFocus,
    brandStatement,
    partnershipsIntro,
    operatingPrinciples,
    closingSection,
  } = dict.home;

  return (
    <>
      <StructuredData locale={lang} dict={dict} page="home" />

      {/* 1. HERO SECTION (DEEP FOREST GREEN EXECUTIVE STAGE) */}
      <section className="hero-section section-dark animate-editorial">
        {/* Subtle Architectural Pitch & Meridian Watermark */}
        <svg
          className="hero-bg-pitch-geometry"
          viewBox="0 0 1440 720"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="1120"
            cy="360"
            r="310"
            stroke="#A17D43"
            strokeOpacity="0.11"
            strokeWidth="1"
          />
          <circle
            cx="1120"
            cy="360"
            r="190"
            stroke="#F7F5EF"
            strokeOpacity="0.06"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
          <line
            x1="1120"
            y1="0"
            x2="1120"
            y2="720"
            stroke="#A17D43"
            strokeOpacity="0.09"
            strokeWidth="1"
          />
          <path
            d="M 140 640 Q 620 420 1280 110"
            stroke="#A17D43"
            strokeOpacity="0.14"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-grid">
            <div>
              <span className="eyebrow">{hero.eyebrow}</span>
              <h1 className="hero-name">{hero.h1}</h1>
              <p className="hero-role">{hero.role}</p>
              <p className="hero-intro">{hero.introduction}</p>
              <p className="body-copy hero-supporting">{hero.supportingParagraph}</p>

              <div className="btn-group">
                <Link
                  href={getLocalizedPath(lang, 'companies')}
                  className="btn btn-ivory"
                >
                  <span>{hero.primaryAction}</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href={getLocalizedPath(lang, 'profile')}
                  className="btn btn-outline-ivory"
                >
                  <span>{hero.secondaryAction}</span>
                </Link>
              </div>
            </div>

            <div className="hero-visual-column">
              <HeroPitchComposition
                jurisdictionLabel={hero.jurisdictionLabel}
                jurisdictionValue={hero.jurisdictionValue}
                entitiesLabel={hero.entitiesLabel}
                entitiesValue={hero.entitiesValue}
                ariaLabel={dict.a11y.portraitPlaceholderLabel}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXECUTIVE INTRODUCTION (01 / PROFILE) */}
      <section className="section section-sage">
        <div className="container">
          <div className="editorial-media-split">
            <div>
              <span className="eyebrow">{executiveIntro.sectionLabel}</span>
              <h2 className="section-heading" style={{ marginBottom: '1.5rem' }}>
                {executiveIntro.heading}
              </h2>
              <p className="lead-copy" style={{ marginBottom: '1.5rem' }}>
                {executiveIntro.paragraph1}
              </p>
              <p className="body-copy" style={{ marginBottom: '2rem' }}>
                {executiveIntro.paragraph2}
              </p>
              <div className="signature-action-row">
                <SignatureLogo
                  variant="forest"
                  className="brand-signature-svg"
                  ariaLabel="Ibrahima Traore"
                />
                <Link
                  href={getLocalizedPath(lang, 'profile')}
                  className="editorial-link"
                >
                  <span>{executiveIntro.action}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="editorial-media-col">
              <ExecutivePortraitCard
                src={SITE_CONFIG.portraits.officeStanding}
                alt={`${dict.profile.portraitCaption} — Sport World Africa & Kouankan IV SL`}
                caption={dict.profile.portraitCaption}
                subcaption={dict.profile.portraitNote}
                aspectRatio="4 / 4.4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPANIES OVERVIEW (02 / COMPANIES) */}
      <section className="section section-ivory">
        <div className="container">
          <span className="eyebrow">{companiesOverview.sectionLabel}</span>
          <h2 className="section-heading">{companiesOverview.heading}</h2>

          <div className="two-panel-grid">
            {/* Panel 1: Sport World Africa */}
            <article className="editorial-panel">
              <div>
                <div className="panel-image-frame">
                  <picture>
                    <source
                      srcSet={SITE_CONFIG.contextImages.sportWorldAfrica.replace(/\.jpg$/i, '.webp')}
                      type="image/webp"
                    />
                    <img
                      src={SITE_CONFIG.contextImages.sportWorldAfrica}
                      alt={`${companiesOverview.sportWorldAfrica.name} — ${companiesOverview.sportWorldAfrica.category}`}
                      loading="lazy"
                    />
                  </picture>
                </div>

                <span className="panel-category">
                  {companiesOverview.sportWorldAfrica.category}
                </span>
                <h3
                  className="card-heading"
                  style={{ fontSize: 'clamp(1.65rem, 2.4vw, 2.25rem)', marginBottom: '1rem' }}
                >
                  {companiesOverview.sportWorldAfrica.name}
                </h3>
                <p className="body-copy">{companiesOverview.sportWorldAfrica.copy}</p>

                <ul className="topic-pills" aria-label={companiesOverview.sportWorldAfrica.category}>
                  {companiesOverview.sportWorldAfrica.supportingTopics.map((topic) => (
                    <li key={topic} className="topic-pill">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href={`${getLocalizedPath(lang, 'companies')}#sport-world-africa`}
                  className="editorial-link"
                >
                  <span>{companiesOverview.sportWorldAfrica.action}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            {/* Panel 2: Kouankan IV SL */}
            <article className="editorial-panel">
              <div>
                <div className="panel-image-frame">
                  <picture>
                    <source
                      srcSet={SITE_CONFIG.contextImages.kouankanBoardroom.replace(/\.jpg$/i, '.webp')}
                      type="image/webp"
                    />
                    <img
                      src={SITE_CONFIG.contextImages.kouankanBoardroom}
                      alt={`${companiesOverview.kouankan.name} — ${companiesOverview.kouankan.category}`}
                      loading="lazy"
                    />
                  </picture>
                </div>

                <span className="panel-category">
                  {companiesOverview.kouankan.category}
                </span>
                <h3
                  className="card-heading"
                  style={{ fontSize: 'clamp(1.65rem, 2.4vw, 2.25rem)', marginBottom: '1rem' }}
                >
                  {companiesOverview.kouankan.name}
                </h3>
                <p className="body-copy">{companiesOverview.kouankan.copy}</p>

                <ul className="topic-pills" aria-label={companiesOverview.kouankan.category}>
                  {companiesOverview.kouankan.supportingTopics.map((topic) => (
                    <li key={topic} className="topic-pill">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href={`${getLocalizedPath(lang, 'companies')}#kouankan-iv-sl`}
                  className="editorial-link"
                >
                  <span>{companiesOverview.kouankan.action}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 4. GEOGRAPHIC FOCUS & CORPORATE CORRIDOR (SPAIN · EUROPE · AFRICA) */}
      <section className="section section-sage">
        <div className="container">
          <div className="editorial-media-split" style={{ marginBottom: '3rem' }}>
            <div>
              <span className="eyebrow">{geographicFocus.sectionLabel}</span>
              <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>
                {geographicFocus.heading}
              </h2>
              <p className="lead-copy">{geographicFocus.copy}</p>
            </div>

            <div className="editorial-media-col-wide">
              <ExecutivePortraitCard
                src={SITE_CONFIG.contextImages.spainCorridor}
                alt={`${geographicFocus.heading} — Sport World Africa & Kouankan IV SL`}
                aspectRatio="16 / 10"
              />
            </div>
          </div>

          <div className="three-column-grid" style={{ marginTop: 0 }}>
            {geographicFocus.regions.map((region) => (
              <article
                key={region.title}
                className="editorial-panel"
                style={{ borderTop: '2.5px solid var(--color-primary)' }}
              >
                <div>
                  <span className="panel-category">{region.tag}</span>
                  <h3 className="card-heading" style={{ marginBottom: '0.85rem' }}>
                    {region.title}
                  </h3>
                  <p className="body-copy">{region.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BRAND STATEMENT (FULL-WIDTH DEEP FOREST GREEN) */}
      <section className="section section-dark" aria-label="Executive Brand Statement">
        <div className="container">
          <div className="brand-statement-inner">
            <div>
              <div className="gold-rule" aria-hidden="true" />
              <blockquote className="statement-quote">
                <span>{brandStatement.line1}</span>
                <span>{brandStatement.line2}</span>
              </blockquote>
              <p className="lead-copy">{brandStatement.supportingCopy}</p>
            </div>

            <StatementPitchGraphic />
          </div>
        </div>
      </section>

      {/* 6. PARTNERSHIP INTRODUCTION (03 / PARTNERSHIPS) */}
      <section className="section section-ivory">
        <div className="container">
          <div className="split-editorial" style={{ marginBottom: '2.5rem' }}>
            <div>
              <span className="eyebrow">{partnershipsIntro.sectionLabel}</span>
              <h2 className="section-heading">{partnershipsIntro.heading}</h2>
            </div>
            <div>
              <p className="lead-copy">{partnershipsIntro.copy}</p>
            </div>
          </div>

          <div className="three-column-grid">
            {partnershipsIntro.pathways.map((pathway, idx) => (
              <article key={pathway.title} className="editorial-panel">
                <div>
                  <span className="panel-category">0{idx + 1}</span>
                  <h3 className="card-heading" style={{ marginBottom: '0.85rem' }}>
                    {pathway.title}
                  </h3>
                  <p className="body-copy">{pathway.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '2.75rem' }}>
            <Link
              href={getLocalizedPath(lang, 'partnerships')}
              className="btn btn-primary"
            >
              <span>{partnershipsIntro.action}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. EXECUTIVE PRINCIPLES & STANDARDS OF ENGAGEMENT (04 / APPROACH) */}
      <section className="section section-sage">
        <div className="container">
          <div className="editorial-media-split" style={{ marginBottom: '3rem' }}>
            <div>
              <span className="eyebrow">{operatingPrinciples.sectionLabel}</span>
              <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>
                {operatingPrinciples.heading}
              </h2>
              <p className="lead-copy">{operatingPrinciples.copy}</p>
            </div>

            <div className="editorial-media-col">
              <ExecutivePortraitCard
                src={SITE_CONFIG.portraits.leadership}
                alt="Ibrahima Traore — Executive Leadership across Sport World Africa and Kouankan IV SL"
                aspectRatio="4 / 4.2"
              />
            </div>
          </div>

          <div className="three-column-grid" style={{ marginTop: 0 }}>
            {operatingPrinciples.principles.map((item) => (
              <article
                key={item.number}
                className="editorial-panel"
                style={{ borderTop: '2.5px solid var(--color-accent)' }}
              >
                <div>
                  <span className="panel-category">{item.number}</span>
                  <h3 className="card-heading" style={{ marginBottom: '0.85rem' }}>
                    {item.title}
                  </h3>
                  <p className="body-copy">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. A MESSAGE FROM THE CEO */}
      <CeoMessageSection locale={lang} dict={dict} sectionTheme="ivory" />

      {/* 9. BUSINESS PARTNER CALL-TO-ACTION SECTION (05 / BUSINESS PARTNERS & INVESTORS) */}
      <BusinessPartnerCTA locale={lang} dict={dict} />

      {/* 10. CLOSING SECTION */}
      <section className="section section-ivory">
        <div className="container">
          <div
            style={{
              maxWidth: '780px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>
              {closingSection.heading}
            </h2>
            <p className="lead-copy" style={{ marginBottom: '2.25rem' }}>
              {closingSection.copy}
            </p>
            <Link
              href={getLocalizedPath(lang, 'contact')}
              className="btn btn-primary"
            >
              <span>{closingSection.action}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
