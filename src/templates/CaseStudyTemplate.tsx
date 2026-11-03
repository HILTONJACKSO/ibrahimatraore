import React from 'react';
import Link from 'next/link';
import { getLocalizedPath, type Locale } from '@/config/site';
import type { SiteDictionary } from '@/i18n';
import type { ExecutiveCaseStudy } from '@/content/expansion';

interface CaseStudyTemplateProps {
  locale: Locale;
  dict: SiteDictionary;
  caseStudy: ExecutiveCaseStudy;
}

export function CaseStudyTemplate({
  locale,
  dict,
  caseStudy,
}: CaseStudyTemplateProps) {
  return (
    <article className="animate-editorial">
      {/* Header */}
      <section className="section section-ivory">
        <div className="container">
          <span className="eyebrow">
            {caseStudy.entity} · {caseStudy.category} ({caseStudy.year})
          </span>
          <h1 className="page-heading" style={{ marginBottom: '1.5rem' }}>
            {caseStudy.title}
          </h1>
          <p className="lead-copy" style={{ marginBottom: '3rem' }}>
            {caseStudy.summary}
          </p>

          {/* Key Facts Strip */}
          {caseStudy.keyFacts.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                padding: '2rem',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-rule-strong)',
              }}
            >
              {caseStudy.keyFacts.map((fact) => (
                <div key={fact.label}>
                  <span className="meta-item-label">{fact.label}</span>
                  <span className="meta-item-value">{fact.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body Sections */}
      <section className="section section-sage">
        <div className="container">
          <div className="three-column-grid" style={{ marginTop: 0 }}>
            <div className="editorial-panel">
              <div>
                <span className="panel-category">01</span>
                {caseStudy.context.map((p, i) => (
                  <p key={i} className="body-copy" style={{ marginBottom: '1rem' }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="editorial-panel">
              <div>
                <span className="panel-category">02</span>
                {caseStudy.execution.map((p, i) => (
                  <p key={i} className="body-copy" style={{ marginBottom: '1rem' }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="editorial-panel">
              <div>
                <span className="panel-category">03</span>
                {caseStudy.outcome.map((p, i) => (
                  <p key={i} className="body-copy" style={{ marginBottom: '1rem' }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <Link href={getLocalizedPath(locale, 'contact')} className="btn btn-primary">
              <span>{dict.nav.contact}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
