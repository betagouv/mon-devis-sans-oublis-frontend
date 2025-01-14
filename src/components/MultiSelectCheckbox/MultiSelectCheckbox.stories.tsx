import type { Meta, StoryObj } from '@storybook/react';

import { MultiSelectCheckbox } from './MultiSelectCheckbox';

const meta = {
  title: 'Components/MultiSelectCheckbox',
  component: MultiSelectCheckbox,
  tags: ['autodocs'],
} satisfies Meta<typeof MultiSelectCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const simpleOptions = ['option1', 'option2', 'option3', 'option4'];

const groupedOptions = [
  { id: 'fruit1', label: 'Pomme', group: 'Fruits' },
  { id: 'fruit2', label: 'Banane', group: 'Fruits' },
  { id: 'fruit3', label: 'Orange', group: 'Fruits' },
  { id: 'vegetable1', label: 'Carotte', group: 'Légumes' },
  { id: 'vegetable2', label: 'Poireau', group: 'Légumes' },
  { id: 'vegetable3', label: 'Tomate', group: 'Légumes' },
];

export const SimpleOptions: Story = {
  args: {
    label: 'Multi-sélection simple',
    options: simpleOptions,
    onChange: (values: string[]) => {
      console.log('Selected values:', values);
    },
  },
};

export const GroupedOptions: Story = {
  args: {
    label: 'Multi-sélection groupée',
    options: groupedOptions,
    onChange: (values: string[]) => {
      console.log('Selected values:', values);
    },
  },
};

export const WithPreselectedValues: Story = {
  args: {
    label: 'Multi-sélection avec valeurs présélectionnées',
    options: simpleOptions,
    selectedValues: ['option1', 'option3'],
    onChange: (values: string[]) => {
      console.log('Selected values:', values);
    },
  },
};
