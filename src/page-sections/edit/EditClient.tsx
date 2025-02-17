// 'use client';

// import { useEffect, useState } from 'react';
// import { quoteService } from '@/lib/api';
// import { ResultClient } from '@/page-sections';
// import { QuoteChecksId } from '@/types';

// export default function EditClient({
//   params,
//   deleteErrorReasons,
// }: {
//   params: { profile: string; quoteCheckId: string };
//   deleteErrorReasons?: { id: string; label: string }[];
// }) {
//   const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCurrentDevis = async () => {
//       try {
//         const data = await quoteService.getQuote(params.quoteCheckId);
//         setCurrentDevis(data);
//       } catch (error) {
//         console.error('Error fetching devis:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCurrentDevis();
//   }, [params.quoteCheckId]);

//   if (isLoading) {
//     return <p>Chargement en cours...</p>;
//   }

//   return (
//     <ResultClient
//       currentDevis={currentDevis}
//       deleteErrorReasons={deleteErrorReasons}
//       profile={params.profile}
//       quoteCheckId={params.quoteCheckId}
//     />
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { quoteService } from '@/lib/api';
import { ResultClient } from '@/page-sections';
import { QuoteChecksId } from '@/types';

export default function EditClient({
  params,
  deleteErrorReasons,
}: {
  params: { profile: string; quoteCheckId: string };
  deleteErrorReasons?: { id: string; label: string }[];
}) {
  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentDevis = async () => {
      try {
        const data = await quoteService.getQuote(params.quoteCheckId);
        setCurrentDevis(data);
      } catch (error) {
        console.error('❌ Error fetching devis:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentDevis();
  }, [params.quoteCheckId]);

  // ✅ Fonction pour supprimer une erreur
  const handleDeleteErrorDetail = async (
    quoteCheckId: string,
    errorDetailId: string,
    reason?: string
  ) => {
    if (!currentDevis) return;

    console.log('🚀 Début de la suppression:', {
      quoteCheckId,
      errorDetailId,
      reason,
    });

    // Mise à jour optimiste de l'UI
    setCurrentDevis((prevDevis) =>
      prevDevis
        ? {
            ...prevDevis,
            error_details: prevDevis.error_details.filter(
              (error) => error.id !== errorDetailId
            ),
          }
        : null
    );

    try {
      // Attendre la réponse de l'API avant de continuer
      console.log('📡 Appel API deleteErrorDetail avec:', {
        quoteCheckId,
        errorDetailId,
        reason,
      });

      const success = await quoteService.deleteErrorDetail(
        quoteCheckId,
        errorDetailId,
        reason
      );

      if (!success) {
        throw new Error('❌ Suppression échouée côté API');
      }

      console.log('✅ Suppression réussie côté API');
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de l'erreur:", error);

      console.log('🔄 Rechargement des données...');
      const data = await quoteService.getQuote(quoteCheckId);
      setCurrentDevis(data);
    }
  };

  if (isLoading) {
    return <p>📥 Chargement en cours...</p>;
  }

  return (
    <ResultClient
      canDelete={true}
      currentDevis={currentDevis}
      deleteErrorReasons={deleteErrorReasons}
      profile={params.profile}
      quoteCheckId={params.quoteCheckId}
      onDeleteErrorDetail={handleDeleteErrorDetail} // 🔥 Passer la fonction au composant enfant
    />
  );
}
