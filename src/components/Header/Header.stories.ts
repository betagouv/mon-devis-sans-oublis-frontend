import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    affiliatedMinistry: {
      description:
        'Array of strings representing the ministry name, each element will be on a new line',
      control: { type: 'object', subtype: 'array' },
    },
    buttons: {
      description:
        'Array of navigation buttons with href, icon, and label properties',
      control: { type: 'object' },
    },
    organizationDetails: {
      description: 'Short description of the organization',
      control: { type: 'text' },
    },
    organizationLink: {
      description: 'URL of the organization website',
      control: { type: 'text' },
    },
    organizationName: {
      description: 'Name of the organization',
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    affiliatedMinistry: ['Ministère', 'de la transition', 'écologique'],
    buttons: [
      {
        href: 'https://example.com/contact',
        icon: 'fr-icon-question-line',
        label: 'Nous contacter',
      },
    ],
    organizationDetails: 'Vérifiez vos devis de rénovation énergétique',
    organizationLink: 'https://example.com',
    organizationName: 'Mon Service',
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
  parameters: {
    docs: {
      description: {
        story: 'Example with multiple navigation buttons in the header.',
      },
    },
  },
};
