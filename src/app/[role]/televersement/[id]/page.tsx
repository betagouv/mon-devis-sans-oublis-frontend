export default async function Devis({
  params,
}: {
  params: { role: string; id: string };
}) {
  const { role, id } = await params;

  return (
    <div>
      <h1>Devis ID: {id}</h1>
      <h3>Role: {role}</h3>
    </div>
  );
}
