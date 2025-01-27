import type { Meta, StoryObj } from '@storybook/react';

import QuoteStatusCard from './QuoteStatusCard';

const meta = {
  title: 'Components/QuoteStatusCard',
  component: QuoteStatusCard,
  tags: ['autodocs'],
} satisfies Meta<typeof QuoteStatusCard>;

export default meta;

type Story = StoryObj<typeof QuoteStatusCard>;

export const QuoteStatusCardOK: Story = {
  args: {
    description:
      'Bravo, votre devis est complet. Il répond aux attentes des différentes aides de rénovation énergétique.',
    descriptionOKMore: 'Prochaine étape : partagez votre devis à votre client',
    imageAlt: 'Quote OK',
    imageSrc: '/images/quotation_results/quotation_status_ok.webp',
    title: 'Il est top ce devis !',
  },
};

export const QuoteStatusCardKO: Story = {
  args: {
    description:
      'Le devis n’est pas conforme aux attentes des aides énergétique, il risque d’être retoqué.',
    descriptionKOMore:
      'Nous vous conseillons de le refaire dès maintenant pour éviter les allers-retours avec votre client.',
    imageSrc: '/images/quotation_results/quotation_status_ko.webp',
    imageAlt: 'Quote KO',
    title: 'Aïe, ce devis va coincer...',
  },
};
