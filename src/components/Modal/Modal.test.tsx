import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';

import Modal, { ModalProps } from './Modal';

const defaultProps: ModalProps = {
  buttonBackText: 'Back to corrections',
  buttonContactText: 'Contact us',
  correctionHelpful: 'Was this correction helpful?',
  iconAlt: 'Correction details icon',
  iconSrc: '/images/quote_correction_details.png',
  isOpen: true,
  onClose: jest.fn(),
  problem: {
    title: 'Problem identified',
    description: 'The term “quote” is missing from your document.',
  },
  solution: {
    title: 'Solution',
    description: 'Add the term “quote” to your document.',
  },
  title: 'Correction details',
};

describe('Modal Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal with correct content when isOpen is true', () => {
    render(<Modal {...defaultProps} />);

    // Check modal content
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.problem.title)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.problem.description)
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.solution.title)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.solution.description)
    ).toBeInTheDocument();
    expect(screen.getByAltText(defaultProps.iconAlt)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.buttonBackText)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.buttonContactText)
    ).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);

    // Modal should not be rendered
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('calls onClose when clicking outside the modal', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);

    // Click outside the modal
    fireEvent.click(screen.getByRole('dialog').parentElement!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside the modal', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);

    // Click inside the modal content
    fireEvent.click(screen.getByText(defaultProps.title));

    expect(onClose).not.toHaveBeenCalled();
  });

  test('applies transition class when opening the modal', async () => {
    jest.useFakeTimers();
    const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);

    // Open modal
    rerender(<Modal {...defaultProps} isOpen={true} />);
    const modal = screen.getByRole('dialog');

    // Initially, modal has the 'translate-x-full' class
    expect(modal).toHaveClass('translate-x-full');

    // After a short delay, modal has the 'translate-x-0' class
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(modal).toHaveClass('translate-x-0');

    jest.useRealTimers();
  });

  test('applies transition class when closing the modal', async () => {
    jest.useFakeTimers();

    const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);

    // After rendering, modal should have 'translate-x-0'
    act(() => {
      jest.advanceTimersByTime(10); // Wait for the initial animation delay
    });
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('translate-x-0');

    // Close modal
    rerender(<Modal {...defaultProps} isOpen={false} />);

    // After the modal starts closing, it should have 'translate-x-full'
    act(() => {
      jest.advanceTimersByTime(300); // Simulate the CSS transition duration
    });
    expect(modal).toHaveClass('translate-x-full');

    // After the transition, the modal should be removed from the DOM
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  test('renders alt text for the icon', () => {
    render(<Modal {...defaultProps} />);

    // Check alt text
    expect(screen.getByAltText(defaultProps.iconAlt)).toBeInTheDocument();
  });

  test('buttons are clickable and present', () => {
    render(<Modal {...defaultProps} />);

    const backButton = screen.getByText(defaultProps.buttonBackText);
    const contactButton = screen.getByText(defaultProps.buttonContactText);

    expect(backButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();

    fireEvent.click(backButton);
    fireEvent.click(contactButton);

    // Verify no onClick for contact button
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1); // Only back button triggers onClose
  });
});
