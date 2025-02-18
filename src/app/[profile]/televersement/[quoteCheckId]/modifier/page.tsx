import { use, Suspense } from 'react';

import { EditClient } from '@/page-sections';
import { quoteService } from '@/lib/api';

export default function Modifier({
  params: initialParams,
}: {
  params: Promise<{ profile: string; quoteCheckId: string }>;
}) {
  const params = use(initialParams);

  if (!params.quoteCheckId) {
    return <p className='text-red-500'>Erreur : ID du devis manquant.</p>;
  }

  const fetchDeleteErrorReasons = async () => {
    try {
      return await quoteService.getDeleteErrorDetailReasons();
    } catch (error) {
      console.error('Error fetching delete error reasons:', error);
      return [];
    }
  };

  const deleteErrorReasons = use(fetchDeleteErrorReasons());

  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <EditClient deleteErrorReasons={deleteErrorReasons} params={params} />
    </Suspense>
  );
}
