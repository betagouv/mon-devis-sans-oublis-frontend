import { render, screen, fireEvent } from '@testing-library/react';

import { AccordionProps } from '../Accordion/Accordion';
import QuoteErrorCard from './QuoteErrorCard';
import { QuoteErrorItemProps } from '../QuoteErrorItem/QuoteErrorItem';
import { TooltipProps } from '../Tooltip/Tooltip';
import { Category, Type } from '@/context';
import wording from '@/wording';

// Mock des composants enfants
jest.mock('../Accordion/Accordion', () => {
  return function MockAccordion({
    children,
    title,
    badgeLabel,
  }: AccordionProps) {
    return (
      <div data-testid='accordion' data-title={title}>
        <span data-testid='badge-label'>{badgeLabel}</span>
        {children}
      </div>
    );
  };
});

jest.mock('../QuoteErrorItem/QuoteErrorItem', () => {
  return function MockQuoteErrorItem({
    item,
    openModal,
    openModalId,
    closeModal,
  }: QuoteErrorItemProps) {
    return (
      <div
        data-testid='quote-error-item'
        onClick={() => openModal(item.id)}
        data-modal-open={openModalId === item.id ? item.id : ''}
      >
        {item.title}
        {openModalId === item.id && (
          <button
            data-testid='close-modal-button'
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            Close
          </button>
        )}
      </div>
    );
  };
});

// Tooltip mock
jest.mock('../Tooltip/Tooltip', () => {
  return function MockTooltip({ text, icon }: TooltipProps) {
    return (
      <div data-testid='tooltip' data-text={text} data-icon={icon}>
        {text}
      </div>
    );
  };
});

const mockOnHelpClick = jest.fn();

const defaultProps = {
  list: [
    {
      id: '1',
      category: Category.GESTES,
      type: Type.MISSING,
      code: 'ERROR_001',
      title: 'Error 1',
      provided_value: null,
      modalContent: {
        problem: 'Problem 1',
        solution: 'Solution 1',
        provided_value: null,
        title: 'Error 1',
        isOpen: false,
        onClose: () => {},
        onSubmitFeedback: () => {},
      },
    },
  ],
  onHelpClick: mockOnHelpClick,
};

describe('QuoteErrorCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with GESTES category', () => {
    render(<QuoteErrorCard {...defaultProps} />);

    expect(
      screen.getByText(wording.components.quote_error_card.title_gestes)
    ).toBeInTheDocument();
    expect(screen.getByText('Error 1')).toBeInTheDocument();
  });

  it('renders correctly with ADMIN category', () => {
    const adminProps = {
      ...defaultProps,
      list: [
        {
          ...defaultProps.list[0],
          category: Category.ADMIN,
        },
      ],
    };

    render(<QuoteErrorCard {...adminProps} />);

    expect(
      screen.getByText(wording.components.quote_error_card.title_admin)
    ).toBeInTheDocument();
  });

  // it('handles modal opening correctly', () => {
  //   const errorItem = screen.getByTestId('quote-error-item');
  //   fireEvent.click(errorItem);

  //   const items = screen.getAllByTestId('quote-error-item');
  //   expect(items[0]).toHaveAttribute('data-testid', 'quote-error-item');
  // });

  it('groups items by provided_value', () => {
    const propsWithProvidedValues = {
      list: [
        {
          ...defaultProps.list[0],
          id: '1',
          provided_value: 'Value 1',
        },
        {
          ...defaultProps.list[0],
          id: '2',
          provided_value: 'Value 1',
        },
        {
          ...defaultProps.list[0],
          id: '3',
          provided_value: null,
        },
      ],
      onHelpClick: mockOnHelpClick,
    };

    render(<QuoteErrorCard {...propsWithProvidedValues} />);

    // Check for accordion with grouped items
    const accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveAttribute('data-title', 'Value 1');

    // Check for badge label with correct count
    const badgeLabel = screen.getByTestId('badge-label');
    expect(badgeLabel).toHaveTextContent('2');

    // Check for ungrouped item (null provided_value)
    const errorItems = screen.getAllByTestId('quote-error-item');
    expect(errorItems).toHaveLength(3);
  });

  it('displays correct badge count for single error', () => {
    render(<QuoteErrorCard {...defaultProps} />);

    const badgeText = wording.upload_id.badge_correction.replace(
      '{number}',
      '1'
    );
    expect(screen.getByText(badgeText)).toBeInTheDocument();
  });

  it('displays correct badge count for multiple errors', () => {
    const multipleErrorsProps = {
      list: [
        ...defaultProps.list,
        {
          ...defaultProps.list[0],
          id: '2',
        },
      ],
      onHelpClick: mockOnHelpClick,
    };

    render(<QuoteErrorCard {...multipleErrorsProps} />);

    const badgeText = wording.upload_id.badge_correction_plural.replace(
      '{number}',
      '2'
    );
    expect(screen.getByText(badgeText)).toBeInTheDocument();
  });

  it('displays correct tooltip based on category', () => {
    render(<QuoteErrorCard {...defaultProps} />);

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toHaveAttribute(
      'data-text',
      wording.components.quote_error_card.tooltip_gestes.text
    );
    expect(tooltip).toHaveAttribute(
      'data-icon',
      wording.components.quote_error_card.tooltip_gestes.icon
    );
  });

  it('displays correct admin tooltip when category is ADMIN', () => {
    const adminProps = {
      ...defaultProps,
      list: [
        {
          ...defaultProps.list[0],
          category: Category.ADMIN,
        },
      ],
    };

    render(<QuoteErrorCard {...adminProps} />);

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toHaveAttribute(
      'data-text',
      wording.components.quote_error_card.tooltip_admin.text
    );
    expect(tooltip).toHaveAttribute(
      'data-icon',
      wording.components.quote_error_card.tooltip_admin.icon
    );
  });

  it('opens modal with specific id', () => {
    render(<QuoteErrorCard {...defaultProps} />);

    const errorItem = screen.getByTestId('quote-error-item');
    fireEvent.click(errorItem);

    const updatedErrorItem = screen.getByTestId('quote-error-item');
    expect(updatedErrorItem).toHaveAttribute(
      'data-modal-open',
      defaultProps.list[0].id
    );
  });

  it('tests openModal and closeModal functions', () => {
    render(<QuoteErrorCard {...defaultProps} />);

    const errorItem = screen.getByTestId('quote-error-item');
    fireEvent.click(errorItem);

    expect(screen.getByTestId('quote-error-item')).toHaveAttribute(
      'data-modal-open',
      '1'
    );

    const closeButton = screen.getByTestId('close-modal-button');
    fireEvent.click(closeButton);

    expect(screen.getByTestId('quote-error-item')).toHaveAttribute(
      'data-modal-open',
      ''
    );
  });
});
