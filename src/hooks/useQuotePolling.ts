'use client';

import { useState, useEffect } from 'react';

import { quoteService } from '@/lib/api';
import { QuoteChecksId, Status } from '@/types';

export const useQuotePolling = (quoteCheckId: string) => {
  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    let retryCount = 0;
    const maxRetries = 20;

    const pollQuote = async () => {
      try {
        const data = await quoteService.getQuote(quoteCheckId);
        setCurrentDevis(data);

        if (data.status === Status.PENDING && retryCount < maxRetries) {
          intervalId = setInterval(async () => {
            retryCount++;
            const retryData = await quoteService.getQuote(quoteCheckId);

            if (retryData.status !== Status.PENDING) {
              setCurrentDevis(retryData);
              if (intervalId) clearInterval(intervalId);
              setIsLoading(false);
            }
          }, 5000);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du devis :', error);
        setCurrentDevis(null);
        setIsLoading(false);
      }
    };

    pollQuote();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [quoteCheckId]);

  return { currentDevis, isLoading };
};
