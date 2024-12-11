# Mon Devis Sans Oublis - Frontend

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
