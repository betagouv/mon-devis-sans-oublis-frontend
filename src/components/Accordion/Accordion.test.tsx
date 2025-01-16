import { render, screen, fireEvent, act } from '@testing-library/react';

import Accordion from './Accordion';

describe('Accordion Component', () => {
  const defaultProps = {
    badgeLabel: '5',
    children: <div data-testid='accordion-content'>Accordion Content</div>,
    title: 'This is a very long title that needs truncating at some point',
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

  it('truncates title to 30 characters on mobile screens', async () => {
    global.innerWidth = 500;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });

    render(<Accordion {...defaultProps} />);

    await new Promise((resolve) => setTimeout(resolve, 100));

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

    act(() => {
      fireEvent.click(button);
    });
    expect(content).toHaveStyle({ display: 'none', opacity: '0' });

    act(() => {
      fireEvent.click(button);
    });
    expect(content).toHaveStyle({ display: 'block', opacity: '1' });
  });

  it('handles recalculating lastSpace with complex titles', () => {
    const complexTitleProps = {
      ...defaultProps,
      title:
        'This is a complex title with, multiple, spaces-and-special-characters to truncate',
    };

    render(<Accordion {...complexTitleProps} />);

    const button = screen.getByRole('button');
    const displayedText = button.textContent
      ?.replace(defaultProps.badgeLabel ?? '', '')
      .trim();

    expect(displayedText).toBe('This is a complex title');
    expect(displayedText?.length).toBeLessThanOrEqual(60);
  });

  it('handles truncation with special characters before spaces', () => {
    const specialCharTitleProps = {
      ...defaultProps,
      title: 'This is a title with-special/characters, and spaces to truncate',
    };

    render(<Accordion {...specialCharTitleProps} />);

    const button = screen.getByRole('button');
    const displayedText = button.textContent
      ?.replace(defaultProps.badgeLabel ?? '', '')
      .trim();

    expect(displayedText).toMatch(/This is a title with-special\/characters,/);
  });

  it('handles truncation by falling back to maxLength when no spaces are found', () => {
    const noSpacesTitleProps = {
      ...defaultProps,
      title: 'ThisIsALongTitleWithoutSpacesThatWillBeTruncatedAtTheLimit',
    };

    render(<Accordion {...noSpacesTitleProps} />);

    const button = screen.getByRole('button');
    const displayedText = button.textContent
      ?.replace(defaultProps.badgeLabel ?? '', '')
      .trim();

    expect(displayedText).toBe(
      'ThisIsALongTitleWithoutSpacesThatWillBeTruncatedAtTheLimit'
    );
    expect(displayedText?.length).toBe(58);
  });

  it('falls back to maxLength when lastSpace is 0', () => {
    const edgeCaseTitleProps = {
      ...defaultProps,
      title:
        'TitleWithoutAnySpacesButTooLongToDisplayTitleWithoutAnySpacesButTooLongToDisplay',
    };

    render(<Accordion {...edgeCaseTitleProps} />);

    const button = screen.getByRole('button');
    const displayedText = button.textContent
      ?.replace(defaultProps.badgeLabel ?? '', '')
      .trim();

    expect(displayedText).toBe(
      'TitleWithoutAnySpacesButTooLongToDisplayTitleWithoutAnySpace'
    );
    expect(displayedText?.length).toBe(60);
  });

  it('removes event listeners on component unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<Accordion {...defaultProps} />);

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );
  });
});
