'use client';

import React from 'react';

import {
  BlockIcon,
  BlockNumber,
  CardIcon,
  CardImage,
  Link,
  Tile,
} from '@/components';
import { useBreakpoint } from '@/hooks';
import wording from '@/wording.json';
import styles from './page.module.css';

export default function Home() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'XS' || breakpoint === 'SM';

  return (
    <div>
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <div className='fr-col-12 fr-col-lg-5'>
            <h1>{wording.homepage.section_examples.title}</h1>
            <ul className='fr-badges-group fr-mb-3w'>
              {wording.homepage.section_examples.badges.map((badge, index) => (
                <li key={index}>
                  <p className='fr-badge--green-archipel fr-text--sm fr-mr-2w'>
                    {badge.label}
                  </p>
                </li>
              ))}
            </ul>
            <Link {...wording.homepage.check_quote_button} />
          </div>
          <div className='fr-grid-row fr-grid-row--center'>
            <h2 className='fr-mt-12w text-center'>
              {wording.homepage.section_examples.subtitle}
            </h2>
            <div className='scroll-container'>
              <ul className='fr-grid-row fr-grid-row--gutters'>
                {wording.homepage.section_examples.cards.map((card, index) => (
                  <li className='fr-col-4 fr-col-md-2' key={index}>
                    <CardImage image={card.image} title={card.title} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`fr-container-fluid fr-py-10w ${styles['section-grey']}`}
      >
        <div className='fr-container'>
          <div className='fr-grid-row fr-grid-row--center'>
            <h2 className='text-center'>
              {wording.homepage.section_steps.title}
            </h2>
            <p className='fr-text--lead text-center'>
              {wording.homepage.section_steps.description}
            </p>
          </div>
          <div
            className={`fr-grid-row fr-grid-row--gutters fr-mx-1w ${
              isMobile && 'fr-mb-4w'
            }`}
          >
            {wording.homepage.section_steps.number_blocks.map(
              (block, index) => (
                <React.Fragment key={index}>
                  <BlockNumber
                    className={`fr-col-12 fr-col-lg-4 ${
                      isMobile && 'content-center direction-col text-center'
                    }`}
                    description={block.description}
                    number={block.number}
                    title={block.title}
                  />
                  {index <
                    wording.homepage.section_steps.number_blocks.length - 1 && (
                    <div
                      className={`${
                        isMobile
                          ? 'fr-col-12 fr-col-lg-auto'
                          : 'fr-hidden fr-unhidden-lg'
                      } ${styles.arrowContainer}`}
                    >
                      <span
                        aria-hidden='true'
                        className={`${
                          isMobile
                            ? 'fr-icon-arrow-down-s-line'
                            : 'fr-icon-arrow-right-s-line'
                        } content-center ${styles.arrowIcon}`}
                      />
                    </div>
                  )}
                </React.Fragment>
              )
            )}
          </div>
          <p className='fr-mb-4w fr-mt-1w fr-text--lead text-center'>
            <span
              aria-hidden='true'
              className={`fr-icon-recycle-fill ${styles['fr-icon-recycle-fill']} fr-mr-1w`}
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
          <ul className='fr-grid-row fr-grid-row--gutters fr-grid-row--center'>
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
      <section
        className={`fr-container-fluid fr-py-10w ${styles['section-grey']}`}
      >
        <div className='fr-container'>
          <h2 className='text-center'>
            {wording.homepage.section_who_are_you.title}
          </h2>
          <p className='fr-text--lead text-center'>
            {wording.homepage.section_who_are_you.description}
          </p>
          <ul className='fr-grid-row fr-grid-row--gutters fr-grid-row--center'>
            {isMobile
              ? wording.homepage.section_who_are_you.cards.map(
                  (card, index) => (
                    <li className='fr-col-12' key={index}>
                      <Tile
                        description={card.description}
                        href={card.url}
                        title={card.title}
                      />
                    </li>
                  )
                )
              : wording.homepage.section_who_are_you.cards.map(
                  (card, index) => (
                    <CardIcon
                      alt={card.alt}
                      className='fr-col-12 fr-col-md-6 fr-col-lg-3'
                      description={card.description}
                      image={card.image}
                      key={index}
                      title={card.title}
                      url={card.url}
                    />
                  )
                )}
          </ul>
        </div>
      </section>
    </div>
  );
}
