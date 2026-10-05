# Ludvig Berglie — Portfolio

A React and Vite portfolio with light and dark themes, interactive geometry,
and a particle simulation.

## Local development

Use Node.js 24, then run:

```sh
npm ci
npm run dev
```

## GitHub Pages

This repository is `woon0/woon0.github.io`, so its website lives at:

**https://woon0.github.io/**

The project files belong at the repository root: `package.json`, `index.html`,
`src/`, `public/`, and `.github/`. Do not put them inside an extra project folder.

In GitHub, open **Settings → Pages → Build and deployment → Source** and choose
**GitHub Actions**. The workflow in `.github/workflows/deploy.yml` installs the
dependencies, builds the website, and deploys only the `dist/` output.

After pushing to `main`, check the **Actions** tab for
**Deploy portfolio to GitHub Pages**. The website updates when that run succeeds.
The workflow can also be started manually from the Actions tab.

Do not commit `node_modules/`, `dist/`, or local verification screenshots.
The root URL uses Vite's default `/` asset base.

## Check the production build locally

```sh
npm run build
npm run preview
```
