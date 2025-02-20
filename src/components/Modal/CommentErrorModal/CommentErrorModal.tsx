'use client';

import { useState } from 'react';

import Modal, { ModalPosition } from '../Modal';
import { DropdownCheckboxList } from '@/components';
import { Category } from '@/types';
import wording from '@/wording';

export interface CommentErrorModalProps {
  errorCategory: string;
  errorDetailsId: string;
  errorSolution?: string;
  errorTitle: string;
  isOpen: boolean;
  onClose?: () => void;
  onDeleteError: (
    quoteCheckId: string,
    errorDetailsId: string,
    reason: string
  ) => void;
  quoteCheckId: string;
}

const CommentErrorModal: React.FC<CommentErrorModalProps> = ({
  errorCategory,
  errorDetailsId,
  errorSolution,
  errorTitle,
  isOpen,
  onClose,
  onDeleteError,
  quoteCheckId,
}) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const handleReasonChange = (values: string[]) => {
    if (values.includes('custom')) {
      setIsCustom(true);
      setSelectedReason('custom');
    } else {
      setIsCustom(false);
      const lastValue = values[values.length - 1];
      setSelectedReason(lastValue || null);
    }
  };

  const handleSubmit = () => {
    if (isCustom && !customReason.trim()) {
      console.warn('Raison personnalisée vide !');
      return;
    }

    if (!isCustom && !selectedReason) {
      console.warn('Aucune raison sélectionnée !');
      return;
    }

    const finalReason = isCustom ? customReason.trim() : selectedReason;

    if (!finalReason) {
      console.error("finalReason est vide avant l'envoi !");
      return;
    }

    onDeleteError(quoteCheckId, errorDetailsId, finalReason);
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
          <label className='fr-label' htmlFor='global-error-feedbacks-input'>
            Commentaire
          </label>
          <textarea
            className='fr-input h-24'
            aria-describedby='global-error-feedbacks-input-messages'
            id='global-error-feedbacks-input'
            value={''}
            onChange={() => {}}
          />
          <div
            className='fr-messages-group'
            id='global-error-feedbacks-input-messages'
            aria-live='polite'
          />
        </div>
        <div className='mt-8 flex justify-end gap-4'>
          <button
            className='fr-btn fr-btn--secondary'
            onClick={onClose}
            data-testid='cancel-comment-button'
          >
            Annuler
          </button>
          <button
            className='fr-btn fr-btn--danger'
            onClick={handleSubmit}
            disabled={
              (!selectedReason && !customReason.trim()) ||
              (isCustom && !customReason.trim())
            }
            data-testid='confirm-comment-button'
          >
            Enregistrer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CommentErrorModal;
