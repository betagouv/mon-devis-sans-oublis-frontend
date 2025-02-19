import { use } from 'react';

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

  return <EditClient deleteErrorReasons={deleteErrorReasons} params={params} />;
}
