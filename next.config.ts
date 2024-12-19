import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  transpilePackages: ['@gouvfr/dsfr'],
  async rewrites() {
    const quoteChecks = process.env.NEXT_PUBLIC_API_QUOTE_CHECKS;
    const quoteChecksId = process.env.NEXT_PUBLIC_API_QUOTE_CHECKS_ID;

    if (!quoteChecks || !quoteChecksId) {
      throw new Error('API URLs are not defined in the environment variables.');
    }

    return [
      {
        destination: quoteChecks,
        source: '/api/quote_checks',
      },
      {
        destination: quoteChecksId,
        source: '/api/quote_checks/:id',
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  automaticVercelMonitors: false,
  disableLogger: true,
  hideSourceMaps: true,
  org: process.env.NEXT_PUBLIC_SENTRY_ORG,
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
  sentryUrl: process.env.NEXT_PUBLIC_SENTRY_URL,
  silent: !process.env.CI,
  sourcemaps: {
    disable: true,
  },
  widenClientFileUpload: false,
});
