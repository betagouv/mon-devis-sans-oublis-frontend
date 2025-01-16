'use client';

import React from 'react';

import {
  Badge,
  BadgeVariant,
  BlockIcon,
  BlockNumber,
  CardImage,
  Link,
  Tile,
} from '@/components';
import wording from '@/wording';

export default function Home() {
  return (
    <div className='[&_h2]:text-center'>
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <div className='fr-col-12 fr-col-lg-5'>
            <h1>{wording.homepage.section_examples.title}</h1>
            <ul className='fr-raw-list fr-badges-group fr-mb-3w flex flex-wrap gap-4'>
              {wording.homepage.section_examples.badges.map((badge, index) => (
                <li key={index}>
                  <Badge
                    label={badge.label}
                    variant={BadgeVariant.BLUE_LIGHT}
                  />
                </li>
              ))}
            </ul>
            <Link {...wording.homepage.check_quote_button} />
          </div>
          <div className='fr-grid-row fr-grid-row--center'>
            <h2 className='fr-mt-12w'>
              {wording.homepage.section_examples.subtitle}
            </h2>
            <div className='lg:block overflow-x-auto overflow-y-hidden whitespace-nowrap w-full scrollbar-none touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
              <ul className='fr-raw-list fr-grid-row flex-nowrap !justify-start w-max lg:flex-wrap lg:!justify-center lg:w-full'>
                {wording.homepage.section_examples.cards.map((card, index) => (
                  <li
                    className='flex-none w-[160px] whitespace-normal'
                    key={index}
                  >
                    <CardImage image={card.image} title={card.title} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='fr-container-fluid fr-py-10w bg-[var(--background-default-grey-hover)]'>
        <div className='fr-container'>
          <div className='fr-grid-row fr-grid-row--center'>
            <h2>{wording.homepage.section_steps.title}</h2>
            <p className='fr-text--lead text-center'>
              {wording.homepage.section_steps.description}
            </p>
          </div>
          <div className='fr-grid-row fr-grid-row--gutters fr-mx-1w w-full flex justify-between'>
            {wording.homepage.section_steps.number_blocks.map(
              (block, index) => (
                <React.Fragment key={index}>
                  <BlockNumber
                    className='fr-col-12 fr-col-md-3 text-center md:text-left'
                    description={block.description}
                    number={block.number}
                    title={block.title}
                  />
                  {index <
                    wording.homepage.section_steps.number_blocks.length - 1 && (
                    <div className='text-[var(--background-action-high-blue-france)] flex justify-center items-center h-full w-full md:w-auto fr-my-3w md:fr-my-0 md:self-center'>
                      <span
                        aria-hidden='true'
                        className='fr-icon-arrow-down-s-line md:!hidden'
                      />
                      <span
                        aria-hidden='true'
                        className='hidden md:!block fr-icon-arrow-right-s-line'
                      />
                    </div>
                  )}
                </React.Fragment>
              )
            )}
          </div>
          <p className='fr-mb-4w fr-mt-2w fr-text--lead text-center'>
            <span
              aria-hidden='true'
              className='fr-icon-recycle-fill text-[var(--background-action-high-blue-france)] fr-mr-1w'
            />
            {wording.homepage.section_steps.correction}
          </p>
          <div className='fr-grid-row fr-grid-row--center'>
            <Link {...wording.homepage.check_quote_button} />
          </div>
        </div>
      </section>
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <ul className='fr-raw-list fr-grid-row fr-grid-row--gutters fr-grid-row--center'>
            {wording.homepage.section_icon_block.icon_blocks.map(
              (block, index) => (
                <li className='fr-col-12 fr-col-md-4' key={index}>
                  <BlockIcon
                    description={block.description}
                    icon={block.icon}
                    title={block.title}
                  />
                </li>
              )
            )}
          </ul>
          <div className='fr-grid-row fr-grid-row--center fr-mt-3w'>
            <Link {...wording.homepage.check_quote_button} />
          </div>
        </div>
      </section>
      <section className='fr-container-fluid fr-py-10w bg-[var(--background-default-grey-hover)]'>
        <div className='fr-container'>
          <h2>{wording.homepage.section_who_are_you.title}</h2>
          <p className='fr-text--lead text-center'>
            {wording.homepage.section_who_are_you.description}
          </p>
          <ul className='fr-raw-list fr-grid-row fr-grid-row--gutters fr-grid-row--center items-stretch'>
            {wording.homepage.section_who_are_you.cards.map((card, index) => (
              <li
                className='fr-col-12 fr-col-md-6 fr-col-lg-3 flex'
                key={index}
              >
                <div className='block md:hidden w-full'>
                  <Tile
                    description={card.description}
                    href={card.url}
                    title={card.title}
                  />
                </div>
                <div className='hidden md:flex w-full'>
                  <Tile
                    description={card.description}
                    href={card.url}
                    image={card.image}
                    title={card.title}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
