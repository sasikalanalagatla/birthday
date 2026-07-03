# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Deploying on Render

This app is configured for Render as a static site with `render.yaml`.

1. Push this project to a GitHub or GitLab repository.
2. In Render, create a new Blueprint and select that repository.
3. Render will use:
   - Build command: `npm ci && npm run build`
   - Publish directory: `dist`
   - Node version: `22.12.0`

Direct page refreshes are handled by the rewrite in `render.yaml`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
