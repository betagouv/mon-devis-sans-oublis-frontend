'use client';

import { useState } from 'react';

import ErrorFeedbacksModal from '../Modal/ErrorFeedbacksModal/ErrorFeedbacksModal';
import { useConseillerRoutes } from '@/hooks';
import { ErrorDetails, ErrorDetailsDeletionReasons } from '@/types';
import wording from '@/wording';

interface QuoteErrorLineProps {
  deletionReason?: keyof ErrorDetailsDeletionReasons | string;
  error: ErrorDetails;
  quoteCheckId: string;
  isLastErrorInTable?: boolean;
  onDeleteError?: (
    quoteCheckId: string,
    errorDetailsId: string,
    reason?: keyof ErrorDetailsDeletionReasons | string
  ) => void;
  onFeedbackSubmit: (comment: string, id: string) => void;
}

const QuoteErrorLine: React.FC<QuoteErrorLineProps> = ({
  deletionReason,
  error,
  isLastErrorInTable = false,
  quoteCheckId,
  onDeleteError,
  onFeedbackSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { isConseillerAndEdit } = useConseillerRoutes();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFeedbackSubmit = (comment: string) => {
    onFeedbackSubmit(comment, error.id);
    closeModal();
  };

  const handleDeleteClick = async () => {
    if (!onDeleteError) return;

    setIsDeleting(true);
    try {
      console.log(
        'Deleting error with ID:',
        error.id,
        'and quoteCheckId:',
        quoteCheckId
      );
      await onDeleteError(quoteCheckId, error.id, deletionReason);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
    setIsDeleting(false);
  };

  return (
    <>
      <tr
        className={`font-bold ${
          isLastErrorInTable
            ? 'border-b-0'
            : 'border-bottom-grey border-top-grey'
        }`}
      >
        <td className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4'>
          {error.title}
          <span className='flex gap-2'>
            {error.solution && (
              <button
                className='fr-btn fr-btn--tertiary fr-btn--sm shrink-0'
                onClick={openModal}
              >
                {wording.components.quote_error_card.button_see_detail}
              </button>
            )}
            {isConseillerAndEdit && (
              <button
                className={`fr-btn fr-btn--tertiary fr-icon-delete-line fr-btn--sm ${
                  isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isDeleting}
                onClick={handleDeleteClick}
              />
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
    </>
  );
};

export default QuoteErrorLine;
