'use client';

import { useState, useEffect } from 'react';

import { quoteService } from '@/lib/api';
import { Category, QuoteChecksId, Status } from '@/types';

export const useQuotePolling = (quoteCheckId: string) => {
  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldRedirectToUpload, setShouldRedirectToUpload] =
    useState<boolean>(false);

  useEffect(() => {
    if (shouldRedirectToUpload) {
      setIsLoading(false);
      return;
    }

    let intervalId: NodeJS.Timeout | undefined = undefined;
    let isPollingActive = true;
    let retryCount = 0;
    const maxRetries = 20;

    const pollQuote = async () => {
      if (!isPollingActive) return;

      try {
        const data = await quoteService.getQuote(quoteCheckId);
        setCurrentDevis(data);

        const isInvalidStatus = data.status === Status.INVALID;
        const hasFileError =
          data.error_details?.[0]?.category === Category.FILE;

        if (isInvalidStatus && hasFileError) {
          setShouldRedirectToUpload(true);
          setIsLoading(false);
          return;
        }

        if (data.status === Status.PENDING && retryCount < maxRetries) {
          retryCount++;
          intervalId = setTimeout(pollQuote, 5000);
        } else {
          setIsLoading(false);
        }
      } catch {
        setCurrentDevis(null);
        setIsLoading(false);
      }
    };

    pollQuote();

    return () => {
      isPollingActive = false;
      if (intervalId) {
        clearTimeout(intervalId);
      }
    };
  }, [quoteCheckId, shouldRedirectToUpload]);

  return { currentDevis, isLoading, shouldRedirectToUpload };
};
