import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';
import { getDictionary, isValidLocale } from '@/i18n';
import { buildPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { ContactForm } from '@/components/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : 'en';
  return buildPageMetadata(locale, 'contact');
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const c = dict.contact;

  return (
    <>
      <StructuredData locale={lang} dict={dict} page="contact" />
      <Breadcrumbs
        locale={lang}
        dict={dict}
        currentPage="contact"
        currentLabel={dict.nav.contact}
      />

      {/* PAGE HEADER */}
      <section className="section section-ivory animate-editorial">
        <div className="container">
          <span className="eyebrow">{c.eyebrow}</span>
          <h1 className="page-heading" style={{ marginBottom: '1.5rem' }}>
            {c.title}
          </h1>
          <p className="lead-copy">{c.introduction}</p>
        </div>
      </section>

      {/* CONTACT DETAILS & ENQUIRY FORM */}
      <section className="section section-sage">
        <div className="container">
          <div className="contact-layout">
            {/* Left Sidebar: Corporate Scope & Verified Email (when supplied) */}
            <aside>
              <div
                style={{
                  backgroundColor: 'var(--color-bg-main)',
                  border: '1px solid var(--color-rule-strong)',
                  padding: '2.25rem',
                  marginBottom: '1.75rem',
                }}
              >
                <h2 className="card-heading" style={{ marginBottom: '1.5rem' }}>
                  {c.directContactHeading}
                </h2>

                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="meta-item-label">{c.jurisdictionLabel}</span>
                  <p style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>
                    {c.jurisdictionText}
                  </p>
                </div>

                <div
                  style={{
                    marginBottom: SITE_CONFIG.verifiedEmail ? '1.5rem' : 0,
                  }}
                >
                  <span className="meta-item-label">{c.companiesLabel}</span>
                  <p
                    style={{
                      fontSize: '0.98rem',
                      lineHeight: 1.6,
                      color: 'var(--color-text-supporting)',
                    }}
                  >
                    {c.companiesText}
                  </p>
                </div>

                {SITE_CONFIG.verifiedEmail && (
                  <div
                    style={{
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--color-rule-light)',
                    }}
                  >
                    <span className="meta-item-label">{c.verifiedEmailLabel}</span>
                    <a
                      href={`mailto:${SITE_CONFIG.verifiedEmail}`}
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '4px',
                      }}
                    >
                      {SITE_CONFIG.verifiedEmail}
                    </a>
                  </div>
                )}
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-bg-main)',
                  padding: '2rem 2.25rem',
                  borderLeft: '3px solid var(--color-accent)',
                }}
              >
                <h3
                  className="card-heading"
                  style={{
                    color: 'var(--color-bg-main)',
                    fontSize: '1.3rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  {c.responseGuidanceHeading}
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    color: 'rgba(247, 245, 239, 0.85)',
                  }}
                >
                  {c.responseGuidanceText}
                </p>
              </div>
            </aside>

            {/* Right Column: Accessible Enquiry Form */}
            <ContactForm locale={lang} dict={dict} />
          </div>
        </div>
      </section>
    </>
  );
}
