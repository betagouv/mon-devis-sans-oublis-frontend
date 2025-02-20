'use client';

import { useState } from 'react';

import Modal, { ModalPosition } from '../Modal';
import { Category } from '@/types';
import wording from '@/wording';

export interface CommentErrorModalProps {
  errorCategory: string;
  errorDetailsId: string;
  errorSolution?: string;
  errorTitle: string;
  initialComment: string | null;
  isOpen: boolean;
  onAddErrorComment: (
    quoteCheckId: string,
    errorDetailsId: string,
    comment: string
  ) => void;
  onClose?: () => void;
  quoteCheckId: string;
}

const CommentErrorModal: React.FC<CommentErrorModalProps> = ({
  errorCategory,
  errorDetailsId,
  errorSolution,
  errorTitle,
  initialComment,
  isOpen,
  onAddErrorComment,
  onClose,
  quoteCheckId,
}) => {
  const [comment, setComment] = useState<string>(initialComment || '');

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (!comment.trim()) {
      console.warn('Le commentaire ne peut pas être vide !');
      return;
    }

    onAddErrorComment(quoteCheckId, errorDetailsId, comment.trim());
    onClose?.();
  };

  return (
    <Modal
      backButtonLabel={
        wording.components.global_error_feedbacks_modal.back_button_label
      }
      data-testid='comment-error-modal'
      isOpen={isOpen}
      onClose={onClose}
      position={ModalPosition.CENTER}
    >
      <div className='flex flex-col h-full'>
        <h4
          className='fr-mb-1w flex items-center gap-2'
          data-testid='comment-error-title'
        >
          <span
            className='fr-icon-chat-3-fill fr-icon--lg mt-1!'
            aria-hidden='true'
          />
          Ajouter un commentaire
        </h4>

        <div className='overflow-hidden rounded-lg border-shadow fr-mb-1w fr-mt-2w'>
          <table className='w-full'>
            <caption className='bg-[var(--background-action-low-blue-france)] font-bold text-left p-4 flex items-center justify-between'>
              <span className='flex gap-2 items-center'>
                <p className='fr-mb-0 text-[var(--text-default-grey)]!'>
                  {errorCategory === Category.GESTES &&
                    wording.components.quote_error_card.title_gestes}
                  {errorCategory === Category.ADMIN &&
                    wording.components.quote_error_card.title_admin}
                </p>
              </span>
            </caption>
            <tbody>
              <tr className='font-bold border-bottom-grey border-top-grey'>
                <td className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4'>
                  {errorTitle}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {errorSolution && (
          <div className='overflow-hidden rounded-lg border-shadow'>
            <table className='w-full'>
              <tbody>
                <tr>
                  <td className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4 pt-4 pb-2 font-bold text-[var(--text-disabled-grey)]'>
                    Détail de la correction proposée par Mon Devis Sans Oublis
                  </td>
                  <td className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4 pb-4 pt-2'>
                    {errorSolution}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <p className='fr-text--lg font-bold text-[var(--background-action-high-blue-france)] fr-mb-2w fr-mt-4w'>
          Commenter la correction proposée
          <span className='fr-icon-arrow-down-fill ml-1' />
        </p>
        <div className='fr-input-group' id='input-group-72'>
          <label className='fr-label' htmlFor='comment-error-input'>
            Commentaire
          </label>
          <textarea
            aria-describedby='comment-error-input-messages'
            className='fr-input h-24'
            id='comment-error-input'
            onChange={handleCommentChange}
            value={comment}
          />
          <div
            aria-live='polite'
            className='fr-messages-group'
            id='comment-error-input-messages'
          />
        </div>
        <div className='mt-8 flex justify-end gap-4'>
          <button
            className='fr-btn fr-btn--secondary'
            data-testid='cancel-comment-button'
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className='fr-btn fr-btn--danger'
            data-testid='confirm-comment-button'
            disabled={!comment.trim()}
            onClick={handleSubmit}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CommentErrorModal;
