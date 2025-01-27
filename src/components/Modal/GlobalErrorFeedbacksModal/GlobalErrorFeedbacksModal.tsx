'use client';

import { useState } from 'react';

import Modal, { ModalPosition } from '../Modal';
import { RoundCheckboxGroup } from '@/components';
import { Rating } from '@/types';
import wording from '@/wording';

export interface GlobalErrorFeedbacksModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmitFeedback: (
    comment: string,
    email: string | null,
    rating: Rating
  ) => void;
}

const GlobalErrorFeedbacksModal: React.FC<GlobalErrorFeedbacksModalProps> = ({
  isOpen,
  onClose,
  onSubmitFeedback,
}) => {
  const [comment, setComment] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [rating, setRating] = useState<Rating | null>(null);

  const options: Rating[] = [0, 1, 2, 3, 4, 5];

  const handleSelect = (value: Rating) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (comment !== null && rating !== null) {
      onSubmitFeedback(comment, email, rating);
    }
  };

  return (
    <Modal
      backButtonLabel={
        wording.components.global_error_feedbacks_modal.back_button_label
      }
      isOpen={isOpen}
      onClose={onClose}
      position={ModalPosition.CENTER}
    >
      <h4 className='text-[var(--text-title-blue-france)] fr-mb-1w flex items-center gap-2'>
        <span className='fr-icon-questionnaire-fill mt-1' aria-hidden='true' />
        {wording.components.global_error_feedbacks_modal.title}
      </h4>
      <p className='fr-text--sm text-[var(--text-mention-grey)]'>
        {wording.components.global_error_feedbacks_modal.description}
      </p>
      <p className='text-[var(--text-title-blue-france)] font-bold fr-mb-2w'>
        {wording.components.global_error_feedbacks_modal.rating_title}
      </p>
      <RoundCheckboxGroup
        onChange={handleSelect}
        options={options.map((value) => ({ value }))}
      />
      <div className='fr-input-group' id='input-group-72'>
        <label className='fr-label' htmlFor='global-error-feedbacks-input'>
          <p className='text-[var(--text-title-blue-france)] font-bold fr-mb-1w fr-mt-3w'>
            {wording.components.global_error_feedbacks_modal.comment_title}
          </p>
        </label>
        <textarea
          className='fr-input'
          aria-describedby='global-error-feedbacks-input-messages'
          id='global-error-feedbacks-input'
          value={comment || ''}
          onChange={(e) => setComment(e.target.value)}
        />
        <div
          className='fr-messages-group'
          id='global-error-feedbacks-input-messages'
          aria-live='polite'
        />
      </div>
      <p className='text-[var(--text-title-blue-france)] font-bold fr-mb-1w'>
        {wording.components.global_error_feedbacks_modal.contact_title}
      </p>
      <div className='fr-input-group' id='input-group-152'>
        <label
          className='fr-label fr-mt-0'
          htmlFor='global-error-feedbacks-input'
        >
          <p className='fr-text--xs fr-mb-1w fr-mt-0 text-[var(--text-mention-grey)]'>
            {
              wording.components.global_error_feedbacks_modal
                .contact_title_optional
            }
          </p>
        </label>
        <input
          aria-describedby='global-error-feedbacks-input-messages'
          className='fr-input'
          id='global-error-feedbacks-input'
          placeholder={
            wording.components.global_error_feedbacks_modal.email_placeholder
          }
          type='email'
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div
          aria-live='polite'
          className='fr-messages-group'
          id='storybook-input-messages'
        />
      </div>
      <button
        className='fr-btn fr-btn--primary fr-mt-3w self-end'
        onClick={handleSubmit}
        disabled={comment === null || rating === null}
      >
        {wording.components.global_error_feedbacks_modal.submit_button}
      </button>
    </Modal>
  );
};

export default GlobalErrorFeedbacksModal;
