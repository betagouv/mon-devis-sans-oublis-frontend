import type { Meta, StoryObj } from '@storybook/react';

import Badge, { BadgeVariant } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.values(BadgeVariant),
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const BlueDark: Story = {
  args: {
    label: 'Blue Dark Badge',
    variant: BadgeVariant.BLUE_DARK,
  },
};

export const BlueLight: Story = {
  args: {
    label: 'Blue Light Badge',
    variant: BadgeVariant.BLUE_LIGHT,
  },
};

export const Green: Story = {
  args: {
    label: 'Green Badge',
    variant: BadgeVariant.GREEN,
  },
};

export const Grey: Story = {
  args: {
    label: 'Grey Badge',
    variant: BadgeVariant.GREY,
  },
};
