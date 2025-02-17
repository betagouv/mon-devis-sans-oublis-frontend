'use client';

import { useState } from 'react';
import Modal, { ModalPosition } from '../Modal';
import { MultiSelectCheckbox } from '@/components';
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

  const options = [
    ...(deleteErrorReasons ?? []).map((option) => ({
      id: option.id,
      label: option.label,
      key: `reason-${option.id}`,
    })),
    {
      id: 'free_text',
      label: 'Autre (veuillez préciser...)',
      key: 'reason-free_text',
    },
  ];

  // ✅ Correction : S'assure que selectedReason reçoit bien une valeur correcte
  const handleReasonChange = (value: string | string[]) => {
    console.log('➡️ Valeur reçue dans handleReasonChange:', value);

    if (Array.isArray(value)) {
      value = value[0] || ''; // Sélectionne le premier élément si c’est un tableau
    }

    if (value === 'free_text') {
      setSelectedReason('free_text');
    } else {
      setSelectedReason(value);
      setCustomReason('');
    }

    console.log('✅ selectedReason mis à jour :', value);
  };

  // ✅ Correction : Vérifie et génère correctement reasonLabel
  const handleSubmit = () => {
    console.log('🔍 handleSubmit appelé !');

    console.log(`➡️ selectedReason: ${selectedReason}`);
    console.log(`➡️ customReason: ${customReason}`);
    console.log(`➡️ quoteCheckId: ${quoteCheckId}`);
    console.log(`➡️ errorDetailsId avant validation: ${errorDetailsId}`);

    // ✅ Vérification de l'ID de l'erreur avant de soumettre
    if (!errorDetailsId || errorDetailsId === quoteCheckId) {
      console.error("❌ L'ID de l'erreur est incorrect !", errorDetailsId);
      return;
    }

    // ✅ Vérification du format de la raison envoyée
    let reasonLabel: string | undefined = selectedReason ?? undefined;
    if (selectedReason === 'free_text') {
      reasonLabel = customReason.trim() || undefined;
    }

    if (!reasonLabel) {
      console.warn(
        "⚠️ Aucune raison valide sélectionnée, l'appel API ne se fait pas !"
      );
      return;
    }

    console.log(
      `📤 Envoi de la suppression avec quoteCheckId=${quoteCheckId}, errorDetailsId=${errorDetailsId}, raison=${reasonLabel}`
    );

    onDeleteError(quoteCheckId, errorDetailsId, reasonLabel);
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
        <span
          className='fr-icon-questionnaire-fill mt-1! fr-icon-delete-fill'
          aria-hidden='true'
        />
        Supprimer la correction proposée
      </h4>

      <div className='fr-alert fr-alert--warning fr-mt-2w'>
        <p className='font-bold'>{errorTitle}</p>
      </div>

      {options.map((option) => (
        <div key={option.key}>
          <input
            type='radio'
            name='deleteReason'
            value={option.id}
            checked={selectedReason === option.id}
            onChange={(e) => handleReasonChange(e.target.value)}
          />
          {option.label}
        </div>
      ))}

      {selectedReason === 'free_text' && (
        <textarea
          className='fr-input fr-mt-2w w-full'
          placeholder='Veuillez préciser la raison...'
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
        />
      )}

      <div className='flex justify-end gap-4 mt-4'>
        <button className='fr-btn fr-btn--secondary' onClick={onClose}>
          Annuler
        </button>
        <button className='fr-btn fr-btn--danger' onClick={handleSubmit}>
          Confirmer la suppression
        </button>
      </div>
    </Modal>
  );
};

export default DeleteErrorModal;
