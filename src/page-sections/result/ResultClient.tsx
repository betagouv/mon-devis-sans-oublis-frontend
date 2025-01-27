'use client';

import { useEffect, useState } from 'react';

import { LoadingDots, Toast, GlobalErrorFeedbacksModal } from '@/components';
import { useScrollPosition } from '@/hooks';
import { quoteService } from '@/lib/api';
import {
  Status,
  Rating,
  Category,
  QuoteChecksIdEnrichedErrorDetails,
} from '@/types';
import InvalidQuote from './InvalidQuote';
import ValidQuote from './ValidQuote';
import { FILE_ERROR } from '../upload/UploadClient';

interface ResultClientProps {
  currentDevis: QuoteChecksIdEnrichedErrorDetails | null;
  profile: string;
  quoteCheckId: string;
}

export default function ResultClient({
  currentDevis: initialDevis,
  profile,
  quoteCheckId,
}: ResultClientProps) {
  const isButtonSticky = useScrollPosition();

  const [currentDevis, setCurrentDevis] =
    useState<QuoteChecksIdEnrichedErrorDetails | null>(initialDevis);
  const [isLoading, setIsLoading] = useState<boolean>(
    !initialDevis || initialDevis.status === Status.PENDING
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isUrlCopied, setIsUrlCopied] = useState<boolean>(false);
  const [shouldRedirectToUpload, setShouldRedirectToUpload] =
    useState<boolean>(false);

  // Polling logic to update `currentDevis` if status is PENDING
  useEffect(() => {
    if (shouldRedirectToUpload) {
      setIsLoading(false);
      return; // Stop polling if redirection is needed or status is final
    }

    let isPollingActive = true;
    let retryCount = 0;
    const maxRetries = 20;
    const pollingInterval = 5000;

    const pollQuote = async () => {
      if (!isPollingActive) return;

      try {
        const data = await quoteService.getQuote(quoteCheckId);
        setCurrentDevis(data);

        // Redirection condition
        const isInvalidStatus = data.status === Status.INVALID;
        const hasFileError =
          data.error_details?.[0]?.category === Category.FILE;

        if (isInvalidStatus && hasFileError) {
          setShouldRedirectToUpload(true);
          setIsLoading(false);
          return;
        }

        // Stop polling if status is final
        if (data.status === Status.VALID || data.status === Status.INVALID) {
          setIsLoading(false);
          isPollingActive = false;
          return;
        }

        // Continue polling if status is still PENDING
        if (data.status === Status.PENDING && retryCount < maxRetries) {
          retryCount++;
          setTimeout(pollQuote, pollingInterval);
        } else {
          setIsLoading(false);
          isPollingActive = false;
        }
      } catch {
        setIsLoading(false);
        isPollingActive = false;
      }
    };

    pollQuote();

    return () => {
      isPollingActive = false;
    };
  }, [quoteCheckId, shouldRedirectToUpload]);

  // Trigger redirection when shouldRedirectToUpload changes
  useEffect(() => {
    if (shouldRedirectToUpload) {
      window.location.href = `/${profile}/televersement?error=${FILE_ERROR}`;
    }
  }, [shouldRedirectToUpload, profile]);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsUrlCopied(true);
  };

  const handleHelpClick = async (
    comment: string | null,
    errorDetailsId: string
  ) => {
    try {
      await quoteService.sendErrorFeedback(
        comment,
        errorDetailsId,
        quoteCheckId
      );
    } catch (error) {
      console.error('Error sending feedbacks:', error);
    }
  };

  const handleSubmitFeedback = async (
    comment: string,
    email: string | null,
    rating: Rating
  ) => {
    try {
      await quoteService.sendGlobalFeedback(quoteCheckId, {
        comment,
        email,
        rating,
      });
      setIsModalOpen(false);
      setShowToast(true);
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  if (isLoading) {
    return (
      <section className='fr-container-fluid fr-py-10w h-[500px] flex flex-col items-center justify-center'>
        <LoadingDots title='Analyse en cours' />
        <p>
          Votre devis est en cours de traitement, cela peut prendre plusieurs
          secondes.
        </p>
      </section>
    );
  }

  if (!currentDevis) {
    return (
      <section className='fr-container-fluid fr-py-10w'>
        <p>
          Impossible de récupérer les données. Veuillez réessayer plus tard.
        </p>
      </section>
    );
  }

  if (shouldRedirectToUpload) {
    return (
      <section className='fr-container-fluid fr-py-10w h-[500px] flex flex-col items-center justify-center'>
        <LoadingDots title='Redirection en cours...' />
        <p>Vous allez être redirigé, veuillez patienter.</p>
      </section>
    );
  }

  return (
    <>
      {showToast && (
        <div className='fixed top-10 right-20 z-50'>
          <Toast
            duration={3000}
            message='Votre avis a bien été pris en compte. Merci pour votre aide précieuse !'
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
      <div className='fr-container-fluid fr-py-10w'>
        {currentDevis.status === Status.VALID ? (
          <ValidQuote uploadedFileName={currentDevis.filename} />
        ) : (
          <InvalidQuote
            isUrlCopied={isUrlCopied}
            list={currentDevis.error_details || []}
            onCopyUrl={copyUrlToClipboard}
            onHelpClick={handleHelpClick}
            uploadedFileName={currentDevis.filename || ''}
          />
        )}
        <div className='fr-container flex flex-col relative'>
          <div
            className={`${
              isButtonSticky
                ? 'fixed bottom-14 right-50'
                : 'absolute bottom-40 right-50'
            } self-end z-20`}
          >
            <button
              className='fr-btn fr-btn--icon-right fr-icon-star-fill rounded-full'
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Donner mon avis
            </button>
          </div>
          {isModalOpen && (
            <GlobalErrorFeedbacksModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmitFeedback={handleSubmitFeedback}
            />
          )}
        </div>
      </div>
    </>
  );
}
