import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxGroup } from './CheckboxGroup';

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { id: 'checkbox-1', label: 'Option 1' },
  { id: 'checkbox-2', label: 'Option 2' },
  { id: 'checkbox-3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    legend: 'Select your options',
    options: defaultOptions,
  },
};

export const SingleOption: Story = {
  args: {
    legend: 'Single checkbox group',
    options: [{ id: 'single', label: 'Single option' }],
  },
};
