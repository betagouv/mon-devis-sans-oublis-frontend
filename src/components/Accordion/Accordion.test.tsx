import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Accordion from './Accordion';

describe('Accordion Component', () => {
  const defaultProps = {
    title: 'Test Accordion Title',
    badgeLabel: '3',
    children: <div data-testid='accordion-content'>Test Content</div>,
  };

  it('renders the component correctly', () => {
    render(<Accordion {...defaultProps} />);
    expect(screen.getByText('Test Accordion Title')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByTestId('accordion-content')).toBeInTheDocument();
  });

  describe('title truncation', () => {
    it('returns full title when shorter than maxLength', () => {
      const shortTitle = 'Short Title';
      render(<Accordion {...defaultProps} title={shortTitle} />);
      expect(screen.getByText(shortTitle)).toBeInTheDocument();
    });

    it('returns truncated title when no valid space is found', () => {
      const noSpaceTitle =
        'ThisIsAVeryLongTitleWithNoSpacesAtAllThatShouldBeTruncatedAtMaxLength';
      render(<Accordion {...defaultProps} title={noSpaceTitle} />);

      const button = screen.getByRole('button');
      const displayedText = button.textContent
        ?.replace(defaultProps.badgeLabel ?? '', '')
        .trim();

      expect(displayedText?.length).toBeLessThanOrEqual(60);
      expect(noSpaceTitle).toContain(displayedText);
    });

    it('handles truncation with special characters correctly', () => {
      const titleWithPunctuation =
        'First part, Second part - Third part that should be truncated';
      render(<Accordion {...defaultProps} title={titleWithPunctuation} />);

      const button = screen.getByRole('button');
      const displayedText = button.textContent
        ?.replace(defaultProps.badgeLabel ?? '', '')
        .trim();

      expect(displayedText?.endsWith(',')).toBeFalsy();
      expect(displayedText?.endsWith('-')).toBeFalsy();
      expect(titleWithPunctuation).toContain(displayedText);
    });

    it('finds previous space when encountering comma or hyphen', () => {
      const longFirstPart =
        'This is an extremely long first part that will definitely need to be truncated because it exceeds the maximum length';
      const titleWithMultiplePunctuation = `${longFirstPart}, then comes the second part - and more text`;

      render(
        <Accordion {...defaultProps} title={titleWithMultiplePunctuation} />
      );

      const button = screen.getByRole('button');
      const displayedText = button.textContent
        ?.replace(defaultProps.badgeLabel ?? '', '')
        .trim();

      expect(displayedText).toBe(
        'This is an extremely long first part that will definitely'
      );
    });

    it('handles title with no valid spaces', () => {
      const titleWithNoValidSpaces =
        'ThisIsALongTitle,WithCommas,AndMore,AndMore,AndMore,UntilTheEnd';

      render(<Accordion {...defaultProps} title={titleWithNoValidSpaces} />);

      const button = screen.getByRole('button');
      const displayedText = button.textContent
        ?.replace(defaultProps.badgeLabel ?? '', '')
        .trim();

      expect(displayedText).toBe(
        'ThisIsALongTitle,WithCommas,AndMore,AndMore,AndMore,UntilThe'
      );
    });
  });

  it('toggles content visibility when clicked', () => {
    render(<Accordion {...defaultProps} />);
    const button = screen.getByRole('button');
    const content = screen.getByTestId('accordion-content').parentElement;

    expect(content).toHaveStyle({ display: 'block' });
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(button);
    expect(content).toHaveStyle({ display: 'none' });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(content).toHaveStyle({ display: 'block' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders without badge when badgeLabel is not provided', () => {
    render(
      <Accordion title='Test Title'>
        <div>Content</div>
      </Accordion>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<Accordion {...defaultProps} />);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-controls', 'fr-accordion-collapse');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('id', 'fr-accordion-toggle-btn');
  });
});
