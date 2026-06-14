# Portfolio Admin API

A small authenticated backend that powers the portfolio's admin dashboard.
It verifies a username/password login, issues a JWT, and **persists edits by
committing `public/content.json` back to this GitHub repo** — which triggers the
GitHub Pages rebuild, so changes go live automatically.

The public site stays fully static on GitHub Pages; this backend is only needed
for the admin editing workflow.

## Endpoints

| Method | Path           | Auth | Purpose                                  |
|--------|----------------|------|------------------------------------------|
| GET    | `/api/health`  | no   | Health check                             |
| POST   | `/api/login`   | no   | `{ username, password }` → `{ token }`   |
| GET    | `/api/content` | yes  | Latest content (read from the repo)      |
| PUT    | `/api/content` | yes  | Save content (commits `content.json`)    |

Auth is a Bearer JWT: `Authorization: Bearer <token>`.

## Configuration

Copy `.env.example` to `.env` and fill it in. Key variables:

- `ADMIN_USERNAME` and `ADMIN_PASSWORD` (or `ADMIN_PASSWORD_HASH`) — your login.
- `JWT_SECRET` — a long random string for signing tokens.
- `GITHUB_TOKEN` — a **fine-grained PAT** with *Contents: Read and write* on this repo.
- `GITHUB_OWNER` / `GITHUB_REPO` / `GITHUB_BRANCH` / `CONTENT_PATH`.
- `ALLOWED_ORIGIN` — your site origin (e.g. `https://lotfi029.github.io`).

Generate a password hash (recommended over a plain password):

```bash
npm run hash -- 'your-password'   # prints the bcrypt hash for ADMIN_PASSWORD_HASH
```

## Run locally

```bash
npm install
cp .env.example .env   # then edit it
npm start              # http://localhost:8787
```

## Deploy (free options)

Any Node host works. The repo isn't tied to one platform.

**Render — one-click via blueprint** (recommended):
1. Push this repo to GitHub (already done).
2. In Render → **Blueprints → New Blueprint Instance** → pick this repo.
   Render reads [`render.yaml`](render.yaml), provisions the free web service,
   and prompts you for the secrets (admin credentials, GitHub token, allowed
   origin). `JWT_SECRET` is auto-generated.
3. Deploy → copy the service URL (e.g. `https://xxx.onrender.com`).

**Render — manual** (alternative):
1. New → Web Service → connect this repo, set **Root Directory** to `server`.
2. Build command `npm install`, start command `npm start`.
3. Add the environment variables from `.env.example` (use real secrets).
4. Deploy → copy the service URL.

**Railway / Fly.io / a VPS** work the same way — run `npm start` in `server/`
with the env vars set.

## Connect the frontend

Set the backend URL so the dashboard knows where to call:

- In GitHub: **Settings → Secrets and variables → Actions → Variables → New
  variable** → `VITE_API_BASE_URL` = your backend URL.
- Re-run the **Deploy to GitHub Pages** workflow (or push to `main`).

Then open `https://<your-site>/#admin`, log in, edit, and **Save & publish**.
