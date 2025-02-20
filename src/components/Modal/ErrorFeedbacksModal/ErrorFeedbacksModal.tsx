'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import Modal, { ModalPosition } from '../Modal';
import wording from '@/wording';

export interface ErrorFeedbacksModalProps {
  errorDetailsId: string;
  initialComment?: string;
  isOpen: boolean;
  onClose?: () => void;
  onSubmitFeedback?: (comment: string, errorDetailsId: string) => void;
  problem: string | null;
  solution: string | null;
  title: string;
}

const ErrorFeedbacksModal: React.FC<ErrorFeedbacksModalProps> = ({
  errorDetailsId,
  initialComment = '',
  isOpen,
  onClose,
  onSubmitFeedback,
  problem,
  solution,
  title,
}) => {
  const [comment, setComment] = useState<string>(initialComment);
  const [isCommentModified, setIsCommentModified] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsCommentModified(false);
    }
  }, [isOpen]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    setComment(newComment);
    setIsCommentModified(newComment !== initialComment);
  };

  const handleSubmit = () => {
    if (onSubmitFeedback) {
      onSubmitFeedback(comment, errorDetailsId);
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
      <div className='grow'>
        <Image
          alt={wording.components.error_feedbacks_modal.icon_alt}
          className='mt-10!'
          height={64}
          src={wording.components.error_feedbacks_modal.icon_src}
          width={64}
        />
        <h4 className='mb-8!'>{title}</h4>
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
      <div className='mb-8!'>
        <div className='fr-input-group mt-4! flex flex-col p-4 rounded-lg bg-[var(--background-alt-grey)]'>
          <span className='flex items-center justify-between fr-mb-1w'>
            <Image
              alt='delete'
              height={40}
              src='/images/quotation_results/quotation_correction_comment.webp'
              width={40}
            />
            <button
              className='fr-btn fr-btn--tertiary fr-icon-delete-line fr-btn--sm'
              onClick={() => setComment('')}
            />
          </span>
          <label
            className='text-[var(--text-default-grey)] font-bold mb-2!'
            htmlFor='textarea-input'
          >
            Votre commentaire
          </label>
          <textarea
            aria-describedby='textarea-input-messages'
            className='fr-input h-24'
            id='textarea-input'
            onChange={handleCommentChange}
            placeholder='Les corrections du devis sont...'
            value={comment}
          />
          <div
            className='fr-messages-group'
            id='textarea-input-messages'
            aria-live='polite'
          />
          <button
            className='fr-btn fr-btn--primary self-end mt-4!'
            disabled={
              !comment.trim() || (!isCommentModified && Boolean(initialComment))
            }
            onClick={handleSubmit}
          >
            {wording.components.error_feedbacks_modal.submit_button}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorFeedbacksModal;
