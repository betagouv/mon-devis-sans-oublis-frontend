import { fireEvent, render, screen } from '@testing-library/react';
import QuoteErrorItem, { QuoteErrorItemProps } from './QuoteErrorItem';
import { useIsDesktop } from '@/hooks';
import wording from '@/wording';
import { Category, Type } from '@/types';

// Mock the hooks and components
jest.mock('@/hooks', () => ({
  useIsDesktop: jest.fn(),
}));

jest.mock('../Modal/ErrorFeedbacksModal/ErrorFeedbacksModal', () => ({
  __esModule: true,
  default: jest.fn(({ isOpen, onClose, onSubmitFeedback }) =>
    isOpen ? (
      <div data-testid='modal'>
        <button onClick={() => onSubmitFeedback('test comment')}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  ),
}));

jest.mock('../Toast/Toast', () => ({
  __esModule: true,
  default: jest.fn(({ onClose }) => (
    <div data-testid='toast'>
      <button onClick={onClose}>Close Toast</button>
    </div>
  )),
}));

describe('QuoteErrorItem', () => {
  const mockProps: QuoteErrorItemProps = {
    closeModal: jest.fn(),
    item: {
      id: '123',
      geste_id: 'geste_123',
      category: Category.ADMIN,
      type: Type.MISSING,
      code: 'TEST_CODE',
      title: 'Test Error',
      problem: null,
      solution: null,
      provided_value: null,
      modalContent: {
        problem: 'Test Problem',
        solution: 'Test Solution',
        isOpen: false,
        title: 'Test Modal Title',
      },
    },
    onHelpClick: jest.fn(),
    openModal: jest.fn(),
    openModalId: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop View', () => {
    beforeEach(() => {
      (useIsDesktop as jest.Mock).mockReturnValue(true);
    });

    it('should render with desktop layout', () => {
      render(<QuoteErrorItem {...mockProps} />);

      expect(screen.getByText('Test Error')).toBeInTheDocument();
      expect(
        screen.getByText(wording.components.quote_error_card.button_see_detail)
      ).toBeInTheDocument();
    });

    it('should open modal when clicking see details button', () => {
      render(<QuoteErrorItem {...mockProps} />);

      fireEvent.click(
        screen.getByText(wording.components.quote_error_card.button_see_detail)
      );
      expect(mockProps.openModal).toHaveBeenCalledWith('123');
    });

    it('should handle feedback submission', () => {
      render(<QuoteErrorItem {...mockProps} openModalId='123' />);

      fireEvent.click(screen.getByText('Submit'));

      expect(mockProps.onHelpClick).toHaveBeenCalledWith('test comment', '123');
      expect(mockProps.closeModal).toHaveBeenCalled();
      expect(screen.getByTestId('toast')).toBeInTheDocument();
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      (useIsDesktop as jest.Mock).mockReturnValue(false);
    });

    it('should render with mobile layout', () => {
      render(<QuoteErrorItem {...mockProps} />);

      expect(screen.getByText('Test Error')).toBeInTheDocument();
      expect(screen.getByRole('listitem')).toHaveStyle({ cursor: 'pointer' });
    });

    it('should open modal when clicking on item', () => {
      render(<QuoteErrorItem {...mockProps} />);

      fireEvent.click(screen.getByRole('listitem'));
      expect(mockProps.openModal).toHaveBeenCalledWith('123');
    });

    it('should show arrow icon on mobile with solution', () => {
      render(<QuoteErrorItem {...mockProps} />);

      expect(
        screen
          .getByRole('listitem')
          .querySelector('.fr-icon-arrow-right-s-line')
      ).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle feedback submission error', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockError = new Error('Test error');

      render(
        <QuoteErrorItem
          {...mockProps}
          openModalId='123'
          onHelpClick={() => {
            throw mockError;
          }}
        />
      );

      fireEvent.click(screen.getByText('Submit'));

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error submitting feedback:',
        mockError
      );
      consoleSpy.mockRestore();
    });
  });

  describe('Toast Behavior', () => {
    it('should close toast when clicking close button', () => {
      render(<QuoteErrorItem {...mockProps} openModalId='123' />);

      fireEvent.click(screen.getByText('Submit'));
      expect(screen.getByTestId('toast')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Close Toast'));
      expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
    });
  });
});
