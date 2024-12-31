import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  transpilePackages: ['@gouvfr/dsfr'],
  async rewrites() {
    const quoteChecks = process.env.NEXT_PUBLIC_API_QUOTE_CHECKS;
    const quoteChecksId = process.env.NEXT_PUBLIC_API_QUOTE_CHECKS_ID;
    const quoteChecksIdFeedbacks =
      process.env.NEXT_PUBLIC_API_QUOTE_CHECKS_ID_FEEDBACKS;
    const quoteChecksIdErrorDetailsIdFeedbacks =
      process.env.NEXT_PUBLIC_API_QUOTE_CHECKS_ID_ERROR_DETAILS_ID_FEEDBACKS;

    if (
      !quoteChecks ||
      !quoteChecksId ||
      !quoteChecksIdFeedbacks ||
      !quoteChecksIdErrorDetailsIdFeedbacks
    ) {
      throw new Error('API URLs are not defined in the environment variables.');
    }

    return [
      {
        destination: quoteChecks,
        source: '/api/quote_checks',
      },
      {
        destination: quoteChecksId,
        source: '/api/quote_checks/:quote_check_id',
      },
      {
        destination: quoteChecksIdFeedbacks,
        source: '/api/quote_checks/:quote_check_id/feedbacks',
      },
      {
        destination: quoteChecksIdErrorDetailsIdFeedbacks,
        source:
          '/api/quote_checks/:quote_check_id/error_details/:error_detail_id/feedbacks',
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
