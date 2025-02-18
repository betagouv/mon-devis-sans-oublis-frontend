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
  };

  const mockDeleteErrorReasons = [
    { id: 'reason1', label: 'Reason 1' },
    { id: 'reason2', label: 'Reason 2' },
  ];

  const defaultProps = {
    error: mockError,
    quoteCheckId: '456',
    onDeleteError: jest.fn(),
    onFeedbackSubmit: jest.fn(),
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
    const deleteButton = screen.getByRole('button', { name: '' });
    expect(deleteButton).toHaveClass('fr-icon-delete-line');
  });

  //   it('handles delete confirmation with predefined reason', async () => {
  //     (useConseillerRoutes as jest.Mock).mockReturnValue({
  //       isConseillerAndEdit: true,
  //     });
  //     render(<QuoteErrorLine {...defaultProps} />);

  //     // Ouvrir la modale de suppression
  //     const deleteButton = screen.getByRole('button', { name: '' });
  //     await userEvent.click(deleteButton);

  //     // Attendre que la modale soit ouverte et sélectionner une raison
  //     const reasonOption = await screen.findByLabelText('Reason 1');
  //     await userEvent.click(reasonOption);

  //     // Confirmer la suppression
  //     const confirmButton = screen.getByRole('button', {
  //       name: /confirmer la suppression/i,
  //     });
  //     await userEvent.click(confirmButton);

  //     expect(defaultProps.onDeleteError).toHaveBeenCalledWith(
  //       '456',
  //       '123',
  //       'Reason 1'
  //     );
  //   });

  //   it('handles delete confirmation with custom reason', async () => {
  //     (useConseillerRoutes as jest.Mock).mockReturnValue({
  //       isConseillerAndEdit: true,
  //     });
  //     render(<QuoteErrorLine {...defaultProps} />);

  //     // Ouvrir la modale de suppression
  //     const deleteButton = screen.getByRole('button', { name: '' });
  //     await userEvent.click(deleteButton);

  //     // Sélectionner l'option personnalisée
  //     const customOption = await screen.findByLabelText('Autre raison');
  //     await userEvent.click(customOption);

  //     // Remplir l'input personnalisé
  //     const customInput = screen.getByPlaceholderText('Autre raison');
  //     await userEvent.type(customInput, 'Custom reason');

  //     // Confirmer la suppression
  //     const confirmButton = screen.getByRole('button', {
  //       name: /confirmer la suppression/i,
  //     });
  //     await userEvent.click(confirmButton);

  //     expect(defaultProps.onDeleteError).toHaveBeenCalledWith(
  //       '456',
  //       '123',
  //       'Custom reason'
  //     );
  //   });

  it('handles empty reason error case', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (useConseillerRoutes as jest.Mock).mockReturnValue({
      isConseillerAndEdit: true,
    });
    render(<QuoteErrorLine {...defaultProps} />);

    // Ouvrir la modale de suppression
    const deleteButton = screen.getByRole('button', { name: '' });
    await userEvent.click(deleteButton);

    // Le bouton de confirmation devrait être désactivé
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
