import { render, screen, fireEvent, act } from '@testing-library/react';
import Modal, { ModalPosition } from './Modal';

describe('Modal', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    backButtonLabel: 'Close',
    isOpen: true,
    onClose: mockOnClose,
    position: ModalPosition.CENTER,
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('renders when isOpen is true', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
  });

  it('calls onClose when clicking overlay', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles missing onClose prop', () => {
    const { container } = render(
      <Modal {...defaultProps} onClose={undefined} />
    );

    fireEvent.click(screen.getByTestId('modal-overlay'));
    // Should not throw error
    expect(container).toBeInTheDocument();
  });

  it('does not call onClose when clicking modal content', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByTestId('modal-content'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onClose when clicking back button', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('renders with center position styles', () => {
    render(<Modal {...defaultProps} position={ModalPosition.CENTER} />);

    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('w-[792px]');
    expect(modalContent).toHaveClass('h-[624px]');
  });

  it('renders with right position styles', () => {
    render(<Modal {...defaultProps} position={ModalPosition.RIGHT} />);

    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('w-[480px]');
    expect(modalContent).toHaveClass('h-full');
  });

  it('animates on open', () => {
    render(<Modal {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('scale-100 opacity-100');
  });

  it('handles unmounting during animation', () => {
    const { unmount } = render(<Modal {...defaultProps} isOpen={true} />);

    act(() => {
      jest.advanceTimersByTime(5); // Part way through animation
      unmount();
      jest.runAllTimers(); // Should not throw error
    });
  });

  it('cleans up timers on unmount during close animation', () => {
    const { unmount } = render(<Modal {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(100); // Part way through close animation
      unmount();
      jest.runAllTimers(); // Should not throw error
    });
  });

  it('animates on close with proper cleanup', () => {
    const { rerender } = render(<Modal {...defaultProps} />);

    // First render with isOpen true
    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Then close the modal
    rerender(<Modal {...defaultProps} isOpen={false} />);

    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('scale-95 opacity-0');

    // Check that modal is removed after animation
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
  });

  it('displays correct back button label based on position', () => {
    const { rerender } = render(
      <Modal
        {...defaultProps}
        backButtonLabel='Close'
        position={ModalPosition.CENTER}
      />
    );
    expect(screen.getByText('Close')).toBeInTheDocument();

    rerender(
      <Modal
        {...defaultProps}
        backButtonLabel='Back'
        position={ModalPosition.RIGHT}
      />
    );
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<Modal {...defaultProps} className='custom-class' />);
    expect(screen.getByTestId('modal-overlay')).toHaveClass('custom-class');
  });

  it('handles multiple open/close cycles', () => {
    const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);

    // Open modal
    rerender(<Modal {...defaultProps} isOpen={true} />);
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();

    // Close modal
    rerender(<Modal {...defaultProps} isOpen={false} />);
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();

    // Open modal again
    rerender(<Modal {...defaultProps} isOpen={true} />);
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
  });
});
