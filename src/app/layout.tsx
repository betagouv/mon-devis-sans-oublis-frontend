import type { Metadata } from 'next';

import { Footer, FooterProps, Header, HeaderProps } from '@/components';
import { marianne, spectral } from '@/styles/fonts';
import '@/styles/globals.css';
import { initDsfr } from '@/utils/dsfr';

// DSFR initialization
initDsfr();

export const metadata: Metadata = {
  title: 'Mon Devis Sans Oublis',
  description: 'Vérifiez vos devis de rénovation énergétique',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerData: FooterProps = {
    affiliatedMinistry: ['Ministère', 'de la transition', 'écologique'],
    buttons: [
      { href: '/', label: 'Plan du site' },
      {
        href: '/',
        label: 'Accessibilité : non/partiellement/totalement conforme',
      },
      { href: '/', label: 'Mentions légales' },
      { href: '/', label: 'Données personnelles' },
      { href: '/', label: 'Gestion des cookies' },
    ],
    organizationDetails:
      "Mon Devis Sans Oublis est un service public lancé par le Ministère de la Transition Ecologique et la Direction du Numérique (DINUM) sous la forme d'une start-up d'Etat. Elle est en phase d'expérimentation avant un déploiement massif. N'hésitez pas à nous faire part de vos retours et suggestions d'améliorations",
    organizationLink: '/',
    organizationName: 'Mon Devis Sans Oublis',
  };

  const headerData: HeaderProps = {
    affiliatedMinistry: ['Ministère', 'de la transition', 'écologique'],
    buttons: [
      {
        href: '/contact',
        icon: 'fr-icon-question-line',
        label: 'Nous contacter',
      },
    ],
    organizationDetails: 'Vérifiez vos devis de rénovation énergétique',
    organizationLink: '/',
    organizationName: 'Mon Devis Sans Oublis',
  };
  return (
    <html
      className={`${marianne.variable} ${spectral.variable}`}
      data-fr-scheme='system'
      lang='fr'
    >
      <head>
        <meta
          content='telephone=no,date=no,address=no,email=no,url=no'
          name='format-detection'
        />
        <meta
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
          name='viewport'
        />

        <meta content='#000091' name='theme-color' />
        <link href='dsfr/favicon/apple-touch-icon.png' rel='apple-touch-icon' />
        <link href='dsfr/favicon/favicon.svg' rel='icon' type='image/svg+xml' />
        <link
          href='dsfr/favicon/favicon.ico'
          rel='shortcut icon'
          type='image/x-icon'
        />
        <link
          crossOrigin='use-credentials'
          href='dsfr/favicon/manifest.webmanifest'
          rel='manifest'
        />
      </head>
      <body>
        <Header {...headerData} />
        <main>{children}</main>
        <Footer {...footerData} />
      </body>
    </html>
  );
}
