import React from 'react';
import Link from 'next/link';

interface OrganizationDetails {
  beforeLink: string;
  link: {
    text: string;
    url: string;
  };
  afterLink: string;
  betaGouv: {
    text: string;
    url: string;
  };
  finalText: string;
}

export interface FooterProps {
  affiliatedMinistry: string[];
  buttons: { href: string; label: string }[];
  organizationDetails: OrganizationDetails;
  organizationLink: string;
  organizationName: string;
}

const Footer: React.FC<FooterProps> = ({
  affiliatedMinistry,
  buttons,
  organizationDetails,
  organizationLink,
  organizationName,
}) => {
  const plainString = affiliatedMinistry.join(' ');

  return (
    <footer className='fr-footer' role='contentinfo' id='footer-7361'>
      <div className='fr-container'>
        <div className='fr-footer__body'>
          <div className='fr-footer__brand fr-enlarge-link'>
            <Link
              href={organizationLink}
              title={`Accueil - ${organizationName} - ${plainString}`}
            >
              <p className='fr-logo'>
                {affiliatedMinistry.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < affiliatedMinistry.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </Link>
          </div>
          <div className='fr-footer__content'>
            <div className='fr-footer__content-desc [&_a]:after:content-none'>
              {organizationDetails.beforeLink}
              <Link
                href={organizationDetails.link.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {organizationDetails.link.text}
              </Link>
              {organizationDetails.afterLink}
              <Link
                href={organizationDetails.betaGouv.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {organizationDetails.betaGouv.text}
              </Link>
              {organizationDetails.finalText}
            </div>
          </div>
        </div>
        <div className='fr-footer__bottom'>
          <ul className='fr-footer__bottom-list'>
            {buttons.map((button, index) => (
              <li className='fr-footer__bottom-item' key={index}>
                <Link className='fr-footer__bottom-link' href={button.href}>
                  {button.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className='fr-footer__bottom-copy'>
            <p>
              Sauf mention explicite de propriété intellectuelle détenue par des
              tiers, les contenus de ce site sont proposés sous{' '}
              <Link
                href='https://github.com/etalab/licence-ouverte/blob/master/LO.md'
                rel='noopener external'
                target='_blank'
                title='Licence etalab - nouvelle fenêtre'
              >
                licence etalab-2.0
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
