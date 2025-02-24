'use client';

import { useState } from 'react';

import Modal, { ModalPosition } from '../Modal';

export interface GlobalCommentModalProps {
  initialComment?: string;
  isOpen: boolean;
  onClose?: () => void;
  onSubmitComment: (comment: string) => void;
  quoteCheckId: string;
}

const GlobalCommentModal: React.FC<GlobalCommentModalProps> = ({
  initialComment = '',
  isOpen,
  onClose,
  onSubmitComment,
}) => {
  const [comment, setComment] = useState(initialComment);

  const handleSubmit = () => {
    onSubmitComment(comment);
    onClose?.();
  };

  return (
    <Modal
      backButtonLabel={'Fermer'}
      isOpen={isOpen}
      onClose={onClose}
      position={ModalPosition.CENTER}
    >
      <div className='flex flex-col gap-4'>
        <h4
          className='fr-mb-1w flex items-center gap-2'
          data-testid='global-comment-modal-title'
          id='global-comment-modal-title'
        >
          <span
            aria-hidden='true'
            className='fr-icon-chat-3-fill fr-icon--lg mt-1!'
          />
          Ajouter un commentaire global
        </h4>
        <div>
          <p className='fr-mb-4w'>
            Votre commentaire sera visible lors du partage de la page.
          </p>
          <label className='fr-label' htmlFor='global-comment'>
            Commentaire
          </label>
          <textarea
            className='fr-input fr-mt-1v h-[88px]'
            id='global-comment'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>
        <div className='mt-8 flex justify-end gap-4'>
          <button
            className='fr-btn fr-btn--secondary'
            data-testid='global-comment-modal-cancel-button'
            onClick={onClose}
            type='button'
          >
            Annuler
          </button>
          <button
            className='fr-btn fr-btn--danger'
            data-testid='global-comment-modal-submit-button'
            disabled={!comment.trim()}
            onClick={handleSubmit}
            type='button'
          >
            Enregistrer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GlobalCommentModal;
