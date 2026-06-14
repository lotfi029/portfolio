import 'dotenv/config'
import crypto from 'node:crypto'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Octokit } from '@octokit/rest'

// ── Configuration (all via environment variables) ────────────────────────────
const {
  PORT = 8787,
  ADMIN_USERNAME,
  ADMIN_PASSWORD, // plain (simple) — or use ADMIN_PASSWORD_HASH (preferred)
  ADMIN_PASSWORD_HASH,
  JWT_SECRET,
  ALLOWED_ORIGIN = '*',
  GITHUB_TOKEN,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_BRANCH = 'main',
  CONTENT_PATH = 'public/content.json',
} = process.env

function required(name, value) {
  if (!value) {
    console.error(`Missing required env var: ${name}`)
    process.exit(1)
  }
}
required('ADMIN_USERNAME', ADMIN_USERNAME)
required('JWT_SECRET', JWT_SECRET)
required('GITHUB_TOKEN', GITHUB_TOKEN)
required('GITHUB_OWNER', GITHUB_OWNER)
required('GITHUB_REPO', GITHUB_REPO)
if (!ADMIN_PASSWORD && !ADMIN_PASSWORD_HASH) {
  console.error('Set either ADMIN_PASSWORD or ADMIN_PASSWORD_HASH')
  process.exit(1)
}

const octokit = new Octokit({ auth: GITHUB_TOKEN })
const app = express()
app.use(cors({ origin: ALLOWED_ORIGIN }))
app.use(express.json({ limit: '1mb' }))

// ── Helpers ──────────────────────────────────────────────────────────────────
function safeEqual(a = '', b = '') {
  const bufA = Buffer.from(String(a))
  const bufB = Buffer.from(String(b))
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

async function checkPassword(password) {
  if (ADMIN_PASSWORD_HASH) return bcrypt.compare(password, ADMIN_PASSWORD_HASH)
  return safeEqual(password, ADMIN_PASSWORD)
}

function auth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

// ── Routes ───────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/login', async (req, res) => {
  const { username = '', password = '' } = req.body || {}
  const userOk = safeEqual(username, ADMIN_USERNAME)
  const passOk = await checkPassword(password)
  if (!userOk || !passOk) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }
  const token = jwt.sign({ sub: username, role: 'admin' }, JWT_SECRET, { expiresIn: '12h' })
  res.json({ token })
})

app.get('/api/content', auth, async (_req, res) => {
  try {
    const { data } = await octokit.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: CONTENT_PATH,
      ref: GITHUB_BRANCH,
    })
    const json = Buffer.from(data.content, 'base64').toString('utf8')
    res.json(JSON.parse(json))
  } catch (err) {
    if (err.status === 404) return res.json({})
    console.error('getContent failed:', err.message)
    res.status(502).json({ error: 'Failed to read content from GitHub' })
  }
})

app.put('/api/content', auth, async (req, res) => {
  const content = req.body
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return res.status(400).json({ error: 'Body must be a content object' })
  }
  try {
    // Need the current file sha to update it (omit when creating).
    let sha
    try {
      const { data } = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: CONTENT_PATH,
        ref: GITHUB_BRANCH,
      })
      sha = data.sha
    } catch (err) {
      if (err.status !== 404) throw err
    }

    const body = Buffer.from(JSON.stringify(content, null, 2) + '\n', 'utf8').toString('base64')
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: CONTENT_PATH,
      message: 'Update portfolio content via admin dashboard',
      content: body,
      branch: GITHUB_BRANCH,
      sha,
    })
    res.json({ ok: true, commit: data.commit?.sha })
  } catch (err) {
    console.error('saveContent failed:', err.message)
    res.status(502).json({ error: 'Failed to commit content to GitHub' })
  }
})

app.listen(PORT, () => {
  console.log(`Admin API listening on :${PORT}`)
})
