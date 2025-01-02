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
  onSubmitFeedback?: (comment: string, isHelpful: boolean) => void;
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
  const [activeButton, setActiveButton] = useState<boolean | null>(null);
  const [comment, setComment] = useState<string>('');

  const handleFeedbackClick = (isHelpful: boolean) => {
    setActiveButton(activeButton === isHelpful ? null : isHelpful);
  };

  const handleSubmit = () => {
    if (activeButton && onSubmitFeedback) {
      onSubmitFeedback(comment, activeButton);
      setActiveButton(null);
      setComment('');
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
        <p className='font-bold fr-mb-1w text-[var(--text-title-grey)]'>
          {wording.components.error_feedbacks_modal.correction_helpful}
        </p>
        <span className='flex justify-between'>
          <span className='flex gap-2'>
            <button
              className={`fr-btn fr-btn--tertiary fr-icon-thumb-up-line ${
                activeButton === true
                  ? 'bg-[var(--background-alt-grey)]'
                  : 'text-[var(--text-title-blue-france)]'
              }`}
              data-testid='thumbs-up-button'
              onClick={() => handleFeedbackClick(true)}
            />
            <button
              className={`fr-btn fr-btn--tertiary fr-icon-thumb-down-line ${
                activeButton === false
                  ? 'bg-[var(--background-alt-grey)]'
                  : 'text-[var(--text-title-blue-france)]'
              }`}
              data-testid='thumbs-down-button'
              onClick={() => handleFeedbackClick(false)}
            />
          </span>
        </span>
        {activeButton !== null && (
          <div
            className='fr-input-group mt-4 flex flex-col'
            id='input-group-160'
          >
            <label className='fr-label' htmlFor='storybook-input'>
              {
                wording.components.error_feedbacks_modal
                  .correction_helpful_optional
              }
            </label>
            <textarea
              aria-describedby='storybook-input-messages'
              className='fr-input'
              id='storybook-input'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div
              className='fr-messages-group'
              id='storybook-input-messages'
              aria-live='polite'
            />
            <button
              className='fr-btn fr-btn--primary self-end mt-4'
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
