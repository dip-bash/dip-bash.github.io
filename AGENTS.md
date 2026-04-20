# OpenCode Agent Instructions

This repository is a data-driven developer portfolio built with Vite, React 19, and TypeScript, hosted on GitHub Pages.

## Architecture & Content

- **Data-Driven Markdown**: This is a purely frontend application that fetches its content dynamically at runtime. 
- **Modifying Content**: Do NOT hardcode text or update project lists in React components (`App.tsx` or `components/*.tsx`). All personal data, projects, bios, and skills are stored in **`public/content/*.md`**. Update those Markdown files (and their YAML frontmatter) instead.
- **Frontend Only**: The `services/` directory contains frontend logic (like `contentParser.ts` for parsing markdown), not Node.js backend services. There is no backend.

## Local Development

- **Run Dev Server**: `npm run dev` starts the Vite local server.
- **Testing/Linting**: There are no dedicated test or lint runners configured in `package.json`. Rely on Vite build errors and TypeScript compiler output for verification.

## Build & Deployment Workflow

- **Do NOT manually push build artifacts to `main`**: The `main` branch is strictly for source code.
- **Deploy Command**: To deploy the portfolio to GitHub Pages, use **`npm run deploy`**.
- **How it works**: The deploy script automatically runs `npm run build` (compiling to the `dist/` folder and adding a `.nojekyll` file to bypass GitHub Pages' Jekyll processing), then pushes only the `dist/` folder to the `gh-pages` branch using the `gh-pages` package.
