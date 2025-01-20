'use client';

import { useState } from 'react';

import Accordion from '../Accordion/Accordion';
import Badge, { BadgeSize, BadgeVariant } from '../Badge/Badge';
import QuoteErrorItem from '../QuoteErrorItem/QuoteErrorItem';
import Tooltip from '../Tooltip/Tooltip';
import { Category, EnrichedErrorDetails, Type } from '@/types';
import wording from '@/wording';

export interface QuoteErrorCardProps {
  list: EnrichedErrorDetails[];
  onHelpClick: (comment: string | null, errorDetailsId: string) => void;
}

const QuoteErrorCard = ({ list, onHelpClick }: QuoteErrorCardProps) => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const openModal = (id: string) => setOpenModalId(id);
  const closeModal = () => setOpenModalId(null);

  const groupByProvidedValueAndGesteId = (list: EnrichedErrorDetails[]) => {
    return list.reduce((acc, item) => {
      let key: string;

      if (item.category === Category.GESTES) {
        // Group by provided_value and geste_id for GESTES
        key = `${item.provided_value || 'Aucune valeur'}|${item.geste_id}`;
      } else {
        // Group by provided_value for ADMIN
        key = `${item.provided_value || 'noValue'}`;
      }

      if (!acc[key]) {
        acc[key] = new Set();
      }

      acc[key].add(item.title); // Avoid duplicates
      return acc;
    }, {} as Record<string, Set<string>>);
  };

  const transformGroupedData = (groupedData: Record<string, Set<string>>) => {
    return Object.entries(groupedData).map(([key, titles]) => {
      const [providedValue, gesteId] = key.includes('|')
        ? key.split('|')
        : [key, null];

      return {
        title: providedValue === 'noValue' ? null : providedValue,
        gesteId,
        items: Array.from(titles).map((title, index) => ({
          title,
          gesteId,
          providedValue: providedValue === 'noValue' ? null : providedValue,
          id: `${gesteId || 'admin'}-${index}`, // Unique ID for each item
        })),
      };
    });
  };

  const groupedData = groupByProvidedValueAndGesteId(list); // Group data
  const transformedData = transformGroupedData(groupedData); // Transform data

  const isCategoryAdmin = list[0]?.category === Category.ADMIN;

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
        {transformedData
          .filter((group) => group.title === null)
          .flatMap((group) =>
            group.items.map((item) => (
              <QuoteErrorItem
                closeModal={closeModal}
                item={{
                  id: item.id,
                  title: item.title,
                  geste_id: item.gesteId || '',
                  provided_value: item.providedValue,
                  category: isCategoryAdmin ? Category.ADMIN : Category.GESTES,
                  type: Type.MISSING,
                  code: 'default-code',
                  problem: null,
                  solution: null,
                  modalContent: {
                    problem: null,
                    solution: null,
                    isOpen: false,
                    title: item.title,
                  },
                }}
                key={item.id}
                onHelpClick={onHelpClick}
                openModal={() => openModal(item.id)}
                openModalId={openModalId}
              />
            ))
          )}
        {/* with provided_value */}
        {transformedData
          .filter((group) => group.title !== null)
          .map((group) => (
            <Accordion
              badgeLabel={`${(group.items.length > 1
                ? wording.upload_id.badge_correction_plural
                : wording.upload_id.badge_correction
              ).replace('{number}', group.items.length.toString())}`}
              key={group.title}
              title={group.title || ''}
            >
              {group.items.map((item) => (
                <QuoteErrorItem
                  closeModal={closeModal}
                  item={{
                    id: item.id,
                    title: item.title,
                    geste_id: item.gesteId || '',
                    provided_value: item.providedValue,
                    category: isCategoryAdmin
                      ? Category.ADMIN
                      : Category.GESTES,
                    type: Type.MISSING,
                    code: 'default-code',
                    problem: null,
                    solution: null,
                    modalContent: {
                      problem: null,
                      solution: null,
                      isOpen: false,
                      title: item.title,
                    },
                  }}
                  key={item.id}
                  onHelpClick={onHelpClick}
                  openModal={() => openModal(item.id)}
                  openModalId={openModalId}
                />
              ))}
            </Accordion>
          ))}
      </ul>
    </div>
  );
};

export default QuoteErrorCard;
