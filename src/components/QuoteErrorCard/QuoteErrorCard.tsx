'use client';

import { useState } from 'react';

import { Category, Type } from '@/context';
import Badge, { BadgeSize, BadgeVariant } from '../Badge/Badge';
import Modal, { ModalProps } from '../Modal/Modal';
import Tooltip from '../Tooltip/Tooltip';

export interface QuoteErrorCardProps {
  cardTitle: string;
  cardTooltip: string;
  list: {
    id: string;
    category: Category;
    type: Type;
    code: string;
    title: string;
    provided_value: string | null;
    modalContent: ModalProps;
  }[];
}

const QuoteErrorCard = ({
  cardTitle,
  cardTooltip,
  list,
}: QuoteErrorCardProps) => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setOpenModalId(id);
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    }
    return title;
  };

  return (
    <div className='border-shadow rounded-lg [&_p]:font-bold [&_p]:mb-0'>
      <div className='bg-[var(--background-action-low-blue-france)] rounded-tl-[8px] rounded-tr-[8px] p-4 flex justify-between'>
        <span className='flex gap-4'>
          <p>{cardTitle}</p>
          <Badge
            className='self-center'
            label={`${list.length} corrections`}
            size={BadgeSize.X_SMALL}
            variant={BadgeVariant.GREY}
          />
        </span>
        <div className='relative inline-block'>
          <Tooltip
            className='absolute top-full right-0 !mt-2 !font-normal'
            icon='fr-icon-information-fill'
            text={cardTooltip}
          />
        </div>
      </div>
      <ul className='fr-raw-list'>
        {list.map((item) => {
          const icon =
            item.type === Type.MISSING
              ? 'fr-icon-warning-line'
              : 'fr-icon-edit-circle-line';
          const label =
            item.type === Type.MISSING
              ? 'Information manquante'
              : 'Information erronée';

          return (
            <li
              className='flex justify-between p-6 border-bottom-grey items-center'
              key={item.id}
            >
              <span className='flex gap-4'>
                <p className='text-[var(--text-title-grey)]'>
                  {truncateTitle(item.title, 60)}
                </p>
                <p
                  className={`fr-tag fr-tag--sm ${icon} fr-tag--icon-left !bg-[var(--background-contrast-warning)] !text-xs`}
                >
                  {label}
                </p>
              </span>
              <button
                className='fr-btn fr-btn--secondary fr-btn--sm'
                onClick={() => openModal(item.id.toString())}
              >
                Voir le détail
              </button>
              {openModalId === item.id.toString() && (
                <Modal
                  {...item.modalContent}
                  isOpen={openModalId === item.id.toString()}
                  onClose={closeModal}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuoteErrorCard;
