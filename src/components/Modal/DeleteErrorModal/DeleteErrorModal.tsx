'use client';

import { useState } from 'react';
import Modal, { ModalPosition } from '../Modal';
import wording from '@/wording';

export interface DeleteErrorModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onDeleteError: (
    quoteCheckId: string,
    errorDetailsId: string,
    reason: string
  ) => void;
  quoteCheckId: string;
  errorDetailsId: string;
  deleteErrorReasons?: { id: string; label: string }[];
  errorTitle: string;
}

const DeleteErrorModal: React.FC<DeleteErrorModalProps> = ({
  isOpen,
  onClose,
  onDeleteError,
  quoteCheckId,
  errorDetailsId,
  deleteErrorReasons,
  errorTitle,
}) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const handleReasonChange = (value: string) => {
    if (value === 'custom') {
      setIsCustom(true);
      setSelectedReason(null);
    } else {
      setIsCustom(false);
      setSelectedReason(value);
    }
  };

  const handleSubmit = () => {
    if (isCustom && !customReason.trim()) {
      console.warn('⚠️ Raison personnalisée vide !');
      return;
    }

    if (!isCustom && !selectedReason) {
      console.warn('⚠️ Aucune raison sélectionnée !');
      return;
    }

    const finalReason = isCustom ? customReason.trim() : selectedReason;

    if (!finalReason) {
      console.error("🚨 ERREUR: finalReason est vide avant l'envoi !");
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
      isOpen={isOpen}
      onClose={onClose}
      position={ModalPosition.CENTER}
    >
      <h4 className='fr-mb-1w flex items-center gap-2'>
        <span className='fr-icon-delete-fill mt-1!' aria-hidden='true' />
        Supprimer la correction proposée
      </h4>

      <div className='fr-alert fr-alert--warning fr-mt-2w'>
        <p className='font-bold'>{errorTitle}</p>
      </div>

      <div className='fr-form-group'>
        <fieldset className='fr-fieldset'>
          <legend className='fr-fieldset__legend'>
            Raison de la suppression
          </legend>

          {/* Raisons prédéfinies */}
          {deleteErrorReasons && deleteErrorReasons.length > 0 && (
            <>
              {deleteErrorReasons.map((reason) => (
                <div className='fr-radio-group' key={reason.id}>
                  <input
                    type='radio'
                    id={reason.id}
                    name='deleteReason'
                    value={reason.id}
                    checked={!isCustom && selectedReason === reason.id}
                    onChange={(e) => handleReasonChange(e.target.value)}
                  />
                  <label className='fr-label' htmlFor={reason.id}>
                    {reason.label}
                  </label>
                </div>
              ))}
            </>
          )}

          {/* Option raison personnalisée */}
          <div className='fr-radio-group'>
            <input
              type='radio'
              id='custom'
              name='deleteReason'
              value='custom'
              checked={isCustom}
              onChange={(e) => handleReasonChange(e.target.value)}
            />
            <label className='fr-label' htmlFor='custom'>
              Autre raison
            </label>
          </div>

          {/* Champ de texte pour raison personnalisée */}
          {isCustom && (
            <div className='fr-input-group'>
              <input
                type='text'
                className='fr-input'
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder='Saisissez votre raison'
              />
            </div>
          )}
        </fieldset>
      </div>

      <div className='flex justify-end gap-4 mt-4'>
        <button className='fr-btn fr-btn--secondary' onClick={onClose}>
          Annuler
        </button>
        <button
          className='fr-btn fr-btn--danger'
          onClick={handleSubmit}
          disabled={isCustom ? !customReason.trim() : !selectedReason}
        >
          Confirmer la suppression
        </button>
      </div>
    </Modal>
  );
};

export default DeleteErrorModal;
