'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, getLocalizedPath, type Locale, type PageKey } from '@/config/site';
import { switchLocaleInPath, type SiteDictionary } from '@/i18n';
import { SignatureLogo } from './SignatureLogo';

interface HeaderProps {
  locale: Locale;
  dict: SiteDictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname() || `/${locale}/`;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems: Array<{ key: PageKey; label: string; href: string }> = [
    { key: 'profile', label: dict.nav.profile, href: getLocalizedPath(locale, 'profile') },
    { key: 'companies', label: dict.nav.companies, href: getLocalizedPath(locale, 'companies') },
    {
      key: 'partnerships',
      label: dict.nav.partnerships,
      href: getLocalizedPath(locale, 'partnerships'),
    },
    { key: 'contact', label: dict.nav.contact, href: getLocalizedPath(locale, 'contact') },
  ];

  const isCurrentPage = (href: string) => {
    const cleanPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const cleanHref = href.endsWith('/') ? href : `${href}/`;
    return cleanPath === cleanHref;
  };

  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        {dict.a11y.skipToContent}
      </a>

      <div className="container header-inner">
        {/* Left: Forest-Green Signature Wordmark */}
        <Link
          href={getLocalizedPath(locale, 'home')}
          className="brand-link"
          aria-label={dict.a11y.homeSignatureLabel}
        >
          <SignatureLogo
            variant="forest"
            className="brand-signature-svg"
            ariaLabel="Ibrahima Traore"
          />
        </Link>

        {/* Center: Primary Navigation (Profile · Companies · Partnerships · Contact) */}
        <nav className="desktop-nav" aria-label={dict.a11y.mainNavigation}>
          <ul className="main-nav-list">
            {navItems.map((item) => {
              const active = isCurrentPage(item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="main-nav-link"
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: EN / FR / ES Language Selector & Mobile Menu Button */}
        <div className="header-right">
          <div
            className="lang-switcher"
            role="group"
            aria-label={dict.a11y.languageSelector}
          >
            {LOCALES.map((targetLocale) => {
              const isActive = targetLocale === locale;
              const targetHref = switchLocaleInPath(pathname, targetLocale);
              return (
                <Link
                  key={targetLocale}
                  href={targetHref}
                  className="lang-link"
                  lang={targetLocale}
                  hrefLang={targetLocale}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`${dict.a11y.switchLanguageTo} ${targetLocale.toUpperCase()}`}
                >
                  {targetLocale.toUpperCase()}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={mobileMenuOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M4 4L16 16M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3 5.5H17M3 10H17M3 14.5H17"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-panel" className="mobile-nav-panel">
          <nav aria-label={dict.a11y.mainNavigation}>
            <ul className="mobile-nav-list">
              <li>
                <Link
                  href={getLocalizedPath(locale, 'home')}
                  className="mobile-nav-link"
                  aria-current={isCurrentPage(getLocalizedPath(locale, 'home')) ? 'page' : undefined}
                >
                  <span>{dict.nav.home}</span>
                  <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>
                    →
                  </span>
                </Link>
              </li>
              {navItems.map((item) => {
                const active = isCurrentPage(item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="mobile-nav-link"
                      aria-current={active ? 'page' : undefined}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
