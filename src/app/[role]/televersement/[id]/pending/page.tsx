'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Status, useDataContext } from '@/context';
import wording from '@/wording';

export default function Pending() {
  const router = useRouter();
  const [dots, setDots] = useState<string>('');

  const { data, setData } = useDataContext();

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout | null = null;

    const animateDots = () => {
      dotsInterval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : '')); // Add a dot or reset
      }, 500); // Change the dots every 500ms
    };

    animateDots();

    // Cleanup the interval
    return () => {
      if (dotsInterval) clearInterval(dotsInterval);
    };
  }, []);

  useEffect(() => {
    let fetchInterval: NodeJS.Timeout | null = null;

    const fetchAndUpdateData = async () => {
      if (data?.id) {
        try {
          const response = await fetch(`/api/quote_checks/${data.id}`, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
            },
          });

          if (!response.ok) {
            console.error(
              'Response not OK:',
              response.status,
              response.statusText
            );
            throw new Error('Failed to fetch quote data');
          }

          const updatedData = await response.json();
          setData(updatedData);
          localStorage.setItem('quoteCheckData', JSON.stringify(updatedData));

          // Stop fetching and redirect if status is no longer "pending"
          if (updatedData.status !== Status.PENDING) {
            if (fetchInterval) clearInterval(fetchInterval);
            router.push(
              `/${updatedData.profile}/televersement/${updatedData.id}`
            );
          }
        } catch (error) {
          console.error('Error in GET request:', error);
        }
      }
    };

    // Start periodic API calls if status is "pending"
    if (data?.status === Status.PENDING) {
      fetchInterval = setInterval(fetchAndUpdateData, 5000); // Calls every 5 seconds
    }

    // Cleanup the interval
    return () => {
      if (fetchInterval) clearInterval(fetchInterval);
    };
  }, [data?.id, data?.status, setData, router]);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-xl font-semibold text-gray-800 mb-4'>
        <span>{wording.pending_page.title}</span>
        <span className='inline-block w-8 text-left'>{dots}</span>
      </h1>
      <p className='text-gray-600 mb-6'>{wording.pending_page.description}</p>
    </div>
  );
}
