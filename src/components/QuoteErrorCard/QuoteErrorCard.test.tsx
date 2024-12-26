import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Category, Type } from '@/context';
import QuoteErrorCard from './QuoteErrorCard';
import { ModalProps } from '../Modal/Modal';

// Mock Modal to avoid full modal rendering in tests
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

const mockList = [
  {
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
  },
  {
    id: '2',
    category: Category.GESTES,
    type: Type.WRONG,
    code: 'code',
    title: 'Erreur technique',
    provided_value: 'value',
    modalContent: {
      buttonBackText: 'Retour',
      buttonContactText: 'Contacter',
      correctionHelpful: 'Correction utile ?',
      iconAlt: 'Erreur technique',
      iconSrc: '/error-icon.svg',
      isOpen: false,
      problem: { title: 'Problème', description: 'Erreur technique' },
      solution: { title: 'Solution', description: 'Résolution technique' },
      title: 'Détail de l’erreur technique',
    },
  },
];

describe('QuoteErrorCard Component', () => {
  it('renders the component with a list of errors', () => {
    render(<QuoteErrorCard list={mockList} />);

    expect(screen.getByText('Mentions administratives')).toBeInTheDocument();
    expect(screen.getByText('2 corrections')).toBeInTheDocument();
    expect(screen.getByText('Document manquant')).toBeInTheDocument();
    expect(screen.getByText('Erreur technique')).toBeInTheDocument();
  });

  it('opens and closes the modal when the button is clicked', () => {
    render(<QuoteErrorCard list={mockList} />);

    const viewDetailButton = screen.getAllByText('Voir le détail')[0];
    fireEvent.click(viewDetailButton);

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();

    expect(within(modal).getByText('Document manquant')).toBeInTheDocument();

    const closeButton = within(modal).getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('displays the correct badge and tooltip information', () => {
    render(<QuoteErrorCard list={mockList} />);

    expect(screen.getByText('2 corrections')).toBeInTheDocument();
    expect(screen.getByText('Information manquante')).toBeInTheDocument();
    expect(screen.getByText('Information erronée')).toBeInTheDocument();

    const tooltipText = screen.getByText(/information manquante/i);
    expect(tooltipText).toBeInTheDocument();
  });

  it('renders the correct title based on category', () => {
    render(<QuoteErrorCard list={mockList} />);

    // Check for the title of the first item (ADMIN)
    expect(screen.getByText('Mentions administratives')).toBeInTheDocument();

    // Modify the list to simulate a GESTES category and rerender
    const gestesList = [{ ...mockList[1], category: Category.GESTES }];
    render(<QuoteErrorCard list={gestesList} />);

    expect(
      screen.getByText((content) =>
        content.includes('Descriptif technique des gestes')
      )
    ).toBeInTheDocument();
  });
});
