'use client';

import { useState } from 'react';

import { Category, Type } from '@/context';
import wording from '@/wording';
import Badge, { BadgeSize, BadgeVariant } from '../Badge/Badge';
import Modal, { ModalProps } from '../Modal/Modal';
import Tooltip from '../Tooltip/Tooltip';

export interface QuoteErrorCardProps {
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

const QuoteErrorCard = ({ list }: QuoteErrorCardProps) => {
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

  const isCategoryAdmin = list[0].category === Category.ADMIN;

  return (
    <div className='border-shadow rounded-lg [&_p]:font-bold [&_p]:mb-0'>
      <div className='bg-[var(--background-action-low-blue-france)] rounded-tl-[8px] rounded-tr-[8px] p-4 flex justify-between items-start'>
        <div className='flex flex-wrap gap-2 md:gap-4 flex-1'>
          <p>
            {list.length > 0 &&
              (isCategoryAdmin
                ? wording.components.quote_error_card.title_admin
                : wording.components.quote_error_card.title_gestes)}
          </p>
          <Badge
            className='self-center inline-block'
            label={`${(list.length > 1
              ? wording.upload_id.badge_correction_plural
              : wording.upload_id.badge_correction
            ).replace('{number}', list.length.toString())}`}
            size={BadgeSize.X_SMALL}
            variant={BadgeVariant.GREY}
          />
        </div>
        <div className='relative inline-block shrink-0 ml-4'>
          <Tooltip
            className='absolute top-full right-0 !mt-2 !font-normal'
            icon={
              isCategoryAdmin
                ? wording.components.quote_error_card.tooltip_admin.icon
                : wording.components.quote_error_card.tooltip_gestes.icon
            }
            text={
              isCategoryAdmin
                ? wording.components.quote_error_card.tooltip_admin.text
                : wording.components.quote_error_card.tooltip_gestes.text
            }
          />
        </div>
      </div>
      <ul className='fr-raw-list'>
        {list.map((item) => {
          const icon =
            item.type === Type.MISSING
              ? wording.components.quote_error_card.type_missing.icon
              : wording.components.quote_error_card.type_wrong.icon;
          const label =
            item.type === Type.MISSING
              ? wording.components.quote_error_card.type_missing.label
              : wording.components.quote_error_card.type_wrong.label;
          return (
            <li
              className='flex p-6 border-bottom-grey items-start gap-4 md:items-center'
              key={item.id}
            >
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
              <button
                className='hidden md:block fr-btn fr-btn--tertiary fr-btn--sm shrink-0'
                onClick={() => openModal(item.id.toString())}
              >
                {wording.components.quote_error_card.button_see_detail}
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
