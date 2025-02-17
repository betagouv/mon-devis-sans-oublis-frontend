'use client';

import { useEffect, useState } from 'react';

import InvalidQuote from './InvalidQuote';
import ValidQuote from './ValidQuote';
import { FILE_ERROR } from '../upload/UploadClient';
import { LoadingDots, Toast, GlobalErrorFeedbacksModal } from '@/components';
import { useScrollPosition } from '@/hooks';
import { quoteService } from '@/lib/api';
import {
  Status,
  Rating,
  Category,
  QuoteChecksId,
  ErrorDetailsDeletionReasons,
} from '@/types';
import { formatDateToFrench } from '@/utils';
import wording from '@/wording';

interface ResultClientProps {
  currentDevis: QuoteChecksId | null;
  deleteErrorReasons?: { id: string; label: string }[];
  profile: string;
  quoteCheckId: string;
  canDelete?: boolean;
  onDeleteErrorDetail?: (
    quoteCheckId: string,
    errorDetailsId: string,
    reason?: string
  ) => void;
}

export default function ResultClient({
  currentDevis: initialDevis,
  deleteErrorReasons,
  profile,
  quoteCheckId,
  canDelete = false,
  onDeleteErrorDetail,
}: ResultClientProps) {
  const isButtonSticky = useScrollPosition();

  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(
    initialDevis
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    !initialDevis || initialDevis.status === Status.PENDING
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
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

  const handleDeleteError = async (
    quoteCheckId: string,
    errorDetailsId: string,
    reason?: keyof ErrorDetailsDeletionReasons | string
  ) => {
    try {
      if (onDeleteErrorDetail) {
        await onDeleteErrorDetail(quoteCheckId, errorDetailsId, reason);
      }

      if (canDelete) {
        setCurrentDevis((prevDevis) => {
          if (!prevDevis) return prevDevis;

          return {
            ...prevDevis,
            error_details: prevDevis.error_details.filter(
              (error) => error.id !== errorDetailsId
            ),
          };
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      alert('La suppression a échoué.');
    }
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
        <LoadingDots
          title={wording.page_upload_id.analysis_in_progress_title}
        />
        <p>{wording.page_upload_id.analysis_in_progress}</p>
      </section>
    );
  }

  if (!currentDevis) {
    return (
      <section className='fr-container-fluid fr-py-10w'>
        <p>{wording.page_upload_id.analysis_error}</p>
      </section>
    );
  }

  if (shouldRedirectToUpload) {
    return (
      <section className='fr-container-fluid fr-py-10w h-[500px] flex flex-col items-center justify-center'>
        <LoadingDots title={wording.page_upload_id.analysis_redirect_title} />
        <p>{wording.page_upload_id.analysis_redirect}</p>
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
          <ValidQuote
            analysisDate={formatDateToFrench(currentDevis.finished_at)}
            uploadedFileName={currentDevis.filename}
          />
        ) : (
          <InvalidQuote
            key={canDelete ? currentDevis?.error_details.length : undefined}
            analysisDate={formatDateToFrench(currentDevis.finished_at)}
            deleteErrorReasons={deleteErrorReasons}
            gestes={currentDevis.gestes}
            id={currentDevis.id}
            list={currentDevis.error_details}
            onDeleteError={handleDeleteError}
            onHelpClick={handleHelpClick}
            uploadedFileName={currentDevis.filename || ''}
          />
        )}
        <div className='fr-container flex flex-col relative'>
          <div
            className={`${
              currentDevis.status === Status.VALID
                ? 'fixed bottom-14 md:right-37 right-4'
                : isButtonSticky
                ? 'fixed bottom-84 md:right-37 right-4'
                : 'absolute bottom-[-40px] md:right-6 right-4'
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
