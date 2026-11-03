import React from 'react';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '@/config/site';
import { getDictionary, isValidLocale } from '@/i18n';
import { APPROVED_ARTICLES } from '@/content/expansion';
import { ArticleTemplate } from '@/templates/ArticleTemplate';

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang) || !SITE_CONFIG.features.enableInsights) {
    notFound();
  }

  const article = APPROVED_ARTICLES.find(
    (item) => item.locale === lang && item.slug === slug
  );
  if (!article) {
    notFound();
  }

  const dict = getDictionary(lang);
  return <ArticleTemplate locale={lang} dict={dict} article={article} />;
}
