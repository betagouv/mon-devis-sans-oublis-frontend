import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  transpilePackages: ['@gouvfr/dsfr'],
  async rewrites() {
    const profilesDestination = process.env.NEXT_PUBLIC_API_PROFILES;
    const quoteChecksDestination = process.env.NEXT_PUBLIC_API_QUOTE_CHECKS;

    if (!profilesDestination || !quoteChecksDestination) {
      throw new Error('API URLs are not defined in the environment variables.');
    }

    return [
      {
        source: '/api/profiles',
        destination: profilesDestination,
      },
      {
        source: '/api/quote_checks',
        destination: quoteChecksDestination,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.NEXT_PUBLIC_SENTRY_ORG,
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
  sentryUrl: process.env.NEXT_PUBLIC_SENTRY_URL,
  silent: !process.env.CI,
  widenClientFileUpload: false,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: false,
  sourcemaps: {
    disable: true,
  },
});
