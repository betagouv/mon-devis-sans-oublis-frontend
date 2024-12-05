import { render, screen } from '@testing-library/react';

import Footer, { FooterProps } from './Footer';

describe('Footer Component', () => {
  const defaultProps: FooterProps = {
    affiliatedMinistry: ['Ministère', 'de la transition', 'écologique'],
    buttons: [
      { href: '/contact', label: 'Contact' },
      { href: '/about', label: 'About' },
    ],
    organizationDetails: {
      beforeLink: 'Mon Devis Sans Oublis est un service public conçu par la',
      link: {
        text: "Direction générale de l'aménagement, du logement et de la nature (DGALN)",
        url: 'https://www.ecologie.gouv.fr/direction-generale-lamenagement-du-logement-et-nature-dgaln-0',
      },
      afterLink: 'en partenariat avec le programme',
      betaGouv: {
        text: 'beta.gouv',
        url: 'https://beta.gouv.fr/',
      },
      finalText:
        ". Mon Devis Sans Oublis est en phase d'expérimentation, n'hésitez pas à nous faire part de vos retours par mail à contact@mon-devis-sans-oublis.beta.gouv.fr",
    },
    organizationLink: '/',
    organizationName: 'Mon Devis Sans Oublis',
  };

  it('renders affiliated ministry lines', () => {
    render(<Footer {...defaultProps} />);
    const logoElement = screen.getByText((content, element) => {
      return element?.classList.contains('fr-logo') ?? false;
    });

    defaultProps.affiliatedMinistry.forEach((line) => {
      expect(logoElement).toHaveTextContent(line);
    });
  });

  it('renders organization details with links', () => {
    render(<Footer {...defaultProps} />);

    // Check DGALN link
    const dgalnLink = screen.getByText(
      defaultProps.organizationDetails.link.text
    );
    expect(dgalnLink).toBeInTheDocument();
    expect(dgalnLink.closest('a')).toHaveAttribute(
      'href',
      defaultProps.organizationDetails.link.url
    );

    // Check beta.gouv link
    const betaGouvLink = screen.getByText(
      defaultProps.organizationDetails.betaGouv.text
    );
    expect(betaGouvLink).toBeInTheDocument();
    expect(betaGouvLink.closest('a')).toHaveAttribute(
      'href',
      defaultProps.organizationDetails.betaGouv.url
    );

    // Check text content
    expect(
      screen.getByText((content) =>
        content.includes(defaultProps.organizationDetails.beforeLink)
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(defaultProps.organizationDetails.afterLink)
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(defaultProps.organizationDetails.finalText)
      )
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
    expect(linkElement).toHaveAttribute('href', defaultProps.organizationLink);
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
