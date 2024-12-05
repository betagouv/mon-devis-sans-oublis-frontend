import type { Meta, StoryObj } from '@storybook/react';

import Footer from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    affiliatedMinistry: {
      description:
        'Array of strings representing the ministry name, each element will be on a new line',
      control: { type: 'object', subtype: 'array' },
    },
    buttons: {
      description: 'Array of navigation links with href and label properties',
      control: { type: 'object', subtype: 'array' },
    },
    organizationDetails: {
      description: 'Detailed description of the organization with links',
      control: { type: 'object' },
    },
    organizationLink: {
      description: 'URL of the organization website',
      control: { type: 'text' },
    },
    organizationName: {
      description: 'Name of the organization',
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    affiliatedMinistry: ['Ministère', 'de la transition', 'écologique'],
    buttons: [{ href: '/', label: 'Mentions légales / Confidentialité' }],
    organizationDetails: {
      beforeLink: 'Mon Devis Sans Oublis est un service public conçu par la ',
      link: {
        text: "Direction générale de l'aménagement, du logement et de la nature (DGALN)",
        url: 'https://www.ecologie.gouv.fr/direction-generale-lamenagement-du-logement-et-nature-dgaln-0',
      },
      afterLink: ' en partenariat avec le programme ',
      betaGouv: {
        text: 'beta.gouv',
        url: 'https://beta.gouv.fr/',
      },
      finalText:
        ". Mon Devis Sans Oublis est en phase d'expérimentation, n'hésitez pas à nous faire part de vos retours par mail à contact@mon-devis-sans-oublis.beta.gouv.fr",
    },
    organizationLink: '/',
    organizationName: 'Mon Devis Sans Oublis',
  },
};
