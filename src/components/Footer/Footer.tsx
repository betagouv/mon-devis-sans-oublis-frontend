import React from 'react';
import Link from 'next/link';

export interface FooterProps {
  affiliatedMinistry: string[];
  buttons: { href: string; label: string }[];
  organizationDetails: string;
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
            <p className='fr-footer__content-desc'>{organizationDetails}</p>
            <ul className='fr-footer__content-list'>
              <li className='fr-footer__content-item'>
                <Link
                  className='fr-footer__content-link'
                  target='_blank'
                  rel='noopener external'
                  title='info.gouv.fr - nouvelle fenêtre'
                  href='https://info.gouv.fr'
                >
                  info.gouv.fr
                </Link>
              </li>
              <li className='fr-footer__content-item'>
                <Link
                  className='fr-footer__content-link'
                  target='_blank'
                  rel='noopener external'
                  title='service-public.fr - nouvelle fenêtre'
                  href='https://service-public.fr'
                >
                  service-public.fr
                </Link>
              </li>
              <li className='fr-footer__content-item'>
                <Link
                  className='fr-footer__content-link'
                  target='_blank'
                  rel='noopener external'
                  title='legifrance.gouv.fr - nouvelle fenêtre'
                  href='https://legifrance.gouv.fr'
                >
                  legifrance.gouv.fr
                </Link>
              </li>
              <li className='fr-footer__content-item'>
                <Link
                  className='fr-footer__content-link'
                  target='_blank'
                  rel='noopener external'
                  title='data.gouv.fr - nouvelle fenêtre'
                  href='https://data.gouv.fr'
                >
                  data.gouv.fr
                </Link>
              </li>
            </ul>
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
                target='_blank'
                rel='noopener external'
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
