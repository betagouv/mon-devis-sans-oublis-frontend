import { render, screen } from '@testing-library/react';

import Footer, { FooterProps } from './Footer';

describe('Footer Component', () => {
  const defaultProps: FooterProps = {
    affiliatedMinistry: ['Ministry of Magic', 'Department of Mysteries'],
    buttons: [
      { href: '/contact', label: 'Contact' },
      { href: '/about', label: 'About' },
    ],
    organizationDetails: 'Organization details here',
    organizationLink: 'https://example.com',
    organizationName: 'Example Organization',
  };

  it('renders affiliated ministry lines', () => {
    render(<Footer {...defaultProps} />);
    defaultProps.affiliatedMinistry.forEach((line) => {
      expect(
        screen.getByText((content) => content.includes(line))
      ).toBeInTheDocument();
    });
  });

  it('renders organization details', () => {
    render(<Footer {...defaultProps} />);
    expect(
      screen.getByText(defaultProps.organizationDetails)
    ).toBeInTheDocument();
  });

  it('renders organization link with correct href and title', () => {
    render(<Footer {...defaultProps} />);
    const linkElement = screen.getByTitle(
      `Accueil - ${
        defaultProps.organizationName
      } - ${defaultProps.affiliatedMinistry.join(' ')}`
    );
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute(
      'href',
      defaultProps.organizationLink
    );
  });

  it('renders footer links', () => {
    render(<Footer {...defaultProps} />);
    const links = [
      'info.gouv.fr',
      'service-public.fr',
      'legifrance.gouv.fr',
      'data.gouv.fr',
    ];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('renders buttons with correct hrefs and labels', () => {
    render(<Footer {...defaultProps} />);
    defaultProps.buttons.forEach((button) => {
      const linkElement = screen.getByText(button.label);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.closest('a')).toHaveAttribute('href', button.href);
    });
  });

  it('renders license link', () => {
    render(<Footer {...defaultProps} />);
    const licenseLink = screen.getByText('licence etalab-2.0');
    expect(licenseLink).toBeInTheDocument();
    expect(licenseLink.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/etalab/licence-ouverte/blob/master/LO.md'
    );
  });
});
