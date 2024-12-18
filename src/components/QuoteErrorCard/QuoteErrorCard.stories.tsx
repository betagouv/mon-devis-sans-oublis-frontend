import type { Meta, StoryObj } from '@storybook/react';

import QuoteErrorCard from './QuoteErrorCard';

const meta: Meta<typeof QuoteErrorCard> = {
  title: 'Components/QuoteErrorCard',
  component: QuoteErrorCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QuoteErrorCard>;

export const Default: Story = {
  args: {
    list: [
      {
        id: 1,
        title: 'Le terme “devis” doit être indiqué clairement',
        info: 'Information manquante',
        infoIcon: 'fr-icon-warning-line',
        modalContent: {
          buttonBackText: 'Retour',
          buttonContactText: 'Nous contacter',
          correctionHelpful: 'Cette correction vous a-t-elle aidé ?',
          iconAlt: 'Icône de correction',
          iconSrc: '/images/quote_correction_details.png',
          isOpen: false,
          problem: {
            title: 'Problème identifié',
            description: 'Le terme “devis” est absent du document.',
          },
          solution: {
            title: 'Solution',
            description: 'Ajoutez le terme “devis” au document.',
          },
          title: 'Détails de la correction',
        },
      },
      {
        id: 2,
        title: 'Il manque votre n° de SIRET (14 chiffres)',
        info: 'Information erronée',
        infoIcon: 'fr-icon-edit-circle-line',
        modalContent: {
          buttonBackText: 'Retour',
          buttonContactText: 'Nous contacter',
          correctionHelpful: 'Cette correction vous a-t-elle aidé ?',
          iconAlt: 'Icône de correction',
          iconSrc: '/images/quote_correction_details.png',
          isOpen: false,
          problem: {
            title: 'Problème identifié',
            description: 'Le numéro SIRET est manquant ou incorrect.',
          },
          solution: {
            title: 'Solution',
            description: 'Ajoutez un numéro SIRET valide (14 chiffres).',
          },
          title: 'Détails pour le n° de SIRET',
        },
      },
    ],
  },
};
