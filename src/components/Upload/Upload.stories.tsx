import type { Meta, StoryObj } from '@storybook/react';

import Upload from './Upload';

const meta = {
  title: 'Components/Upload',
  component: Upload,
  tags: ['autodocs'],
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof Upload>;

export const Default: Story = {
  args: {
    label: 'Ajouter des fichiers',
    description:
      'Taille maximale : 50Mo. Format supporté : pdf. Un seul fichier possible.',
  },
};
