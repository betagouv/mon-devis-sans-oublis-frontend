'use client';

import { use, useEffect, useState } from 'react';
import InvalidQuote from './InvalidQuote';
import ValidQuote from './ValidQuote';
import { GlobalErrorFeedbacksModal, LoadingDots } from '@/components';
import { QuoteChecksId, Rating, Status } from '@/types';

export default function Devis({
  params: initialParams,
}: {
  params: Promise<{ quoteCheckId: string }>;
}) {
  const params = use(initialParams);

  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);
  const [isButtonSticky, setIsButtonSticky] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUrlCopied, setIsUrlCopied] = useState<boolean>(false);
  const [showThankYouMessage, setShowThankYouMessage] =
    useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = 0.8; // scroll 80%

      if (scrollPosition >= scrollHeight * threshold) {
        setIsButtonSticky(false);
      } else {
        setIsButtonSticky(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let retryCount = 0;
    const maxRetries = 20;

    const fetchDevis = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/quote_checks/${params.quoteCheckId}`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
            },
          }
        );

        const data = await response.json();
        setCurrentDevis(data);

        if (data.status === Status.PENDING) {
          intervalId = setInterval(async () => {
            if (retryCount >= maxRetries) {
              clearInterval(intervalId!);
              setIsLoading(false);
              return;
            }

            const retryResponse = await fetch(
              `/api/quote_checks/${params.quoteCheckId}`,
              {
                headers: {
                  accept: 'application/json',
                  Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
                },
              }
            );

            const retryData = await retryResponse.json();
            if (retryData.status !== Status.PENDING) {
              setCurrentDevis(retryData);
              clearInterval(intervalId!);
              setIsLoading(false);
            }
            retryCount++;
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

    fetchDevis();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [params.quoteCheckId]);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsUrlCopied(true);
  };

  const handleHelpClick = async (
    comment: string | null,
    errorDetailsId: string
  ) => {
    try {
      const response = await fetch(
        `/api/quote_checks/${params.quoteCheckId}/error_details/${errorDetailsId}/feedbacks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send feedbacks');
      }
    } catch (error) {
      console.error('Error sending feedbacks:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitFeedback = async (
    comment: string | null,
    email: string | null,
    rating: Rating | null
  ) => {
    try {
      const response = await fetch(
        `/api/quote_checks/${params.quoteCheckId}/feedbacks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
          },
          body: JSON.stringify({
            comment: comment,
            email: email,
            rating: rating,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(
          `Failed to send feedback: ${response.status} ${response.statusText}`
        );
      }

      setShowThankYouMessage(true);
      setTimeout(() => {
        setShowThankYouMessage(false);
        closeModal();
      }, 3000);
    } catch (error) {
      console.error('Error sending feedback:', error);
      throw error;
    }
  };

  return !isLoading && currentDevis ? (
    <div className='fr-container-fluid fr-py-10w'>
      {currentDevis.status === Status.VALID ? (
        <ValidQuote uploadedFileName={currentDevis.filename} />
      ) : (
        <InvalidQuote
          isUrlCopied={isUrlCopied}
          list={currentDevis.error_details || []}
          onCopyUrl={copyUrlToClipboard}
          onHelpClick={handleHelpClick}
          uploadedFileName={currentDevis.filename}
        />
      )}
      <div className='fr-container flex flex-col relative'>
        <div
          className={`${
            isButtonSticky ? 'fixed' : 'absolute'
          } bottom-40 right-50 self-end z-9`}
        >
          <button
            className='fr-btn fr-btn--icon-right fr-icon-star-fill rounded-full'
            onClick={openModal}
          >
            Donner mon avis
          </button>
        </div>
        {isModalOpen && (
          <GlobalErrorFeedbacksModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmitFeedback={handleSubmitFeedback}
            showThankYouMessage={showThankYouMessage}
          />
        )}
      </div>
    </div>
  ) : (
    <section className='fr-container-fluid fr-py-10w h-[500px] flex flex-col items-center justify-center'>
      <LoadingDots title='Analyse en cours' />
      <p>
        Votre devis est en cours de traitement, cela peut prendre plusieurs
        secondes.
      </p>
    </section>
  );
}
