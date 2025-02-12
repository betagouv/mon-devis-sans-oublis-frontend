import type { Meta, StoryObj } from '@storybook/react';

import QuoteErrorTable from './QuoteErrorTable';
import { Category } from '@/types';

const meta: Meta<typeof QuoteErrorTable> = {
  title: 'Components/QuoteErrorTable',
  component: QuoteErrorTable,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QuoteErrorTable>;

const errorDetails = [
  {
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-1',
    code: 'date_chantier_manquant',
    type: 'warning',
    title:
      "La date prévue de début de chantier n'est pas présente, elle est cependant recommandée",
    category: 'admin',
  },
  {
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-1',
    code: 'date_chantier_manquant',
    type: 'warning',
    title:
      "La date prévue de début de chantier n'est pas présente, elle est cependant recommandée",
    category: 'admin',
  },
  {
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-1',
    code: 'date_chantier_manquant',
    type: 'warning',
    title:
      "La date prévue de début de chantier n'est pas présente, elle est cependant recommandée",
    category: 'admin',
  },
  {
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-2',
    code: 'menuiserie_type_vitrage_manquant',
    type: 'missing',
    title: 'Le type de vitrage est manquant',
    category: 'gestes',
    geste_id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-8',
    solution: 'Le vitrage est-il un simple ou un double vitrage ?',
    provided_value: 'Châssis composé - entree',
  },
  {
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-3',
    code: 'menuiserie_ud_porte_manquant',
    type: 'missing',
    title:
      "Le coefficient de transmission thermique (en W/m2⋅K) de la porte ou de la porte-fenêtre n'est pas indiqué",
    category: 'gestes',
    geste_id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-8',
    provided_value: 'Châssis composé - entree',
  },
  {
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-4',
    code: 'menuiserie_type_materiau_manquant',
    type: 'missing',
    title: "Le matériau des montants n'est pas précisé",
    category: 'gestes',
    geste_id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-9',
    solution: 'Les montants peuvent être par exemple en bois, alu,pvc ...',
    provided_value: 'VR ext. DECO, lame ALU 37mm, manœuvre solaire - sdb',
  },
  {
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-5',
    code: 'menuiserie_localisation_manquant',
    type: 'missing',
    title: 'La pièce dans laquelle est installée la menuiserie est manquante',
    category: 'gestes',
    geste_id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-9',
    provided_value: 'VR ext. DECO, lame ALU 37mm, manœuvre solaire - sdb',
  },
  {
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-6',
    code: 'menuiserie_type_materiau_manquant',
    type: 'missing',
    title: "Le matériau des montants n'est pas précisé",
    category: 'gestes',
    geste_id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-10',
    solution: 'Les montants peuvent être par exemple en bois, alu,pvc ...',
    provided_value: 'VR ext. DECO, lame ALU 37mm, manœuvre solaire - ch1',
  },
  {
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-7',
    code: 'menuiserie_localisation_manquant',
    type: 'missing',
    title: 'La pièce dans laquelle est installée la menuiserie est manquante',
    category: 'gestes',
    geste_id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-10',
    provided_value: 'VR ext. DECO, lame ALU 37mm, manœuvre solaire - ch1',
  },
  {
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-8',
    code: 'menuiserie_type_materiau_manquant',
    type: 'missing',
    title: "Le matériau des montants n'est pas précisé",
    category: 'gestes',
    geste_id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-11',
    solution: 'Les montants peuvent être par exemple en bois, alu,pvc ...',
    provided_value: 'VR ext. DECO, lame ALU 37mm, manœuvre solaire - ch2',
  },
  {
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-9',
    code: 'menuiserie_localisation_manquant',
    type: 'missing',
    title: 'La pièce dans laquelle est installée la menuiserie est manquante',
    category: 'gestes',
    geste_id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-11',
    provided_value: 'VR ext. DECO, lame ALU 37mm, manœuvre solaire - ch2',
  },
];

const gestes = [
  {
    intitule: 'Fenêtre 1 vantail soufflet - sous sol',
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-1',
    valid: true,
  },
  {
    intitule: 'Fenêtre 1 vantail soufflet - cuisine',
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-2',
    valid: true,
  },
  {
    intitule: 'Fenêtre Fixe - cuisine',
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-3',
    valid: true,
  },
  {
    intitule: 'Fenêtre Fixe - salon',
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-4',
    valid: true,
  },
  {
    intitule: 'Fenêtre 1 vantail oscillo-battant - sdb',
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-5',
    valid: true,
  },
  {
    intitule: 'Fenêtre 1 vantail oscillo-battant - ch1',
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-6',
    valid: true,
  },
  {
    intitule: 'Fenêtre 1 vantail oscillo-battant - ch2',
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-7',
    valid: true,
  },
  {
    intitule: 'Châssis composé - entree',
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-8',
    valid: false,
  },
  {
    intitule: 'VR ext. DECO, lame ALU 37mm, manœuvre solaire - sdb',
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-9',
    valid: false,
  },
  {
    intitule: 'VR ext. DECO, lame ALU 37mm, manœuvre solaire - ch1',
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-10',
    valid: false,
  },
  {
    intitule: 'VR ext. DECO, lame ALU 37mm, manœuvre solaire - ch2',
    id: 'fe465a99-5a7e-406e-bc7d-c8a0baff7385-geste-11',
    valid: false,
  },
];

const mockOnHelpClick = (comment: string | null, errorDetailsId: string) => {
  console.log('Help clicked:', { comment, errorDetailsId });
};

export const Admin: Story = {
  render: () => (
    <QuoteErrorTable
      category={Category.ADMIN}
      errorDetails={errorDetails}
      onHelpClick={mockOnHelpClick}
    />
  ),
};

export const Gestes: Story = {
  render: () => (
    <QuoteErrorTable
      category={Category.GESTES}
      errorDetails={errorDetails}
      gestes={gestes}
      onHelpClick={mockOnHelpClick}
    />
  ),
};
