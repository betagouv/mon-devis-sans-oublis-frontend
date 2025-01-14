export default function Accessibilite() {
  return (
    <section className='fr-container-fluid fr-py-10w'>
      <div className='fr-container'>
        <h1 className='fr-mb-6w text-[var(--text-title-grey)]'>
          Accessibilité
        </h1>
        <p>
          L'interface <span className='font-bold'>Mon Devis Sans Oublis</span>{' '}
          respecte au mieux les principes d'accessibilité de base du Web :
          balises HTML sémantiques, textes et icônes contrastés, hierarchie des
          titres des pages, accessibilité des formulaires, conception pour
          mobile d'abord, textes alternatifs pour les images, etc.
        </p>
        <p>
          Cependant, le site est récent, en phase de développement, il n'a donc
          pas encore été audité pour tester son respect des exigences du{' '}
          <a href='https://accessibilite.numerique.gouv.fr/'>
            référentiel public d'accessibilité RGAA
          </a>
          , d'où la mention "non conforme" dans le pied de page.
        </p>
        <p>
          Nous n'avons pas non plus testé le site avec des utilisateurs dans une
          optique d'accessibilité.
        </p>
        <p>
          Le code du site, incluant le{' '}
          <a href='https://github.com/betagouv/mon-devis-sans-oublis-backend'>
            backend
          </a>{' '}
          et le{' '}
          <a href='https://github.com/betagouv/mon-devis-sans-oublis-frontend'>
            frontend
          </a>
          , est entièrement public, n'hésitez pas à nous faire des retours.
        </p>
      </div>
    </section>
  );
}
