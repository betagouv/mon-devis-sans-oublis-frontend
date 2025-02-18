'use client';

import { useState } from 'react';

import DeleteErrorModal from '../Modal/DeleteErrorModal/DeleteErrorModal';
import ErrorFeedbacksModal from '../Modal/ErrorFeedbacksModal/ErrorFeedbacksModal';
import { useConseillerRoutes } from '@/hooks';
import { ErrorDetails } from '@/types';
import wording from '@/wording';

export interface QuoteErrorLineProps {
  deleteErrorReasons?: { id: string; label: string }[];
  error: ErrorDetails;
  quoteCheckId: string;
  isLastErrorInTable?: boolean;
  onDeleteError?: (
    quoteCheckId: string,
    errorDetailsId: string,
    reason: string
  ) => void;
  onFeedbackSubmit: (comment: string, id: string) => void;
  onUndoDeleteError?: (quoteCheckId: string, errorDetailsId: string) => void;
}

const QuoteErrorLine: React.FC<QuoteErrorLineProps> = ({
  deleteErrorReasons,
  error,
  isLastErrorInTable = false,
  quoteCheckId,
  onDeleteError,
  onFeedbackSubmit,
  onUndoDeleteError,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isConseillerAndEdit } = useConseillerRoutes();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleFeedbackSubmit = (comment: string) => {
    onFeedbackSubmit(comment, error.id);
    closeModal();
  };

  const handleDeleteConfirm = (
    quoteCheckId: string,
    errorDetailsId: string,
    reason: string
  ) => {
    if (!reason) {
      console.error('reason est vide dans QuoteErrorLine !');
      return;
    }

    const foundReason = deleteErrorReasons?.find((r) => r.id === reason);
    const finalReason = foundReason ? foundReason.label : reason;

    onDeleteError?.(quoteCheckId, errorDetailsId, finalReason);
  };

  return (
    <>
      <tr
        className={`font-bold ${
          isLastErrorInTable
            ? 'border-b-0'
            : 'border-bottom-grey border-top-grey'
        }`}
        key={`${error.id}-${error.deleted}`}
      >
        <td className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4'>
          <span
            className={
              error.deleted ? 'line-through text-gray-500 opacity-50' : ''
            }
          >
            {error.title}
          </span>
          <span className='flex gap-2'>
            {error.solution && !error.deleted && (
              <button
                className='fr-btn fr-btn--tertiary fr-btn--sm shrink-0'
                onClick={openModal}
              >
                {wording.components.quote_error_card.button_see_detail}
              </button>
            )}
            {isConseillerAndEdit && !error.deleted && (
              <button
                className='fr-btn fr-btn--tertiary fr-icon-delete-line fr-btn--sm'
                onClick={openDeleteModal}
              />
            )}
            {isConseillerAndEdit && error.deleted && onUndoDeleteError && (
              <button
                className='fr-btn fr-btn--tertiary fr-btn--sm'
                onClick={() => {
                  onUndoDeleteError(quoteCheckId, error.id);
                }}
              >
                Annuler la suppression
              </button>
            )}
          </span>
        </td>
      </tr>
      {error.solution && (
        <ErrorFeedbacksModal
          errorDetailsId={error.id}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmitFeedback={handleFeedbackSubmit}
          problem={error.problem || ''}
          solution={error.solution}
          title={error.title}
        />
      )}
      <DeleteErrorModal
        deleteErrorReasons={deleteErrorReasons}
        errorCategory={error.category}
        errorDetailsId={error.id}
        errorTitle={error.title}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDeleteError={handleDeleteConfirm}
        quoteCheckId={quoteCheckId}
      />
    </>
  );
};

export default QuoteErrorLine;
