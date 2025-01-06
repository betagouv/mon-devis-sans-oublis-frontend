'use client';

import { use, useEffect, useState } from 'react';
import InvalidQuote from './InvalidQuote';
import ValidQuote from './ValidQuote';
import { GlobalErrorFeedbacksModal, LoadingDots } from '@/components';
import { QuoteChecksId, Rating, Status, useDataContext } from '@/context';

export default function Devis({
  params: initialParams,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = use(initialParams);
  const { data, updateDevis } = useDataContext();

  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);
  const [isButtonSticky, setIsButtonSticky] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isErrorDetailsLoading, setIsErrorDetailsLoading] = useState(true);
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
    const fetchDevis = async () => {
      const devis = data.find((devis) => devis.id === params.id);

      if (!devis) {
        setCurrentDevis(null);
        setIsLoading(false);
        return;
      }

      setCurrentDevis(devis);
      setIsLoading(false);

      if (!devis.error_details || devis.error_details.length === 0) {
        let retryCount = 0;
        const maxRetries = 10;
        let detailedData = devis;

        while (detailedData.error_details === null && retryCount < maxRetries) {
          const response = await fetch(`/api/quote_checks/${devis.id}`, {
            headers: {
              accept: 'application/json',
              Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
            },
          });
          detailedData = await response.json();

          if (detailedData.error_details !== null) {
            updateDevis({
              ...detailedData,
              uploadedFileName: devis.uploadedFileName,
            });
            setCurrentDevis({
              ...detailedData,
              uploadedFileName: devis.uploadedFileName,
            });
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
          retryCount++;
        }
      }

      setIsErrorDetailsLoading(false);
    };

    fetchDevis();
  }, [data, params.id, updateDevis]);

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
        `/api/quote_checks/${params.id}/error_details/${errorId}/feedbacks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
          },
          body: JSON.stringify({ comment, is_helpful: isHelpful }),
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
    comment: string | undefined,
    email: string | undefined,
    rating: Rating
  ) => {
    try {
      const response = await fetch(`/api/quote_checks/${params.id}/feedbacks`, {
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
      });

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

  console.log('Devis', currentDevis);

  return !isLoading && currentDevis && !isErrorDetailsLoading ? (
    <div className='fr-container-fluid fr-py-10w'>
      {currentDevis.status === Status.VALID ? (
        <ValidQuote uploadedFileName={currentDevis.uploadedFileName} />
      ) : (
        <InvalidQuote
          isUrlCopied={isUrlCopied}
          list={currentDevis.error_details || []}
          onCopyUrl={copyUrlToClipboard}
          onHelpClick={handleHelpClick}
          uploadedFileName={currentDevis.uploadedFileName}
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
  ) : (
    <section className='fr-container-fluid fr-py-10w h-[600px] flex items-center justify-center'>
      <LoadingDots title='Chargement du devis' />
    </section>
  );
}
