import { render, screen, fireEvent } from '@testing-library/react';
import QuoteErrorItem from './QuoteErrorItem';
import { Type, Category } from '@/context';
import wording from '@/wording';
import { ErrorFeedbacksModalProps } from '../Modal/ErrorFeedbacksModal/ErrorFeedbacksModal';

// Mock des composants modaux
jest.mock('../Modal/ErrorFeedbacksModal/ErrorFeedbacksModal', () => {
  return function MockErrorFeedbacksModal(props: ErrorFeedbacksModalProps) {
    return (
      <div data-testid='error-feedbacks-modal'>
        <button
          data-testid='thumbs-up-button'
          onClick={() => props.onSubmitFeedback?.('Test comment', true)}
        >
          Helpful
        </button>
        <button
          data-testid='thumbs-down-button'
          onClick={() => props.onSubmitFeedback?.('Another comment', false)}
        >
          Not Helpful
        </button>
      </div>
    );
  };
});

jest.mock(
  '../Modal/GlobalErrorFeedbacksModal/GlobalErrorFeedbacksModal',
  () => {
    return function MockGlobalErrorFeedbacksModal() {
      return null;
    };
  }
);

const mockOnHelpClick = jest.fn();
const mockCloseModal = jest.fn();
const mockOpenModal = jest.fn();

const defaultProps = {
  closeModal: mockCloseModal,
  openModal: mockOpenModal,
  onHelpClick: mockOnHelpClick,
  openModalId: null,
  item: {
    id: '123',
    category: Category.FILE,
    type: Type.MISSING,
    code: 'ERROR_001',
    title: 'Test Error',
    provided_value: null,
    modalContent: {
      problem: 'Test problem',
      solution: 'Test solution',
      provided_value: null,
      title: 'Test Error',
      isOpen: false,
      onClose: () => {},
      onSubmitFeedback: () => {},
    },
  },
};

describe('QuoteErrorItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('sets correct icon and label for MISSING type', () => {
  //   render(<QuoteErrorItem {...defaultProps} />);

  //   const tag = screen.getByText(
  //     wording.components.quote_error_card.type_missing.label
  //   );
  //   expect(tag).toHaveClass(
  //     'fr-tag',
  //     'fr-tag--sm',
  //     wording.components.quote_error_card.type_missing.icon,
  //     'fr-tag--icon-left'
  //   );
  // });

  // it('sets correct icon and label for WRONG type', () => {
  //   render(
  //     <QuoteErrorItem
  //       {...defaultProps}
  //       item={{
  //         ...defaultProps.item,
  //         type: Type.WRONG,
  //       }}
  //     />
  //   );

  //   const tag = screen.getByText(
  //     wording.components.quote_error_card.type_wrong.label
  //   );
  //   expect(tag).toHaveClass(
  //     'fr-tag',
  //     'fr-tag--sm',
  //     wording.components.quote_error_card.type_wrong.icon,
  //     'fr-tag--icon-left'
  //   );
  // });

  it('handles feedback submission through ErrorFeedbacksModal', () => {
    render(
      <QuoteErrorItem
        {...defaultProps}
        openModalId={defaultProps.item.id.toString()}
      />
    );

    const thumbsUpButton = screen.getByTestId('thumbs-up-button');
    fireEvent.click(thumbsUpButton);

    expect(mockOnHelpClick).toHaveBeenCalledWith(
      'Test comment',
      defaultProps.item.id,
      true
    );
  });

  it('handles feedback submission with different parameters', () => {
    render(
      <QuoteErrorItem
        {...defaultProps}
        openModalId={defaultProps.item.id.toString()}
      />
    );

    const thumbsDownButton = screen.getByTestId('thumbs-down-button');
    fireEvent.click(thumbsDownButton);

    expect(mockOnHelpClick).toHaveBeenCalledWith(
      'Another comment',
      defaultProps.item.id,
      false
    );
  });
});
