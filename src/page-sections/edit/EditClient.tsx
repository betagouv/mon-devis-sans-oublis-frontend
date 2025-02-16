'use client';

import { useEffect, useState } from 'react';

import { quoteService } from '@/lib/api';
import { ResultClient } from '@/page-sections';
import { QuoteChecksId } from '@/types';

export default function EditClient({
  params,
}: {
  params: { profile: string; quoteCheckId: string };
}) {
  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentDevis = async () => {
      try {
        const data = await quoteService.getQuote(params.quoteCheckId);
        setCurrentDevis(data);
      } catch (error) {
        console.error('Error fetching devis:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentDevis();
  }, [params.quoteCheckId]);

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <ResultClient
      currentDevis={currentDevis}
      profile={params.profile}
      quoteCheckId={params.quoteCheckId}
    />
  );
}
