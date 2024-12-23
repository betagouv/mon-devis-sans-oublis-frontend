import { render, screen, fireEvent, within } from '@testing-library/react';
import QuoteErrorCard, {
  QuoteErrorCardCategory,
  QuoteErrorCardType,
} from './QuoteErrorCard';
import { ModalProps } from '../Modal/Modal';
import '@testing-library/jest-dom';

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
    category: QuoteErrorCardCategory.ADMIN,
    id: 1,
    title: 'Document manquant',
    type: QuoteErrorCardType.MISSING,
    modalContent: {
      title: 'Détail de l’erreur',
      isOpen: false,
      buttonBackText: 'Retour',
      buttonContactText: 'Contacter',
      correctionHelpful: 'Cette correction a-t-elle été utile ?',
      iconAlt: 'Erreur icône',
      iconSrc: '/error-icon.svg',
      problem: { title: 'Problème', description: 'Description du problème' },
      solution: {
        title: 'Solution',
        description: 'Description de la solution',
      },
    },
  },
  {
    category: QuoteErrorCardCategory.GESTES,
    id: 2,
    title: 'Erreur technique',
    type: QuoteErrorCardType.WRONG,
    modalContent: {
      title: 'Détail de l’erreur technique',
      isOpen: false,
      buttonBackText: 'Retour',
      buttonContactText: 'Contacter',
      correctionHelpful: 'Correction utile ?',
      iconAlt: 'Erreur technique',
      iconSrc: '/error-icon.svg',
      problem: { title: 'Problème', description: 'Erreur technique' },
      solution: { title: 'Solution', description: 'Résolution technique' },
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

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Détail de l’erreur')).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('displays the correct badge and tooltip information', () => {
    render(<QuoteErrorCard list={mockList} />);

    expect(screen.getByText('2 corrections')).toBeInTheDocument();
    expect(screen.getByText('Information manquante')).toBeInTheDocument();
    expect(screen.getByText('Information erronée')).toBeInTheDocument();
  });

  it('truncates long titles correctly', () => {
    const longTitleList = [
      {
        ...mockList[0],
        title:
          'Titre très long qui devrait être tronqué après 60 caractères car il dépasse la limite',
      },
      {
        ...mockList[0],
        id: 2,
        title:
          'Autre titre très long qui devrait être tronqué après 60 caractères',
      },
    ];
    render(<QuoteErrorCard list={longTitleList} />);

    const listItems = screen.getAllByRole('listitem');
    const firstItem = within(listItems[0]);

    expect(
      firstItem.getByText((content) =>
        content.startsWith(
          'Titre très long qui devrait être tronqué après 60 cara'
        )
      )
    ).toBeInTheDocument();
  });
});
