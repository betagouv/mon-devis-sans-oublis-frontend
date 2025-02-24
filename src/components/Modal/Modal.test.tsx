import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal, { ModalPosition } from './Modal';
import { createPortal } from 'react-dom';

// Mock des hooks et de createPortal
jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useIsDesktop: jest.fn(() => false),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((element) => element),
}));

describe('Modal', () => {
  const backButtonLabel = 'Back';
  const onClose = jest.fn();
  const children = (
    <>
      <button data-testid='first-button'>First</button>
      <button data-testid='last-button'>Last</button>
    </>
  );

  // Fonction utilitaire pour rendre le modal
  const renderModal = (
    isOpen: boolean,
    position: ModalPosition = ModalPosition.CENTER
  ) => {
    return render(
      <Modal
        backButtonLabel={backButtonLabel}
        isOpen={isOpen}
        onClose={onClose}
        position={position}
      >
        {children}
      </Modal>
    );
  };

  // Configuration avant chaque test
  beforeEach(() => {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(portalRoot);
  });

  // Nettoyage après chaque test
  afterEach(() => {
    const portalRoot = document.getElementById('modal-root');
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
    jest.clearAllMocks();
  });

  // Test 1: Le modal se rend correctement quand isOpen est true
  it('renders the modal when isOpen is true', async () => {
    renderModal(true);

    // Vérifie que le contenu du modal est rendu
    const modalContent = await screen.findByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();

    // Vérifie que le bouton de fermeture est rendu
    const closeButton = screen.getByTestId('modal-close-button');
    expect(closeButton).toBeInTheDocument();

    // Vérifie que les enfants sont rendus
    const firstButton = screen.getByTestId('first-button');
    const lastButton = screen.getByTestId('last-button');
    expect(firstButton).toBeInTheDocument();
    expect(lastButton).toBeInTheDocument();
  });

  // Test 2: Le modal ne se rend pas quand isOpen est false
  it('does not render the modal when isOpen is false', () => {
    renderModal(false);

    // Vérifie que le contenu du modal n'est pas rendu
    const modalContent = screen.queryByTestId('modal-content');
    expect(modalContent).not.toBeInTheDocument();
  });

  // Test 3: Le modal se ferme quand on clique à l'extérieur
  it('closes the modal when clicking outside', async () => {
    renderModal(true);

    // Attend que le modal soit rendu
    const modalOverlay = await screen.findByTestId('modal-overlay');
    expect(modalOverlay).toBeInTheDocument();

    // Clique à l'extérieur du contenu du modal
    await userEvent.click(modalOverlay);

    // Vérifie que la fonction onClose a été appelée
    expect(onClose).toHaveBeenCalled();
  });

  // Test 4: Le modal ne se ferme pas quand on clique à l'intérieur
  it('does not close the modal when clicking inside', async () => {
    renderModal(true);

    // Attend que le modal soit rendu
    const modalContent = await screen.findByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();

    // Clique à l'intérieur du contenu du modal
    await userEvent.click(modalContent);

    // Vérifie que la fonction onClose n'a pas été appelée
    expect(onClose).not.toHaveBeenCalled();
  });

  // Test 5: Le modal se ferme quand on appuie sur la touche Escape
  it('closes the modal when pressing the Escape key', async () => {
    renderModal(true);

    // Attend que le modal soit rendu
    const modalContent = await screen.findByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();

    // Appuie sur la touche Escape
    await userEvent.keyboard('{Escape}');

    // Vérifie que la fonction onClose a été appelée
    expect(onClose).toHaveBeenCalled();
  });

  // Test 6: Gère la navigation par tabulation
  it('handles tab navigation correctly', async () => {
    renderModal(true);

    // Attend que le modal soit rendu
    const modalContent = await screen.findByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();

    const closeButton = screen.getByTestId('modal-close-button');
    const firstButton = screen.getByTestId('first-button');
    const lastButton = screen.getByTestId('last-button');

    // Teste la navigation par tabulation
    closeButton.focus();
    await userEvent.tab();
    expect(document.activeElement).toBe(firstButton);
    await userEvent.tab();
    expect(document.activeElement).toBe(lastButton);
    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(firstButton);
  });

  // Test 7: Le modal se rend dans la bonne position
  it('renders in the right position', async () => {
    renderModal(true, ModalPosition.RIGHT);

    // Attend que le modal soit rendu
    const modalContent = await screen.findByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();

    // Attend que le modal soit complètement visible
    await waitFor(() => {
      expect(modalContent).toHaveClass('translate-x-0');
    });
  });

  // Test 8: Met à jour les attributs aria-hidden et inert correctement
  it('sets aria-hidden and inert attributes correctly', async () => {
    renderModal(true);

    // Attend que le modal soit rendu
    await screen.findByTestId('modal-content');

    // Vérifie que les éléments frères ont aria-hidden="true" et inert=""
    const siblingElements = Array.from(document.body.children).filter(
      (child) => child.id !== 'modal-root'
    );
    siblingElements.forEach((element) => {
      expect(element).toHaveAttribute('aria-hidden', 'true');
      expect(element).toHaveAttribute('inert', '');
    });
  });

  // Test 9: Le modal se démonte correctement
  it('unmounts correctly when isOpen becomes false', async () => {
    const { rerender } = renderModal(true);

    // Attend que le modal soit rendu
    const modalContent = await screen.findByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();

    // Ferme le modal
    rerender(
      <Modal
        backButtonLabel={backButtonLabel}
        isOpen={false}
        onClose={onClose}
        position={ModalPosition.CENTER}
      >
        {children}
      </Modal>
    );

    // Attend que le modal soit retiré
    await waitFor(() => {
      expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
    });
  });

  // Test 10: Nettoie les écouteurs d'événements lors du démontage
  it('cleans up event listeners when unmounted', async () => {
    const { unmount } = renderModal(true);

    // Attend que le modal soit rendu
    const modalContent = await screen.findByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();

    // Démonte le modal
    unmount();

    // Vérifie que les écouteurs d'événements sont nettoyés
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);
    expect(onClose).not.toHaveBeenCalled(); // onClose ne doit pas être appelé après le démontage
  });

  // Test 11: Ne rend pas le modal si portalElement est null
  it('does not render modal if portalElement is null', () => {
    // Simule createPortal pour retourner null quand l'élément portal est manquant
    (createPortal as jest.Mock).mockImplementation(() => null);

    renderModal(true);

    const modalContent = screen.queryByTestId('modal-content');
    expect(modalContent).not.toBeInTheDocument();

    // Réinitialise le mock de createPortal
    (createPortal as jest.Mock).mockImplementation((element) => element);
  });

  // Test 12: Met à jour le layout du modal quand isDesktop change
  it('updates modal layout when isDesktop changes', async () => {
    const { useIsDesktop } = require('@/hooks');

    // Rendu initial avec desktop = false
    const { rerender } = renderModal(true, ModalPosition.RIGHT);

    // Attend que le modal soit rendu
    const modalContent = await screen.findByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();

    // Change à desktop = true
    (useIsDesktop as jest.Mock).mockImplementation(() => true);

    // Re-rend le modal
    rerender(
      <Modal
        backButtonLabel={backButtonLabel}
        isOpen={true}
        onClose={onClose}
        position={ModalPosition.RIGHT}
      >
        {children}
      </Modal>
    );

    // Attend que le modal soit mis à jour
    await waitFor(() => {
      expect(modalContent).toHaveClass('w-[480px]');
    });
  });

  // Test 13: Cache le modal quand visibleClass est false
  it('hides modal when visibleClass is false', async () => {
    renderModal(false);

    // Attend que le modal soit retiré
    await waitFor(() => {
      expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
    });
  });

  // Test 14: Nettoie correctement lors du démontage (ligne 137)
  it('cleans up properly on unmount', async () => {
    // Crée un élément frère avant de rendre le modal
    const sibling = document.createElement('div');
    document.body.appendChild(sibling);

    const { unmount } = renderModal(true);

    // Attend que le modal soit rendu et vérifie que les attributs sont définis
    await screen.findByTestId('modal-content');
    await waitFor(() => {
      expect(sibling).toHaveAttribute('aria-hidden', 'true');
      expect(sibling).toHaveAttribute('inert', '');
    });

    // Ferme d'abord le modal
    renderModal(false);

    // Puis le démonte
    unmount();

    // Attend que le nettoyage soit terminé et vérifie que les attributs sont retirés
    await waitFor(
      () => {
        expect(sibling).not.toHaveAttribute('aria-hidden');
        expect(sibling).not.toHaveAttribute('inert');
      },
      { timeout: 1000 }
    );

    // Nettoyage
    document.body.removeChild(sibling);
  });

  // Test 15: Retourne null quand le modal n'est pas monté (ligne 77)
  it('returns null when not mounted', () => {
    // Mock useEffect pour ne pas exécuter le code de montage
    jest.spyOn(React, 'useEffect').mockImplementation(() => {});

    const { container } = render(
      <Modal
        backButtonLabel={backButtonLabel}
        isOpen={true}
        onClose={onClose}
        position={ModalPosition.CENTER}
      >
        {children}
      </Modal>
    );

    // Vérifie que le composant retourne null
    expect(container.firstChild).toBeNull();

    // Restaure le mock original
    jest.restoreAllMocks();
  });

  // Test for line 77: Explicitly test mounting behavior
  it('handles mounting state correctly', async () => {
    const { rerender } = renderModal(false);

    // Start with modal closed
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();

    // Open modal
    rerender(
      <Modal
        backButtonLabel={backButtonLabel}
        isOpen={true}
        onClose={onClose}
        position={ModalPosition.CENTER}
      >
        {children}
      </Modal>
    );

    // Verify modal appears
    await waitFor(() => {
      expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    });
  });

  // Test for lines 93-94, 98-99: Focus management
  it('manages focus correctly', async () => {
    renderModal(true);

    const modalContent = await screen.findByTestId('modal-content');
    const closeButton = screen.getByTestId('modal-close-button');
    const firstButton = screen.getByTestId('first-button');
    const lastButton = screen.getByTestId('last-button');

    // Explicitly focus the close button
    closeButton.focus();
    expect(document.activeElement).toBe(closeButton);

    // Test tab navigation within modal
    await userEvent.tab();
    expect(document.activeElement).toBe(firstButton);
    await userEvent.tab();
    expect(document.activeElement).toBe(lastButton);
    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(firstButton);
  });

  // Test for line 137: Cleanup of sibling elements
  it('properly cleans up sibling elements on unmount', async () => {
    // Create multiple sibling elements
    const siblings = Array.from({ length: 3 }, () => {
      const el = document.createElement('div');
      document.body.appendChild(el);
      return el;
    });

    const { unmount } = renderModal(true);
    await screen.findByTestId('modal-content');

    // Verify attributes are set
    siblings.forEach((sibling) => {
      expect(sibling).toHaveAttribute('aria-hidden', 'true');
      expect(sibling).toHaveAttribute('inert', '');
    });

    unmount();

    // Verify cleanup
    await waitFor(() => {
      siblings.forEach((sibling) => {
        expect(sibling).not.toHaveAttribute('aria-hidden');
        expect(sibling).not.toHaveAttribute('inert');
      });
    });

    // Cleanup
    siblings.forEach((sibling) => document.body.removeChild(sibling));
  });

  // Test spécifique pour la ligne 77 (mounted state)
  it('handles initial mounting state', () => {
    // Supprimer le portal root existant
    const existingPortalRoot = document.getElementById('modal-root');
    if (existingPortalRoot) {
      document.body.removeChild(existingPortalRoot);
    }

    // Mock createPortal pour retourner null
    (createPortal as jest.Mock).mockImplementationOnce(() => null);

    const { container } = renderModal(true);
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  // Test spécifique pour les lignes 93-94, 98-99 (focus trap)
  it('handles keyboard navigation at boundaries', async () => {
    renderModal(true);
    await screen.findByTestId('modal-content');

    const closeButton = screen.getByTestId('modal-close-button');
    const firstButton = screen.getByTestId('first-button');
    const lastButton = screen.getByTestId('last-button');

    // Test Shift+Tab sur le premier élément (lignes 93-94)
    firstButton.focus();
    fireEvent.keyDown(firstButton, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(firstButton);

    // Test Tab sur le dernier élément (lignes 98-99)
    lastButton.focus();
    fireEvent.keyDown(lastButton, { key: 'Tab' });
    expect(document.activeElement).toBe(lastButton);
  });

  // Test spécifique pour la ligne 137 (nettoyage des attributs aria-hidden)
  it('handles aria-hidden cleanup correctly', async () => {
    // Créer des éléments avec des valeurs aria-hidden existantes
    const elements = Array.from({ length: 3 }, () => {
      const el = document.createElement('div');
      document.body.appendChild(el);
      return el;
    });

    // Définir des valeurs aria-hidden initiales différentes
    elements[0].setAttribute('aria-hidden', 'true');
    elements[1].setAttribute('aria-hidden', 'false');
    // elements[2] n'a pas d'attribut aria-hidden

    const { unmount } = renderModal(true);
    await screen.findByTestId('modal-content');

    // Vérifier que tous les éléments ont aria-hidden="true"
    elements.forEach((el) => {
      expect(el).toHaveAttribute('aria-hidden', 'true');
    });

    // Démonter le modal
    unmount();

    // Vérifier que les attributs sont restaurés correctement
    expect(elements[0]).toHaveAttribute('aria-hidden', 'true');
    expect(elements[1]).toHaveAttribute('aria-hidden', 'false');
    expect(elements[2]).not.toHaveAttribute('aria-hidden');

    // Nettoyage
    elements.forEach((el) => document.body.removeChild(el));
  });
});
