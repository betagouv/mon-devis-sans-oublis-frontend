import { use } from 'react';

import { quoteService } from '@/lib/api';
import { TeleversementClient } from '@/page-sections';
import { Metadata } from '@/types';
import wording from '@/wording';

export default function Televersement({
  params: initialParams,
}: {
  params: Promise<{ profile: string }>;
}) {
  const params = use(initialParams);

  const fetchMetadata = async (): Promise<Metadata> => {
    try {
      return await quoteService.getQuoteMetadata();
    } catch (error) {
      console.error('Error fetching metadata:', error);
      return { aides: [], gestes: [] };
    }
  };

  const metadata = use(fetchMetadata());

  return (
    <>
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <div className='fr-grid-row fr-grid-row--center'>
            <div className='fr-col-12 fr-col-md-10 fr-col-lg-8'>
              <h1>{wording.upload.title_1}</h1>
              <TeleversementClient
                metadata={metadata}
                profile={params.profile}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
