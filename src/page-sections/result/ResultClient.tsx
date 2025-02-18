'use client';

import { useEffect, useState } from 'react';

import InvalidQuote from './InvalidQuote';
import ValidQuote from './ValidQuote';
import { FILE_ERROR } from '../upload/UploadClient';
import { LoadingDots, Toast, GlobalErrorFeedbacksModal } from '@/components';
import { useScrollPosition } from '@/hooks';
import { quoteService } from '@/lib/api';
import { Status, Rating, Category, QuoteChecksId } from '@/types';
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
    reason: string
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

  useEffect(() => {
    setCurrentDevis(initialDevis);
  }, [initialDevis]);

  useEffect(() => {
    if (shouldRedirectToUpload) {
      setIsLoading(false);
      return;
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

        const isInvalidStatus = data.status === Status.INVALID;
        const hasFileError =
          data.error_details?.[0]?.category === Category.FILE;
        if (isInvalidStatus && hasFileError) {
          setShouldRedirectToUpload(true);
          setIsLoading(false);
          return;
        }

        if (data.status === Status.VALID || data.status === Status.INVALID) {
          setIsLoading(false);
          isPollingActive = false;
          return;
        }

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

  useEffect(() => {
    if (shouldRedirectToUpload) {
      window.location.href = `/${profile}/televersement?error=${FILE_ERROR}`;
    }
  }, [shouldRedirectToUpload, profile]);

  const handleDeleteError = async (
    quoteCheckId: string,
    errorDetailsId: string,
    reason: string
  ) => {
    if (!reason) {
      console.error('🚨 ERREUR: reason est vide dans ResultClient !');
      return;
    }

    if (!currentDevis) {
      console.error('🚨 ERREUR: currentDevis est null dans ResultClient !');
      return;
    }

    const foundReason = deleteErrorReasons?.find((r) => r.id === reason);
    const finalReason = foundReason ? foundReason.label : reason;

    setCurrentDevis((prevDevis) => {
      if (!prevDevis) return null;
      return {
        ...prevDevis,
        error_details: prevDevis.error_details.map((error) =>
          error.id === errorDetailsId ? { ...error, deleted: true } : error
        ),
      };
    });

    if (onDeleteErrorDetail) {
      await onDeleteErrorDetail(quoteCheckId, errorDetailsId, finalReason);
    }
  };

  const handleUndoDeleteError = async (
    quoteCheckId: string,
    errorDetailsId: string
  ) => {
    if (!currentDevis) return;

    setCurrentDevis((prevDevis) => {
      if (!prevDevis) return null;
      return {
        ...prevDevis,
        error_details: prevDevis.error_details.map((error) =>
          error.id === errorDetailsId ? { ...error, deleted: false } : error
        ),
      };
    });

    try {
      const response = await quoteService.undoDeleteErrorDetail(
        quoteCheckId,
        errorDetailsId,
        'Annulation de la suppression'
      );

      if (response === null) {
        return;
      }

      const updatedDevis = await quoteService.getQuote(quoteCheckId);
      setCurrentDevis(updatedDevis);
    } catch (error) {
      console.error("Erreur lors de l'annulation de la suppression:", error);

      setCurrentDevis((prevDevis) => {
        if (!prevDevis) return null;
        return {
          ...prevDevis,
          error_details: prevDevis.error_details.map((error) =>
            error.id === errorDetailsId ? { ...error, deleted: true } : error
          ),
        };
      });
    }
  };

  const handleHelpClick = async (comment: string, errorDetailsId: string) => {
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
        {currentDevis?.status === Status.VALID ? (
          <ValidQuote
            analysisDate={formatDateToFrench(currentDevis.finished_at)}
            uploadedFileName={currentDevis.filename}
          />
        ) : currentDevis ? (
          <InvalidQuote
            key={`${currentDevis.id}-${JSON.stringify(
              currentDevis.error_details
            )}`}
            analysisDate={formatDateToFrench(currentDevis.finished_at)}
            deleteErrorReasons={deleteErrorReasons}
            gestes={currentDevis.gestes}
            id={currentDevis.id}
            list={currentDevis.error_details.map((error) => ({
              ...error,
              className: error.deleted
                ? 'line-through text-gray-500 opacity-50'
                : '',
            }))}
            onDeleteError={handleDeleteError}
            onHelpClick={handleHelpClick}
            onUndoDeleteError={handleUndoDeleteError}
            uploadedFileName={currentDevis.filename || ''}
          />
        ) : null}
        <div className='fr-container flex flex-col relative'>
          <div
            className={`${
              currentDevis?.status === Status.VALID
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
