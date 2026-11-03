import React from 'react';
import { notFound } from 'next/navigation';
import { LOCALES, getDictionary, isValidLocale } from '@/i18n';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollRevealObserver } from '@/components/ScrollRevealObserver';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <>
      <ScrollRevealObserver />
      <Header locale={lang} dict={dict} />
      <main id="main-content">{children}</main>
      <Footer locale={lang} dict={dict} />
    </>
  );
}
