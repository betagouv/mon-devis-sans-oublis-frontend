'use client';

import {
  BlockIcon,
  BlockNumber,
  CardIcon,
  CardImage,
  Link,
  Tile,
} from '@/components';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import styles from './page.module.css';
import React from 'react';

export default function Home() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'XS' || breakpoint === 'SM';

  const badgeData = [
    {
      label: 'Ma prime renov',
    },
    {
      label: 'Eco PTZ',
    },
    {
      label: 'Aides CEEe',
    },
  ];
  const blockIconData = [
    {
      description:
        'Artisans ou particuliers, profitez d’une aide personnalisée à la modification de vos devis',
      icon: 'fr-icon-question-line',
      title: 'Explications claires',
    },
    {
      description:
        'Corrigez facilement vos devis grâce au guide restitué après l’analyse',
      icon: 'fr-icon-question-line',
      title: 'Gain de temps',
    },
    {
      description:
        "Moins d'allers-retours avec les instructeurs d'aides à la rénovation énergétique et des délais raccourcis",
      icon: 'fr-icon-question-line',
      title: 'Instruction accélérée',
    },
  ];

  const blockNumberData = [
    {
      description:
        'Téléchargez en un clic votre devis au format pdf sur Mon Devis Sans Oublis en cliquant sur "Vérifier mon devis"',
      number: 1,
      title: 'Envoyez votre devis',
    },
    {
      description:
        'Mon Devis Sans Oublis analyse automatiquement votre devis et identifie les mentions manquantes aux attendus réglementaires des aides à la rénovation énergétique',
      number: 2,
      title: 'Découvrez les suggestions de correction',
    },
    {
      description:
        'En un clic partagez les les corrections à apporter aux personnes qui vous accompagnent (artisans, mandataires, conseillers, etc.)',
      number: 3,
      title: 'Partagez votre guide personnalisé',
    },
  ];

  const cardsData = [
    {
      alt: '[À MODIFIER - vide ou texte alternatif de l’image]',
      description:
        'Je souhaite gagner du temps en évitant les multiples changements sur mes devis',
      image: 'card_artisan.png',
      title: 'Je suis un artisan',
      url: '/artisan',
    },
    {
      alt: '[À MODIFIER - vide ou texte alternatif de l’image]',
      description:
        'Je souhaite vérifier mes devis et gagner du temps dans les démarches',
      image: 'card_individual.png',
      title: 'Je suis un particulier',
      url: '/particulier',
    },

    {
      alt: '[À MODIFIER - vide ou texte alternatif de l’image]',
      description:
        'Je souhaite faire le lien entre les différentes parties prenantes',
      image: 'card_agent.png',
      title: 'Je suis un mandataire',
      url: '/mandataire',
    },
    {
      alt: '[À MODIFIER - vide ou texte alternatif de l’image]',
      description: 'Je souhaite accompagner mes clients dans leurs démarches',
      image: 'card_advisor.png',
      title: 'Je suis un conseiller',
      url: '/conseiller',
    },
  ];

  const cardImageData = [
    {
      image: 'checker.png',
      title: 'Isolation',
    },
    {
      image: 'checker.png',
      title: 'Menuiserie',
    },
    {
      image: 'checker.png',
      title: 'Eau chaude sanitarire',
    },
    {
      image: 'checker.png',
      title: 'Système de chauffage',
    },
    {
      image: 'checker.png',
      title: 'Ventilation',
    },
    {
      image: 'checker.png',
      title: 'Système de régulation',
    },
  ];

  const checkQuoteButton = {
    href: '/bienvenue',
    icon: 'fr-icon-arrow-right-line',
    label: 'Vérifier mon devis',
  };

  return (
    <div>
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <div className='fr-col-12 fr-col-lg-5'>
            <h1>
              Je souhaite vérifier un devis avant une demande d’aide de
              rénovation énergétique
            </h1>
            <ul className='fr-badges-group fr-mb-3w'>
              {badgeData.map((badge, index) => (
                <li key={index}>
                  <p className='fr-badge--green-archipel fr-text--sm fr-mr-2w'>
                    {badge.label}
                  </p>
                </li>
              ))}
            </ul>
            <Link {...checkQuoteButton} />
          </div>
          <div className='fr-grid-row fr-grid-row--center'>
            <h1 className='fr-mt-12w text-center'>
              Exemple de gestes de rénovation énergétique
            </h1>
            <div className='scroll-container'>
              <ul className='fr-grid-row fr-grid-row--gutters'>
                {cardImageData.map((cardImage, index) => (
                  <li className='fr-col-4 fr-col-md-2' key={index}>
                    <CardImage
                      image={cardImage.image}
                      title={cardImage.title}
                    />
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
            <h1 className='text-center'>
              Une démarche simplifiée en 3 étapes !
            </h1>
            <p className='fr-text--lead text-center'>
              Mon devis sans oublis est un service public gratuit qui vérifie en
              quelques secondes la conformité des devis aux attendus
              réglementaires des aides à la rénovation énergétique.
            </p>
          </div>
          <div
            className={`fr-grid-row fr-grid-row--gutters fr-mx-1w ${
              isMobile && 'fr-mb-4w'
            }`}
          >
            {blockNumberData.map((blockNumber, index) => (
              <React.Fragment key={index}>
                <BlockNumber
                  className={`fr-col-12 fr-col-lg-4 ${
                    isMobile && 'content-center direction-col text-center'
                  }`}
                  description={blockNumber.description}
                  number={blockNumber.number}
                  title={blockNumber.title}
                />
                {index < blockNumberData.length - 1 && (
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
                    ></span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className='fr-mb-4w fr-mt-1w fr-text--lead text-center'>
            <span
              aria-hidden='true'
              className={`fr-icon-recycle-fill ${styles['fr-icon-recycle-fill']} fr-mr-1w`}
            ></span>
            Une fois corrigé, soumettez à nouveau votre devis jusqu&apos;à ce
            qu&apos;il soit conforme.
          </p>
          <div className='fr-grid-row fr-grid-row--center'>
            <Link {...checkQuoteButton} />
          </div>
        </div>
      </section>
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <div className='fr-grid-row fr-grid-row--gutters fr-grid-row--center'>
            {blockIconData.map((blockIcon, index) => (
              <BlockIcon
                description={blockIcon.description}
                icon={blockIcon.icon}
                key={index}
                title={blockIcon.title}
              />
            ))}
          </div>
          <div className='fr-grid-row fr-grid-row--center fr-mt-3w'>
            <Link {...checkQuoteButton} />
          </div>
        </div>
      </section>
      <section
        className={`fr-container-fluid fr-py-10w ${styles['section-grey']}`}
      >
        <div className='fr-container'>
          <div className='fr-grid-row fr-grid-row--gutters fr-grid-row--center'>
            <h1>Qui êtes-vous ?</h1>
            <p className='fr-text--lead text-center'>
              Simplifier les démarches administratives, les échanges
              d&apos;informations et la validation de vos projets
            </p>
            {isMobile
              ? cardsData.map((card, index) => (
                  <div className='fr-col-12' key={index}>
                    <Tile
                      description={card.description}
                      href={card.url}
                      title={card.title}
                    />
                  </div>
                ))
              : cardsData.map((card, index) => (
                  <CardIcon
                    alt={card.alt}
                    className='fr-col-12 fr-col-md-6 fr-col-lg-3'
                    description={card.description}
                    image={card.image}
                    key={index}
                    title={card.title}
                    url={card.url}
                  />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
