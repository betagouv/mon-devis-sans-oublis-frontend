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
import { ErrorDetails, QuoteChecksId } from '@/types';

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

    try {
      // 1. Appel API pour la suppression
      console.log('📤 Envoi de la requête DELETE...');
      const response = await quoteService.deleteErrorDetail(
        quoteCheckId,
        errorDetailId,
        reason
      );

      console.log('📥 Réponse de la suppression:', response.status);

      if (!response.ok) {
        throw new Error(`❌ Suppression échouée côté API: ${response.status}`);
      }

      // 2. Attendre un peu avant de recharger (pour laisser le temps à l'API)
      console.log('⏳ Attente avant rechargement...');
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 3. Recharger le devis
      console.log('🔄 Rechargement du devis...');
      const updatedData = await quoteService.getQuote(quoteCheckId);
      console.log('📥 Données du devis reçues:', {
        errorCount: updatedData.error_details.length,
        deletedError: updatedData.error_details.find(
          (e: ErrorDetails) => e.id === errorDetailId
        ),
      });

      // 4. Mettre à jour l'état
      setCurrentDevis(updatedData);
      console.log('✅ État mis à jour avec les nouvelles données');
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de l'erreur:", error);

      // En cas d'erreur, recharger quand même les données
      console.log('🔄 Rechargement des données après erreur...');
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
      onDeleteErrorDetail={handleDeleteErrorDetail}
    />
  );
}
