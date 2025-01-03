import ErrorFeedbacksModal from '../Modal/ErrorFeedbacksModal/ErrorFeedbacksModal';
import { QuoteErrorCardProps } from '../QuoteErrorCard/QuoteErrorCard';
import { Type } from '@/context';
import wording from '@/wording';

export type QuoteErrorItemProps = {
  closeModal: () => void;
  item: QuoteErrorCardProps['list'][0];
  onHelpClick: (comment: string, errorId: string, isHelpful: boolean) => void;
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
  const icon =
    item.type === Type.MISSING
      ? wording.components.quote_error_card.type_missing.icon
      : wording.components.quote_error_card.type_wrong.icon;
  const label =
    item.type === Type.MISSING
      ? wording.components.quote_error_card.type_missing.label
      : wording.components.quote_error_card.type_wrong.label;

  const handleFeedbackSubmit = (comment: string, isHelpful: boolean) => {
    onHelpClick(comment, item.id, isHelpful);
  };

  return (
    <li className='flex p-4 md:p-6 border-bottom-grey last:border-b-0 items-start gap-4 md:items-center'>
      <div className='flex-1'>
        <span className='inline-flex flex-wrap items-center gap-4'>
          <p className='text-[var(--text-title-grey)]'>{item.title}</p>
          <p
            className={`fr-tag fr-tag--sm ${icon} fr-tag--icon-left !bg-[var(--background-contrast-warning)] !text-xs`}
          >
            {label}
          </p>
        </span>
      </div>
      {/* {item.modalContent.solution !== null && ( */}
      <button
        className='hidden md:block fr-btn fr-btn--tertiary fr-btn--sm shrink-0'
        onClick={() => openModal(item.id)}
      >
        {wording.components.quote_error_card.button_see_detail}
      </button>
      {/* )} */}
      {openModalId === item.id.toString() && (
        <ErrorFeedbacksModal
          {...item.modalContent}
          isOpen={openModalId === item.id.toString()}
          onClose={closeModal}
          onSubmitFeedback={handleFeedbackSubmit}
        />
      )}
    </li>
  );
};

export default QuoteErrorItem;
