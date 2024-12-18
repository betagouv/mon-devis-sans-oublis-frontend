import { use } from 'react';

import {
  ArtisanPage,
  ConseillerPage,
  MandatairePage,
  ParticulierPage,
} from './pages';

export default function Devis({
  params: initialParams,
}: {
  params: Promise<{ id: string; role: string }>;
}) {
  const params = use(initialParams);

  return (
    <div>
      {/* <h1>Devis ID: {params.id}</h1>
      <h3>Role: {params.role}</h3> */}
      {params.role === 'artisan' && <ArtisanPage />}
      {params.role === 'conseiller' && <ConseillerPage />}
      {params.role === 'mandataire' && <MandatairePage />}
      {params.role === 'particulier' && <ParticulierPage />}
    </div>
  );
}
