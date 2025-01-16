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
import wording from '@/wording';

export default function Home() {
  const isDesktop = useIsDesktop();

  return (
    <div className='[&_h2]:text-center'>
      <section className='fr-container-fluid fr-py-10w bg-[var(--background-default-grey-hover)]'>
        <div className='fr-container'>
          <div className='flex flex-col md:flex-row md:justify-between'>
            <div className='fr-col-12 fr-col-md-5'>
              <h1>{wording.homepage.section_examples.title}</h1>
              <ul className='fr-raw-list fr-badges-group fr-mb-3w flex flex-wrap gap-4'>
                {wording.homepage.section_examples.badges.map(
                  (badge, index) => (
                    <li key={index}>
                      <Badge
                        label={badge.label}
                        variant={BadgeVariant.BLUE_LIGHT}
                      />
                    </li>
                  )
                )}
              </ul>
              <Link {...wording.homepage.check_quote_button} />
            </div>
            <div className='mt-10 md:mt-0 flex justify-center'>
              <Image
                alt='Mon Devis Sans Oublis'
                className='w-auto h-[220px] md:h-[300px] lg:h-[376px] object-contain'
                height={376}
                sizes='100vw'
                src='/images/homepage.png'
                width={0}
              />
            </div>
          </div>
        </div>
      </section>
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <h2>A quoi sert Mon Devis Sans Oublis ?</h2>
          <div className='fr-grid-row fr-grid-row--gutters flex flex-col md:flex-row'>
            <div className='fr-col-12 fr-col-md-4 flex-1'>
              <CardImage
                description='Identifiez les mentions manquantes aux attendus réglementaires des aides.'
                image='/images/quote_control.png'
                title='Pré-contrôler en un clic les devis de rénovation énergétique'
              />
            </div>
            <div className='fr-col-12 fr-col-md-4 flex-1'>
              <CardImage
                description='Accélérez l’instruction des aides de rénovation énergétique en évitant les allers-retours avec les instructeurs grâce à des devis conformes.'
                image='/images/get_help.png'
                title='Obtenez vos aides de rénovation plus rapidement'
              />
            </div>
            <div className='fr-col-12 fr-col-md-4 flex-1'>
              <CardImage
                description='Conception d’une interface simple qui accompagne les usagers dans la lecture et la correction des devis.'
                image='/images/change_quote.png'
                title='Améliorez la satisfaction des usagers'
              />
            </div>
          </div>
          <div className='fr-grid-row fr-grid-row--center'>
            <h2 className='fr-mt-8w'>
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
          <h2 className='fr-mt-6w fr-mb-5w'>
            {wording.homepage.section_steps.title}
          </h2>
          <div className='flex flex-col md:flex-row gap-10'>
            <Image
              alt='Mon Devis Sans Oublis'
              className='w-auto lg:h-[420px] md:h-[380px] h-[224px] object-contain'
              height={420}
              sizes='100vw'
              src='/images/three_steps.png'
              width={0}
            />
            <div className='flex flex-col'>
              <BlockNumber
                number={1}
                title={
                  <span>
                    <span className='font-bold mr-1.5'>
                      Déposez votre devis
                    </span>
                    afin qu'il soit analysé par notre outil qui vérifie que tous
                    les attendus réglementaires soient bien présents.
                  </span>
                }
              />
              <BlockNumber
                className='my-2'
                number={2}
                title={
                  <span>
                    <span className='font-bold mr-1.5'>
                      Découvrez instantanément les suggestions de corrections
                    </span>
                    adaptées aux demandes d’aides de rénovation énergétique.
                  </span>
                }
              />
              <BlockNumber
                number={3}
                title={
                  <span>
                    Informez les parties prenantes (par ex: artisans,
                    mandataires) et
                    <span className='font-bold ml-1.5'>
                      partagez vos corrections personnalisées.
                    </span>
                  </span>
                }
              />
              <p className='bg-[var(--background-alt-blue-france)] p-4'>
                <span className='fr-icon-restart-line mr-1 ml-0 text-[var(--text-title-blue-france)]' />
                {
                  "Une fois corrigé, soumettez à nouveau votre devis jusqu'à ce qu'il soit conforme."
                }
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
                image='/images/ministere_transition_ecologique.png'
                title='Qui sommes-nous ?'
              >
                <p className='text-[var(--text-mention-grey)]'>
                  Mon Devis Sans Oublis est un service public gratuit qui
                  vérifie en quelques secondes la conformité des devis aux
                  attendus réglementaires des aides à la rénovation énergétique.
                  <br />
                  <br />
                  {
                    "Nous sommes un service public lancé par le Ministère de la Transition Ecologique et la Direction du Numérique (DINUM) sous la forme d'une start-up d'Etat. Elle est en phase d'expérimentation avant un déploiement massif. N'hésitez pas à nous faire part de vos retours et suggestions d'améliorations."
                  }
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
