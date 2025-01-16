import { render, screen, fireEvent } from '@testing-library/react';

import GlobalErrorFeedbacksModal from './GlobalErrorFeedbacksModal';
import wording from '@/wording';

describe('GlobalErrorFeedbacksModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onSubmitFeedback: jest.fn(),
  };

  it('handles rating selection', () => {
    render(<GlobalErrorFeedbacksModal {...defaultProps} />);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[4]);

    const submitButton = screen.getByRole('button', {
      name: 'Envoyer mes réponses',
    });
    expect(submitButton).toBeDisabled();
  });

  it('handles form submission with all fields', () => {
    render(<GlobalErrorFeedbacksModal {...defaultProps} />);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[4]);

    const commentInput = screen.getByLabelText(
      'Pouvez-vous nous en dire plus sur ce que vous avez pensé des corrections proposées ?'
    );
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });

    const emailInput = screen.getByPlaceholderText(
      'Votre adresse email (ex : jean.dupont@mail.fr)'
    );
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByRole('button', {
      name: 'Envoyer mes réponses',
    });
    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    expect(defaultProps.onSubmitFeedback).toHaveBeenCalledWith(
      'Test comment',
      'test@example.com',
      4
    );
  });

  it('handles form submission without email', () => {
    render(<GlobalErrorFeedbacksModal {...defaultProps} />);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[3]);

    const commentInput = screen.getByLabelText(
      'Pouvez-vous nous en dire plus sur ce que vous avez pensé des corrections proposées ?'
    );
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });

    const submitButton = screen.getByRole('button', {
      name: 'Envoyer mes réponses',
    });
    fireEvent.click(submitButton);

    expect(defaultProps.onSubmitFeedback).toHaveBeenCalledWith(
      'Test comment',
      null,
      3
    );
  });
});
