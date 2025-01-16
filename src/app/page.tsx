'use client';

import React from 'react';
import Image from 'next/image';

import {
  Badge,
  BadgeVariant,
  BlockIcon,
  BlockNumber,
  Card,
  Link,
  Tile,
} from '@/components';
import { useIsDesktop } from '@/hooks';
import wording from '@/wording';

export default function Home() {
  const isDesktop = useIsDesktop();

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
              <ul className='fr-raw-list fr-grid-row flex-nowrap gap-6 !justify-start w-max lg:flex-wrap lg:!justify-center lg:w-full'>
                {wording.homepage.section_examples.cards.map((card, index) => (
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
          <div className='fr-grid-row fr-grid-row--gutters flex flex-wrap'>
            <div className='fr-col-12 fr-col-md-6 flex'>
              <Card
                image='/images/ministere_transition_ecologique.png'
                title='Qui sommes-nous ?'
              >
                <p className='text-[var(--text-mention-grey)]'>
                  Mon Devis Sans Oublis est un service public gratuit qui
                  vérifie en quelques secondes la conformité des devis aux
                  attendus réglementaires des aides à la rénovation énergétique.
                  <br />
                  <br />
                  Nous sommes un service public lancé par le Ministère de la
                  Transition Ecologique et la Direction du Numérique (DINUM)
                  sous la forme d'une start-up d'Etat. Elle est en phase
                  d'expérimentation avant un déploiement massif. N'hésitez pas à
                  nous faire part de vos retours et suggestions d'améliorations.
                </p>
              </Card>
            </div>
            <div className='fr-col-12 fr-col-md-6 flex'>
              <Card title='Quelles sont nos missions ?'>
                <div className='[&_p]:m-0'>
                  <div className='flex flex-row gap-2 mt-8'>
                    <span className='fr-icon-map-pin-2-line text-[var(--background-action-high-blue-france)] mt-1' />
                    <div className='flex flex-col'>
                      <p className='font-bold text-[var(--text-title-grey)]'>
                        Fluidifier l’instructions des aides
                      </p>
                      <p className='text-[var(--text-mention-grey)]'>
                        Création d’un modèle d’analyse automatique qui compare
                        les devis de rénovation énergétique avec les exigences
                        des demandes d’aides.
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-row gap-2 mt-8'>
                    <span className='fr-icon-timer-line text-[var(--background-action-high-blue-france)] mt-1' />
                    <div className='flex flex-col'>
                      <p className='font-bold text-[var(--text-title-grey)]'>
                        Réduire les délais d’instruction d’aide
                      </p>
                      <p className='text-[var(--text-mention-grey)]'>
                        Réduction du nombre d’allers-retours avec les
                        instructeurs d’aides avec un pré-contrôle gratuit et
                        instantané.
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-row gap-2 mt-8'>
                    <span className='fr-icon-heart-line text-[var(--background-action-high-blue-france)] mt-1' />
                    <div className='flex flex-col'>
                      <p className='font-bold text-[var(--text-title-grey)]'>
                        Améliorer la satisfaction des usagers
                      </p>
                      <p className='text-[var(--text-mention-grey)]'>
                        Conception d’une interface simple qui accompagne les
                        usagers dans la lecture et la correction des devis.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className='fr-container-fluid fr-py-10w'>
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
                <Tile
                  className={
                    isDesktop
                      ? 'hidden md:flex w-full'
                      : 'block md:hidden w-full'
                  }
                  description={card.description}
                  href={card.url}
                  image={isDesktop ? card.image : undefined}
                  title={card.title}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
