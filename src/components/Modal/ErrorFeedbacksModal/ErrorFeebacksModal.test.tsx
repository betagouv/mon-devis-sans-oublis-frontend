import { render, screen, fireEvent } from '@testing-library/react';

import ErrorFeedbacksModal from './ErrorFeedbacksModal';
import wording from '@/wording';

describe('ErrorFeedbacksModal', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Test Title',
    problem: 'Test Problem',
    solution: 'Test Solution',
    onClose: jest.fn(),
    onSubmitFeedback: jest.fn(),
  };

  it('renders correctly with all props', () => {
    render(<ErrorFeedbacksModal {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Problem')).toBeInTheDocument();
    expect(screen.getByText('Test Solution')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: wording.components.error_feedbacks_modal.submit_button,
      })
    ).toBeInTheDocument();
  });

  it('renders without problem and solution', () => {
    render(
      <ErrorFeedbacksModal {...defaultProps} problem={null} solution={null} />
    );

    expect(screen.queryByText('Test Problem')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Solution')).not.toBeInTheDocument();
  });

  it('handles comment input and submission', () => {
    render(<ErrorFeedbacksModal {...defaultProps} />);

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', {
      name: wording.components.error_feedbacks_modal.submit_button,
    });

    fireEvent.change(textarea, { target: { value: 'Test comment' } });
    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);
    expect(defaultProps.onSubmitFeedback).toHaveBeenCalledWith('Test comment');
  });

  it('calls onClose when closing the modal', () => {
    render(<ErrorFeedbacksModal {...defaultProps} />);

    const backButton = screen.getByText(
      wording.components.error_feedbacks_modal.back_button_label
    );

    fireEvent.click(backButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
