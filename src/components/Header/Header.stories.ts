import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  args: {
    affiliatedMinistry: ['Ministère', 'de la transition', 'écologique'],
    organizationDetails: 'Vérifiez vos devis de rénovation énergétique',
    organizationLink: 'https://mon-devis-sans-oublis.beta.gouv.fr/',
    organizationName: 'Mon Devis Sans Oublis',
  },
};
