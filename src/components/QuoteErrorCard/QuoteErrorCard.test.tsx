import { render, screen, fireEvent } from '@testing-library/react';

import QuoteErrorCard, { QuoteErrorCardProps } from './QuoteErrorCard';
import { Category, Type } from '@/types';

describe('QuoteErrorCard', () => {
  const defaultProps: QuoteErrorCardProps = {
    list: [
      {
        id: '1',
        geste_id: 'G1',
        category: Category.ADMIN,
        type: Type.MISSING,
        code: 'CODE1',
        title: 'Error 1',
        provided_value: 'Group A',
        problem: 'Problem description for Error 1',
        solution: 'Solution for Error 1',
        modalContent: {
          isOpen: false,
          problem: 'Test problem',
          solution: 'Test solution',
          title: 'Test modal title',
        },
      },
      {
        id: '2',
        geste_id: 'G1',
        category: Category.ADMIN,
        type: Type.WRONG,
        code: 'CODE2',
        title: 'Error 2',
        provided_value: 'Group A',
        problem: 'Problem description for Error 2',
        solution: 'Solution for Error 2',
        modalContent: {
          isOpen: false,
          problem: 'Test problem',
          solution: 'Test solution',
          title: 'Test modal title',
        },
      },
      {
        id: '3',
        geste_id: 'G2',
        category: Category.GESTES,
        type: Type.MISSING,
        code: 'CODE3',
        title: 'Error 3',
        provided_value: null,
        problem: 'Problem description for Error 3',
        solution: 'Solution for Error 3',
        modalContent: {
          isOpen: false,
          problem: 'Test problem',
          solution: 'Test solution',
          title: 'Test modal title',
        },
      },
    ],
    onHelpClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct title for admin category', () => {
    render(<QuoteErrorCard {...defaultProps} />);
    expect(screen.getByText('Mentions administratives')).toBeInTheDocument();
  });

  it('renders the correct title for gestes category', () => {
    const gestesProps = {
      ...defaultProps,
      list: [
        {
          ...defaultProps.list[2],
          category: Category.GESTES,
        },
      ],
    };
    render(<QuoteErrorCard {...gestesProps} />);
    expect(
      screen.getByText('Descriptif technique des gestes')
    ).toBeInTheDocument();
  });

  it('renders grouped data correctly', () => {
    render(<QuoteErrorCard {...defaultProps} />);

    const groupTitle = screen.getByText('Group A');
    expect(groupTitle).toBeInTheDocument();

    expect(screen.getByText('Error 3')).toBeInTheDocument();
  });

  it('handles accordion interactions for grouped data', () => {
    render(<QuoteErrorCard {...defaultProps} />);

    const accordionHeader = screen.getByText('Group A');
    fireEvent.click(accordionHeader);

    expect(screen.getByText('Error 1')).toBeInTheDocument();
    expect(screen.getByText('Error 2')).toBeInTheDocument();

    fireEvent.click(accordionHeader);
  });

  it('displays the correct badge for multiple corrections', () => {
    render(<QuoteErrorCard {...defaultProps} />);
    expect(screen.getByText('2 corrections')).toBeInTheDocument();
  });

  it('renders tooltips correctly', () => {
    render(<QuoteErrorCard {...defaultProps} />);
    const tooltipIcons = screen.getAllByRole('generic', { hidden: true });
    expect(tooltipIcons.length).toBeGreaterThan(0);
  });
});
