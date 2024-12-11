import { render, screen } from '@testing-library/react';

import Link, { LinkVariant } from './Link';

// Mock next/link
jest.mock('next/link', () => {
  const MockNextLink = ({
    className,
    children,
    href,
  }: {
    className: string;
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} className={className} data-testid='next-link'>
      {children}
    </a>
  );

  MockNextLink.displayName = 'MockNextLink';
  return MockNextLink;
});

describe('Link', () => {
  const defaultProps = {
    href: '/test',
    label: 'Test Link',
  };

  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<Link {...defaultProps} />);
      const link = screen.getByTestId('next-link');

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveTextContent('Test Link');
      expect(link).toHaveClass('fr-btn', 'fr-text--lg');
    });

    it('renders with custom href', () => {
      render(<Link {...defaultProps} href='/custom-path' />);
      const link = screen.getByTestId('next-link');
      expect(link).toHaveAttribute('href', '/custom-path');
    });

    it('renders with custom label', () => {
      render(<Link {...defaultProps} label='Custom Label' />);
      const link = screen.getByTestId('next-link');
      expect(link).toHaveTextContent('Custom Label');
    });
  });

  describe('Variant Handling', () => {
    it('uses primary variant by default', () => {
      render(<Link {...defaultProps} />);
      const link = screen.getByTestId('next-link');
      expect(link).not.toHaveClass('fr-btn--secondary');
    });

    it('applies primary variant explicitly', () => {
      render(<Link {...defaultProps} variant={LinkVariant.PRIMARY} />);
      const link = screen.getByTestId('next-link');
      expect(link).not.toHaveClass('fr-btn--secondary');
    });

    it('applies secondary variant', () => {
      render(<Link {...defaultProps} variant={LinkVariant.SECONDARY} />);
      const link = screen.getByTestId('next-link');
      expect(link).toHaveClass('fr-btn--secondary');
    });

    it('handles undefined variant', () => {
      render(<Link {...defaultProps} variant={undefined} />);
      const link = screen.getByTestId('next-link');
      expect(link).not.toHaveClass('fr-btn--secondary');
    });
  });

  describe('Icon Handling', () => {
    it('renders without icon by default', () => {
      render(<Link {...defaultProps} />);
      const link = screen.getByTestId('next-link');
      expect(link).not.toHaveClass('fr-btn--icon-right');
    });

    it('renders with icon', () => {
      const icon = 'fr-icon-arrow-right-line';
      render(<Link {...defaultProps} icon={icon} />);
      const link = screen.getByTestId('next-link');
      expect(link).toHaveClass('fr-btn--icon-right', icon);
    });

    it('handles empty icon string', () => {
      render(<Link {...defaultProps} icon='' />);
      const link = screen.getByTestId('next-link');
      expect(link).not.toHaveClass('fr-btn--icon-right');
    });
  });

  describe('Class Combinations', () => {
    const testCases = [
      {
        name: 'primary variant with icon',
        props: {
          ...defaultProps,
          variant: LinkVariant.PRIMARY,
          icon: 'test-icon',
        },
        expectedClasses: [
          'fr-btn',
          'fr-btn--icon-right',
          'test-icon',
          'fr-text--lg',
        ],
        unexpectedClasses: ['fr-btn--secondary'],
      },
      {
        name: 'secondary variant with icon',
        props: {
          ...defaultProps,
          variant: LinkVariant.SECONDARY,
          icon: 'test-icon',
        },
        expectedClasses: [
          'fr-btn',
          'fr-btn--icon-right',
          'test-icon',
          'fr-text--lg',
          'fr-btn--secondary',
        ],
        unexpectedClasses: [],
      },
      {
        name: 'secondary variant without icon',
        props: {
          ...defaultProps,
          variant: LinkVariant.SECONDARY,
        },
        expectedClasses: ['fr-btn', 'fr-text--lg', 'fr-btn--secondary'],
        unexpectedClasses: ['fr-btn--icon-right'],
      },
      {
        name: 'primary variant without icon',
        props: {
          ...defaultProps,
          variant: LinkVariant.PRIMARY,
        },
        expectedClasses: ['fr-btn', 'fr-text--lg'],
        unexpectedClasses: ['fr-btn--icon-right', 'fr-btn--secondary'],
      },
    ];

    testCases.forEach(({ name, props, expectedClasses, unexpectedClasses }) => {
      it(`renders correctly with ${name}`, () => {
        render(<Link {...props} />);
        const link = screen.getByTestId('next-link');

        expectedClasses.forEach((className) => {
          expect(link).toHaveClass(className);
        });

        unexpectedClasses.forEach((className) => {
          expect(link).not.toHaveClass(className);
        });
      });
    });
  });

  describe('Component Properties', () => {
    it('has correct displayName', () => {
      expect(Link.displayName).toBe('Link');
    });
  });
});
