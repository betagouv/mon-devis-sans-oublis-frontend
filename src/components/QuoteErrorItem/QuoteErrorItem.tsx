import Modal from '../Modal/Modal';
import { QuoteErrorCardProps } from '../QuoteErrorCard/QuoteErrorCard';
import { Type } from '@/context';
import wording from '@/wording';

const QuoteErrorItem = ({
  closeModal,
  item,
  openModal,
  openModalId,
}: {
  closeModal: () => void;
  item: QuoteErrorCardProps['list'][0];
  openModal: () => void;
  openModalId: string | null;
}) => {
  const icon =
    item.type === Type.MISSING
      ? wording.components.quote_error_card.type_missing.icon
      : wording.components.quote_error_card.type_wrong.icon;
  const label =
    item.type === Type.MISSING
      ? wording.components.quote_error_card.type_missing.label
      : wording.components.quote_error_card.type_wrong.label;

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
      {item.solution !== null && (
        <button
          className='hidden md:block fr-btn fr-btn--tertiary fr-btn--sm shrink-0'
          onClick={openModal}
        >
          {wording.components.quote_error_card.button_see_detail}
        </button>
      )}
      
      {openModalId === item.id.toString() && (
        <Modal
          {...item.modalContent}
          isOpen={openModalId === item.id.toString()}
          onClose={closeModal}
        />
      )}
    </li>
  );
};

export default QuoteErrorItem;
