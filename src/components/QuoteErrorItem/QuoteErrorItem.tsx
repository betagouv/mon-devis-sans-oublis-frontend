'use client';

import { useState } from 'react';

import ErrorFeedbacksModal from '../Modal/ErrorFeedbacksModal/ErrorFeedbacksModal';
import { QuoteErrorCardProps } from '../QuoteErrorCard/QuoteErrorCard';
// import { Type } from '@/context';
import { useIsDesktop } from '@/hooks';
import wording from '@/wording';
import Toast from '../Toast/Toast';

export type QuoteErrorItemProps = {
  closeModal: () => void;
  item: QuoteErrorCardProps['list'][0];
  onHelpClick: (comment: string | null, errorDetailsId: string) => void;
  openModal: (id: string) => void;
  openModalId: string | null;
};

const QuoteErrorItem = ({
  closeModal,
  item,
  onHelpClick,
  openModal,
  openModalId,
}: QuoteErrorItemProps) => {
  // const icon =
  //   item.type === Type.MISSING
  //     ? wording.components.quote_error_card.type_missing.icon
  //     : wording.components.quote_error_card.type_wrong.icon;
  // const label =
  //   item.type === Type.MISSING
  //     ? wording.components.quote_error_card.type_missing.label
  //     : wording.components.quote_error_card.type_wrong.label;

  const [showToast, setShowToast] = useState<boolean>(false);
  const isDesktop = useIsDesktop();

  const handleFeedbackSubmit = (comment: string | null) => {
    try {
      onHelpClick(comment, item.id);
      closeModal();
      setShowToast(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const isSolutionAndIsDesktop =
    item.modalContent.solution !== null && isDesktop;
  const isSolutionAndIsMobile =
    item.modalContent.solution !== null && !isDesktop;

  const onClickMobileSolution = () => {
    if (isSolutionAndIsMobile) {
      openModal(item.id);
    }
  };

  return (
    <li
      className='flex flex-row p-4 md:p-6 border-bottom-grey last:border-b-0 items-start gap-4 md:items-center'
      onClick={onClickMobileSolution}
      style={{
        cursor: isSolutionAndIsMobile ? 'pointer' : 'default',
      }}
    >
      <div className='flex-1 flex flex-row justify-between gap-4 items-center'>
        <span className='inline-flex flex-wrap items-center gap-4'>
          <p className='text-[var(--text-title-grey)]'>{item.title}</p>
          {/*<p
            className={`fr-tag fr-tag--sm ${icon} fr-tag--icon-left !bg-[var(--background-contrast-warning)] !text-xs`}
          >
            {label}
          </p>*/}
        </span>
        {isSolutionAndIsMobile && (
          <span className='fr-icon-arrow-right-s-line fr-icon--sm' />
        )}
      </div>
      {isSolutionAndIsDesktop && (
        <button
          className='fr-btn fr-btn--tertiary fr-btn--sm shrink-0'
          onClick={() => openModal(item.id)}
        >
          {wording.components.quote_error_card.button_see_detail}
        </button>
      )}
      {openModalId === item.id.toString() && (
        <ErrorFeedbacksModal
          {...item.modalContent}
          isOpen={openModalId === item.id.toString()}
          onClose={closeModal}
          onSubmitFeedback={handleFeedbackSubmit}
        />
      )}
      {showToast && (
        <Toast
          duration={4000}
          message='Merci pour votre retour !'
          onClose={() => setShowToast(false)}
        />
      )}
    </li>
  );
};

export default QuoteErrorItem;
