import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ErrorFeedbacksModal, {
  ErrorFeedbacksModalProps,
} from './ErrorFeedbacksModal';

const defaultProps: ErrorFeedbacksModalProps = {
  isOpen: true,
  onClose: jest.fn(),
  onSubmitFeedback: jest.fn(),
  errorDetailsId: 'error-123',
  problem: 'Problème détecté',
  solution: 'Solution proposée',
  title: 'Titre du modal',
};

describe('ErrorFeedbacksModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays the modal with the title, image, and problem/solution sections', () => {
    render(<ErrorFeedbacksModal {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: /titre du modal/i })
    ).toBeInTheDocument();
    expect(screen.getByAltText(/Icône de correction/i)).toBeInTheDocument();

    expect(screen.getByText(/problème détecté/i)).toBeInTheDocument();
    expect(screen.getByText(/solution proposée/i)).toBeInTheDocument();
  });

  it('does not display the problem/solution sections if they are not provided', () => {
    render(
      <ErrorFeedbacksModal {...defaultProps} problem={null} solution={null} />
    );

    expect(screen.queryByText(/problème détecté/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/solution proposée/i)).not.toBeInTheDocument();
  });

  it('updates the textarea value and enables/disables the submit button', () => {
    render(<ErrorFeedbacksModal {...defaultProps} />);

    const textarea = screen.getByPlaceholderText(
      /les corrections du devis sont.../i
    );
    const submitButton = screen.getByRole('button', {
      name: /envoyer/i,
    });

    expect(submitButton).toBeDisabled();
    fireEvent.change(textarea, { target: { value: 'Mon commentaire' } });
    expect(textarea).toHaveValue('Mon commentaire');
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onSubmitFeedback with the correct comment and error identifier upon submission', () => {
    const onSubmitFeedbackMock = jest.fn();
    render(
      <ErrorFeedbacksModal
        {...defaultProps}
        onSubmitFeedback={onSubmitFeedbackMock}
      />
    );

    const textarea = screen.getByPlaceholderText(
      /les corrections du devis sont.../i
    );
    const submitButton = screen.getByRole('button', {
      name: /envoyer/i,
    });

    fireEvent.change(textarea, { target: { value: 'Commentaire test' } });
    fireEvent.click(submitButton);

    expect(onSubmitFeedbackMock).toHaveBeenCalledTimes(1);
    expect(onSubmitFeedbackMock).toHaveBeenCalledWith(
      'Commentaire test',
      'error-123'
    );
  });

  it('calls onClose when the modal is closed (if onClose is provided)', () => {
    const onCloseMock = jest.fn();
    render(<ErrorFeedbacksModal {...defaultProps} onClose={onCloseMock} />);

    onCloseMock();
    expect(onCloseMock).toHaveBeenCalled();
  });
});
