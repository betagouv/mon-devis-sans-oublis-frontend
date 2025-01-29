import { render, screen, fireEvent, act } from '@testing-library/react';

import Modal, { ModalProps, ModalPosition } from './Modal';
import { useIsDesktop } from '@/hooks';

jest.mock('@/hooks', () => ({
  useIsDesktop: jest.fn(),
}));

describe('Modal Component', () => {
  let defaultProps: ModalProps;
  let onCloseMock: jest.Mock;

  beforeEach(() => {
    onCloseMock = jest.fn();
    defaultProps = {
      backButtonLabel: 'Close',
      children: <div>Modal Content</div>,
      isOpen: false,
      onClose: onCloseMock,
      position: ModalPosition.CENTER,
    };
    (useIsDesktop as jest.Mock).mockReturnValue(true);
  });

  it('does not render modal when isOpen is false', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
  });

  it('renders modal when isOpen is true', () => {
    render(<Modal {...defaultProps} isOpen={true} />);
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('renders modal with correct position (CENTER)', () => {
    render(
      <Modal {...defaultProps} isOpen={true} position={ModalPosition.CENTER} />
    );
    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('w-[792px] h-[624px] rounded-lg');
  });

  it('renders modal with correct position (RIGHT)', () => {
    render(
      <Modal {...defaultProps} isOpen={true} position={ModalPosition.RIGHT} />
    );
    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('h-full');
  });

  it('closes modal when clicking on the overlay', () => {
    render(<Modal {...defaultProps} isOpen={true} />);
    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('closes modal when clicking the back button', () => {
    render(<Modal {...defaultProps} isOpen={true} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('applies additional className', () => {
    render(<Modal {...defaultProps} isOpen={true} className='custom-class' />);
    expect(screen.getByTestId('modal-overlay')).toHaveClass('custom-class');
  });

  it('handles transition visibility', () => {
    jest.useFakeTimers();
    const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();

    rerender(<Modal {...defaultProps} isOpen={true} />);
    act(() => {
      jest.advanceTimersByTime(10);
    });

    expect(screen.getByTestId('modal-content')).toHaveClass(
      'scale-100 opacity-100'
    );

    rerender(<Modal {...defaultProps} isOpen={false} />);
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it('removes modal-root from DOM on unmount', () => {
    const { unmount } = render(<Modal {...defaultProps} isOpen={true} />);
    unmount();
    expect(document.getElementById('modal-root')).not.toBeInTheDocument();
  });

  it('renders modal with full width when isDesktop is false', () => {
    (useIsDesktop as jest.Mock).mockReturnValue(false);
    render(
      <Modal {...defaultProps} isOpen={true} position={ModalPosition.RIGHT} />
    );

    const modalContent = screen.getByTestId('modal-content');

    expect(modalContent).toHaveClass('w-full');
  });
});
