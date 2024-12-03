import type { Meta, StoryObj } from '@storybook/react';

import BlockNumber from './BlockNumber';

const meta: Meta<typeof BlockNumber> = {
  title: 'Components/BlockNumber',
  component: BlockNumber,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlockNumber>;

export const Default: Story = {
  args: {
    number: 42,
    title: 'Example Title',
    description: 'This is a sample description for the block number component.',
  },
};

export const LargeNumber: Story = {
  args: {
    number: 1000,
    title: 'Large Number',
    description: 'Example with a larger number value.',
  },
};

export const ShortContent: Story = {
  args: {
    number: 7,
    title: 'Brief',
    description: 'Short text.',
  },
};
