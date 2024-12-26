import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ModalProps } from '../Modal/Modal';
import QuoteErrorItem from './QuoteErrorItem';
import { Category, Type } from '@/context';

// Mock Modal
const MockModal = ({ isOpen, onClose, title }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div data-testid='modal'>
      <p>{title}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

MockModal.displayName = 'MockModal';

jest.mock('../Modal/Modal', () => {
  const MockModalComponent = (props: ModalProps) => <MockModal {...props} />;
  MockModalComponent.displayName = 'MockModalComponent';
  return MockModalComponent;
});

describe('QuoteErrorItem Component', () => {
  const mockItem = {
    id: '1',
    category: Category.ADMIN,
    type: Type.MISSING,
    code: 'code',
    title: 'Document manquant',
    provided_value: 'value',
    modalContent: {
      buttonBackText: 'Retour',
      buttonContactText: 'Contacter',
      correctionHelpful: 'Cette correction a-t-elle été utile ?',
      iconAlt: 'Erreur icône',
      iconSrc: '/error-icon.svg',
      isOpen: false,
      problem: { title: 'Problème', description: 'Description du problème' },
      solution: {
        title: 'Solution',
        description: 'Description de la solution',
      },
      title: 'Document manquant',
    },
  };

  const defaultProps = {
    closeModal: jest.fn(),
    item: mockItem,
    openModal: jest.fn(),
    openModalId: null as string | null,
  };

  it('renders correctly with all props', () => {
    render(<QuoteErrorItem {...defaultProps} />);

    expect(screen.getByText('Document manquant')).toBeInTheDocument();
    expect(screen.getByText('Voir le détail')).toBeInTheDocument();
    expect(screen.getByText('Information manquante')).toBeInTheDocument();
  });

  it('opens and closes modal correctly', () => {
    const { rerender } = render(<QuoteErrorItem {...defaultProps} />);

    const viewDetailButton = screen.getByText('Voir le détail');
    fireEvent.click(viewDetailButton);
    expect(defaultProps.openModal).toHaveBeenCalled();

    rerender(<QuoteErrorItem {...defaultProps} openModalId='1' />);
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText('Document manquant')).toBeInTheDocument();

    const closeButton = within(modal).getByText('Close');
    fireEvent.click(closeButton);
    expect(defaultProps.closeModal).toHaveBeenCalled();
  });

  it('displays correct text based on type', () => {
    render(<QuoteErrorItem {...defaultProps} />);
    expect(screen.getByText('Information manquante')).toBeInTheDocument();

    const wrongTypeItem = {
      ...mockItem,
      type: Type.WRONG,
    };
    render(<QuoteErrorItem {...defaultProps} item={wrongTypeItem} />);
    expect(screen.getByText('Information erronée')).toBeInTheDocument();
  });

  it('handles long titles correctly', () => {
    const longTitleItem = {
      ...mockItem,
      title:
        'This is a very long title that should be displayed properly in the component',
    };

    render(<QuoteErrorItem {...defaultProps} item={longTitleItem} />);
    expect(screen.getByText(longTitleItem.title)).toBeInTheDocument();
  });
});
