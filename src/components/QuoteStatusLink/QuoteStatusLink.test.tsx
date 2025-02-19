import { ImageProps } from 'next/image';
import { render, screen, fireEvent } from '@testing-library/react';

import QuoteStatusLink, { QuoteStatusType } from './QuoteStatusLink';
import wording from '@/wording';

// Mock des hooks et composants
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/test-path'),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => (
    <img
      alt={props.alt}
      height={props.height}
      src={props.src as string}
      width={props.width}
    />
  ),
}));

// Mock du hook useGoBackToUpload et useConseillerRoutes
const mockGoBackToUpload = '/upload';
jest.mock('@/hooks', () => ({
  useGoBackToUpload: () => mockGoBackToUpload,
  useConseillerRoutes: () => ({
    isConseillerAndEdit: false,
  }),
}));

// Mock du clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('QuoteStatusLink', () => {
  const mockLocation = new URL('http://test.com');
  const usePathname = jest.requireMock('next/navigation').usePathname;

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });
    usePathname.mockReturnValue('/test-path');
    jest
      .spyOn(require('@/hooks'), 'useConseillerRoutes')
      .mockImplementation(() => ({
        isConseillerAndEdit: false,
      }));
  });

  describe('SHARE type', () => {
    it('renders share type correctly', () => {
      render(<QuoteStatusLink type={QuoteStatusType.SHARE} />);

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

    it('shows different description for conseiller edit mode', () => {
      usePathname.mockReturnValue('/conseiller/televersement/123/modifier');
      jest
        .spyOn(require('@/hooks'), 'useConseillerRoutes')
        .mockImplementation(() => ({
          isConseillerAndEdit: true,
        }));

      render(<QuoteStatusLink type={QuoteStatusType.SHARE} />);

      expect(
        screen.getByText(
          'Retrouvez cette page avec les corrections à apporter sur le devis ainsi que celles que vous avez suggérées'
        )
      ).toBeInTheDocument();
    });

    it('shows normal description when not in conseiller edit mode', () => {
      usePathname.mockReturnValue('/conseiller/televersement/123');
      render(<QuoteStatusLink type={QuoteStatusType.SHARE} />);

      expect(
        screen.getByText(wording.components.quote_status_link.share.description)
      ).toBeInTheDocument();
    });

    it('copies non-edition URL when in conseiller edit mode', () => {
      usePathname.mockReturnValue('/conseiller/televersement/123/modifier');
      jest
        .spyOn(require('@/hooks'), 'useConseillerRoutes')
        .mockImplementation(() => ({
          isConseillerAndEdit: true,
        }));

      render(
        <QuoteStatusLink
          type={QuoteStatusType.SHARE}
          baseUrl='http://test.com'
        />
      );

      const copyButton = screen.getByText(
        wording.components.quote_status_link.share.button_copy_url
      );

      fireEvent.click(copyButton);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://test.com/conseiller/televersement/123'
      );
    });

    it('copies current URL when not in conseiller edit mode', () => {
      usePathname.mockReturnValue('/conseiller/televersement/123');
      render(
        <QuoteStatusLink
          type={QuoteStatusType.SHARE}
          baseUrl='http://test.com'
        />
      );

      const copyButton = screen.getByText(
        wording.components.quote_status_link.share.button_copy_url
      );

      fireEvent.click(copyButton);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://test.com/conseiller/televersement/123'
      );
    });

    it('has correct styling for share type', () => {
      render(<QuoteStatusLink type={QuoteStatusType.SHARE} />);

      const container = screen
        .getByRole('img')
        .closest('div[class*="bg-[var(--background-alt-blue-france)]"]');
      expect(container).toBeInTheDocument();
    });
  });

  describe('UPLOAD type', () => {
    it('renders upload type correctly', () => {
      render(<QuoteStatusLink type={QuoteStatusType.UPLOAD} />);

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
      render(<QuoteStatusLink type={QuoteStatusType.UPLOAD} />);

      const container = screen
        .getByRole('img')
        .closest('div[class*="bg-[var(--background-default-grey-hover)]"]');
      expect(container).toBeInTheDocument();
    });

    it('renders conseiller title when path includes /modifier', () => {
      usePathname.mockReturnValue('/conseiller/televersement/123/modifier');
      jest
        .spyOn(require('@/hooks'), 'useConseillerRoutes')
        .mockImplementation(() => ({
          isConseillerAndEdit: true,
        }));

      render(<QuoteStatusLink type={QuoteStatusType.UPLOAD} />);

      expect(
        screen.getByText(
          wording.components.quote_status_link.upload.title_conseiller
        )
      ).toBeInTheDocument();
    });

    it('renders normal title when path does not include /modifier', () => {
      usePathname.mockReturnValue('/conseiller/televersement/123');
      jest
        .spyOn(require('@/hooks'), 'useConseillerRoutes')
        .mockImplementation(() => ({
          isConseillerAndEdit: false,
        }));

      render(<QuoteStatusLink type={QuoteStatusType.UPLOAD} />);

      expect(
        screen.getByText(wording.components.quote_status_link.upload.title)
      ).toBeInTheDocument();
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
