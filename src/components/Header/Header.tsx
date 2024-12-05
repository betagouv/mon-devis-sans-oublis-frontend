import React from 'react';
import Link from 'next/link';

export interface HeaderProps {
  affiliatedMinistry: string[];
  buttons: { href: string; icon: string; label: string }[];
  organizationDetails: string;
  organizationLink: string;
  organizationName: string;
}

const Header: React.FC<HeaderProps> = ({
  affiliatedMinistry,
  buttons,
  organizationDetails,
  organizationLink,
  organizationName,
}) => {
  const plainString = affiliatedMinistry.join(' ');

  return (
    <header className='fr-header' role='banner'>
      <div className='fr-header__body'>
        <div className='fr-container'>
          <div className='fr-header__body-row'>
            <div className='fr-header__brand fr-enlarge-link'>
              <div className='fr-header__brand-top'>
                <div className='fr-header__logo'>
                  <p className='fr-logo'>
                    {affiliatedMinistry.map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < affiliatedMinistry.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
              <div className='fr-header__service'>
                <Link
                  href={organizationLink}
                  title={`Accueil - ${organizationName} - ${plainString}`}
                >
                  <p className='fr-header__service-title'>{organizationName}</p>
                </Link>
                <p className='fr-header__service-tagline'>
                  {organizationDetails}
                </p>
              </div>
            </div>
            <div className='fr-header__tools'>
              <div className='fr-header__tools-links'>
                <ul className='fr-btns-group'>
                  {buttons.map((button, index) => (
                    <li key={index}>
                      <Link
                        className={`fr-btn ${button.icon}`}
                        href={button.href}
                      >
                        {button.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
