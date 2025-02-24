'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import InvalidQuote from './InvalidQuote';
import ValidQuote from './ValidQuote';
import { FILE_ERROR } from '../upload/UploadClient';
import {
  GlobalCommentModal,
  GlobalErrorFeedbacksModal,
  LoadingDots,
  Notice,
  Toast,
} from '@/components';
import { useConseillerRoutes, useScrollPosition } from '@/hooks';
import { quoteService } from '@/lib/api';
import { Category, ErrorDetails, QuoteChecksId, Rating, Status } from '@/types';
import { formatDateToFrench } from '@/utils';
import wording from '@/wording';

interface ResultClientProps {
  currentDevis: QuoteChecksId | null;
  deleteErrorReasons?: { id: string; label: string }[];
  onDeleteErrorDetail?: (
    quoteCheckId: string,
    errorDetailsId: string,
    reason: string
  ) => void;
  profile: string;
  quoteCheckId: string;
  showDeletedErrors: boolean;
}

export default function ResultClient({
  currentDevis: initialDevis,
  deleteErrorReasons,
  onDeleteErrorDetail,
  profile,
  quoteCheckId,
  showDeletedErrors,
}: ResultClientProps) {
  const pathname = usePathname();
  const isButtonSticky = useScrollPosition();

  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(
    initialDevis
  );
  const [hasFeedbackBeenSubmitted, setHasFeedbackBeenSubmitted] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(
    !initialDevis || initialDevis.status === Status.PENDING
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isGlobalCommentModalOpen, setIsGlobalCommentModalOpen] =
    useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [shouldRedirectToUpload, setShouldRedirectToUpload] =
    useState<boolean>(false);

  const { isConseillerAndEdit } = useConseillerRoutes();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

        if (!data || !data.status) {
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(pollQuote, pollingInterval);
          } else {
            setIsLoading(false);
          }
          return;
        }

        const isInvalidStatus = data.status === Status.INVALID;
        const fileErrors =
          data.error_details?.filter(
            (error: ErrorDetails) => error.category === Category.FILE
          ) || [];
        if (isInvalidStatus && fileErrors.length > 0) {
          setShouldRedirectToUpload(true);
          setIsLoading(false);
          return;
        }

        setCurrentDevis(data);

        if (data.status === Status.VALID || data.status === Status.INVALID) {
          setIsLoading(false);
          isPollingActive = false;
        } else if (data.status === Status.PENDING) {
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(pollQuote, pollingInterval);
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error polling quote:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(pollQuote, pollingInterval);
        } else {
          setIsLoading(false);
        }
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

  const handleAddErrorComment = async (
    quoteCheckId: string,
    errorDetailsId: string,
    comment: string
  ) => {
    if (!currentDevis) return;

    try {
      await quoteService.addErrorComment(quoteCheckId, errorDetailsId, comment);

      setCurrentDevis((prevDevis) => {
        if (!prevDevis) return null;
        return {
          ...prevDevis,
          error_details: prevDevis.error_details.map((error) =>
            error.id === errorDetailsId ? { ...error, comment } : error
          ),
        };
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
    }
  };

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
        errorDetailsId
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
      document.body.style.overflow = 'unset';
      setIsModalOpen(false);
      setShowToast(true);
      setHasFeedbackBeenSubmitted(true);
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  const handleDeleteErrorComment = async (
    quoteCheckId: string,
    errorDetailsId: string
  ) => {
    if (!currentDevis) return;

    try {
      await quoteService.removeErrorDetailComment(quoteCheckId, errorDetailsId);

      const updatedDevis = await quoteService.getQuote(quoteCheckId);
      setCurrentDevis(updatedDevis);
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);

      try {
        const refreshedDevis = await quoteService.getQuote(quoteCheckId);
        setCurrentDevis(refreshedDevis);
      } catch (refreshError) {
        console.error(
          'Erreur lors du rafraîchissement des données:',
          refreshError
        );
      }
    }
  };

  const handleSubmitGlobalComment = async (
    quoteCheckId: string,
    comment: string
  ) => {
    try {
      await quoteService.addQuoteComment(quoteCheckId, comment);
      const updatedDevis = await quoteService.getQuote(quoteCheckId);
      setCurrentDevis(updatedDevis);
      setIsGlobalCommentModalOpen(false);
    } catch (error) {
      console.error('Error adding global comment:', error);
    }
  };

  const handleDeleteGlobalComment = async (quoteCheckId: string) => {
    try {
      await quoteService.removeQuoteComment(quoteCheckId);
      const updatedDevis = await quoteService.getQuote(quoteCheckId);
      setCurrentDevis(updatedDevis);
    } catch (error) {
      console.error('Error deleting global comment:', error);
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
      {showDeletedErrors && currentDevis && isConseillerAndEdit && (
        <Notice
          className='fr-notice--warning'
          description='Vous pouvez ajouter des commentaires et/ou supprimer des corrections.'
          title='Mode personnalisation activé'
        />
      )}
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
            analysisDate={formatDateToFrench(currentDevis.finished_at)}
            comment={currentDevis.comment || ''}
            deleteErrorReasons={deleteErrorReasons}
            gestes={currentDevis.gestes}
            id={currentDevis.id}
            key={`${currentDevis.id}-${JSON.stringify(
              currentDevis.error_details
            )}`}
            list={(currentDevis.error_details || [])
              .filter((error) => showDeletedErrors || !error.deleted)
              .map((error) => ({
                ...error,
                className: error.deleted
                  ? 'line-through text-gray-500 opacity-50'
                  : '',
              }))}
            onAddErrorComment={handleAddErrorComment}
            onAddGlobalComment={handleSubmitGlobalComment}
            onDeleteError={handleDeleteError}
            onDeleteErrorComment={handleDeleteErrorComment}
            onDeleteGlobalComment={handleDeleteGlobalComment}
            onHelpClick={handleHelpClick}
            onOpenGlobalCommentModal={() => setIsGlobalCommentModalOpen(true)}
            onUndoDeleteError={handleUndoDeleteError}
            uploadedFileName={currentDevis.filename || ''}
          />
        ) : null}
        <GlobalCommentModal
          isOpen={isGlobalCommentModalOpen}
          onClose={() => setIsGlobalCommentModalOpen(false)}
          onSubmitComment={(comment) =>
            handleSubmitGlobalComment(quoteCheckId, comment)
          }
          quoteCheckId={quoteCheckId}
        />
        <div className='fr-container flex flex-col relative'>
          {!hasFeedbackBeenSubmitted && (
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
    </>
  );
}
