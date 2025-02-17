import { Suspense } from 'react';

import { EditClient } from '@/page-sections';
import { quoteService } from '@/lib/api';

export default async function Modifier({
  params: initialParams,
}: {
  params: Promise<{ profile: string; quoteCheckId: string }>;
}) {
  // Attendre que `params` se résolve
  const params = await initialParams;

  if (!params.quoteCheckId) {
    return <p className='text-red-500'>Erreur : ID du devis manquant.</p>;
  }

  // ⚡️ Faire l'appel API côté serveur
  const deleteErrorReasons = await quoteService.getDeleteErrorDetailReasons();
  console.log(deleteErrorReasons);

  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <EditClient deleteErrorReasons={deleteErrorReasons} params={params} />
    </Suspense>
  );
}
