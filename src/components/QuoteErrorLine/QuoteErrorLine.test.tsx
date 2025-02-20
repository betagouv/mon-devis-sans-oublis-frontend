import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import QuoteErrorLine from './QuoteErrorLine';
import { useConseillerRoutes, useIsDesktop } from '@/hooks';
import { Category, ErrorDetails } from '@/types';

jest.mock('@/hooks', () => ({
  useConseillerRoutes: jest.fn(() => ({ isConseillerAndEdit: false })),
  useIsDesktop: jest.fn(() => true),
}));

describe('QuoteErrorLine', () => {
  const mockError: ErrorDetails = {
    id: '123',
    title: 'Test Error',
    category: Category.ADMIN,
    solution: 'Test Solution',
    problem: 'Test Problem',
    code: '',
    deleted: false,
    type: '',
    comment: null,
  };

  const mockDeleteErrorReasons = [
    { id: 'reason1', label: 'Reason 1' },
    { id: 'reason2', label: 'Reason 2' },
  ];

  const defaultProps = {
    error: mockError,
    quoteCheckId: '456',
    onDeleteError: jest.fn(),
    deleteErrorReasons: mockDeleteErrorReasons,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useConseillerRoutes as jest.Mock).mockReturnValue({
      isConseillerAndEdit: false,
    });
    (useIsDesktop as jest.Mock).mockReturnValue(true);
  });

  it('renders error title', () => {
    render(<QuoteErrorLine {...defaultProps} />);
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('shows solution button when solution exists', () => {
    render(<QuoteErrorLine {...defaultProps} />);
    expect(screen.getByText('Voir le détail')).toBeInTheDocument();
  });

  it('does not show solution button when solution is missing', () => {
    const errorWithoutSolution = { ...mockError, solution: undefined };
    render(<QuoteErrorLine {...defaultProps} error={errorWithoutSolution} />);
    expect(screen.queryByText('Voir le détail')).not.toBeInTheDocument();
  });

  it('shows delete button when isConseillerAndEdit is true', () => {
    (useConseillerRoutes as jest.Mock).mockReturnValue({
      isConseillerAndEdit: true,
    });

    render(<QuoteErrorLine {...defaultProps} />);

    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find((button) =>
      button.classList.contains('fr-icon-delete-line')
    );

    expect(deleteButton).toBeInTheDocument();
  });

  it('handles empty reason error case', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    (useConseillerRoutes as jest.Mock).mockReturnValue({
      isConseillerAndEdit: true,
    });

    render(<QuoteErrorLine {...defaultProps} />);

    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find((button) =>
      button.classList.contains('fr-icon-delete-line')
    );

    expect(deleteButton).toBeInTheDocument();

    if (deleteButton) {
      await userEvent.click(deleteButton);
    }

    const confirmButton = screen.getByRole('button', {
      name: /confirmer la suppression/i,
    });

    expect(confirmButton).toBeDisabled();

    consoleSpy.mockRestore();
  });

  it('applies correct border classes based on isLastErrorInTable', () => {
    const { rerender } = render(
      <QuoteErrorLine {...defaultProps} isLastErrorInTable={false} />
    );
    expect(screen.getByRole('row')).toHaveClass('border-bottom-grey');

    rerender(<QuoteErrorLine {...defaultProps} isLastErrorInTable={true} />);
    expect(screen.getByRole('row')).toHaveClass('border-b-0');
  });
});
