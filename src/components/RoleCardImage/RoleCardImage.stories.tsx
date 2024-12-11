import type { Meta, StoryObj } from '@storybook/react';

import RoleCardImage from './RoleCardImage';

const meta = {
  title: 'Components/RoleCardImage',
  component: RoleCardImage,
  tags: ['autodocs'],
} satisfies Meta<typeof RoleCardImage>;

export default meta;
type Story = StoryObj<typeof RoleCardImage>;

export const Artisan: Story = {
  args: {
    alt: "[À MODIFIER - vide ou texte alternatif de l'image]",
    description:
      'Gagner du temps en évitant les multiples changements sur vos devis',
    image: 'card_artisan.png',
    title: 'Je suis un artisan',
    url: '#',
  },
};

export const Individual: Story = {
  args: {
    alt: "[À MODIFIER - vide ou texte alternatif de l'image]",
    description: 'Simplifiez votre processus avec notre aide dédiée',
    image: 'card_individual.png',
    title: 'Je suis un particulier',
    url: '#',
  },
};

export const Agent: Story = {
  args: {
    alt: "À MODIFIER - vide ou texte alternatif de l'image]",
    description: 'Faire le lien entre les différentes parties prenantes',
    image: 'card_agent.png',
    title: 'Je suis un mandataire',
    url: '#',
  },
};

export const Advisor: Story = {
  args: {
    alt: "[À MODIFIER - vide ou texte alternatif de l'image]",
    description: 'Accompagner ses clients dans leurs démarches',
    image: 'card_advisor.png',
    title: 'Je suis un conseiller',
    url: '#',
  },
};

export const CardIconGrid: Story = {
  decorators: [
    () => {
      const cardsData = [
        Artisan.args,
        Individual.args,
        Agent.args,
        Advisor.args,
      ];

      return (
        <div className='fr-container'>
          <div className='fr-grid-row fr-grid-row--gutters'>
            {cardsData.map((card, index) => (
              <RoleCardImage
                alt={card?.alt ?? ''}
                description={card?.description ?? ''}
                image={card?.image ?? ''}
                key={index}
                title={card?.title ?? ''}
                url={card?.url ?? ''}
              />
            ))}
          </div>
        </div>
      );
    },
  ],
};
