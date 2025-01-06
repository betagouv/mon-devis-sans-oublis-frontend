'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Matomo() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const trackPageView = useCallback(() => {
    // @ts-ignore
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

    // @ts-ignore
    var _mtm = (window._mtm = window._mtm || []);
    _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = process.env.NEXT_PUBLIC_MATOMO_URL;
    s.parentNode?.insertBefore(g, s);
  }, []);

  useEffect(() => {
    trackPageView();
  }, [pathname, searchParams, trackPageView]);

  return null;
}
