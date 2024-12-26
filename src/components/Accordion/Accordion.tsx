'use client';

import { useState } from 'react';

import Badge, { BadgeSize, BadgeVariant } from '../Badge/Badge';

export interface AccordionProps {
  badgeLabel?: string;
  children: React.ReactNode;
  title: string;
}

const Accordion = ({ badgeLabel, children, title }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const truncateTitle = (title: string, maxLength: number = 60) => {
    if (title.length <= maxLength) return title;

    // Find the last space before maxLength that is not preceded by a comma or hyphen
    let lastSpace = title.substring(0, maxLength).lastIndexOf(' ');

    while (lastSpace > 0) {
      const charBeforeSpace = title.charAt(lastSpace - 1);
      if (charBeforeSpace !== ',' && charBeforeSpace !== '-') {
        break;
      }
      // If we find a comma or hyphen, look for the previous space
      lastSpace = title.substring(0, lastSpace).lastIndexOf(' ');
    }

    if (lastSpace === -1) {
      // If no valid space is found, cut at maxLength
      return title.substring(0, maxLength);
    }

    // Cut at the last valid space
    return title.substring(0, lastSpace);
  };

  return (
    <section className='fr-accordion' data-fr-js-accordion='true'>
      <h3 className='fr-accordion__title'>
        <button
          aria-controls='fr-accordion-collapse'
          aria-expanded={isOpen}
          id='fr-accordion-toggle-btn'
          className='fr-accordion__btn'
          onClick={() => setIsOpen(!isOpen)}
          type='button'
        >
          <div className='flex md:flex-row flex-col md:items-center items-start gap-2 md:gap-4'>
            {truncateTitle(title)}
            {badgeLabel && (
              <Badge
                className='shrink-0'
                label={badgeLabel}
                size={BadgeSize.X_SMALL}
                variant={BadgeVariant.GREY}
              />
            )}
          </div>
        </button>
      </h3>
      <div
        className={`fr-collapse !px-1 !py-0 ${
          isOpen ? 'fr-collapse--expanded' : ''
        }`}
        id='fr-accordion-collapse'
        data-fr-js-collapse='true'
        style={{
          display: isOpen ? 'block' : 'none',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default Accordion;
