import { use } from 'react';

import { Notice } from '@/components';
import { quoteService } from '@/lib/api';
import { UploadClient } from '@/page-sections';
import { Metadata } from '@/types';
import wording from '@/wording';

export default function Upload({
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
      <Notice
        className='fr-notice--info'
        description={wording.layout.notice.description}
        title={wording.layout.notice.title}
      />
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <div className='fr-grid-row fr-grid-row--center'>
            <div className='fr-col-12 fr-col-md-10 fr-col-lg-8'>
              <h1>{wording.upload.title}</h1>
              <UploadClient metadata={metadata} profile={params.profile} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
