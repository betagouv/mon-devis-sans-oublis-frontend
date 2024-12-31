'use client';

import { use, useEffect, useState } from 'react';

import InvalidQuote from './InvalidQuote';
import ValidQuote from './ValidQuote';
import { QuoteChecksId, Status, useDataContext } from '@/context';

export default function Devis({
  params: initialParams,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = use(initialParams);
  const { data } = useDataContext();

  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUrlCopied, setIsUrlCopied] = useState<boolean>(false);

  useEffect(() => {
    const fetchDevis = () => {
      const devis = data.find((devis) => devis.id === params.id);
      setCurrentDevis(devis || null);
      setIsLoading(false);
    };

    fetchDevis();
  }, [data, params.id]);

  if (isLoading) {
    return (
      <section className='fr-container-fluid fr-py-10w'>
        <div className='flex flex-col items-center justify-center'>
          <h1>Chargement du devis...</h1>
        </div>
      </section>
    );
  }

  if (!currentDevis) {
    return null;
  }

  const uploadedFileName = (
    localStorage.getItem('uploadedFileName') || ''
  ).substring(0, 20);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsUrlCopied(true);
  };

  const handleHelpClick = async (
    comment: string,
    errorId: string,
    isHelpful: boolean
  ) => {
    try {
      const response = await fetch(
        `/api/quote_checks/${currentDevis.id}/error_details/${errorId}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
          },
          body: JSON.stringify({
            comment: comment,
            is_helpful: isHelpful,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send feedback');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      throw error;
    }
  };

  return (
    <div className='fr-container-fluid fr-py-10w'>
      {currentDevis.status === Status.VALID ? (
        <ValidQuote uploadedFileName={uploadedFileName} />
      ) : (
        <InvalidQuote
          isUrlCopied={isUrlCopied}
          list={currentDevis.error_details}
          onCopyUrl={copyUrlToClipboard}
          onHelpClick={handleHelpClick}
          uploadedFileName={uploadedFileName}
        />
      )}
    </div>
  );
}
