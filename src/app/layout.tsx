import React from 'react';
import type { Viewport } from 'next';
import { headers } from 'next/headers';
import { DEFAULT_LOCALE, isValidLocale } from '@/i18n';
import '@/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#173B38',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const rawLocale = headersList.get('x-locale') || DEFAULT_LOCALE;
  const htmlLang = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/source-serif-4-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
