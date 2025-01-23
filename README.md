# Mon Devis Sans Oublis - Frontend

## Configuration de l'environnement

### Variables d'environnement requises

Avant de lancer l'application, créez un fichier `.env` à la racine du projet avec les variables d'environnement suivantes :

```bash copy
- NEXT_PUBLIC_API_AUTH
- NEXT_PUBLIC_API_QUOTE_CHECKS
- NEXT_PUBLIC_API_QUOTE_CHECKS_ID
- NEXT_PUBLIC_API_QUOTE_CHECKS_ID_FEEDBACKS
- NEXT_PUBLIC_API_QUOTE_CHECKS_ID_ERROR_DETAILS_ID_FEEDBACKS
- NEXT_PUBLIC_API_QUOTE_CHECKS_METADATA
- NEXT_PUBLIC_API_STATS
- NEXT_PUBLIC_SENTRY_DSN
- NEXT_PUBLIC_SENTRY_ORG
- NEXT_PUBLIC_SENTRY_PROJECT
- NEXT_PUBLIC_SENTRY_URL
- NODE_ENV
```

## Prise en main

Vous pouvez exécuter ce projet de deux manières : directement avec Node.js ou en utilisant Docker.

### Option 1: Exécution avec Node.js

1. Installez les dépendances :

```bash copy
npm install
```

### Option 2: Exécution avec Docker

1. Assurez-vous que Docker Desktop est en cours d'exécution sur votre machine.

2. Construisez et démarrez le conteneur :

```bash copy
docker-compose up
```

L'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000).

## Développement

- Le code principal de l'application se trouve dans `src/app`
- Modifiez `src/app/page.tsx` pour modifier la page d'accueil
- L'application se mettra à jour automatiquement lorsque vous modifiez des fichiers

## Storybook

Pour exécuter Storybook localement :

```bash copy
npm run storybook
```

Storybook sera disponible à l'adresse [http://localhost:6006](http://localhost:6006).

Les stories se trouvent dans `src/components/*.stories.tsx`.

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Storybook](https://storybook.js.org/)
- [Docker](https://www.docker.com/)
