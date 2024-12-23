'use client';

import { useState } from 'react';

import Badge, { BadgeSize, BadgeVariant } from '../Badge/Badge';
import Modal, { ModalProps } from '../Modal/Modal';
import Tooltip from '../Tooltip/Tooltip';

export enum QuoteErrorCardCategory {
  ADMIN = 'admin',
  GESTES = 'gestes',
}

export enum QuoteErrorCardType {
  MISSING = 'missing',
  WRONG = 'wrong',
}

export interface QuoteErrorCardProps {
  list: {
    category: QuoteErrorCardCategory;
    id: number;
    modalContent: ModalProps;
    title: string;
    type: QuoteErrorCardType;
  }[];
}

const QuoteErrorCard = ({ list }: QuoteErrorCardProps) => {
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  const openModal = (id: number) => {
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
          <p>
            {QuoteErrorCardCategory.ADMIN
              ? 'Mentions administratives'
              : 'Descriptif technique des gestes'}
          </p>
          <Badge
            className='self-center'
            label={`${list.length} corrections`}
            size={BadgeSize.X_SMALL}
            variant={BadgeVariant.GREY}
          />
        </span>
        <div className='relative inline-block'>
          <Tooltip
            className='absolute top-full right-0 !mt-2'
            icon='fr-icon-information-fill'
            text={
              QuoteErrorCardCategory.ADMIN
                ? 'Les mentions administratives sont communes à tous les postes de travaux. Elles sont obligatoires pour les obtentions d’aides financières.'
                : 'Les gestes correspondent aux normes et au matériel des critères techniques. Certaines informations sont à mentionner obligatoirement pour l’obtention des aides.'
            }
          />
        </div>
      </div>
      <ul className='fr-raw-list'>
        {list.map((item) => {
          const icon =
            item.type === QuoteErrorCardType.MISSING
              ? 'fr-icon-warning-line'
              : 'fr-icon-edit-circle-line';
          const label =
            item.type === QuoteErrorCardType.MISSING
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
                onClick={() => openModal(item.id)}
              >
                Voir le détail
              </button>
              {openModalId === item.id && (
                <Modal
                  {...item.modalContent}
                  isOpen={openModalId === item.id}
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
