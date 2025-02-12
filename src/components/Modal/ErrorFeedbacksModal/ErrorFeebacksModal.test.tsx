import { render, screen, fireEvent } from '@testing-library/react';

import ErrorFeedbacksModal from './ErrorFeedbacksModal';
import wording from '@/wording';

describe('ErrorFeedbacksModal', () => {
  const defaultProps = {
    isOpen: true,
    errorDetailsId: '123',
    problem: 'Test problem',
    solution: 'Test solution',
    title: 'Test title',
  };

  it('should render modal content when open', () => {
    render(<ErrorFeedbacksModal {...defaultProps} />);

    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test problem')).toBeInTheDocument();
    expect(screen.getByText('Test solution')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: wording.components.error_feedbacks_modal.submit_button,
      })
    ).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    render(<ErrorFeedbacksModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Test title')).not.toBeInTheDocument();
  });

  it('should handle submit feedback', () => {
    const mockOnSubmitFeedback = jest.fn();
    render(
      <ErrorFeedbacksModal
        {...defaultProps}
        onSubmitFeedback={mockOnSubmitFeedback}
      />
    );

    const submitButton = screen.getByRole('button', {
      name: wording.components.error_feedbacks_modal.submit_button,
    });
    expect(submitButton).toBeDisabled();

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test comment' } });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    expect(mockOnSubmitFeedback).toHaveBeenCalledWith('Test comment', '123');
  });

  it('should handle close modal', () => {
    const mockOnClose = jest.fn();
    render(<ErrorFeedbacksModal {...defaultProps} onClose={mockOnClose} />);

    const backButton = screen.getByText(
      wording.components.error_feedbacks_modal.back_button_label
    );
    fireEvent.click(backButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not show problem/solution sections when null', () => {
    render(
      <ErrorFeedbacksModal {...defaultProps} problem={null} solution={null} />
    );

    expect(screen.queryByText('Test problem')).not.toBeInTheDocument();
    expect(screen.queryByText('Test solution')).not.toBeInTheDocument();
  });

  it('should update comment state on textarea change', () => {
    render(<ErrorFeedbacksModal {...defaultProps} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New comment' } });

    expect(textarea).toHaveValue('New comment');
  });
});
