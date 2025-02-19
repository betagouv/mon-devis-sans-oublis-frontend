import { use } from 'react';

import { Notice } from '@/components';
import { quoteService } from '@/lib/api';
import { EditClient } from '@/page-sections';

export default function Modifier({
  params: initialParams,
}: {
  params: Promise<{ profile: string; quoteCheckId: string }>;
}) {
  const params = use(initialParams);

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
    <>
      <Notice
        className='fr-notice--warning'
        description='Vous pouvez supprimer des corrections.'
        title='Mode personnalisation activé'
      />
      <EditClient deleteErrorReasons={deleteErrorReasons} params={params} />
    </>
  );
}
