'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { GlobalErrorFeedbacksModal, LoadingDots, Toast } from '@/components';
import { useQuotePolling, useScrollPosition } from '@/hooks';
import { FILE_ERROR } from '@/page-sections';
import { Status, Rating, QuoteChecksId } from '@/types';
import { quoteService } from '@/lib/api';
import ValidQuote from './ValidQuote';
import InvalidQuote from './InvalidQuote';

interface DevisClientProps {
  currentDevis: QuoteChecksId | null;
  profile: string;
  quoteCheckId: string;
}

export default function QuoteResultClient({
  currentDevis,
  profile,
  quoteCheckId,
}: DevisClientProps) {
  const router = useRouter();

  const { isLoading, shouldRedirectToUpload } = useQuotePolling(quoteCheckId);
  const isButtonSticky = useScrollPosition();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUrlCopied, setIsUrlCopied] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

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
    comment: string | null,
    email: string | null,
    rating: Rating | null
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
      throw error;
    }
  };

  useEffect(() => {
    if (shouldRedirectToUpload) {
      window.location.href = `/${profile}/televersement?error=${FILE_ERROR}`;
    }
  }, [shouldRedirectToUpload, profile]);

  if (isLoading || shouldRedirectToUpload) {
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

  return (
    <div className='fr-container-fluid fr-py-10w'>
      {currentDevis?.status === Status.VALID ? (
        <ValidQuote uploadedFileName={currentDevis.filename} />
      ) : (
        <InvalidQuote
          isUrlCopied={isUrlCopied}
          list={currentDevis?.error_details || []}
          onCopyUrl={copyUrlToClipboard}
          onHelpClick={handleHelpClick}
          uploadedFileName={currentDevis?.filename || ''}
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
        {showToast && (
          <Toast
            duration={4000}
            message='Merci pour votre retour !'
            onClose={() => setShowToast(false)}
          />
        )}
        {isModalOpen && (
          <GlobalErrorFeedbacksModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmitFeedback={handleSubmitFeedback}
          />
        )}
      </div>
    </div>
  );
}
