import type { Meta, StoryObj } from '@storybook/react';

import { Category, Type } from '@/context';
import QuoteErrorCard from './QuoteErrorCard';

const meta: Meta<typeof QuoteErrorCard> = {
  title: 'Components/QuoteErrorCard',
  component: QuoteErrorCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QuoteErrorCard>;

const dataSingleCategory = [
  {
    id: '1',
    category: Category.ADMIN,
    type: Type.MISSING,
    code: 'devis_manquant',
    title: 'Le terme “devis” doit être indiqué clairement',
    provided_value: null,
    modalContent: {
      buttonBackText: 'Retour',
      buttonContactText: 'Nous contacter',
      code: 'devis_manquant',
      correctionHelpful: 'Cette correction vous a-t-elle aidé ?',
      iconAlt: 'Icône de correction',
      iconSrc: '/images/quote_correction_details.png',
      isOpen: false,
      title: 'Détails de la correction',
      problem: {
        title: 'Problème identifié',
        description: 'Le terme “devis” est absent du document.',
      },

      solution: {
        title: 'Solution',
        description: 'Ajoutez le terme “devis” au document.',
      },
    },
  },
  {
    id: '2',
    category: Category.ADMIN,
    type: Type.WRONG,
    code: 'siret_manquant',
    title: 'Il manque votre n° de SIRET (14 chiffres)',
    provided_value: '',
    modalContent: {
      buttonBackText: 'Retour',
      buttonContactText: 'Nous contacter',
      correctionHelpful: 'Cette correction vous a-t-elle aidé ?',
      iconAlt: 'Icône de correction',
      iconSrc: '/images/quote_correction_details.png',
      isOpen: false,
      title: 'Détails pour le n° de SIRET',
      problem: {
        title: 'Problème identifié',
        description: 'Le numéro SIRET est manquant ou incorrect.',
      },
      solution: {
        title: 'Solution',
        description: 'Ajoutez un numéro SIRET valide (14 chiffres).',
      },
    },
  },
];

export const Default: Story = {
  render: () => (
    <div className='flex flex-col'>
      <QuoteErrorCard
        cardTitle='Mentions administratives'
        cardTooltip='Les mentions administratives sont communes à tous les postes de travaux. Elles sont obligatoires pour les obtentions d’aides financières.'
        list={dataSingleCategory}
      />
    </div>
  ),
};

const dataMultipleCategories = [
  {
    id: '1',
    code: 'date_chantier_manquant',
    type: 'missing',
    title: 'Nous recommandons de mettre la date de début de chantier prévue.',
    problem: null,
    category: 'admin',
    solution: null,
    provided_value: null,
  },
  {
    id: '2',
    code: 'date_pre_visite_manquant',
    type: 'wrong',
    title:
      'La date de pré visite technique est fortement recommandée, notamment dans le cadre des CEE.',
    problem: null,
    category: 'admin',
    solution: null,
    provided_value: null,
  },
  {
    id: '3',
    code: 'pro_raison_sociale_manquant',
    type: 'missing',
    title: 'Le nom de votre structure doit être mentionné.',
    problem: null,
    category: 'admin',
    solution: null,
    provided_value: null,
  },
  {
    id: '4',
    code: 'client_prenom_manquant',
    type: 'wrong',
    title: 'Le prénom du client est requis.',
    problem: null,
    category: 'admin',
    solution: null,
    provided_value: null,
  },
  {
    id: '5',
    code: 'client_nom_manquant',
    type: 'wrong',
    title: 'Le nom du client est requis',
    problem: null,
    category: 'admin',
    solution: null,
    provided_value: null,
  },
  {
    id: '6',
    code: 'client_adresse_manquant',
    type: 'missing',
    title: "L'adresse du client doit être indiquée.",
    problem: null,
    category: 'admin',
    solution: null,
    provided_value: null,
  },
  {
    id: '7',
    code: 'pac_cop_chauffage_manquant',
    type: 'missing',
    title:
      "Le coefficient de performance de la Pompe à chaleur doit être indiqué. Il n'y a pas d'unité.",
    problem: null,
    category: 'gestes',
    solution: null,
    provided_value:
      'Pompe à chaleur AIR/EAU - moyenne température - Atlantic Alféa Extensa A.I. 8 R32',
  },
  {
    id: '8',
    code: 'eau_chaude_etas_manquant',
    type: 'missing',
    title:
      "L'éfficacité énergétique saisonière (ETAS) du chauffe eau doit être précisée. Il s'agit d'un pourcentage.",
    problem: null,
    category: 'gestes',
    solution: null,
    provided_value:
      'Chauffe eau Thermodynamique Atlantic Calypso connecté 200L',
  },
  {
    id: '9',
    code: 'chauffe_eau_thermodynamique_type_installation_manquant',
    type: 'wrong',
    title:
      'Le chauffe-eau thermodynamique est-il sur air extérieur, sur air extrait ou sur air ambiant?',
    problem: null,
    category: 'gestes',
    solution: null,
    provided_value:
      'Chauffe eau Thermodynamique Atlantic Calypso connecté 200L',
  },
];

const mapErrorsToQuoteErrorCard = (errors: typeof dataMultipleCategories) => {
  return errors.map((error) => ({
    id: error.id,
    category: error.category as Category,
    type: error.type as Type,
    code: error.code,
    title: error.title,
    provided_value: error.provided_value || '',
    modalContent: {
      buttonBackText: 'Retour',
      buttonContactText: 'Nous contacter',
      code: error.code,
      correctionHelpful: 'Cette correction vous a-t-elle aidé ?',
      iconAlt: 'Icône de correction',
      iconSrc: '/images/quote_correction_details.png',
      isOpen: false,
      title: error.title,
      problem: {
        title: 'Problème identifié',
        description: error.problem,
      },
      solution: {
        title: 'Solution',
        description: error.solution,
      },
    },
  }));
};

const adminErrors = mapErrorsToQuoteErrorCard(
  dataMultipleCategories.filter((error) => error.category === Category.ADMIN)
);

const gestesErrors = mapErrorsToQuoteErrorCard(
  dataMultipleCategories.filter((error) => error.category === Category.GESTES)
);

export const MultipleCategories: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <QuoteErrorCard
        cardTitle='Mentions administratives'
        cardTooltip='Les mentions administratives sont communes à tous les postes de travaux. Elles sont obligatoires pour les obtentions d’aides financières.'
        list={adminErrors}
      />
      <QuoteErrorCard
        cardTitle='Descriptif technique des gestes'
        cardTooltip='Les gestes correspondent aux normes et au matériel des critères techniques. Certaines informations sont à mentionner obligatoirement pour l’obtention des aides.'
        list={gestesErrors}
      />
    </div>
  ),
};
