import type { Meta, StoryObj } from '@storybook/react';

import Footer from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
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
      description: 'Array of navigation links with href and label properties',
      control: { type: 'object', subtype: 'array' },
    },
    organizationDetails: {
      description: 'Detailed description of the organization',
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
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    affiliatedMinistry: ['Ministère', 'de la transition', 'écologique'],
    buttons: [
      { href: '/', label: 'Plan du site' },
      {
        href: '/',
        label: 'Accessibilité : non/partiellement/totalement conforme',
      },
      { href: '/', label: 'Mentions légales' },
      { href: '/', label: 'Données personnelles' },
      { href: '/', label: 'Gestion des cookies' },
    ],
    organizationDetails:
      "Mon Devis Sans Oublis est un service public lancé par le Ministère de la Transition Ecologique et la Direction du Numérique (DINUM) sous la forme d'une start-up d'Etat. Elle est en phase d'expérimentation avant un déploiement massif. N'hésitez pas à nous faire part de vos retours et suggestions d'améliorations",
    organizationLink: '/',
    organizationName: 'Mon Devis Sans Oublis',
  },
};
