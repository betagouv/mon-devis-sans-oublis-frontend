import { BlockIcon, BlockNumber, Button, Card } from '@/components';

import styles from './page.module.css';

export default function Home() {
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
        'Gagner du temps en évitant les multiples changements sur vos devis',
      image: 'card_artisan.png',
      title: 'Je suis un artisan',
      url: '/artisan',
    },
    {
      alt: '[À MODIFIER - vide ou texte alternatif de l’image]',
      description: 'Simplifiez votre processus avec notre aide dédiée',
      image: 'card_individual.png',
      title: 'Je suis un particulier',
      url: '/particulier',
    },

    {
      alt: '[À MODIFIER - vide ou texte alternatif de l’image]',
      description: 'Faire le lien entre les différentes parties prenantes',
      image: 'card_agent.png',
      title: 'Je suis un mandataire',
      url: '/mandataire',
    },
    {
      alt: '[À MODIFIER - vide ou texte alternatif de l’image]',
      description: 'Accompagner ses clients dans leurs démarches',
      image: 'card_advisor.png',
      title: 'Je suis un conseiller',
      url: '/conseiller',
    },
  ];

  const checkQuoteButton = {
    href: '/bienvenue',
    icon: 'fr-icon-arrow-right-line',
    label: 'Vérifier mon devis',
  };

  return (
    <div>
      <section
        className={`fr-container-fluid fr-py-10w ${styles['section-grey']}`}
      >
        <div className='fr-container'>
          <div className='fr-grid-row fr-grid-row--center'>
            <h1>Une démarche simplifiée en 3 étapes !</h1>
            <p className={`fr-text--lead ${styles.description}`}>
              Mon devis sans oublis est un service public gratuit qui vérifie en
              quelques secondes la conformité des devis aux attendus
              réglementaires des aides à la rénovation énergétique.
            </p>
          </div>
          <div className='fr-grid-row fr-grid-row--gutters fr-mx-1w'>
            {blockNumberData.map((blockNumber, index) => (
              <BlockNumber
                className='fr-col-12 fr-col-md-4'
                description={blockNumber.description}
                key={index}
                number={blockNumber.number}
                title={blockNumber.title}
              />
            ))}
          </div>
          <p
            className={`fr-mb-4w fr-mt-1w fr-text--lead ${styles.description}`}
          >
            <span
              aria-hidden='true'
              className={`fr-icon-recycle-fill ${styles['fr-icon-recycle-fill']} fr-mr-1w`}
            ></span>
            Une fois corrigé, soumettez à nouveau votre devis jusqu&apos;à ce
            qu&apos;il soit conforme.
          </p>
          <div className='fr-grid-row fr-grid-row--center'>
            <Button {...checkQuoteButton} />
          </div>
        </div>
      </section>
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <div className='fr-grid-row fr-grid-row--center'>
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
            <Button {...checkQuoteButton} />
          </div>
        </div>
      </section>
      <section
        className={`fr-container-fluid fr-py-10w ${styles['section-grey']}`}
      >
        <div className='fr-container'>
          <div className='fr-grid-row fr-grid-row--center'>
            <h1>Qui êtes-vous ?</h1>
            <p className={`fr-text--lead ${styles.description}`}>
              Simplifier les démarches administratives, les échanges
              d’informations et la validation de vos projets
            </p>
            {cardsData.map((card, index) => (
              <Card
                alt={card.alt}
                className='fr-col-12 fr-col-md-3'
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
