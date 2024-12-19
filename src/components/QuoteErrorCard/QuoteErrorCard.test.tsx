import { render, screen, fireEvent } from '@testing-library/react';

import QuoteErrorCard, {
  QuoteErrorCardProps,
  QuoteErrorCardCategory,
  QuoteErrorCardType,
} from './QuoteErrorCard';

// Mock Modal component
jest.mock('../Modal/Modal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
      <div>
        <div data-testid='modal-content'>Modal Content</div>
        <button onClick={onClose} data-testid='close-modal-button'>
          Close
        </button>
      </div>
    );
  },
}));

describe('QuoteErrorCard Component', () => {
  const mockList: QuoteErrorCardProps['list'] = [
    {
      category: QuoteErrorCardCategory.ADMIN,
      id: 1,
      modalContent: {
        buttonBackText: 'Back',
        buttonContactText: 'Contact',
        correctionHelpful: 'Was this correction helpful?',
        iconAlt: 'Warning icon',
        iconSrc: '/icons/warning.svg',
        isOpen: false,
        onClose: jest.fn(),
        problem: {
          title: 'Problem Title 1',
          description: 'Problem Description 1',
        },
        solution: {
          title: 'Solution Title 1',
          description: 'Solution Description 1',
        },
        title: 'Modal Title 1',
      },
      title: 'This is a very long title that should be truncated when rendered',
      type: QuoteErrorCardType.MISSING,
    },
    {
      category: QuoteErrorCardCategory.GESTES,
      id: 2,
      modalContent: {
        buttonBackText: 'Back',
        buttonContactText: 'Contact',
        correctionHelpful: 'Was this correction helpful?',
        iconAlt: 'Edit icon',
        iconSrc: '/icons/edit.svg',
        isOpen: false,
        onClose: jest.fn(),
        problem: {
          title: 'Problem Title 2',
          description: 'Problem Description 2',
        },
        solution: {
          title: 'Solution Title 2',
          description: 'Solution Description 2',
        },
        title: 'Modal Title 2',
      },
      title: 'Short title',
      type: QuoteErrorCardType.WRONG,
    },
  ];

  it('renders the QuoteErrorCard with the correct number of items', () => {
    render(<QuoteErrorCard list={mockList} />);

    expect(screen.getByText('Mentions administratives')).toBeInTheDocument();
    expect(screen.getByText('2 corrections')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(mockList.length);
  });

  it('opens the modal when "Voir le détail" is clicked and closes it correctly', () => {
    render(<QuoteErrorCard list={mockList} />);

    const detailButtons = screen.getAllByText('Voir le détail');
    fireEvent.click(detailButtons[0]);

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByTestId('close-modal-button')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close-modal-button'));
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('does not open a modal when no button is clicked', () => {
    render(<QuoteErrorCard list={mockList} />);
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });
});
