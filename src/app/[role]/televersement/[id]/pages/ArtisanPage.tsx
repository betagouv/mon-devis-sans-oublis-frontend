import { Badge, BadgeVariant } from '@/components';

export default function ArtisanPage() {
  return (
    <section className='fr-container-fluid fr-py-10w'>
      <div className='fr-container'>
        <div className='fr-grid-row'>
          <h1>Résultat de l’analyse</h1>
          <ul className='fr-raw-list fr-badges-group fr-mb-3w flex flex-wrap gap-4'>
            <li>
              <Badge label='Artisan' variant={BadgeVariant.BLUE_DARK} />
            </li>
            <li>
              <Badge label='Artisan' variant={BadgeVariant.GREY} />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
