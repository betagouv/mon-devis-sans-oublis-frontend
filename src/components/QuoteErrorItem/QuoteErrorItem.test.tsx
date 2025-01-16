import { render, screen, fireEvent } from '@testing-library/react';

import QuoteErrorItem, { QuoteErrorItemProps } from './QuoteErrorItem';
import { Category, Type } from '@/types';

describe('QuoteErrorItem', () => {
  const mockModalContent = {
    isOpen: true,
    problem: 'Test problem',
    solution: 'Test solution',
    title: 'Test modal title',
  };

  const defaultProps: QuoteErrorItemProps = {
    closeModal: jest.fn(),
    item: {
      id: '1',
      title: 'Test Error',
      modalContent: mockModalContent,
      geste_id: '',
      category: Category.ADMIN,
      type: Type.MISSING,
      code: '',
      provided_value: null,
    },
    onHelpClick: jest.fn(),
    openModal: jest.fn(),
    openModalId: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with basic props', () => {
    render(<QuoteErrorItem {...defaultProps} />);

    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Voir le détail');
  });

  it('does not render detail button when solution is null', () => {
    const propsWithoutSolution = {
      ...defaultProps,
      item: {
        ...defaultProps.item,
        modalContent: {
          ...mockModalContent,
          solution: null,
        },
      },
    };

    render(<QuoteErrorItem {...propsWithoutSolution} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('opens modal when detail button is clicked', () => {
    render(<QuoteErrorItem {...defaultProps} />);

    const detailButton = screen.getByRole('button');
    fireEvent.click(detailButton);

    expect(defaultProps.openModal).toHaveBeenCalledWith(defaultProps.item.id);
  });

  it('renders modal when openModalId matches item id', () => {
    render(
      <QuoteErrorItem
        {...defaultProps}
        openModalId={defaultProps.item.id.toString()}
      />
    );

    expect(screen.getByText('Test modal title')).toBeInTheDocument();
  });

  it('handles feedback submission correctly', () => {
    render(
      <QuoteErrorItem
        {...defaultProps}
        openModalId={defaultProps.item.id.toString()}
      />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test feedback' } });

    const submitButton = screen.getByRole('button', { name: /envoyer/i });
    fireEvent.click(submitButton);

    expect(defaultProps.onHelpClick).toHaveBeenCalledWith(
      'Test feedback',
      defaultProps.item.id
    );
    expect(defaultProps.closeModal).toHaveBeenCalled();
  });

  it('shows toast after feedback submission', async () => {
    render(
      <QuoteErrorItem
        {...defaultProps}
        openModalId={defaultProps.item.id.toString()}
      />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test feedback' } });

    const submitButton = screen.getByRole('button', { name: /envoyer/i });
    fireEvent.click(submitButton);

    expect(screen.getByText('Merci pour votre retour !')).toBeInTheDocument();
  });

  it('handles error during feedback submission', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const errorProps = {
      ...defaultProps,
      onHelpClick: jest.fn().mockImplementationOnce(() => {
        throw new Error('Test error');
      }),
      openModalId: defaultProps.item.id.toString(),
    };

    render(<QuoteErrorItem {...errorProps} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test feedback' } });

    const submitButton = screen.getByRole('button', { name: /envoyer/i });
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error submitting feedback:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('closes toast after duration', () => {
    jest.useFakeTimers();

    const { rerender } = render(
      <QuoteErrorItem
        {...defaultProps}
        openModalId={defaultProps.item.id.toString()}
      />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test feedback' } });

    const submitButton = screen.getByRole('button', { name: /envoyer/i });
    fireEvent.click(submitButton);

    expect(screen.getByText('Merci pour votre retour !')).toBeInTheDocument();

    jest.advanceTimersByTime(4000);
    jest.runAllTimers();

    rerender(
      <QuoteErrorItem
        {...defaultProps}
        openModalId={defaultProps.item.id.toString()}
      />
    );

    expect(
      screen.queryByText('Merci pour votre retour !')
    ).not.toBeInTheDocument();

    jest.useRealTimers();
  });
});
