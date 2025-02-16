import { render, screen, fireEvent } from '@testing-library/react';
import QuoteStatusLink, { QuoteStatusType } from './QuoteStatusLink';
import wording from '@/wording';

jest.mock('next/navigation', () => ({
  usePathname: () => '/test-path',
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentPropsWithoutRef<'img'>) => (
    <img alt={props.alt || 'Mocked image'} {...props} />
  ),
}));

jest.mock('@/hooks', () => ({
  useGoBackToUpload: () => '/upload',
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('QuoteStatusLink', () => {
  const mockLocation = new URL('http://test.com');

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });
  });

  describe('EDIT type', () => {
    beforeEach(() => {
      render(<QuoteStatusLink type={QuoteStatusType.EDIT} />);
    });

    it('renders edit type correctly', () => {
      expect(
        screen.getByAltText(
          wording.components.quote_status_link.share.image_alt
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(wording.components.quote_status_link.edit.title)
      ).toBeInTheDocument();

      expect(
        screen.getByText(wording.components.quote_status_link.edit.description)
      ).toBeInTheDocument();

      const editLink = screen.getByText(
        wording.components.quote_status_link.edit.link_label
      );
      expect(editLink).toBeInTheDocument();
      expect(editLink.closest('a')).toHaveAttribute(
        'href',
        '/test-path/modifier'
      );
    });

    it('has correct styling for edit type', () => {
      const container = screen
        .getByRole('img')
        .closest('div[class*="bg-[var(--background-alt-blue-france)]"]');
      expect(container).toBeInTheDocument();
    });
  });

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

    it('handles copy url button click', () => {
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
      expect(button).toHaveClass('fr-btn--secondary', 'fr-icon-check-line');
    });

    it('has correct styling for share type', () => {
      const container = screen
        .getByRole('img')
        .closest('div[class*="bg-[var(--background-alt-blue-france)]"]');
      expect(container).toBeInTheDocument();
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

      const link = screen
        .getByText(wording.components.quote_status_link.upload.link_label)
        .closest('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/upload');
    });

    it('has correct styling for upload type', () => {
      const container = screen
        .getByRole('img')
        .closest('div[class*="bg-[var(--background-default-grey-hover)]"]');
      expect(container).toBeInTheDocument();
    });
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    render(
      <QuoteStatusLink type={QuoteStatusType.SHARE} className={customClass} />
    );

    const container = screen.getByRole('img').closest('div');
    expect(container).toHaveClass(customClass);
  });
});
