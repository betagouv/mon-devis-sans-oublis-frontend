'use client';

import { useState } from 'react';

import Accordion from '../Accordion/Accordion';
import Badge, { BadgeSize, BadgeVariant } from '../Badge/Badge';
import { ErrorFeedbacksModalProps } from '../Modal/ErrorFeedbacksModal/ErrorFeedbacksModal';
import QuoteErrorItem from '../QuoteErrorItem/QuoteErrorItem';
import Tooltip from '../Tooltip/Tooltip';
import { Category, Type } from '@/types';
import wording from '@/wording';

export interface QuoteErrorCardProps {
  list: {
    id: string;
    category: Category;
    type: Type;
    code: string;
    title: string;
    provided_value: string | null;
    modalContent: ErrorFeedbacksModalProps;
  }[];
  onHelpClick: (comment: string | null, errorDetailsId: string) => void;
}

const QuoteErrorCard = ({ list, onHelpClick }: QuoteErrorCardProps) => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setOpenModalId(id);
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

  const groupedProvidedValue = list.reduce((acc, item) => {
    if (item.provided_value === null) {
      return {
        ...acc,
        noValue: [...(acc.noValue || []), item],
      };
    }
    return {
      ...acc,
      [item.provided_value]: [...(acc[item.provided_value] || []), item],
    };
  }, {} as Record<string, typeof list>);

  const isCategoryAdmin = list[0].category === Category.ADMIN;

  return (
    <div className='border-shadow rounded-lg [&_p]:font-bold [&_p]:mb-0'>
      <div className='bg-[var(--background-action-low-blue-france)] rounded-tl-[8px] rounded-tr-[8px] px-4 md:px-6 py-4 flex justify-between items-start'>
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
        {/* without provided_value */}
        {groupedProvidedValue.noValue?.map((item) => (
          <QuoteErrorItem
            closeModal={closeModal}
            item={item}
            key={item.id}
            onHelpClick={onHelpClick}
            openModal={() => openModal(item.id)}
            openModalId={openModalId}
          />
        ))}
        {/* with provided_value */}
        {Object.entries(groupedProvidedValue).map(([value, items]) => {
          if (value === 'noValue') return null;
          return (
            <Accordion
              badgeLabel={`${(items.length > 1
                ? wording.upload_id.badge_correction_plural
                : wording.upload_id.badge_correction
              ).replace('{number}', items.length.toString())}`}
              key={value}
              title={value}
            >
              {items.map((item) => (
                <QuoteErrorItem
                  closeModal={closeModal}
                  item={item}
                  key={item.id}
                  onHelpClick={onHelpClick}
                  openModal={() => openModal(item.id)}
                  openModalId={openModalId}
                />
              ))}
            </Accordion>
          );
        })}
      </ul>
    </div>
  );
};

export default QuoteErrorCard;
