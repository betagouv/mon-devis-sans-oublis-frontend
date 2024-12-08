import type { Meta, StoryObj } from '@storybook/react';

import CardImage from './CardImage';

const meta = {
  title: 'Components/CardImage',
  component: CardImage,
  tags: ['autodocs'],
} satisfies Meta<typeof CardImage>;

export default meta;
type Story = StoryObj<typeof CardImage>;

export const Default: Story = {
  args: {
    image: 'checker.png',
    title: 'Artisan',
  },
};

export const WithLongTitle: Story = {
  args: {
    image: 'checker.png',
    title: 'A longer title that might wrap to multiple lines',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with a longer title to show text wrapping behavior.',
      },
    },
  },
};

export const CardImageGrid: Story = {
  decorators: [
    () => {
      const cardImageData = [
        {
          image: 'checker.png',
          title: 'Isolation',
        },
        {
          image: 'checker.png',
          title: 'Menuiserie',
        },
        {
          image: 'checker.png',
          title: 'Eau chaude sanitarire',
        },
        {
          image: 'checker.png',
          title: 'Système de chauffage',
        },
        {
          image: 'checker.png',
          title: 'Ventilation',
        },
        {
          image: 'checker.png',
          title: 'Système de régulation',
        },
      ];
      return (
        <div className='fr-grid-row fr-grid-row--center'>
          <div className='scroll-container'>
            <ul className='fr-grid-row fr-grid-row--gutters'>
              {cardImageData.map((cardImage, index) => (
                <li className='fr-col-4 fr-col-md-2' key={index}>
                  <CardImage image={cardImage.image} title={cardImage.title} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    },
  ],
};
