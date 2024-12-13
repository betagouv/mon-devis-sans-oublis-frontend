import { use } from 'react';

export default function Devis({
  params: initialParams,
}: {
  params: Promise<{ id: string; role: string }>;
}) {
  const params = use(initialParams);

  return (
    <div>
      <h1>Devis ID: {params.id}</h1>
      <h3>Role: {params.role}</h3>
    </div>
  );
}
