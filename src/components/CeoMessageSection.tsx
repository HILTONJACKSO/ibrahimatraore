import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG, getLocalizedPath, type Locale } from '@/config/site';
import type { SiteDictionary } from '@/i18n';
import { ExecutivePortraitCard } from './PitchGeometry';
import { SignatureLogo } from './SignatureLogo';

interface CeoMessageSectionProps {
  locale: Locale;
  dict: SiteDictionary;
  sectionTheme?: 'ivory' | 'sage';
}

/**
 * Editorial "Message from the CEO" section featuring Ibrahima Traore's
 * personal executive statement, desk portrait, and signature sign-off.
 */
export function CeoMessageSection({
  locale,
  dict,
  sectionTheme = 'ivory',
}: CeoMessageSectionProps) {
  const msg = dict.ceoMessage;
  const bgClass = sectionTheme === 'sage' ? 'section-sage' : 'section-ivory';

  return (
    <section
      className={`section ${bgClass} ceo-message-section`}
      aria-labelledby="ceo-message-heading"
    >
      <div className="container">
        <div className="ceo-message-grid">
          {/* Left Column: Executive Desk Portrait & Monogram Seal */}
          <div className="ceo-message-portrait-col">
            <ExecutivePortraitCard
              src={SITE_CONFIG.portraits.heroDesk}
              alt={`${msg.name} — ${msg.role}`}
              caption={msg.name}
              subcaption={msg.jurisdiction}
              aspectRatio="4 / 4.6"
            />
          </div>

          {/* Right Column: Architectural Executive Letterhead */}
          <article className="ceo-letter-card">
            <div className="ceo-letter-top-bar">
              <span className="eyebrow" style={{ marginBottom: 0 }}>
                {msg.eyebrow}
              </span>
              <svg
                className="ceo-letter-monogram"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="2"
                  width="60"
                  height="60"
                  rx="2"
                  fill="#173B38"
                  stroke="#A17D43"
                  strokeWidth="1.5"
                />
                <text
                  x="32"
                  y="41"
                  textAnchor="middle"
                  fill="#F7F5EF"
                  fontFamily="var(--font-serif)"
                  fontSize="24"
                  fontWeight="600"
                  letterSpacing="0.06em"
                >
                  IT
                </text>
              </svg>
            </div>

            <blockquote className="ceo-quote-headline" id="ceo-message-heading">
              {msg.quoteHeadline}
            </blockquote>

            <p className="ceo-salutation">{msg.salutation}</p>

            <div className="ceo-letter-body">
              <p className="body-copy ceo-dropcap-paragraph">{msg.paragraph1}</p>
              <p className="body-copy">{msg.paragraph2}</p>
              <p className="body-copy">{msg.paragraph3}</p>
            </div>

            <footer className="ceo-letter-footer">
              <div className="ceo-signoff-block">
                <span className="ceo-signoff-label">{msg.signOffLabel}</span>
                <SignatureLogo
                  variant="forest"
                  className="ceo-letter-signature"
                  ariaLabel="Ibrahima Traore"
                />
                <p className="ceo-signoff-name">{msg.name}</p>
                <p className="ceo-signoff-role">{msg.role}</p>
              </div>

              <div className="ceo-letter-action">
                <Link
                  href={getLocalizedPath(locale, 'contact')}
                  className="editorial-link"
                >
                  <span>{msg.ctaLabel}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
