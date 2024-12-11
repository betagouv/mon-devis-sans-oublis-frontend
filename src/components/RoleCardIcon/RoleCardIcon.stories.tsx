import type { Meta, StoryObj } from '@storybook/react';
import RoleCardIcon from './RoleCardIcon';

const meta = {
  title: 'Components/RoleCardIcon',
  component: RoleCardIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof RoleCardIcon>;

export default meta;
type Story = StoryObj<typeof RoleCardIcon>;

export const Default: Story = {
  args: {
    href: '/artisan',
    icon: 'fr-icon-tools-line',
    title: 'Je suis un artisan',
    description:
      'Je souhaite gagner du temps en évitant les multiples changements sur mes devis',
  },
};

export const WithDifferentIcon: Story = {
  args: {
    href: '/particulier',
    icon: 'fr-icon-home-4-fill',
    title: 'Je suis un particulier',
    description:
      'Je souhaite vérifier mes devis et gagner du temps dans les démarches',
  },
};

export const LongContent: Story = {
  args: {
    href: '/professionnel',
    icon: 'fr-icon-compasses-2-fill',
    title: 'Je suis un mandatire',
    description:
      'Je souhaite faire le lien entre les différentes parties prenantes',
  },
};

export const WithExternalLink: Story = {
  args: {
    href: '/conseiller',
    icon: 'fr-customer-service-fill',
    title: 'Je suis un conseiller',
    description: 'Je souhaite accompagner mes clients dans leurs démarches',
  },
};
