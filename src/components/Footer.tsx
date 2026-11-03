'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, SITE_CONFIG, getLocalizedPath, type Locale } from '@/config/site';
import { switchLocaleInPath, type SiteDictionary } from '@/i18n';
import { SignatureLogo } from './SignatureLogo';

interface FooterProps {
  locale: Locale;
  dict: SiteDictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const pathname = usePathname() || `/${locale}/`;
  const currentYear = new Date().getFullYear();

  const languageNames: Record<Locale, string> = {
    en: 'English (EN)',
    fr: 'Français (FR)',
    es: 'Español (ES)',
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Ivory Signature & Professional Description */}
          <div>
            <Link
              href={getLocalizedPath(locale, 'home')}
              aria-label={dict.a11y.homeSignatureLabel}
              style={{ display: 'inline-block' }}
            >
              <SignatureLogo
                variant="ivory"
                className="footer-signature"
                ariaLabel="Ibrahima Traore"
              />
            </Link>
            <p className="footer-description">{dict.footer.description}</p>

            {/* Official Verified Executive Email */}
            {SITE_CONFIG.verifiedEmail && (
              <div style={{ marginTop: '1.15rem' }}>
                <a
                  href={`mailto:${SITE_CONFIG.verifiedEmail}`}
                  className="footer-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.05rem',
                    fontWeight: 500,
                    color: 'var(--color-accent-accessible-dark)',
                  }}
                >
                  <span>{SITE_CONFIG.verifiedEmail}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            )}

            {/* Official Social Links (rendered when verified URLs are configured) */}
            {SITE_CONFIG.socialLinks.linkedin && (
              <div style={{ marginTop: '0.75rem' }}>
                <a
                  href={SITE_CONFIG.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 500,
                  }}
                >
                  <span>LinkedIn</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
          </div>

          {/* Column 2: Main Navigation */}
          <nav aria-label={dict.a11y.footerNavigation}>
            <h2 className="footer-heading">{dict.footer.navigationHeading}</h2>
            <ul className="footer-list">
              <li>
                <Link href={getLocalizedPath(locale, 'home')} className="footer-link">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath(locale, 'profile')} className="footer-link">
                  {dict.nav.profile}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath(locale, 'companies')} className="footer-link">
                  {dict.nav.companies}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath(locale, 'partnerships')} className="footer-link">
                  {dict.nav.partnerships}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath(locale, 'contact')} className="footer-link">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3: Language Selector */}
          <div>
            <h2 className="footer-heading">{dict.footer.languagesHeading}</h2>
            <ul className="footer-list">
              {LOCALES.map((targetLocale) => {
                const isActive = targetLocale === locale;
                const targetHref = switchLocaleInPath(pathname, targetLocale);
                return (
                  <li key={targetLocale}>
                    <Link
                      href={targetHref}
                      lang={targetLocale}
                      hrefLang={targetLocale}
                      className="footer-link"
                      aria-current={isActive ? 'true' : undefined}
                      style={{
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? '#FFFFFF' : undefined,
                      }}
                    >
                      {languageNames[targetLocale]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Privacy Information */}
          <div>
            <h2 className="footer-heading">{dict.footer.legalHeading}</h2>
            <p
              style={{
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'rgba(247, 245, 239, 0.78)',
                marginBottom: '0.85rem',
              }}
            >
              {dict.footer.privacySummary}
            </p>
            <Link
              href={getLocalizedPath(locale, 'privacy')}
              className="footer-link"
              style={{
                fontWeight: 500,
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              {dict.footer.privacyPolicyLink}
            </Link>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom">
          <p>
            {dict.footer.copyrightPrefix} {currentYear} {dict.footer.allRightsReserved}
          </p>
          <p style={{ letterSpacing: '0.06em', fontSize: '0.8rem' }}>
            Sport World Africa · Kouankan IV SL
          </p>
        </div>
      </div>
    </footer>
  );
}
