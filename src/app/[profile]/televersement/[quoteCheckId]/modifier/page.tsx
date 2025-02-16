// import { use, useEffect, useState } from 'react';

// import { quoteService } from '@/lib/api';
// import { ResultClient } from '@/page-sections';
// import { QuoteChecksId } from '@/types';

// export default function Modifier({
//   params: initialParams,
// }: {
//   params: Promise<{ profile: string; quoteCheckId: string }>;
// }) {
//   const params = use(initialParams);
//   const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);

//   const fetchCurrentDevis = async () => {
//     try {
//       const data = await quoteService.getQuote(params.quoteCheckId);
//       setCurrentDevis(data);
//     } catch (error) {
//       console.error('Error fetching devis:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentDevis();
//   }, [params.quoteCheckId]); // 🔹 Re-fetch quand l'ID change

//   return (
//     <ResultClient
//       currentDevis={currentDevis}
//       profile={params.profile}
//       quoteCheckId={params.quoteCheckId}
//     />
//   );
// }

import { Suspense } from 'react';

import { EditClient } from '@/page-sections';

export default async function Modifier({
  params: initialParams,
}: {
  params: Promise<{ profile: string; quoteCheckId: string }>;
}) {
  // Attendre que la promesse `params` se résolve
  const params = await initialParams;

  console.log('Modifier.tsx - params:', params);

  if (!params.quoteCheckId) {
    return <p className='text-red-500'>Erreur : ID du devis manquant.</p>;
  }

  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <EditClient params={params} />
    </Suspense>
  );
}
