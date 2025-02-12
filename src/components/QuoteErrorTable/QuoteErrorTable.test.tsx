import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import QuoteErrorTable from './QuoteErrorTable';
import { Category } from '@/types';

const mockOnHelpClick = jest.fn();
const mockErrorDetailsAdmin = [
  {
    id: 'error1',
    category: Category.ADMIN,
    title: 'Admin Error 1',
    problem: 'Problem description',
    solution: 'Solution description',
    code: 'ERR001',
    type: 'missing',
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
  },
];

const mockGestes = [{ id: 'geste1', intitule: 'Geste 1', valid: false }];

describe('QuoteErrorTable Component', () => {
  test('renders correctly for ADMIN category', () => {
    render(
      <QuoteErrorTable
        category={Category.ADMIN}
        errorDetails={mockErrorDetailsAdmin}
        onHelpClick={mockOnHelpClick}
      />
    );

    expect(screen.getByText('Admin Error 1')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /voir le détail/i })
    ).toBeInTheDocument();
  });

  test('renders correctly for GESTES category', () => {
    render(
      <QuoteErrorTable
        category={Category.GESTES}
        errorDetails={mockErrorDetailsGestes}
        gestes={mockGestes}
        onHelpClick={mockOnHelpClick}
      />
    );

    expect(screen.getByText('Geste 1')).toBeInTheDocument();
    expect(screen.getByText('Gestes Error 1')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /voir le détail/i })
    ).toBeInTheDocument();
  });

  test('opens and closes modal when clicking the button', async () => {
    render(
      <QuoteErrorTable
        category={Category.ADMIN}
        errorDetails={mockErrorDetailsAdmin}
        onHelpClick={mockOnHelpClick}
      />
    );

    const openButton = screen.getByRole('button', { name: /voir le détail/i });
    fireEvent.click(openButton);

    expect(screen.getByText('Solution description')).toBeInTheDocument();

    const closeButton = await screen.findByTestId('modal-close-button');
    fireEvent.click(closeButton);

    await waitFor(
      () => {
        expect(
          screen.queryByText('Solution description')
        ).not.toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  test('calls onHelpClick with correct parameters', () => {
    render(
      <QuoteErrorTable
        category={Category.ADMIN}
        errorDetails={mockErrorDetailsAdmin}
        onHelpClick={mockOnHelpClick}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /voir le détail/i }));
    const submitButton = screen.getByRole('button', { name: /envoyer/i });

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Test feedback' },
    });
    fireEvent.click(submitButton);

    expect(mockOnHelpClick).toHaveBeenCalledWith('Test feedback', 'error1');
  });
});
