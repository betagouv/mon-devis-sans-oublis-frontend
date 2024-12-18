import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import QuoteErrorCard, { QuoteErrorCardProps } from './QuoteErrorCard';

// Mock Modal component
jest.mock('../Modal/Modal', () => ({
  __esModule: true,
  default: jest.fn(({ isOpen, onClose }) =>
    isOpen ? (
      <div>
        <div>Mock Modal Content</div>
        <button onClick={onClose}>Close Modal</button>
      </div>
    ) : null
  ),
}));

describe('QuoteErrorCard Component', () => {
  const mockList: QuoteErrorCardProps['list'] = [
    {
      id: 1,
      title: 'Le terme “devis” doit être indiqué clairement',
      info: 'Information manquante',
      infoIcon: 'fr-icon-warning-line',
      modalContent: {
        buttonBackText: 'Retour',
        buttonContactText: 'Nous contacter',
        correctionHelpful: 'Cette correction vous a-t-elle aidé ?',
        iconAlt: 'Icône de correction',
        iconSrc: '/images/quote_correction_details.png',
        isOpen: false,
        onClose: jest.fn(),
        problem: {
          title: 'Problème identifié',
          description: 'Le terme “devis” est absent du document.',
        },
        solution: {
          title: 'Solution',
          description: 'Ajoutez le terme “devis” au document.',
        },
        title: 'Détails de la correction',
      },
    },
  ];

  it('closes the modal when onClose is called', async () => {
    render(<QuoteErrorCard list={mockList} />);

    // Get the button to open the modal
    const button = screen.getByText('Voir le détail');
    fireEvent.click(button);

    // Check if modal content appears
    await waitFor(() => {
      expect(screen.getByText('Mock Modal Content')).toBeInTheDocument();
    });

    // Close the modal
    const closeButton = screen.getByText('Close Modal');
    fireEvent.click(closeButton);

    // Check if modal content is removed
    await waitFor(() => {
      expect(screen.queryByText('Mock Modal Content')).not.toBeInTheDocument();
    });
  });
});
