'use client';

import { use, useEffect, useState } from 'react';

import InvalidQuote from './InvalidQuote';
import ValidQuote from './ValidQuote';
import { GlobalErrorFeedbacksModal } from '@/components';
import { QuoteChecksId, Rating, Status, useDataContext } from '@/context';

export default function Devis({
  params: initialParams,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = use(initialParams);
  const { data } = useDataContext();

  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);
  const [isButtonSticky, setIsButtonSticky] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUrlCopied, setIsUrlCopied] = useState<boolean>(false);

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
    const fetchDevis = () => {
      const devis = data.find((devis) => devis.id === params.id);
      setCurrentDevis(devis || null);
      setIsLoading(false);
    };

    fetchDevis();
  }, [data, params.id]);

  if (isLoading) {
    return (
      <section className='fr-container-fluid fr-py-10w'>
        <div className='flex flex-col items-center justify-center'>
          <h1>Chargement du devis...</h1>
        </div>
      </section>
    );
  }

  if (!currentDevis) {
    return null;
  }

  const uploadedFileName = (
    localStorage.getItem('uploadedFileName') || ''
  ).substring(0, 20);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsUrlCopied(true);
  };

  const handleHelpClick = async (
    comment: string,
    errorId: string,
    isHelpful: boolean
  ) => {
    try {
      const response = await fetch(
        `/api/quote_checks/${currentDevis.id}/error_details/${errorId}/feedbacks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
          },
          body: JSON.stringify({
            comment: comment,
            is_helpful: isHelpful,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send feedbacks');
      }
    } catch (error) {
      console.error('Error sending feedbacks:', error);
      throw error;
    }
  };

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitFeedback = async (
    comment: string | undefined,
    email: string | undefined,
    rating: Rating
  ) => {
    try {
      const response = await fetch(
        `/api/quote_checks/${currentDevis.id}/feedbacks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
          },
          body: JSON.stringify({
            comment: comment || '',
            email: email || '',
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
    } catch (error) {
      console.error('Error sending feedback:', error);
      throw error;
    }
  };

  return (
    <div className='fr-container-fluid fr-py-10w'>
      {currentDevis.status === Status.VALID ? (
        <ValidQuote uploadedFileName={uploadedFileName} />
      ) : (
        <InvalidQuote
          isUrlCopied={isUrlCopied}
          list={currentDevis.error_details}
          onCopyUrl={copyUrlToClipboard}
          onHelpClick={handleHelpClick}
          uploadedFileName={uploadedFileName}
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
            rating={0}
          />
        )}
      </div>
    </div>
  );
}
