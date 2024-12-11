'use client';

import { RoleCardIcon, Tile } from '@/components';
import { useBreakpoint } from '@/hooks';
import wording from '@/wording';

export default function Bienvenue() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'XS' || breakpoint === 'SM';

  const { cards, subtitle, title } = wording.welcome.section_who_are_you;

  return (
    <section className='fr-container-fluid fr-py-10w [&>div>h1]:text-center [&>div>p]:text-center'>
      <div className='fr-container'>
        <h1 className='text-[var(--artwork-major-blue-ecume)]'>{title}</h1>
        <p className='fr-text--lead'>{subtitle}</p>
        <div className='fr-grid-row fr-grid-row--center'>
          <div className='fr-col-12 fr-col-md-10 fr-col-lg-8'>
            <ul className='fr-mt-2w fr-mb-6w fr-raw-list space-y-4'>
              {cards.map((card, index) => (
                <li key={index}>
                  {isMobile ? (
                    <Tile
                      description={card.description}
                      href={card.href}
                      title={card.title}
                    />
                  ) : (
                    <RoleCardIcon
                      description={card.description}
                      href={card.href}
                      icon={card.icon}
                      title={card.title}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
