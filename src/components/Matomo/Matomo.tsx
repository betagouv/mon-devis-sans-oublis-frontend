'use client';

import { useEffect, useCallback, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function MatomoContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const trackPageView = useCallback(() => {
    // @ts-expect-error - Matomo types are not available, _mtm is a global variable
    const _mtm = (window._mtm = window._mtm || []);
    _mtm.push({
      'mtm.startTime': new Date().getTime(),
      event: 'mtm.PageView',
      PageTitle: document.title,
      PageUrl: window.location.href,
      PageOrigin: window.location.origin,
    });
  }, []);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_MATOMO_URL) {
      console.warn('NEXT_PUBLIC_MATOMO_URL is not defined');
      return;
    }

    // @ts-expect-error - Matomo types are not available, _mtm is a global variable
    const _mtm = (window._mtm = window._mtm || []);
    _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });
    const d = document;
    const g = d.createElement('script');
    const s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = process.env.NEXT_PUBLIC_MATOMO_URL;
    s.parentNode?.insertBefore(g, s);
  }, []);

  useEffect(() => {
    trackPageView();
  }, [pathname, searchParams, trackPageView]);

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return null;
}

// MatomoContent is wrapped in Suspense because useSearchParams() may suspend while
// the route segment is loading on the server. This prevents client-side rendering bailout.
export default function Matomo() {
  return (
    <Suspense fallback={null}>
      <MatomoContent />
    </Suspense>
  );
}
