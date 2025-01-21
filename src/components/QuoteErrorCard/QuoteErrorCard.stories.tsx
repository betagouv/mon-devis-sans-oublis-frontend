import type { Meta, StoryObj } from '@storybook/react';
import QuoteErrorCard from './QuoteErrorCard';
import { Category, Type } from '@/types';

const meta = {
  title: 'Components/QuoteErrorCard',
  component: QuoteErrorCard,
  tags: ['autodocs'],
} satisfies Meta<typeof QuoteErrorCard>;

export default meta;
type Story = StoryObj<typeof QuoteErrorCard>;

const mockOnHelpClick = (comment: string | null, errorDetailsId: string) => {
  console.log('Help clicked:', { comment, errorDetailsId });
};

const mockList = [
  {
    id: '1',
    geste_id: 'g1',
    category: Category.GESTES,
    type: Type.MISSING,
    code: 'ERROR_001',
    title: 'Erreur groupe A - élément 1',
    provided_value: 'Groupe A',
    problem: 'Problème 1',
    solution: 'Solution 1',
    modalContent: {
      problem: 'Problème 1',
      solution: 'Solution 1',
      title: 'Erreur groupe A - élément 1',
      isOpen: false,
      onClose: () => {},
      onSubmitFeedback: () => {},
    },
  },
  {
    id: '2',
    geste_id: 'g1',
    category: Category.GESTES,
    type: Type.MISSING,
    code: 'ERROR_002',
    title: 'Erreur groupe A - élément 2',
    provided_value: 'Groupe A',
    problem: 'Problème 2',
    solution: 'Solution 2',
    modalContent: {
      problem: 'Problème 2',
      solution: 'Solution 2',
      title: 'Erreur groupe A - élément 2',
      isOpen: false,
      onClose: () => {},
      onSubmitFeedback: () => {},
    },
  },
  {
    id: '3',
    geste_id: 'g2',
    category: Category.GESTES,
    type: Type.MISSING,
    code: 'ERROR_003',
    title: 'Erreur groupe B - élément 1',
    provided_value: 'Groupe B',
    problem: 'Problème 3',
    solution: 'Solution 3',
    modalContent: {
      problem: 'Problème 3',
      solution: 'Solution 3',
      title: 'Erreur groupe B - élément 1',
      isOpen: false,
      onClose: () => {},
      onSubmitFeedback: () => {},
    },
  },
  {
    id: '4',
    geste_id: '',
    category: Category.ADMIN,
    type: Type.MISSING,
    code: 'ERROR_004',
    title: 'Erreur administrative',
    provided_value: null,
    problem: 'Problème administratif',
    solution: 'Solution administrative',
    modalContent: {
      problem: 'Problème administratif',
      solution: 'Solution administrative',
      title: 'Erreur administrative',
      isOpen: false,
      onClose: () => {},
      onSubmitFeedback: () => {},
    },
  },
];

export const Default: Story = {
  args: {
    list: mockList,
    onHelpClick: mockOnHelpClick,
  },
};

export const WithGroupedGestes: Story = {
  args: {
    list: mockList.filter((item) => item.category === Category.GESTES),
    onHelpClick: mockOnHelpClick,
  },
};

export const WithAdminErrors: Story = {
  args: {
    list: mockList.filter((item) => item.category === Category.ADMIN),
    onHelpClick: mockOnHelpClick,
  },
};

export const MixedCategories: Story = {
  args: {
    list: mockList,
    onHelpClick: mockOnHelpClick,
  },
};
