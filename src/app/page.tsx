'use client';

import React from 'react';
import Image from 'next/image';

import {
  Badge,
  BadgeVariant,
  BlockNumber,
  Card,
  CardImage,
  Link,
  Tile,
} from '@/components';
import { useIsDesktop } from '@/hooks';
import { richTextParser } from '@/utils';
import wording from '@/wording';

export default function Home() {
  const isDesktop = useIsDesktop();

  return (
    <div className='[&_h2]:text-center'>
      <section className='fr-container-fluid fr-py-10w bg-[var(--background-default-grey-hover)]'>
        <div className='fr-container'>
          <div className='flex flex-col md:flex-row md:justify-between'>
            <div className='fr-col-12 fr-col-md-5'>
              <h1>{wording.homepage.hero_section.title}</h1>
              <ul className='fr-raw-list fr-badges-group fr-mb-3w flex flex-wrap gap-4'>
                {wording.homepage.hero_section.badges.map((badge, index) => (
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
            <div className='mt-10 md:mt-0 flex justify-center'>
              <Image
                alt={wording.homepage.hero_section.image.alt}
                className='w-auto h-[220px] md:h-[300px] lg:h-[376px] object-contain'
                height={376}
                sizes='100vw'
                src={wording.homepage.hero_section.image.src}
                width={0}
              />
            </div>
          </div>
        </div>
      </section>
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <h2
            className='fr-mb-4w'
            style={{ fontFamily: 'var(--font-spectral)' }}
          >
            {wording.homepage.explanation_cards.title_1}
          </h2>
          <div className='fr-grid-row fr-grid-row--gutters flex flex-col md:flex-row items-stretch'>
            {wording.homepage.explanation_cards.image_cards.map(
              (card, index) => (
                <div className='fr-col-12 fr-col-md-4 flex' key={index}>
                  <CardImage
                    description={card.description}
                    image={card.image}
                    title={card.title}
                  />
                </div>
              )
            )}
          </div>
          <div className='fr-grid-row fr-grid-row--center fr-mt-10w fr-mb-7w'>
            <h2
              className='fr-mb-4w'
              style={{ fontFamily: 'var(--font-spectral)' }}
            >
              {wording.homepage.explanation_cards.title_2}
            </h2>
            <div className='lg:block overflow-x-auto overflow-y-hidden whitespace-nowrap w-full scrollbar-none touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
              <ul className='fr-raw-list fr-grid-row flex-nowrap gap-6 !justify-start w-max lg:flex-wrap lg:!justify-center lg:w-full'>
                {wording.homepage.explanation_cards.cards.map((card, index) => (
                  <li
                    className='flex-none w-[147px] whitespace-normal flex flex-col items-center'
                    key={index}
                  >
                    <Image
                      alt={card.title}
                      height={132}
                      src={card.image}
                      width={147}
                    />
                    <p className='fr-text--xs fr-mt-1w text-center'>
                      {card.title}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h2
            className='fr-mb-6w'
            style={{ fontFamily: 'var(--font-spectral)' }}
          >
            {wording.homepage.explanation_cards.title_3}
          </h2>
          <div className='flex flex-col md:flex-row gap-10'>
            <Image
              alt={wording.homepage.explanation_cards.image.alt}
              className='w-auto lg:h-[420px] md:h-[380px] h-[224px] object-contain'
              height={420}
              sizes='100vw'
              src={wording.homepage.explanation_cards.image.src}
              width={0}
            />
            <div className='flex flex-col'>
              {wording.homepage.explanation_cards.number_blocks.map(
                (block, index) => (
                  <BlockNumber
                    className='fr-mb-2w'
                    key={index}
                    number={block.number}
                    title={richTextParser(block.title)}
                  />
                )
              )}
              <p className='bg-[var(--background-alt-blue-france)] p-4'>
                <span className='fr-icon-restart-line mr-1 ml-0 text-[var(--text-title-blue-france)]' />
                {wording.homepage.explanation_cards.correction}
              </p>
              <div className='flex items-end md:mt-auto mt-6 justify-center md:justify-start'>
                <Link {...wording.homepage.check_quote_button} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='fr-container-fluid fr-py-10w bg-[var(--background-default-grey-hover)]'>
        <div className='fr-container'>
          <div className='fr-grid-row fr-grid-row--gutters flex flex-wrap'>
            <div className='fr-col-12 fr-col-md-6 flex'>
              <Card
                image={wording.homepage.about_us.who_are_we.image}
                title={wording.homepage.about_us.who_are_we.title}
              >
                <p className='text-[var(--text-mention-grey)]'>
                  {richTextParser(
                    wording.homepage.about_us.who_are_we.description
                  )}
                </p>
              </Card>
            </div>
            <div className='fr-col-12 fr-col-md-6 flex'>
              <Card title={wording.homepage.about_us.our_missions.title}>
                <div className='[&_p]:m-0'>
                  {wording.homepage.about_us.our_missions.missions.map(
                    (mission, index) => (
                      <div className='flex flex-row gap-2 mt-8' key={index}>
                        <span
                          className={`${mission.icon} text-[var(--background-action-high-blue-france)] mt-1`}
                        />
                        <div className='flex flex-col'>
                          <p className='font-bold text-[var(--text-title-grey)]'>
                            {mission.title}
                          </p>
                          <p className='text-[var(--text-mention-grey)]'>
                            {mission.description}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <h2 style={{ fontFamily: 'var(--font-spectral)' }}>
            {wording.homepage.section_who_are_you.title}
          </h2>
          <p className='fr-text--lead text-center'>
            {wording.homepage.section_who_are_you.description}
          </p>
          <ul className='fr-raw-list fr-grid-row fr-grid-row--gutters fr-grid-row--center items-stretch'>
            {wording.homepage.section_who_are_you.cards.map((card, index) => (
              <li
                className='fr-col-12 fr-col-md-6 fr-col-lg-3 flex'
                key={index}
              >
                {isDesktop ? (
                  <Tile
                    description={card.description}
                    image={card.image}
                    href={card.url}
                    title={card.title}
                  />
                ) : (
                  <Tile
                    description={card.description}
                    href={card.url}
                    title={card.title}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
