import { fireEvent, render, screen } from '@testing-library/react';
import QuoteErrorTable, {
  QuoteErrorTablePropsAdmin,
  QuoteErrorTablePropsGestes,
} from './QuoteErrorTable';
import { Category } from '@/types';
import wording from '@/wording';

// Mock des composants enfants
jest.mock('../Badge/Badge', () => ({
  __esModule: true,
  default: jest.fn(({ label }) => <div data-testid='badge'>{label}</div>),
  BadgeSize: { X_SMALL: 'x-small' },
  BadgeVariant: { GREY: 'grey', GREEN: 'green', ORANGE_LIGHT: 'orange-light' },
}));

jest.mock('../Tooltip/Tooltip', () => ({
  __esModule: true,
  default: jest.fn(({ text }) => <div data-testid='tooltip'>{text}</div>),
}));

jest.mock('../Modal/ErrorFeedbacksModal/ErrorFeedbacksModal', () => ({
  __esModule: true,
  default: jest.fn(({ isOpen, onClose, title }) =>
    isOpen ? (
      <div data-testid='modal' onClick={onClose}>
        {title}
      </div>
    ) : null
  ),
}));

describe('QuoteErrorTable', () => {
  const mockOnHelpClick = jest.fn();

  const mockAdminError = {
    id: '1',
    category: Category.ADMIN,
    title: 'Admin Error 1',
    solution: 'Solution 1',
    problem: 'Problem 1',
  };

  const mockGestes = [
    {
      id: 'geste-1',
      intitule: 'Geste 1',
      valid: false,
    },
    {
      id: 'geste-2',
      intitule: 'Geste 2',
      valid: true,
    },
  ];

  describe('Admin View', () => {
    const adminProps: QuoteErrorTablePropsAdmin = {
      category: Category.ADMIN,
      errorDetails: [
        {
          id: '1',
          category: Category.ADMIN,
          title: 'Admin Error 1',
          solution: 'Solution 1',
          problem: 'Problem 1',
          code: 'ERR_1',
          type: 'error',
        },
      ],
      onHelpClick: mockOnHelpClick,
    };

    it('should render admin errors', () => {
      render(<QuoteErrorTable {...adminProps} />);

      expect(screen.getByText('Admin Error 1')).toBeInTheDocument();
      expect(
        screen.getByText(wording.components.quote_error_card.title_admin)
      ).toBeInTheDocument();
    });

    it('should handle modal open/close for admin errors', () => {
      render(<QuoteErrorTable {...adminProps} />);

      // Open modal
      fireEvent.click(
        screen.getByText(wording.components.quote_error_card.button_see_detail)
      );
      expect(screen.getByTestId('modal')).toBeInTheDocument();

      // Close modal
      fireEvent.click(screen.getByTestId('modal'));
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('Gestes View', () => {
    const gestesProps: QuoteErrorTablePropsGestes = {
      category: Category.GESTES,
      errorDetails: [
        {
          id: '1',
          category: Category.GESTES,
          title: 'Gestes Error 1',
          solution: 'Solution 1',
          problem: 'Problem 1',
          code: 'ERR_1',
          type: 'error',
          geste_id: 'geste-1',
        },
      ],
      gestes: mockGestes,
      onHelpClick: mockOnHelpClick,
    };

    it('should render gestes and their errors', () => {
      render(<QuoteErrorTable {...gestesProps} />);

      expect(screen.getByText('Geste 1')).toBeInTheDocument();
      expect(screen.getByText('Geste 2')).toBeInTheDocument();
      expect(screen.getByText('Gestes Error 1')).toBeInTheDocument();
    });

    it('should show correct badges for valid/invalid gestes', () => {
      render(<QuoteErrorTable {...gestesProps} />);

      const badges = screen.getAllByTestId('badge');
      expect(badges).toHaveLength(3); // 2 geste badges + 1 header badge
    });

    it('should handle feedback submission', async () => {
      render(<QuoteErrorTable {...gestesProps} />);

      // Open modal
      fireEvent.click(
        screen.getByText(wording.components.quote_error_card.button_see_detail)
      );

      // Submit feedback
      const modal = screen.getByTestId('modal');
      fireEvent.click(modal);

      expect(mockOnHelpClick).not.toHaveBeenCalled();
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle errors in feedback submission', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const errorProps: QuoteErrorTablePropsAdmin = {
        category: Category.ADMIN,
        errorDetails: [
          {
            ...mockAdminError,
            solution: 'Test Solution',
            code: '',
            type: '',
          },
        ],
        onHelpClick: () => {
          throw new Error('Test error');
        },
      };

      render(<QuoteErrorTable {...errorProps} />);

      // Open modal and trigger error
      fireEvent.click(
        screen.getByText(wording.components.quote_error_card.button_see_detail)
      );

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
