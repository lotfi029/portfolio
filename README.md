# Mohamed Lotfi — Portfolio

A modern, responsive developer portfolio built with **React + Vite + Tailwind CSS**.

## Features

- ⚡️ Fast Vite build & dev server
- 🎨 Tailwind CSS v4 styling with a custom brand palette
- 🌙 Light/dark mode toggle (respects system preference, persists choice)
- 📱 Fully responsive with a mobile nav menu
- ♿️ Accessible, semantic markup
- 🧩 Sections: Hero, About, Skills, Experience, Projects, Contact
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

The site is fully static. Build with `npm run build` and deploy the `dist/`
folder to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).

## Tech stack

- [React 18](https://react.dev/)
- [Vite 6](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
