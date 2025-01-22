import { use } from 'react';

import { statService } from '@/lib/api';
import wording from '@/wording';

export default function Statistics() {
  const fetchStatistics = async () => {
    try {
      return await statService.getStats();
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return null;
    }
  };

  const statistics = use(fetchStatistics());

  if (!statistics) {
    return (
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container'>
          <h1 className='fr-mb-6w !text-[var(--text-title-grey)]'>
            {wording.statistics.title}
          </h1>
          <p>Une erreur est survenue lors du chargement des statistiques.</p>
        </div>
      </section>
    );
  }

  const processingTimeInMilliseconds =
    statistics.average_quote_check_processing_time;
  const processingTimeInSeconds = (processingTimeInMilliseconds / 1000).toFixed(
    2
  );

  const usageStats = [
    {
      value: statistics.unique_visitors_count,
      label: wording.statistics.visitors_label,
      subLabel: wording.statistics.visitors_sublabel,
    },
    {
      value: statistics.quote_checks_count,
      label: wording.statistics.quotes_label,
      subLabel: wording.statistics.quotes_sublabel,
    },
    {
      value: statistics.average_quote_check_errors_count,
      label: wording.statistics.errors_label,
      subLabel: wording.statistics.errors_sublabel,
      tag: wording.statistics.errors_tag,
    },
  ];

  const processingStats = [
    {
      value: `${processingTimeInSeconds} secondes`,
      label: wording.statistics.processing_time_label,
      subLabel: wording.statistics.processing_time_sublabel,
      tag: wording.statistics.processing_time_tag,
    },
    {
      value: `${statistics.average_quote_check_cost} €`,
      label: wording.statistics.cost_label,
      subLabel: wording.statistics.cost_sublabel,
      tag: wording.statistics.cost_tag,
    },
  ];

  const StatCard = ({
    value,
    label,
    subLabel,
    tag,
  }: {
    value: string;
    label: string;
    subLabel: string;
    tag?: string;
  }) => (
    <div className='border-top-grey border-left-grey border-right-grey border-bottom-grey-large p-8 w-full h-full flex flex-col items-center'>
      <h3>{value}</h3>
      <p className='fr-mb-1w'>{label}</p>
      <p>{subLabel}</p>
      {tag && <p className='text-xs uppercase text-[#666666]'>{tag}</p>}
    </div>
  );

  return (
    <section className='fr-container-fluid fr-py-10w'>
      <div className='fr-container [&_h2]:text-[var(--text-title-grey)] [&_h2]:mt-10'>
        <h1 className='fr-mb-6w !text-[var(--text-title-grey)]'>
          {wording.statistics.title}
        </h1>
        <h2 className='fr-mb-3w !text-[var(--text-title-grey)]'>
          {wording.statistics.title_usage}
        </h2>
        <div className='fr-grid-row fr-grid-row--gutters'>
          {usageStats.map((stat, index) => (
            <div key={index} className='fr-col-12 fr-col-md-4'>
              <StatCard {...stat} />
            </div>
          ))}
        </div>
        <h2 className='fr-mb-3w fr-mt-8w !text-[var(--text-title-grey)]'>
          {wording.statistics.title_processing}
        </h2>
        <div className='fr-grid-row fr-grid-row--gutters'>
          {processingStats.map((stat, index) => (
            <div key={index} className='fr-col-12 fr-col-md-4'>
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
