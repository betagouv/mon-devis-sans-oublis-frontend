# Mon Devis Sans Oublis - Frontend

## Getting Started

You can run this project in two ways: directly with Node.js or using Docker.

### Option 1: Running with Node.js

1. Install dependencies:

```bash copy
npm install
```

### Option 2: Running with Docker

1. Make sure Docker Desktop is running on your machine

2. Build and start the container:

```bash copy
docker-compose up
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Development

- The main application code is in `src/app`
- Edit `src/app/page.tsx` to modify the home page
- The application will auto-update as you edit files

## Storybook

To run Storybook locally:

```bash copy
npm run storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006).

Stories are located in `src/components/*.stories.tsx`.

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Jest](https://jestjs.io/) - JavaScript testing framework
- [React Testing Library](https://testing-library.com/react) - Testing utilities for React components
- [Storybook](https://storybook.js.org/) - UI component development environment
- [Docker](https://www.docker.com/) - Containerization platform
