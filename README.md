# Zenticsys Automotive

The new automotive-focused marketing website for Zenticsys. It is being built
as a server-rendered Next.js application through independently testable phases.

## Local development

Requirements: Node.js 20+ and npm.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run build
```

## Project documentation

The documentation is the source of truth for scope, design, content,
architecture, integrations, and implementation order:

- [`docs/PROJECT-BRAIN.md`](./docs/PROJECT-BRAIN.md)
- [`docs/AI-VIBE-CODING.md`](./docs/AI-VIBE-CODING.md)
- [`docs/ENVIRONMENT-SETUP.md`](./docs/ENVIRONMENT-SETUP.md)
- [`docs/phases/`](./docs/phases/)

Read the project brain, AI rules, and active phase before changing application
code. Do not commit `.env.local` or any credentials.
