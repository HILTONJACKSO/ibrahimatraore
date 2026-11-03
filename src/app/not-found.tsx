import React from 'react';
import Link from 'next/link';
import { headers } from 'next/headers';
import { DEFAULT_LOCALE, getDictionary, isValidLocale } from '@/i18n';
import { getLocalizedPath } from '@/config/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default async function NotFound() {
  const headersList = await headers();
  const rawLocale = headersList.get('x-locale') || DEFAULT_LOCALE;
  const locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main id="main-content">
        <section className="section section-ivory">
          <div className="container" style={{ maxWidth: '820px' }}>
            <span className="eyebrow">{dict.notFound.eyebrow}</span>
            <h1 className="page-heading" style={{ marginBottom: '1.5rem' }}>
              {dict.notFound.heading}
            </h1>
            <p className="body-copy" style={{ marginBottom: '2.5rem' }}>
              {dict.notFound.description}
            </p>
            <div className="btn-group">
              <Link href={getLocalizedPath(locale, 'home')} className="btn btn-primary">
                <span>{dict.notFound.primaryAction}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={getLocalizedPath(locale, 'contact')} className="btn btn-secondary">
                <span>{dict.notFound.secondaryAction}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
