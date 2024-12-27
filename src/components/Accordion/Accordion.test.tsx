import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from './Accordion';
import React from 'react';

describe('Accordion Component', () => {
  const defaultProps = {
    title: 'This is a very long title that needs truncating at some point',
    badgeLabel: '5',
    children: <div data-testid='accordion-content'>Accordion Content</div>,
  };

  beforeEach(() => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
  });

  it('renders the accordion with title and badge', () => {
    render(<Accordion {...defaultProps} />);
    expect(screen.getByText(/This is a very long title/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByTestId('accordion-content')).toBeInTheDocument();
  });

  it('truncates title to 60 characters on desktop screens', () => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));

    render(<Accordion {...defaultProps} />);
    const button = screen.getByRole('button');
    const displayedText = button.textContent
      ?.replace(defaultProps.badgeLabel ?? '', '')
      .trim();

    expect(displayedText?.length).toBeLessThanOrEqual(60);
    expect(displayedText).toMatch(
      /This is a very long title that needs truncating/i
    );
  });

  it('truncates title to 30 characters on mobile screens', () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(<Accordion {...defaultProps} />);
    const button = screen.getByRole('button');
    const displayedText = button.textContent
      ?.replace(defaultProps.badgeLabel ?? '', '')
      .trim();

    expect(displayedText?.length).toBeLessThanOrEqual(30);
    expect(displayedText).toMatch(/^This is a very long/);
  });

  it('toggles accordion content visibility on button click', () => {
    render(<Accordion {...defaultProps} />);
    const button = screen.getByRole('button');
    const content = screen.getByTestId('accordion-content').parentElement;

    expect(content).toHaveStyle({ display: 'block', opacity: '1' });

    fireEvent.click(button);
    expect(content).toHaveStyle({ display: 'none', opacity: '0' });

    fireEvent.click(button);
    expect(content).toHaveStyle({ display: 'block', opacity: '1' });
  });
});
