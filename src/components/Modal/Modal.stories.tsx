import type { Meta, StoryObj } from '@storybook/react';

import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    buttonBackText: 'Voir les détails',
    buttonContactHref: 'mailto:contact@mon-devis-sans-oublis.beta.gouv.fr',
    buttonContactText: 'Nous contacter',
    correctionHelpful: 'Cette correction vous a-t-elle aidé ?',
    iconAlt: 'Icone de la correction',
    iconSrc: '/images/quote_correction_details.png',
    isOpen: true,
    problem: {
      description:
        'Nous n’avons pas trouvé le terme “devis”, or les bons de commande et les propositions commerciales ne sont pas acceptées',
      title: 'Problème identifié',
    },
    solution: {
      description: 'Ajouter le terme “devis” à votre document',
      title: 'Solution',
    },
    title: 'Le terme “devis” doit être indiqué clairement',
  },
};
