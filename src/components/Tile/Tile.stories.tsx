import type { Meta, StoryObj } from '@storybook/react';

import Tile from './Tile';

const meta = {
  title: 'Components/Tile',
  component: Tile,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the tile',
    },
    description: {
      control: 'text',
      description: 'Description text for the tile',
    },
    href: {
      control: 'text',
      description: 'URL for the tile link',
    },
  },
} satisfies Meta<typeof Tile>;

export default meta;
type Story = StoryObj<typeof Tile>;

export const Default: Story = {
  args: {
    title: 'Example Tile',
    description: 'This is a simple description for the tile.',
    href: '#',
  },
};
