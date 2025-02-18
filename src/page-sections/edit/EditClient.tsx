'use client';

import { useEffect, useState } from 'react';

import { quoteService } from '@/lib/api';
import { ResultClient } from '@/page-sections';
import { QuoteChecksId } from '@/types';
import { LoadingDots } from '@/components';
import wording from '@/wording';

export default function EditClient({
  deleteErrorReasons,
  params,
}: {
  deleteErrorReasons?: { id: string; label: string }[];
  params: { profile: string; quoteCheckId: string };
}) {
  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentDevis = async () => {
      try {
        const data = await quoteService.getQuote(params.quoteCheckId);
        setCurrentDevis(data);
      } catch (error) {
        console.error('Error fetching devis:', error);
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
    if (!currentDevis) return;

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
      const response = await quoteService.deleteErrorDetail(
        quoteCheckId,
        errorDetailId,
        reason
      );
      if (!response.ok) {
        throw new Error(`Suppression échouée côté API: ${response.status}`);
      }

      const updatedData = await quoteService.getQuote(quoteCheckId);
      setCurrentDevis(updatedData);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'erreur:", error);

      const data = await quoteService.getQuote(quoteCheckId);
      setCurrentDevis(data);
    }
  };

  if (isLoading) {
    return (
      <section className='fr-container-fluid fr-py-10w h-[500px] flex flex-col items-center justify-center'>
        <LoadingDots title={wording.page_upload_id.analysis_redirect_title} />
        <p>{wording.page_upload_id.analysis_redirect}</p>
      </section>
    );
  }

  return (
    <ResultClient
      canDelete={true}
      currentDevis={currentDevis}
      deleteErrorReasons={deleteErrorReasons}
      onDeleteErrorDetail={handleDeleteErrorDetail}
      profile={params.profile}
      quoteCheckId={params.quoteCheckId}
    />
  );
}
