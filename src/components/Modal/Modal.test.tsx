import { render, screen, fireEvent, act } from '@testing-library/react';

import Modal, { ModalPosition } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    backButtonLabel: 'Retour',
    children: <div>Test Content</div>,
    isOpen: true,
    onClose: jest.fn(),
    position: ModalPosition.CENTER,
  };

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders nothing when not mounted', () => {
    const { container } = render(<Modal {...defaultProps} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal content when mounted and open', () => {
    render(<Modal {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies center position styles correctly', () => {
    render(<Modal {...defaultProps} position={ModalPosition.CENTER} />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    const overlay = screen.getByTestId('modal-overlay');
    const content = screen.getByTestId('modal-content');

    expect(overlay).toHaveClass('flex items-center justify-center');
    expect(content).toHaveClass('w-[792px]', 'h-[624px]');
  });

  it('applies right position styles correctly', () => {
    render(<Modal {...defaultProps} position={ModalPosition.RIGHT} />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    const overlay = screen.getByTestId('modal-overlay');
    const content = screen.getByTestId('modal-content');

    expect(overlay).toHaveClass('flex items-center justify-end');
    expect(content).toHaveClass('w-[480px]');
  });

  it('handles close button click', () => {
    render(<Modal {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    const closeButton = screen.getByText('Retour');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('handles overlay click', () => {
    render(<Modal {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('prevents content click from closing modal', () => {
    render(<Modal {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    const content = screen.getByTestId('modal-content');
    fireEvent.click(content);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('handles opening animation', () => {
    render(<Modal {...defaultProps} isOpen={false} />);

    // Initial state
    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();

    // Open modal
    render(<Modal {...defaultProps} isOpen={true} />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    const content = screen.getByTestId('modal-content');
    expect(content).toHaveClass('scale-100', 'opacity-100');
  });

  it('handles closing animation', () => {
    const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    // Close modal
    rerender(<Modal {...defaultProps} isOpen={false} />);

    const content = screen.getByTestId('modal-content');
    expect(content).toHaveClass('scale-95', 'opacity-0');

    // Wait for animation to complete
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
  });

  it('cleans up portal element on unmount', () => {
    const { unmount } = render(<Modal {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    const portalElement = document.getElementById('modal-root');
    expect(portalElement).toBeInTheDocument();

    unmount();
    expect(document.getElementById('modal-root')).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<Modal {...defaultProps} className='custom-class' />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    const overlay = screen.getByTestId('modal-overlay');
    expect(overlay).toHaveClass('custom-class');
  });

  it('works without optional onClose prop', () => {
    const { ...propsWithoutOnClose } = defaultProps;
    render(<Modal {...propsWithoutOnClose} />);

    act(() => {
      jest.advanceTimersByTime(10);
    });

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    // Should not throw any errors
  });
});
