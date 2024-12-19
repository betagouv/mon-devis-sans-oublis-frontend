import type { Meta, StoryObj } from '@storybook/react';

import BlockNumber, { BlockNumberSize } from './BlockNumber'; // {{ edit_1 }}

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

export const Medium: Story = {
  args: {
    number: 1,
    size: BlockNumberSize.MEDIUM,
    title: 'Découvrez les corrections',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: BlockNumberSize.LARGE,
  },
};
