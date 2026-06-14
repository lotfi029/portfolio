# Mohamed Lotfi — Portfolio

A modern, responsive developer portfolio built with **React + Vite + Tailwind CSS**.

## Features

- ⚡️ Fast Vite build & dev server
- 🎨 Tailwind CSS v4 styling with a custom brand palette
- 🌙 Light/dark mode toggle (respects system preference, persists choice)
- 📱 Fully responsive with a mobile nav menu
- ♿️ Accessible, semantic markup
- 🧩 Sections: Hero, About, Mission, Skills, Experience, Projects, Education & Achievements, Contact
- 📝 Content is data-driven (`public/content.json`, with `src/content/defaults.js` as fallback)
- 🔐 Optional admin dashboard at `#admin` with secure login to edit everything

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # build for production (outputs to dist/)
npm run preview  # preview the production build locally
```

## Customizing

The site renders from **`public/content.json`** (fetched at runtime), falling
back to **`src/content/defaults.js`** if that file is missing. You can update
content three ways:

1. **Admin dashboard** (no code) — see below.
2. Edit `public/content.json` directly and commit.
3. Edit the baseline in `src/content/defaults.js`.

## Admin dashboard

The site includes a password-protected dashboard to edit every section
(profile, mission, about, skills, experience, projects, education, achievements)
with no code. Open `…/#admin` (also linked as "Admin" in the footer).

Because the site is static, editing is backed by a small **authenticated backend**
(`server/`) that commits your changes to `public/content.json` — which
auto-redeploys the site. Setup:

1. Deploy the backend in **`server/`** and set its env vars (admin
   username/password, `JWT_SECRET`, and a GitHub token). See
   [`server/README.md`](server/README.md).
2. Add a GitHub **Actions Variable** `VITE_API_BASE_URL` = your backend URL,
   then push to `main` (or re-run the deploy workflow) so the dashboard knows
   where to call.
3. Visit `…/#admin`, log in, edit, and **Save & publish**.

Without the backend deployed, the dashboard still works in **export mode**: edit
content and use **Download JSON** to grab an updated `content.json` to commit.

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
- Admin backend: [Express](https://expressjs.com/), JWT auth, and the
  [GitHub REST API](https://docs.github.com/rest) (see `server/`)
