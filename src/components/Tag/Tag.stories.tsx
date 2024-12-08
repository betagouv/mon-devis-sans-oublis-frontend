import type { Meta, StoryObj } from '@storybook/react';

import Tag from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: 'Beta',
  },
};

export const LongText: Story = {
  args: {
    label: 'Version Beta',
  },
};

export const ShortText: Story = {
  args: {
    label: 'V1',
  },
};

export const WithNumber: Story = {
  args: {
    label: 'Beta 2.0',
  },
};
