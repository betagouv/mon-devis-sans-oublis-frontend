import { render, screen, fireEvent } from '@testing-library/react';

import Modal, { ModalProps } from './Modal';

const defaultProps: ModalProps = {
  buttonBackText: 'Back to corrections',
  buttonContactHref: 'mailto:contact@mon-devis-sans-oublis.beta.gouv.fr',
  buttonContactText: 'Contact us',
  correctionHelpful: 'Was this correction helpful?',
  iconAlt: 'Correction details icon',
  iconSrc: '/images/quote_correction_details.png',
  isOpen: true,
  onClose: jest.fn(),
  onSubmitFeedback: jest.fn(),
  problem: {
    title: 'Problem identified',
    description: 'The term "quote" is missing from your document.',
  },
  solution: {
    title: 'Solution',
    description: 'Add the term "quote" to your document.',
  },
  title: 'Correction details',
};

describe('Modal Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal content when isOpen is true', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.problem.title)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.problem.description!)
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.solution.title)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.solution.description!)
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.correctionHelpful)
    ).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('calls onClose when clicking back button', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);

    fireEvent.click(screen.getByText(defaultProps.buttonBackText));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('handles feedback submission', () => {
    const onSubmitFeedback = jest.fn();
    render(<Modal {...defaultProps} onSubmitFeedback={onSubmitFeedback} />);

    // Click thumbs up button
    fireEvent.click(screen.getByTestId('thumbs-up-button'));

    // Enter feedback text
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test feedback' } });

    // Submit feedback
    const submitButton = screen.getByRole('button', { name: /envoyer/i });
    fireEvent.click(submitButton);

    // Verify onSubmitFeedback was called with correct params
    expect(onSubmitFeedback).toHaveBeenCalledWith('Test feedback', true);
  });

  test('handles feedback button toggle', () => {
    render(<Modal {...defaultProps} />);

    const thumbsUpButton = screen.getByTestId('thumbs-up-button');
    const thumbsDownButton = screen.getByTestId('thumbs-down-button');

    // Initial state - no button should be selected
    expect(thumbsUpButton).not.toHaveClass('bg-[var(--background-alt-grey)]');
    expect(thumbsDownButton).not.toHaveClass('bg-[var(--background-alt-grey)]');

    // Click thumbs up
    fireEvent.click(thumbsUpButton);
    expect(thumbsUpButton).toHaveClass('bg-[var(--background-alt-grey)]');
    expect(thumbsDownButton).not.toHaveClass('bg-[var(--background-alt-grey)]');

    // Click thumbs down
    fireEvent.click(thumbsDownButton);
    expect(thumbsDownButton).toHaveClass('bg-[var(--background-alt-grey)]');
    expect(thumbsUpButton).not.toHaveClass('bg-[var(--background-alt-grey)]');
  });
});
