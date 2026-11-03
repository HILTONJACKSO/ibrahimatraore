import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG, getLocalizedPath, type Locale } from '@/config/site';
import type { SiteDictionary } from '@/i18n';
import { SignatureLogo } from './SignatureLogo';

interface BusinessPartnerCTAProps {
  locale: Locale;
  dict: SiteDictionary;
  eyebrowOverride?: string;
}

/**
 * Executive Call-to-Action section tailored for Business Partners,
 * Co-Investors, Family Offices, and Football Stakeholders.
 */
export function BusinessPartnerCTA({
  locale,
  dict,
  eyebrowOverride,
}: BusinessPartnerCTAProps) {
  const cta = dict.businessPartnerCta;
  const loungeWebp = SITE_CONFIG.contextImages.partnershipsLounge.replace(
    /\.jpg$/i,
    '.webp'
  );

  return (
    <section
      className="section section-dark business-partner-cta"
      aria-labelledby="business-partner-cta-heading"
    >
      {/* Subtle architectural pitch & meridian background watermark */}
      <svg
        className="partner-cta-bg-geometry"
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="980"
          cy="300"
          r="240"
          stroke="#A17D43"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        <circle
          cx="980"
          cy="300"
          r="150"
          stroke="#F7F5EF"
          strokeOpacity="0.06"
          strokeWidth="1"
          strokeDasharray="5 7"
        />
        <line
          x1="980"
          y1="0"
          x2="980"
          y2="600"
          stroke="#A17D43"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <path
          d="M 640 480 Q 840 240 1140 120"
          stroke="#A17D43"
          strokeOpacity="0.16"
          strokeWidth="1.25"
          fill="none"
        />
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Split: Executive Invitation & Salon Credential Card */}
        <div className="editorial-media-split partner-cta-top">
          <div>
            <span className="eyebrow">{eyebrowOverride || cta.eyebrow}</span>
            <h2
              id="business-partner-cta-heading"
              className="section-heading"
              style={{ marginBottom: '1.35rem' }}
            >
              {cta.heading}
            </h2>
            <p
              className="lead-copy"
              style={{
                color: 'rgba(247, 245, 239, 0.92)',
                marginBottom: '1.25rem',
              }}
            >
              {cta.lead}
            </p>
            <p
              className="body-copy"
              style={{
                color: 'rgba(247, 245, 239, 0.76)',
                marginBottom: '2.25rem',
              }}
            >
              {cta.supporting}
            </p>

            <div className="btn-group" style={{ marginTop: 0 }}>
              <Link
                href={getLocalizedPath(
                  locale,
                  'contact',
                  'category=business-partnership'
                )}
                className="btn btn-ivory"
              >
                <span>{cta.primaryAction}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={getLocalizedPath(locale, 'partnerships')}
                className="btn btn-outline-ivory"
              >
                <span>{cta.secondaryAction}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Executive Salon Visual & Signed Trust Card */}
          <div className="editorial-media-col-wide">
            <div className="partner-cta-credential-card">
              <div className="partner-cta-image-wrap">
                <picture>
                  <source srcSet={loungeWebp} type="image/webp" />
                  <img
                    src={SITE_CONFIG.contextImages.partnershipsLounge}
                    alt={cta.heading}
                    loading="lazy"
                  />
                </picture>
                <div className="partner-cta-image-badge">
                  <span>{cta.jurisdictionBadge}</span>
                </div>
              </div>

              <div className="partner-cta-credential-footer">
                <div>
                  <span className="partner-cta-confidentiality">
                    {cta.confidentialityBadge}
                  </span>
                  <p className="partner-cta-entities">
                    Sport World Africa · Kouankan IV SL
                  </p>
                </div>
                <SignatureLogo
                  variant="ivory"
                  className="partner-cta-signature"
                  ariaLabel="Ibrahima Traore"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 3-Column Direct Partner Tracks */}
        <div className="three-column-grid partner-tracks-grid">
          {cta.tracks.map((track) => (
            <article key={track.tag} className="partner-track-card">
              <div>
                <div className="partner-track-header">
                  <span className="partner-track-tag">{track.tag}</span>
                  <span className="partner-track-entity">{track.entity}</span>
                </div>
                <h3 className="partner-track-title">{track.title}</h3>
                <p className="partner-track-desc">{track.description}</p>
              </div>

              <div className="partner-track-footer">
                <Link
                  href={getLocalizedPath(
                    locale,
                    'contact',
                    `category=${track.categoryParam}`
                  )}
                  className="partner-track-link"
                >
                  <span>{track.actionLabel}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
