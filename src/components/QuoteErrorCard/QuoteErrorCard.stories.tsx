import type { Meta, StoryObj } from '@storybook/react';

import QuoteErrorCard, {
  QuoteErrorCardCategory,
  QuoteErrorCardType,
} from './QuoteErrorCard';

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
        category: QuoteErrorCardCategory.ADMIN,
        id: 1,
        title: 'Le terme “devis” doit être indiqué clairement',
        type: QuoteErrorCardType.MISSING,
        modalContent: {
          buttonBackText: 'Retour',
          buttonContactText: 'Nous contacter',
          correctionHelpful: 'Cette correction vous a-t-elle aidé ?',
          iconAlt: 'Icône de correction',
          iconSrc: '/images/quote_correction_details.png',
          isOpen: false,
          title: 'Détails de la correction',
          problem: {
            title: 'Problème identifié',
            description: 'Le terme “devis” est absent du document.',
          },
          solution: {
            title: 'Solution',
            description: 'Ajoutez le terme “devis” au document.',
          },
        },
      },
      {
        category: QuoteErrorCardCategory.ADMIN,
        id: 2,
        title: 'Il manque votre n° de SIRET (14 chiffres)',
        type: QuoteErrorCardType.WRONG,
        modalContent: {
          buttonBackText: 'Retour',
          buttonContactText: 'Nous contacter',
          correctionHelpful: 'Cette correction vous a-t-elle aidé ?',
          iconAlt: 'Icône de correction',
          iconSrc: '/images/quote_correction_details.png',
          isOpen: false,
          title: 'Détails pour le n° de SIRET',
          problem: {
            title: 'Problème identifié',
            description: 'Le numéro SIRET est manquant ou incorrect.',
          },
          solution: {
            title: 'Solution',
            description: 'Ajoutez un numéro SIRET valide (14 chiffres).',
          },
        },
      },
    ],
  },
};
