import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Modal, { ModalPosition, ModalProps } from './Modal';
import { useIsDesktop } from '@/hooks';

jest.mock('@/hooks', () => ({
  useIsDesktop: jest.fn(),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((element) => element),
}));

describe('Modal', () => {
  const mockOnClose = jest.fn();
  const defaultProps: ModalProps = {
    backButtonLabel: 'Close Modal',
    children: <div>Modal Content</div>,
    className: 'custom-class',
    isOpen: true,
    onClose: mockOnClose,
    position: ModalPosition.CENTER,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useIsDesktop as jest.Mock).mockReturnValue(true);
  });

  describe('Mounting', () => {
    it('should create portal element on mount', () => {
      render(<Modal {...defaultProps} />);

      expect(document.getElementById('modal-root')).toBeTruthy();
    });

    it('should remove portal element on unmount', () => {
      const { unmount } = render(<Modal {...defaultProps} />);

      unmount();
      expect(document.getElementById('modal-root')).toBeFalsy();
    });

    it('should not render content when not mounted', async () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
    });
  });

  describe('Opening and Closing', () => {
    it('should show modal content when isOpen is true', async () => {
      render(<Modal {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
    });

    it('should handle close animation', async () => {
      jest.useFakeTimers();

      const { rerender } = render(<Modal {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('modal-content')).toHaveClass('scale-100');
      });

      rerender(<Modal {...defaultProps} isOpen={false} />);
      expect(screen.getByTestId('modal-content')).toHaveClass('scale-95');

      act(() => {
        jest.advanceTimersByTime(300);
      });
      expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();

      jest.useRealTimers();
    });

    it('should cleanup timeouts on unmount', async () => {
      jest.useFakeTimers();

      const spy = jest.spyOn(window, 'setTimeout');
      const { unmount } = render(<Modal {...defaultProps} />);

      unmount();
      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
      jest.useRealTimers();
    });
  });

  describe('Click Handlers', () => {
    it('should call onClose when clicking overlay', async () => {
      render(<Modal {...defaultProps} />);

      await waitFor(() => {
        fireEvent.click(screen.getByTestId('modal-overlay'));
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('should not call onClose when clicking modal content', async () => {
      render(<Modal {...defaultProps} />);

      await waitFor(() => {
        fireEvent.click(screen.getByTestId('modal-content'));
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });

    it('should call onClose when clicking close button', async () => {
      render(<Modal {...defaultProps} />);

      await waitFor(() => {
        fireEvent.click(screen.getByText('Close Modal'));
        expect(mockOnClose).toHaveBeenCalled();
      });
    });
  });

  describe('Position Variants', () => {
    it('should render center position correctly', async () => {
      render(<Modal {...defaultProps} position={ModalPosition.CENTER} />);

      await waitFor(() => {
        const overlay = screen.getByTestId('modal-overlay');
        const content = screen.getByTestId('modal-content');

        expect(overlay).toHaveClass('flex items-center justify-center');
        expect(content).toHaveClass('w-[792px]', 'h-[624px]', 'rounded-lg');
      });
    });

    it('should render right position correctly', async () => {
      render(<Modal {...defaultProps} position={ModalPosition.RIGHT} />);

      await waitFor(() => {
        const overlay = screen.getByTestId('modal-overlay');
        const content = screen.getByTestId('modal-content');

        expect(overlay).toHaveClass('flex items-center justify-end');
        expect(content).toHaveClass('h-full');
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('should use desktop width when isDesktop is true', async () => {
      (useIsDesktop as jest.Mock).mockReturnValue(true);

      render(<Modal {...defaultProps} position={ModalPosition.RIGHT} />);

      await waitFor(() => {
        expect(screen.getByTestId('modal-content')).toHaveClass('w-[480px]');
      });
    });

    it('should use full width when isDesktop is false', async () => {
      (useIsDesktop as jest.Mock).mockReturnValue(false);

      render(<Modal {...defaultProps} position={ModalPosition.RIGHT} />);

      await waitFor(() => {
        expect(screen.getByTestId('modal-content')).toHaveClass('w-full');
      });
    });
  });

  describe('Button Styles', () => {
    it('should apply correct button styles for center position', async () => {
      render(<Modal {...defaultProps} position={ModalPosition.CENTER} />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveClass('fr-link--sm', 'fr-icon-close-line');
        expect(button.querySelector('span')).toHaveClass('font-[500]');
      });
    });

    it('should apply correct button styles for right position', async () => {
      render(<Modal {...defaultProps} position={ModalPosition.RIGHT} />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveClass('fr-link--lg', 'fr-icon-arrow-left-line');
        expect(button.querySelector('span')).toHaveClass(
          'text-[20px]',
          'font-bold'
        );
      });
    });
  });

  describe('Animation States', () => {
    it('should handle visibility classes correctly', async () => {
      jest.useFakeTimers();

      render(<Modal {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByTestId('modal-content')).toHaveClass(
          'scale-95',
          'opacity-0'
        );
      });

      act(() => {
        jest.advanceTimersByTime(10);
      });

      expect(screen.getByTestId('modal-content')).toHaveClass(
        'scale-100',
        'opacity-100'
      );

      jest.useRealTimers();
    });

    it('should handle slide animation for right position', async () => {
      jest.useFakeTimers();

      render(<Modal {...defaultProps} position={ModalPosition.RIGHT} />);

      await waitFor(() => {
        expect(screen.getByTestId('modal-content')).toHaveClass(
          'translate-x-full'
        );
      });

      act(() => {
        jest.advanceTimersByTime(10);
      });

      expect(screen.getByTestId('modal-content')).toHaveClass('translate-x-0');

      jest.useRealTimers();
    });
  });
});
