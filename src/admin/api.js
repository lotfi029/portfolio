// Admin API client. The backend base URL is provided at build time via
// VITE_API_BASE_URL (e.g. https://your-backend.onrender.com). When empty, the
// API is assumed to live on the same origin (useful if you host both together).

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

const TOKEN_KEY = 'portfolio_admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

function apiUrl(path) {
  return `${API_BASE}${path}`
}

async function parse(res) {
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = { error: text }
  }
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data
}

export async function login(username, password) {
  const res = await fetch(apiUrl('/api/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  return parse(res) // { token }
}

export async function fetchContent() {
  const res = await fetch(apiUrl('/api/content'), {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return parse(res) // content object
}

export async function saveContent(content) {
  const res = await fetch(apiUrl('/api/content'), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(content),
  })
  return parse(res) // { ok: true, commit: ... }
}

export const apiConfigured = Boolean(API_BASE) || true
export { API_BASE }
