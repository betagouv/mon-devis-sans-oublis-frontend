import type { Meta, StoryObj } from '@storybook/react';
import RoleCardIcon from './RoleCardIcon';

const meta = {
  title: 'Components/RoleCardIcon',
  component: RoleCardIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof RoleCardIcon>;

export default meta;
type Story = StoryObj<typeof RoleCardIcon>;

export const Artisan: Story = {
  args: {
    description:
      'Je souhaite gagner du temps en évitant les multiples changements sur mes devis',
    href: '/artisan/televersement',
    icon: 'fr-icon-tools-fill',
    title: 'Je suis un artisan',
  },
};

export const Individual: Story = {
  args: {
    description:
      'Je souhaite vérifier mes devis et gagner du temps dans les démarches',
    href: '/particulier/televersement',
    icon: 'fr-icon-home-4-fill',
    title: 'Je suis un particulier',
  },
};

export const Agent: Story = {
  args: {
    description:
      'Je souhaite faire le lien entre les différentes parties prenantes',
    href: '/mandataire/televersement',
    icon: 'fr-icon-compasses-2-fill',
    title: 'Je suis un.e mandataire',
  },
};

export const Advisor: Story = {
  args: {
    description: 'Je souhaite accompagner mes clients dans leurs démarches',
    href: '/conseiller/televersement',
    icon: 'fr-icon-customer-service-fill',
    title: 'Je suis un.e conseiller.e',
  },
};
