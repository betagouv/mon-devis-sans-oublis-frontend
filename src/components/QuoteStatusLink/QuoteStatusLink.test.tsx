import { render, screen, fireEvent } from '@testing-library/react';

import QuoteStatusLink, { QuoteStatusType } from './QuoteStatusLink';
import wording from '@/wording';

/* eslint-disable @next/next/no-img-element */
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentPropsWithoutRef<'img'>) => (
    <img alt={props.alt || 'Mocked image'} {...props} />
  ),
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

const mockLocation = new URL('http://test.com');
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('QuoteStatusLink', () => {
  describe('SHARE type', () => {
    beforeEach(() => {
      render(<QuoteStatusLink type={QuoteStatusType.SHARE} />);
    });

    it('renders share type correctly', () => {
      expect(
        screen.getByAltText(
          wording.components.quote_status_link.share.image_alt
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(wording.components.quote_status_link.share.title)
      ).toBeInTheDocument();
      expect(
        screen.getByText(wording.components.quote_status_link.share.description)
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          wording.components.quote_status_link.share.button_copy_url
        )
      ).toBeInTheDocument();
    });

    it('handles copy url button click', async () => {
      const copyButton = screen.getByText(
        wording.components.quote_status_link.share.button_copy_url
      );

      fireEvent.click(copyButton);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://test.com/'
      );

      expect(
        screen.getByText(
          wording.components.quote_status_link.share.button_copied_url
        )
      ).toBeInTheDocument();

      const button = screen.getByRole('button');
      expect(button).toHaveClass('fr-btn--secondary');
      expect(button).toHaveClass('fr-icon-check-line');
    });
  });

  describe('UPLOAD type', () => {
    beforeEach(() => {
      render(<QuoteStatusLink type={QuoteStatusType.UPLOAD} />);
    });

    it('renders upload type correctly', () => {
      expect(
        screen.getByAltText(
          wording.components.quote_status_link.upload.image_alt
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(wording.components.quote_status_link.upload.title)
      ).toBeInTheDocument();

      const link = screen.getByText(
        wording.components.quote_status_link.upload.link_label
      );
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', expect.any(String));
    });
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(
      <QuoteStatusLink type={QuoteStatusType.SHARE} className={customClass} />
    );

    const container = screen
      .getByRole('img', {
        name: wording.components.quote_status_link.share.image_alt,
      })
      .closest('div');
    expect(container).toHaveClass(customClass);
  });
});
