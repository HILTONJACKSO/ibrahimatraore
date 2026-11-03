import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, isValidLocale } from '@/i18n';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Skip static assets, API routes, sitemap, robots, and brand files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/brand') ||
    pathname.startsWith('/fonts') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Optional Production HTTPS & Preferred Host Redirect
  const enforceHttps = process.env.NEXT_PUBLIC_ENFORCE_HTTPS === 'true';
  const preferredHost = process.env.NEXT_PUBLIC_PREFERRED_HOST || '';
  const proto = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('host') || '';

  if (
    process.env.NODE_ENV === 'production' &&
    ((enforceHttps && proto === 'http') ||
      (preferredHost && host && host !== preferredHost && !host.startsWith('localhost')))
  ) {
    const targetHost = preferredHost || host;
    const redirectUrl = new URL(`https://${targetHost}${pathname}${search}`);
    return NextResponse.redirect(redirectUrl, 308);
  }

  // 3. Redirect root "/" to "/en/"
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}/`;
    return NextResponse.redirect(url, 308);
  }

  // 4. Determine active locale from first path segment and pass via request header
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] || DEFAULT_LOCALE;
  const resolvedLocale = isValidLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', resolvedLocale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
