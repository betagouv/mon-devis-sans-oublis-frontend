'use client';

import { useState } from 'react';
import Image from 'next/image';

import Modal from '../Modal';
import wording from '@/wording';

export enum ModalPosition {
  CENTER = 'center',
  RIGHT = 'right',
}

export interface ErrorFeedbacksModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmitFeedback?: (comment: string | null) => void;
  problem: string | null;
  solution: string | null;
  title: string;
}

const ErrorFeedbacksModal: React.FC<ErrorFeedbacksModalProps> = ({
  isOpen,
  onClose,
  onSubmitFeedback,
  problem,
  solution,
  title,
}) => {
  const [comment, setComment] = useState<string | null>(null);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const handleSubmit = () => {
    if (onSubmitFeedback) {
      onSubmitFeedback(comment);
      setShowThankYouMessage(true);
    }
  };

  return (
    <Modal
      backButtonLabel={
        wording.components.error_feedbacks_modal.back_button_label
      }
      isOpen={isOpen}
      onClose={onClose}
      position={ModalPosition.RIGHT}
    >
      <div className='flex-grow'>
        <Image
          alt={wording.components.error_feedbacks_modal.icon_alt}
          className='mt-10'
          height={64}
          src={wording.components.error_feedbacks_modal.icon_src}
          width={64}
        />
        <h4 className='mb-8'>{title}</h4>
        {problem && (
          <>
            <p className='fr-mb-1w fr-text--lead text-[var(--text-title-blue-france)] font-bold'>
              {wording.components.error_feedbacks_modal.problem_title}
            </p>
            <p>{problem}</p>
          </>
        )}
        {solution && (
          <>
            <p className='fr-mb-1w fr-mt-3w fr-text--lead text-[var(--text-title-blue-france)] font-bold'>
              {wording.components.error_feedbacks_modal.solution_title}
            </p>
            <p>{solution}</p>
          </>
        )}
      </div>
      <div className='mb-8'>
        {showThankYouMessage ? (
          <div className='fr-alert fr-alert--success fr-mb-3w'>
            <p>Merci pour votre retour !</p>
          </div>
        ) : (
          <div className='fr-input-group mt-4 flex flex-col border-grey p-6 rounded-lg'>
            <label
              className='text-[var(--text-default-grey)] font-bold mb-2'
              htmlFor='textarea-input'
            >
              {
                wording.components.error_feedbacks_modal
                  .correction_helpful_optional
              }
            </label>
            <textarea
              aria-describedby='textarea-input-messages'
              className='fr-input'
              id='textarea-input'
              onChange={(e) => setComment(e.target.value)}
              placeholder='Les corrections du devis sont...'
              value={comment || ''}
            />
            <div
              className='fr-messages-group'
              id='textarea-input-messages'
              aria-live='polite'
            />
            <button
              className='fr-btn fr-btn--primary self-end mt-4'
              disabled={comment === null}
              onClick={handleSubmit}
            >
              {wording.components.error_feedbacks_modal.submit_button}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ErrorFeedbacksModal;
