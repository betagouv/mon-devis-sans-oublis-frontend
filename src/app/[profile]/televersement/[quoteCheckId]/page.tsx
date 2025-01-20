import { use } from 'react';

import { quoteService } from '@/lib/api';
import { ResultClient } from '@/page-sections';

export default function Result({
  params: initialParams,
}: {
  params: Promise<{ profile: string; quoteCheckId: string }>;
}) {
  const params = use(initialParams);

  const fetchCurrentDevis = async () => {
    try {
      return await quoteService.getQuote(params.quoteCheckId);
    } catch (error) {
      console.error('Error fetching devis:', error);
      return null;
    }
  };

  const currentDevis = use(fetchCurrentDevis());

  return (
    <ResultClient
      currentDevis={currentDevis}
      profile={params.profile}
      quoteCheckId={params.quoteCheckId}
    />
  );
}
