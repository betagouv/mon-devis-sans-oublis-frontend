import type { Meta, StoryObj } from '@storybook/react';
import Tag, { TagVariant } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(TagVariant),
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: 'Default Tag',
    variant: TagVariant.BLUE,
  },
};

export const Green: Story = {
  args: {
    label: 'Green Tag',
    variant: TagVariant.GREEN,
  },
};

export const LongText: Story = {
  args: {
    label: 'This is a longer tag text',
    variant: TagVariant.BLUE,
  },
};
