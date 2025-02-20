import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import CommentErrorModal from './CommentErrorModal';
import { Category } from '@/types';

const meta = {
  title: 'Components/Modal/CommentErrorModal',
  component: CommentErrorModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Affiche ou cache la modale',
    },
    errorCategory: {
      control: 'radio',
      options: [Category.ADMIN, Category.GESTES],
      description: "Catégorie de l'erreur",
    },
    errorDetailsId: {
      control: 'text',
      description: "ID de l'erreur",
    },
    errorTitle: {
      control: 'text',
      description: "Titre de l'erreur",
    },
    // initialComment: {
    //   control: 'text',
    //   description: 'Commentaire initial (optionnel)',
    // },
  },
} satisfies Meta<typeof CommentErrorModal>;

export default meta;
type Story = StoryObj<typeof CommentErrorModal>;

export const Default: Story = {
  args: {
    errorCategory: Category.ADMIN,
    errorDetailsId: '123',
    errorSolution: "Solution de l'erreur",
    errorTitle: 'Erreur dans le calcul de la TVA',
    quoteCheckId: '456',
    isOpen: false,
    // initialComment: '',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    const handleClose = () => setIsOpen(false);
    const handleCommentSubmit = (
      comment: string,
      errorDetailsId: string,
      quoteCheckId: string
    ) => {
      console.log('Submit comment:', { comment, errorDetailsId, quoteCheckId });
      setIsOpen(false);
    };

    return (
      <>
        <button
          className='fr-btn fr-btn--primary'
          onClick={() => setIsOpen(true)}
        >
          Ouvrir la modale de commentaire
        </button>
        <CommentErrorModal
          {...args}
          isOpen={isOpen}
          onClose={handleClose}
          //   onSubmit={handleCommentSubmit}
        />
      </>
    );
  },
};

export const WithInitialComment: Story = {
  ...Default,
  args: {
    ...Default.args,
    // initialComment: 'Commentaire existant à modifier',
  },
};
