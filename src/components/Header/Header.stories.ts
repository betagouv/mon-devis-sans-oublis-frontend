import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    affiliatedMinistry: ['Ministère', 'de la transition', 'écologique'],
    beta: 'beta',
    buttons: [
      {
        href: 'https://example.com/contact',
        icon: 'fr-icon-question-line',
        label: 'Nous contacter',
      },
    ],
    organizationDetails: 'Vérifiez vos devis de rénovation énergétique',
    organizationLink: 'https://example.com',
    organizationName: 'Mon Devis Sans Oublis',
  },
};

export const MultipleButtons: Story = {
  args: {
    ...Default.args,
    buttons: [
      {
        href: 'https://example.com/contact',
        icon: 'fr-icon-question-line',
        label: 'Nous contacter',
      },
      {
        href: 'https://example.com/help',
        icon: 'fr-icon-info-line',
        label: 'Aide',
      },
      {
        href: 'https://example.com/account',
        icon: 'fr-icon-account-line',
        label: 'Mon compte',
      },
    ],
  },
};

export const WithoutBeta: Story = {
  args: {
    ...Default.args,
    beta: undefined,
  },
};
