import { render, screen, fireEvent } from '@testing-library/react';
import QuoteErrorTable from './QuoteErrorTable';
import { Category } from '@/types';
import wording from '@/wording';

const mockOnHelpClick = jest.fn();
const mockConsoleError = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});

const mockErrorDetailsAdmin = [
  {
    id: 'error1',
    category: Category.ADMIN,
    title: 'Admin Error 1',
    problem: 'Problem description',
    solution: 'Solution description',
    code: 'ERR001',
    type: 'missing',
    deleted: false,
    comment: null,
  },
];

const mockErrorDetailsGestes = [
  {
    id: 'error2',
    category: Category.GESTES,
    title: 'Gestes Error 1',
    problem: 'Problem description',
    solution: 'Solution description',
    geste_id: 'geste1',
    code: 'ERR002',
    type: 'warning',
    deleted: false,
    comment: null,
  },
];

const mockGestes = [
  {
    id: 'geste1',
    intitule: 'Geste 1',
    valid: false,
  },
  {
    id: 'geste2',
    intitule: 'Geste 2',
    valid: true,
  },
];

describe('QuoteErrorTable Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Admin Category', () => {
    test('displays admin errors correctly', () => {
      render(
        <QuoteErrorTable
          category={Category.ADMIN}
          errorDetails={mockErrorDetailsAdmin}
          onHelpClick={mockOnHelpClick}
        />
      );

      expect(
        screen.getByText(wording.components.quote_error_card.title_admin)
      ).toBeInTheDocument();
      expect(screen.getByText('1 correction')).toBeInTheDocument();
      expect(screen.getByText('Admin Error 1')).toBeInTheDocument();
    });
  });

  describe('Gestes Category', () => {
    test('displays gestes errors and badges correctly', () => {
      render(
        <QuoteErrorTable
          category={Category.GESTES}
          errorDetails={mockErrorDetailsGestes}
          gestes={mockGestes}
          onHelpClick={mockOnHelpClick}
        />
      );

      expect(
        screen.getByText(wording.components.quote_error_card.title_gestes)
      ).toBeInTheDocument();
      expect(screen.getByText('Geste 1')).toBeInTheDocument();
      expect(screen.getByText('Geste 2')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('OK')).toBeInTheDocument();
    });

    test('displays error details and modal interaction', () => {
      render(
        <QuoteErrorTable
          category={Category.GESTES}
          errorDetails={mockErrorDetailsGestes}
          gestes={mockGestes}
          onHelpClick={mockOnHelpClick}
        />
      );

      expect(screen.getByText('Gestes Error 1')).toBeInTheDocument();
      const detailButton = screen.getByRole('button', {
        name: wording.components.quote_error_card.button_see_detail,
      });
      expect(detailButton).toBeInTheDocument();
      fireEvent.click(detailButton);
      expect(screen.getByText('Solution description')).toBeInTheDocument();

      const commentInput = screen.getByRole('textbox');
      fireEvent.change(commentInput, { target: { value: 'Test feedback' } });

      const submitButton = screen.getByRole('button', { name: /envoyer/i });
      fireEvent.click(submitButton);

      expect(mockOnHelpClick).toHaveBeenCalledWith('Test feedback', 'error2');
    });
  });

  describe('Error count display', () => {
    test('displays plural form when multiple errors exist', () => {
      const multipleErrors = [
        ...mockErrorDetailsAdmin,
        { ...mockErrorDetailsAdmin[0], id: 'error3' },
      ];

      render(
        <QuoteErrorTable
          category={Category.ADMIN}
          errorDetails={multipleErrors}
          onHelpClick={mockOnHelpClick}
        />
      );

      expect(screen.getByText('2 corrections')).toBeInTheDocument();
    });

    test('displays singular form for single error', () => {
      render(
        <QuoteErrorTable
          category={Category.ADMIN}
          errorDetails={mockErrorDetailsAdmin}
          onHelpClick={mockOnHelpClick}
        />
      );

      expect(screen.getByText('1 correction')).toBeInTheDocument();
    });
  });

  describe('Error handling', () => {
    test('handles feedback submission error', () => {
      mockOnHelpClick.mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      render(
        <QuoteErrorTable
          category={Category.GESTES}
          errorDetails={mockErrorDetailsGestes}
          gestes={mockGestes}
          onHelpClick={mockOnHelpClick}
        />
      );

      const detailButton = screen.getByRole('button', {
        name: wording.components.quote_error_card.button_see_detail,
      });
      fireEvent.click(detailButton);

      const commentInput = screen.getByRole('textbox');
      fireEvent.change(commentInput, { target: { value: 'Test feedback' } });

      const submitButton = screen.getByRole('button', { name: /envoyer/i });
      fireEvent.click(submitButton);

      expect(mockConsoleError).toHaveBeenCalledWith(
        'Error submitting feedback:',
        expect.any(Error)
      );
    });
  });
});
