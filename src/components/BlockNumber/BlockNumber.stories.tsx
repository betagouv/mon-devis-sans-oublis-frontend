import type { Meta, StoryObj } from '@storybook/react';

import BlockNumber from './BlockNumber';

const meta: Meta<typeof BlockNumber> = {
  title: 'Components/BlockNumber',
  component: BlockNumber,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlockNumber>;

export const Default: Story = {
  args: {
    description:
      'Téléchargez en un clic votre devis au format pdf sur Mon Devis Sans Oublis en cliquant sur "Vérifier mon devis"',
    number: 1,
    title: 'Envoyez votre devis',
  },
};
