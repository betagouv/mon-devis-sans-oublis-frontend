'use client';

import { useEffect, useState } from 'react';

import Badge, { BadgeSize, BadgeVariant } from '../Badge/Badge';

export interface AccordionProps {
  badgeLabel?: string;
  children: React.ReactNode;
  title: string;
}

const Accordion = ({ badgeLabel, children, title }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [maxLength, setMaxLength] = useState<number>(60);

  const truncateTitle = (title: string) => {
    if (title.length <= maxLength) return title;

    let lastSpace = title.substring(0, maxLength).lastIndexOf(' ');

    while (lastSpace > 0) {
      const charBeforeSpace = title.charAt(lastSpace - 1);
      if (
        charBeforeSpace !== ',' &&
        charBeforeSpace !== '-' &&
        charBeforeSpace !== '/'
      ) {
        break;
      }
      lastSpace = title.substring(0, lastSpace).lastIndexOf(' ');
    }

    return title.substring(0, lastSpace > 0 ? lastSpace : maxLength);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setMaxLength(window.innerWidth >= 768 ? 60 : 30);
      }
    };

    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

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
          <div className='flex md:flex-row flex-col md:items-center items-start gap-2 md:gap-4 px-2'>
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
