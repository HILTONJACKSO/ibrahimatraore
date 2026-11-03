import React from 'react';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '@/config/site';
import { getDictionary, isValidLocale } from '@/i18n';
import { APPROVED_CASE_STUDIES } from '@/content/expansion';
import { CaseStudyTemplate } from '@/templates/CaseStudyTemplate';

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang) || !SITE_CONFIG.features.enableCaseStudies) {
    notFound();
  }

  const caseStudy = APPROVED_CASE_STUDIES.find(
    (item) => item.locale === lang && item.slug === slug
  );
  if (!caseStudy) {
    notFound();
  }

  const dict = getDictionary(lang);
  return <CaseStudyTemplate locale={lang} dict={dict} caseStudy={caseStudy} />;
}
