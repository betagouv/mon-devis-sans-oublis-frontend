import { ImageProps } from 'next/image';
import * as nextNavigation from 'next/navigation';
import { render, screen, fireEvent } from '@testing-library/react';

import * as hooks from '@/hooks';
import QuoteStatusLink, { QuoteStatusType } from './QuoteStatusLink';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/test-path'),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={props.alt}
      height={props.height}
      src={props.src as string}
      width={props.width}
    />
  ),
}));

jest.mock('@/wording', () => ({
  __esModule: true,
  default: {
    components: {
      quote_status_link: {
        share: {
          image_alt: 'Image partagez les corrections',
          title: 'Partagez les corrections',
          description:
            'Retrouvez cette page et les corrections à apporter sur le devis.',
          description_conseiller:
            'Retrouvez cette page et les corrections à apporter sur le devis.',
          button_copy_url: 'Copier le lien de la page',
          button_copied_url: 'Lien copié',
        },
        upload: {
          image_alt: 'Image vérifier un devis',
          title: 'Vous souhaitez analyser un nouveau devis ?',
          title_conseiller:
            'Vous souhaitez analyser un nouveau devis ou vérifier votre devis corrigé ?',
          link_label: 'Vérifier un devis',
        },
      },
    },
  },
}));

import wording from '@/wording';

const mockGoBackToUpload = '/upload';
const mockUseConseillerRoutes = jest.fn(() => ({
  isConseillerAndEdit: false,
  isConseillerAndNotEdit: false,
}));

jest.mock('@/hooks', () => ({
  useGoBackToUpload: () => mockGoBackToUpload,
  useConseillerRoutes: () => mockUseConseillerRoutes(),
}));

// Mock du clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('QuoteStatusLink', () => {
  const mockLocation = new URL('http://test.com');
  const usePathname = jest.mocked(nextNavigation.usePathname);

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });
    usePathname.mockReturnValue('/test-path');
    jest.spyOn(hooks, 'useConseillerRoutes').mockImplementation(() => ({
      isConseillerAndEdit: false,
      isConseillerAndNotEdit: false,
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
      jest.spyOn(hooks, 'useConseillerRoutes').mockImplementation(() => ({
        isConseillerAndEdit: true,
        isConseillerAndNotEdit: false,
      }));

      render(<QuoteStatusLink type={QuoteStatusType.SHARE} />);

      expect(
        screen.getByText(
          wording.components.quote_status_link.share.description_conseiller
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

    it('copies URL correctly when not in conseiller edit mode', () => {
      usePathname.mockReturnValue('/televersement/123');
      jest.spyOn(hooks, 'useConseillerRoutes').mockImplementation(() => ({
        isConseillerAndEdit: false,
        isConseillerAndNotEdit: false,
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
        'http://test.com/televersement/123'
      );

      expect(
        screen.getByText(
          wording.components.quote_status_link.share.button_copied_url
        )
      ).toBeInTheDocument();
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
      jest.clearAllMocks();

      usePathname.mockReturnValue('/conseiller/televersement/123/modifier');

      mockUseConseillerRoutes.mockReturnValue({
        isConseillerAndEdit: true,
        isConseillerAndNotEdit: false,
      });

      render(<QuoteStatusLink type={QuoteStatusType.UPLOAD} />);

      expect(mockUseConseillerRoutes).toHaveBeenCalled();
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
