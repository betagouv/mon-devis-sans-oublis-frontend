import type { Meta, StoryObj } from '@storybook/react';
import QuoteErrorCard from './QuoteErrorCard';
import { Category, Type } from '@/context';

const meta = {
  title: 'Components/QuoteErrorCard',
  component: QuoteErrorCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuoteErrorCard>;

export default meta;
type Story = StoryObj<typeof QuoteErrorCard>;

const mockOnHelpClick = (
  comment: string | null,
  errorId: string,
  isHelpful: boolean | null
) => {
  console.log('Help clicked:', { comment, errorId, isHelpful });
};

export const Default: Story = {
  args: {
    list: [
      {
        id: '1',
        category: Category.GESTES,
        type: Type.MISSING,
        code: 'ERROR_001',
        title: 'Erreur simple',
        provided_value: null,
        modalContent: {
          problem: 'Description du problème',
          solution: 'Solution proposée',
          title: 'Erreur simple',
          isOpen: false,
          onClose: () => {},
          onSubmitFeedback: () => {},
        },
      },
    ],
    onHelpClick: mockOnHelpClick,
  },
};

export const WithGroupedErrors: Story = {
  args: {
    list: [
      {
        id: '1',
        category: Category.GESTES,
        type: Type.MISSING,
        code: 'ERROR_001',
        title: 'Erreur groupée 1',
        provided_value: 'Groupe A',
        modalContent: {
          problem: 'Description du problème 1',
          solution: 'Solution proposée 1',

          title: 'Erreur groupée 1',
          isOpen: false,
          onClose: () => {},
          onSubmitFeedback: () => {},
        },
      },
      {
        id: '2',
        category: Category.GESTES,
        type: Type.MISSING,
        code: 'ERROR_002',
        title: 'Erreur groupée 2',
        provided_value: 'Groupe A',
        modalContent: {
          problem: 'Description du problème 2',
          solution: 'Solution proposée 2',
          title: 'Erreur groupée 2',
          isOpen: false,
          onClose: () => {},
          onSubmitFeedback: () => {},
        },
      },
      {
        id: '3',
        category: Category.GESTES,
        type: Type.MISSING,
        code: 'ERROR_003',
        title: 'Erreur non groupée',
        provided_value: null,
        modalContent: {
          problem: 'Description du problème 3',
          solution: 'Solution proposée 3',

          title: 'Erreur non groupée',
          isOpen: false,
          onClose: () => {},
          onSubmitFeedback: () => {},
        },
      },
    ],
    onHelpClick: mockOnHelpClick,
  },
};

export const AdminCategory: Story = {
  args: {
    list: [
      {
        id: '1',
        category: Category.ADMIN,
        type: Type.MISSING,
        code: 'ERROR_001',
        title: 'Erreur administrative',
        provided_value: null,
        modalContent: {
          problem: 'Description du problème administratif',
          solution: 'Solution proposée',
          title: 'Erreur administrative',
          isOpen: false,
          onClose: () => {},
          onSubmitFeedback: () => {},
        },
      },
    ],
    onHelpClick: mockOnHelpClick,
  },
};

export const MultipleGroups: Story = {
  args: {
    list: [
      {
        id: '1',
        category: Category.GESTES,
        type: Type.MISSING,
        code: 'ERROR_001',
        title: 'Erreur Groupe A-1',
        provided_value: 'Groupe A',
        modalContent: {
          problem: 'Description du problème',
          solution: 'Solution proposée',
          title: 'Erreur Groupe A-1',
          isOpen: false,
          onClose: () => {},
          onSubmitFeedback: () => {},
        },
      },
      {
        id: '2',
        category: Category.GESTES,
        type: Type.MISSING,
        code: 'ERROR_002',
        title: 'Erreur Groupe B-1',
        provided_value: 'Groupe B',
        modalContent: {
          problem: 'Description du problème',
          solution: 'Solution proposée',
          title: 'Erreur Groupe B-1',
          isOpen: false,
          onClose: () => {},
          onSubmitFeedback: () => {},
        },
      },
      {
        id: '3',
        category: Category.GESTES,
        type: Type.MISSING,
        code: 'ERROR_003',
        title: 'Erreur sans groupe',
        provided_value: null,
        modalContent: {
          problem: 'Description du problème',
          solution: 'Solution proposée',
          title: 'Erreur sans groupe',
          isOpen: false,
          onClose: () => {},
          onSubmitFeedback: () => {},
        },
      },
    ],
    onHelpClick: mockOnHelpClick,
  },
};
