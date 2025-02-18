import { Suspense } from 'react';

import { EditClient } from '@/page-sections';
import { quoteService } from '@/lib/api';

export default async function Modifier({
  params,
}: {
  params: { profile: string; quoteCheckId: string };
}) {
  if (!params.quoteCheckId) {
    return <p className='text-red-500'>Erreur : ID du devis manquant.</p>;
  }

  try {
    const deleteErrorReasons = await quoteService.getDeleteErrorDetailReasons();

    return (
      <Suspense fallback={<p>Chargement...</p>}>
        <EditClient deleteErrorReasons={deleteErrorReasons} params={params} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error in Modifier page:', error);
    return (
      <p className='text-red-500'>
        Une erreur est survenue lors du chargement de la page.
      </p>
    );
  }
}
