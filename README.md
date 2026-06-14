# Mohamed Lotfi — Portfolio

A modern, responsive developer portfolio built with **React + Vite + Tailwind CSS**.

## Features

- ⚡️ Fast Vite build & dev server
- 🎨 Tailwind CSS v4 styling with a custom brand palette
- 🌙 Light/dark mode toggle (respects system preference, persists choice)
- 📱 Fully responsive with a mobile nav menu
- ♿️ Accessible, semantic markup
- 🧩 Sections: Hero, About, Skills, Experience, Projects, Education & Achievements, Contact
- 📝 All content lives in one editable file: `src/data.js`

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # build for production (outputs to dist/)
npm run preview  # preview the production build locally
```

## Customizing

Edit **`src/data.js`** to update your name, bio, skills, work experience,
projects, and social links — no component changes needed. Replace the
placeholder values (resume link, demo/repo URLs, social profiles) with your own.

## Deployment

This repo deploys automatically to **GitHub Pages** via GitHub Actions
(`.github/workflows/deploy.yml`). Every push to `main` builds the site and
publishes it to:

> https://lotfi029.github.io/lotfi-portofli/

One-time setup: in the repo, go to **Settings → Pages** and set
**Source** to **GitHub Actions** (the workflow also attempts to enable this
automatically on its first run).

The `base` path in `vite.config.js` (`/lotfi-portofli/`) must match the
repository name for assets to resolve correctly on Pages. The site is fully
static, so it can also be deployed to any static host (Vercel, Netlify,
Cloudflare Pages, etc.) — for those, set `base` back to `/`.

## Tech stack

- [React 18](https://react.dev/)
- [Vite 6](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
