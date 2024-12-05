import { render, screen } from '@testing-library/react';

import Header, { HeaderProps } from './Header';

describe('Header', () => {
  const mockProps: HeaderProps = {
    affiliatedMinistry: ['Ministère', 'de lIntérieur'],
    buttons: [
      { href: '/login', icon: 'fr-icon-account-line', label: 'Se connecter' },
      { href: '/contact', icon: 'fr-icon-mail-line', label: 'Contact' },
    ],
    organizationDetails: "Description de l'organisation",
    organizationLink: '/home',
    organizationName: "Nom de l'Organisation",
  };

  it('renders the header with correct role', () => {
    render(<Header {...mockProps} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders affiliated ministry lines correctly', () => {
    render(<Header {...mockProps} />);

    const logoElement = screen.getByText((content, element) => {
      return element?.classList.contains('fr-logo') ?? false;
    });

    mockProps.affiliatedMinistry.forEach((line) => {
      expect(logoElement).toHaveTextContent(line);
    });

    const lineBreaks = logoElement.getElementsByTagName('br');
    expect(lineBreaks).toHaveLength(mockProps.affiliatedMinistry.length - 1);
  });

  it('renders organization name with correct link', () => {
    render(<Header {...mockProps} />);
    const link = screen.getByTitle(
      `Accueil - ${
        mockProps.organizationName
      } - ${mockProps.affiliatedMinistry.join(' ')}`
    );
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockProps.organizationLink);
  });

  it('renders organization details', () => {
    render(<Header {...mockProps} />);
    expect(screen.getByText(mockProps.organizationDetails)).toBeInTheDocument();
  });

  it('renders all navigation buttons', () => {
    render(<Header {...mockProps} />);

    mockProps.buttons.forEach((button) => {
      const buttonElement = screen.getByText(button.label);
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement.closest('a')).toHaveAttribute('href', button.href);
      expect(buttonElement.closest('a')).toHaveClass(`fr-btn ${button.icon}`);
    });
  });

  it('renders with empty affiliated ministry array', () => {
    const propsWithEmptyMinistry = {
      ...mockProps,
      affiliatedMinistry: [],
    };
    render(<Header {...propsWithEmptyMinistry} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders with empty buttons array', () => {
    const propsWithEmptyButtons = {
      ...mockProps,
      buttons: [],
    };
    render(<Header {...propsWithEmptyButtons} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<Header {...mockProps} />);
    expect(screen.getByRole('banner')).toHaveClass('fr-header');
    expect(
      screen.getByText(mockProps.organizationName).closest('p')
    ).toHaveClass('fr-header__service-title');
    expect(screen.getByText(mockProps.organizationDetails)).toHaveClass(
      'fr-header__service-tagline'
    );
  });
});
