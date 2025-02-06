'use client';

import { useState } from 'react';

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

  const transformGroupedData = (
    groupedData: Record<string, Set<string>>,
    originalList: EnrichedErrorDetails[]
  ) => {
    return Object.entries(groupedData).map(([key, titles]) => {
      const [providedValue, gesteId] = key.includes('|')
        ? key.split('|')
        : [key, null];

      return {
        title: providedValue === 'noValue' ? null : providedValue,
        gesteId,
        items: Array.from(titles).map((title, index) => {
          const matchingItem = originalList.find(
            (item) => item.title === title && item.geste_id === gesteId
          );

          return {
            title,
            gesteId,
            providedValue: providedValue === 'noValue' ? null : providedValue,
            id: `${gesteId || 'admin'}-${index}`, // Unique ID for each item
            realId: matchingItem?.id || null,
            code: matchingItem?.code || null,
            type: matchingItem?.type,
            problem: matchingItem?.modalContent.problem || null,
            solution: matchingItem?.modalContent.solution || null,
          };
        }),
      };
    });
  };

  const groupedData = groupByProvidedValueAndGesteId(list);
  const transformedData = transformGroupedData(groupedData, list);

  const uniqueGesteIdsCount = new Set(
    transformedData
      .filter((group) => group.gesteId !== undefined)
      .map((group) => group.gesteId)
  ).size;

  const isCategoryAdmin = list[0]?.category === Category.ADMIN;

  return (
    <div className='border-shadow rounded-lg [&_p]:font-bold [&_p]:mb-0'>
      <div className='bg-[var(--background-action-low-blue-france)] rounded-tl-[8px] rounded-tr-[8px] p-4 flex justify-between items-start md:items-center'>
        <div className='flex gap-2'>
          <span className='flex flex-col md:flex-row gap-2 items-start md:items-center'>
            <p className='fr-mb-0'>
              {list.length > 0 &&
                (isCategoryAdmin
                  ? wording.components.quote_error_card.title_admin
                  : wording.components.quote_error_card.title_gestes)}
            </p>
            {!isCategoryAdmin && (
              <p className='fr-mb-0 font-normal! text-sm!'>
                {`${(uniqueGesteIdsCount > 1
                  ? wording.components.quote_error_card
                      .title_gestes_number_plural
                  : wording.components.quote_error_card.title_gestes_number
                ).replace('{number}', list.length.toString())}`}
              </p>
            )}
          </span>
          <Tooltip
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
        <div className='relative inline-block shrink-0'>
          <Badge
            className='self-center inline-block'
            label={`${(list.length > 1
              ? wording.page_upload_id.badge_correction_plural
              : wording.page_upload_id.badge_correction
            ).replace('{number}', list.length.toString())}`}
            size={BadgeSize.X_SMALL}
            variant={BadgeVariant.GREY}
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
                  type: Type.MISSING || Type.WRONG,
                  code: item.code || '',
                  problem: item.problem || '',
                  solution: item.solution || '',
                  modalContent: {
                    problem: item.problem,
                    solution: item.solution,
                    isOpen: false,
                    title: item.title,
                  },
                }}
                key={item.id}
                onHelpClick={(comment) => onHelpClick(comment, item.id)}
                openModal={() => openModal(item.id)}
                openModalId={openModalId}
              />
            ))
          )}
        {/* with provided_value */}
        {transformedData
          .filter((group) => group.title !== null)
          .map((group) => (
            <div key={`${group.title}-${group.gesteId}`}>
              <div className='bg-[var(--background-default-grey-hover)] p-4 flex justify-between items-center'>
                <span
                  className='mb-0! text-[var(--text-action-high-blue-france)] fr-mr-1w'
                  style={{ fontWeight: 500 }}
                >
                  {group.title}
                </span>
                <Badge
                  icon='fr-icon-alert-fill'
                  label={group.items.length.toString()}
                  size={BadgeSize.X_SMALL}
                  variant={BadgeVariant.ORANGE_LIGHT}
                />
              </div>
              {group.items.map((item) => (
                <QuoteErrorItem
                  closeModal={closeModal}
                  item={{
                    category: isCategoryAdmin
                      ? Category.ADMIN
                      : Category.GESTES,
                    code: item.code || '',
                    geste_id: item.gesteId || '',
                    id: item.id,
                    provided_value: item.providedValue,
                    title: item.title,
                    type: Type.MISSING || Type.WRONG,
                    problem: item.problem || '',
                    solution: item.solution || '',
                    modalContent: {
                      problem: item.problem,
                      solution: item.solution,
                      isOpen: false,
                      title: item.title,
                    },
                  }}
                  key={item.id}
                  onHelpClick={(comment) =>
                    onHelpClick(comment, item.realId || '')
                  }
                  openModal={() => openModal(item.id)}
                  openModalId={openModalId}
                />
              ))}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default QuoteErrorCard;
