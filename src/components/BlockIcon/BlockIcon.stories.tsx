import type { Meta, StoryObj } from '@storybook/react';

import BlockIcon from './BlockIcon';

const meta = {
  title: 'Components/BlockIcon',
  component: BlockIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof BlockIcon>;

export default meta;
type Story = StoryObj<typeof BlockIcon>;

export const Default: Story = {
  args: {
    description:
      'Artisans ou particuliers, profitez d’une aide personnalisée à la modification de vos devis',
    icon: 'fr-icon-file-download-line',
    title: 'Explications claires',
  },
};

export const BlockIconGrid: Story = {
  decorators: [
    () => (
      <div className='fr-grid-row fr-grid-row--gutters'>
        <BlockIcon
          description='Artisans ou particuliers, profitez d’une aide personnalisée à la modification de vos devis'
          icon='fr-icon-file-download-line'
          title='Explications claires'
        />
        <BlockIcon
          description='Corrigez facilement vos devis grâce au guide restitué après l’analyse'
          icon='fr-icon-time-line'
          title='Gain de temps'
        />
        <BlockIcon
          description="Moins d'allers-retours avec les instructeurs d'aides à la rénovation énergétique et des délais raccourcis"
          icon='fr-icon-calendar-event-line'
          title='Instruction accélérée'
        />
      </div>
    ),
  ],
};
