import { render, screen, fireEvent } from '@testing-library/react';
import QuoteErrorCard, { QuoteErrorCardProps } from './QuoteErrorCard';
import { Category, Type } from '@/types';

describe('QuoteErrorCard', () => {
  const mockModalContent = {
    isOpen: true,
    problem: 'Test problem',
    solution: 'Test solution',
    title: 'Test modal title',
  };

  const defaultProps: QuoteErrorCardProps = {
    list: [
      {
        id: '1',
        geste_id: 'G1',
        category: Category.ADMIN,
        type: Type.MISSING,
        code: 'CODE1',
        title: 'Error 1',
        provided_value: 'value1',
        modalContent: mockModalContent,
      },
      {
        id: '2',
        geste_id: 'G2',
        category: Category.ADMIN,
        type: Type.WRONG,
        code: 'CODE2',
        title: 'Error 2',
        provided_value: 'value1',
        modalContent: mockModalContent,
      },
      {
        id: '3',
        geste_id: 'G3',
        category: Category.ADMIN,
        type: Type.MISSING,
        code: 'CODE3',
        title: 'Error 3',
        provided_value: null,
        modalContent: mockModalContent,
      },
    ],
    onHelpClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with admin category', () => {
    render(<QuoteErrorCard {...defaultProps} />);

    expect(screen.getByText('Mentions administratives')).toBeInTheDocument();
    expect(screen.getAllByText(/corrections?/i)[0]).toBeInTheDocument();
  });

  it('renders correctly with gestes category', () => {
    const gestesProps = {
      ...defaultProps,
      list: [
        {
          ...defaultProps.list[0],
          category: Category.GESTES,
        },
      ],
    };

    render(<QuoteErrorCard {...gestesProps} />);

    expect(
      screen.getByText('Descriptif technique des gestes')
    ).toBeInTheDocument();
  });

  it('renders single correction badge correctly', () => {
    const singleItemProps = {
      ...defaultProps,
      list: [defaultProps.list[0]],
    };

    render(<QuoteErrorCard {...singleItemProps} />);

    expect(screen.getAllByText('1 correction')[0]).toBeInTheDocument();
  });

  it('groups items by provided_value correctly', () => {
    render(<QuoteErrorCard {...defaultProps} />);

    expect(screen.getByText('Error 3')).toBeInTheDocument();

    const accordion = screen.getByText('value1');
    expect(accordion).toBeInTheDocument();
    expect(screen.getAllByText('2 corrections')[0]).toBeInTheDocument();
  });

  it('handles modal open and close', () => {
    render(<QuoteErrorCard {...defaultProps} />);

    const detailButtons = screen.getAllByText('Voir le détail');
    fireEvent.click(detailButtons[0]);

    expect(screen.getByText('Test modal title')).toBeInTheDocument();

    const backButton = screen.getByText('Détail de la correction');
    fireEvent.click(backButton);

    expect(screen.queryByText('Test modal title')).not.toBeInTheDocument();
  });

  it('renders tooltip with correct content', () => {
    render(<QuoteErrorCard {...defaultProps} />);

    const tooltipIcons = screen.getAllByRole('generic', { hidden: true });
    const tooltipIcon = tooltipIcons.find(
      (icon) =>
        icon.classList.contains('fr-icon-information-fill') &&
        icon.classList.contains('cursor-pointer')
    );

    expect(tooltipIcon).toBeDefined();
    expect(tooltipIcon).toHaveClass(
      'cursor-pointer',
      'fr-icon-information-fill'
    );

    fireEvent.mouseEnter(tooltipIcon!);
    expect(tooltipIcon!.parentElement).toBeInTheDocument();
  });

  it('handles accordion interactions', async () => {
    render(<QuoteErrorCard {...defaultProps} />);

    const accordion = screen.getByText('value1');

    fireEvent.click(accordion);
    expect(screen.getByText('Error 1')).toBeInTheDocument();
    expect(screen.getByText('Error 2')).toBeInTheDocument();

    const detailButtons = screen.getAllByText('Voir le détail');
    detailButtons.forEach((button) => {
      fireEvent.click(button);
      expect(screen.getByText('Test modal title')).toBeInTheDocument();

      const backButton = screen.getByText('Détail de la correction');
      fireEvent.click(backButton);
    });

    fireEvent.click(accordion);
  });
});
