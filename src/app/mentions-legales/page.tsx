export default function MentionsLegales() {
  return (
    <section className='fr-container-fluid fr-py-10w'>
      <div className='fr-container [&_h2]:text-[var(--text-title-grey)] [&_h2]:mt-10'>
        <h1 className='fr-mb-6w text-[var(--text-title-grey)]'>
          Mentions légales et Confidentialité
        </h1>
        <h2>Éditeur du site</h2>
        <p>Ministère de la Transition écologique (MTE)</p>
        <p>
          Direction générale de l’Aménagement, du Logement et de la Nature
          (DGALN)
        </p>
        <p>Tour Séquoia</p>
        <p>1 place Carpeaux, 92800 Puteaux, France</p>
        <h2>Directeur de publication</h2>
        <p>Monsieur Philippe MAZENC, directeur général de la DGALN</p>
        <h2>Prestataire d’hébergement</h2>
        <p>
          Notre serveur est géré par la société française{' '}
          <a href='https://scalingo.com/'>Scalingo</a> et est physiquement
          localisé en France. Voici la{' '}
          <a href='https://annuaire-entreprises.data.gouv.fr/entreprise/scalingo-808665483'>
            fiche entreprise
          </a>{' '}
          de Scalingo.
        </p>
        <h2>Conditions générales d’utilisation</h2>
        <p>
          <span className='font-bold'>Mon Devis Sans Oublis</span> est un
          service numérique de la Direction générale de l’aménagement, du
          logement et de la nature (DGALN).
        </p>
        <p>
          Mon Devis Sans Oublis est un service numérique permettant de
          pré-contrôler un devis de rénovation énergétique pour s’assurer qu’il
          contient toutes les informations nécessaires à son instruction.
        </p>
        <h2>Suivi et statistiques</h2>
        <p>
          Nous utilisons le traceur libre Matomo, via l'instance hébergée par
          les services de l'État sur stats.beta.gouv.fr. Ce suivi ne nécessite
          pas de bannière de consentement RGPD (dite "cookies").
        </p>
        <h2>Traitement des devis</h2>
        <p>
          Lorsque vous soumettez un devis sur Mon Devis Sans Oublis, voici ce
          qui se passe :
        </p>
        <p className='fr-mb-1w'>
          1. <span className='font-bold'>Réception et anonymisation</span> : Le
          devis est reçu par notre serveur. Nous récupérons le texte associé et
          l’anonymisons depuis nos propres serveurs.
        </p>
        <p className='fr-mb-1w'>
          2. <span className='font-bold'>Analyse</span> : Ensuite, nous
          utilisons les services de la société française{' '}
          <a href='https://mistral.ai/'>Mistral.ai</a> pour analyser les données
          anonymisées, identifier les gestes de travaux et les informations
          contenues dans le devis.
        </p>
        <p className='fr-mb-1w'>
          3. <span className='font-bold'>Conservation temporaire</span> : Nous
          conservons votre devis et vos corrections pendant 6 mois. Cela vous
          permet de corriger votre devis et d'y revenir ultérieurement si
          nécessaire. Cela nous permet également d’améliorer notre outil et sa
          fiabilité.
        </p>
        <p>
          4. <span className='font-bold'>Confidentialité</span> : Aucune donnée
          privée n’est partagée avec des tiers. Les données sont utilisées
          uniquement lors du pré-contrôle automatique du devis fait par Mon
          Devis Sans Oublis.
        </p>
        <h2>Partage des corrections</h2>
        <p>
          Les corrections sont privées et non indexées par les moteurs de
          recherche. Vous pouvez partager le lien avec un tiers, mais cette
          action relève de votre responsabilité.
        </p>
        <h2>Qui va avoir accès à ces données ?</h2>
        <p className='fr-mb-1w'>
          • Les membres de l’équipe de Mon Devis Sans Oublis pour une
          amélioration continue et le support utilisateur.
        </p>
        <p>
          • Les personnes avec qui vous partagez votre lien de correction. Le
          contenus du Devis n’est pas partagé mais uniquement les corrections à
          apporter, le nom de fichier ainsi que l’intitulé des gestes.
        </p>
      </div>
    </section>
  );
}
