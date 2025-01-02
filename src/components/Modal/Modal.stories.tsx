import type { Meta, StoryObj } from '@storybook/react';
import Modal, { ModalPosition } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      control: 'radio',
      options: [ModalPosition.CENTER, ModalPosition.RIGHT],
    },
    isOpen: {
      control: 'boolean',
    },
    backButtonLabel: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const CenterModal: Story = {
  args: {
    backButtonLabel: 'Fermer',
    isOpen: true,
    position: ModalPosition.CENTER,
    children: <div className='p-4'>Contenu de la modale centrale</div>,
  },
};

export const RightModal: Story = {
  args: {
    backButtonLabel: 'Retour',
    isOpen: true,
    position: ModalPosition.RIGHT,
    children: <div className='p-4'>Contenu de la modale latérale</div>,
  },
};
