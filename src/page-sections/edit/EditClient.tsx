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
    reason: string
  ) => {
    console.log(
      '🔍 DEBUG handleDeleteErrorDetail - Avant suppression:',
      errorDetailId
    );
    if (!currentDevis) return;

    // Mise à jour immédiate de l'état : suppression locale de l'erreur
    setCurrentDevis((prevDevis) => {
      if (!prevDevis) return null;
      return {
        ...prevDevis,
        error_details: prevDevis.error_details.filter(
          (error) => error.id !== errorDetailId
        ),
      };
    });

    try {
      console.log('🔄 Suppression en cours...');
      const response = await quoteService.deleteErrorDetail(
        quoteCheckId,
        errorDetailId,
        reason
      );
      if (!response.ok) {
        throw new Error(`❌ Suppression échouée côté API: ${response.status}`);
      }
      console.log('✅ Suppression confirmée par API');
      // Recharger les données pour être sûr que l'état est cohérent
      const updatedData = await quoteService.getQuote(quoteCheckId);
      setCurrentDevis(updatedData);
      console.log('✅ État mis à jour avec les nouvelles données depuis API');
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de l'erreur:", error);
      // En cas d'erreur, refetch les données
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
