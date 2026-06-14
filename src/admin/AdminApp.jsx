import { useEffect, useState } from 'react'
import { login, fetchContent, saveContent, getToken, setToken, API_BASE } from './api'
import { TextField, StringList, ObjectList } from './fields'

const card =
  'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900'
const btn =
  'rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50'

function siteHref() {
  // Strip the #admin hash to return to the public site.
  return import.meta.env.BASE_URL || '/'
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(Boolean(getToken()))
  const [content, setContent] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [showRaw, setShowRaw] = useState(false)
  const [raw, setRaw] = useState('')

  // Load content once authenticated. Fall back to the public content.json so the
  // editor still works (export mode) if the backend can't be reached.
  useEffect(() => {
    if (!authed) return
    let active = true
    ;(async () => {
      setError('')
      try {
        const data = await fetchContent()
        if (active) setContent(data)
      } catch (e) {
        try {
          const res = await fetch(`${import.meta.env.BASE_URL}content.json`, { cache: 'no-store' })
          const data = await res.json()
          if (active) {
            setContent(data)
            setNotice(`Loaded local content (backend unavailable: ${e.message}). Saving needs the backend; you can still Download JSON.`)
          }
        } catch {
          if (active) setError('Could not load content from the backend or content.json.')
        }
      }
    })()
    return () => {
      active = false
    }
  }, [authed])

  async function handleLogin(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const form = new FormData(e.currentTarget)
    try {
      const { token } = await login(form.get('username'), form.get('password'))
      setToken(token)
      setAuthed(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  function handleLogout() {
    setToken('')
    setAuthed(false)
    setContent(null)
  }

  async function handleSave() {
    setBusy(true)
    setError('')
    setNotice('')
    try {
      await saveContent(content)
      setNotice('Saved! Changes were committed and will be live after the site rebuilds (~1 min).')
    } catch (err) {
      setError(`Save failed: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'content.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
        <form onSubmit={handleLogin} className={`${card} w-full max-w-sm`}>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Admin Login</h1>
          <p className="mt-1 mb-6 text-sm text-slate-500 dark:text-slate-400">
            Sign in to edit your portfolio.
          </p>
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
              {error}
            </div>
          )}
          {/* Uncontrolled inputs read via FormData on submit */}
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Username
              </span>
              <input
                name="username"
                autoComplete="username"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Password
              </span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
          </div>
          <button type="submit" disabled={busy} className={`${btn} mt-6 w-full bg-brand-600 text-white hover:bg-brand-700`}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
          <a href={siteHref()} className="mt-4 block text-center text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400">
            ← Back to site
          </a>
        </form>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500 dark:bg-slate-950">
        {error || 'Loading…'}
      </div>
    )
  }

  // Helpers to update slices of content immutably.
  const setSection = (key, value) => setContent((c) => ({ ...c, [key]: value }))
  const setProfile = (key, value) =>
    setContent((c) => ({ ...c, profile: { ...c.profile, [key]: value } }))
  const setSocial = (key, value) =>
    setContent((c) => ({
      ...c,
      profile: { ...c.profile, socials: { ...c.profile.socials, [key]: value } },
    }))

  // ── Editor ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 pb-24 dark:bg-slate-950">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            Portfolio Admin
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <a href={siteHref()} className={`${btn} bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200`}>
              View site
            </a>
            <button onClick={downloadJson} className={`${btn} bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200`}>
              Download JSON
            </button>
            <button onClick={handleSave} disabled={busy} className={`${btn} bg-brand-600 text-white hover:bg-brand-700`}>
              {busy ? 'Saving…' : 'Save & publish'}
            </button>
            <button onClick={handleLogout} className={`${btn} bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300`}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">{error}</div>
        )}
        {notice && (
          <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{notice}</div>
        )}
        {!API_BASE && (
          <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            No backend URL is configured (VITE_API_BASE_URL). Login & save require the backend — until it's deployed, use “Download JSON”.
          </div>
        )}

        {/* Profile */}
        <section className={card}>
          <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Profile</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Name" value={content.profile.name} onChange={(v) => setProfile('name', v)} />
            <TextField label="Role" value={content.profile.role} onChange={(v) => setProfile('role', v)} />
            <TextField label="Location" value={content.profile.location} onChange={(v) => setProfile('location', v)} />
            <TextField label="Email" value={content.profile.email} onChange={(v) => setProfile('email', v)} />
            <TextField label="Phone" value={content.profile.phone} onChange={(v) => setProfile('phone', v)} />
            <TextField label="Photo URL (blank = default)" value={content.profile.photo} onChange={(v) => setProfile('photo', v)} />
            <TextField label="Résumé URL" value={content.profile.resumeUrl} onChange={(v) => setProfile('resumeUrl', v)} />
            <TextField label="GitHub URL" value={content.profile.socials?.github} onChange={(v) => setSocial('github', v)} />
            <TextField label="LinkedIn URL" value={content.profile.socials?.linkedin} onChange={(v) => setSocial('linkedin', v)} />
          </div>
          <div className="mt-4">
            <TextField label="Tagline" textarea value={content.profile.tagline} onChange={(v) => setProfile('tagline', v)} />
          </div>
        </section>

        {/* Mission */}
        <section className={card}>
          <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Mission</h2>
          <div className="space-y-4">
            <TextField label="Statement" textarea rows={5} value={content.mission?.statement} onChange={(v) => setSection('mission', { ...content.mission, statement: v })} />
            <StringList label="Currently focused on" values={content.mission?.focus} onChange={(v) => setSection('mission', { ...content.mission, focus: v })} />
            <TextField label="Open to" textarea value={content.mission?.openTo} onChange={(v) => setSection('mission', { ...content.mission, openTo: v })} />
          </div>
        </section>

        {/* About */}
        <section className={card}>
          <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">About</h2>
          <StringList label="Paragraphs" values={content.about?.paragraphs} onChange={(v) => setSection('about', { ...content.about, paragraphs: v })} />
          <div className="mt-4">
            <ObjectList
              label="Highlights"
              items={content.about?.highlights || []}
              onChange={(v) => setSection('about', { ...content.about, highlights: v })}
              makeEmpty={() => ({ value: '', label: '' })}
              fields={[
                { key: 'value', label: 'Value', type: 'text' },
                { key: 'label', label: 'Label', type: 'text' },
              ]}
            />
          </div>
        </section>

        {/* Skills */}
        <section className={card}>
          <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Skills</h2>
          <ObjectList
            items={content.skills || []}
            onChange={(v) => setSection('skills', v)}
            makeEmpty={() => ({ category: '', items: [] })}
            fields={[
              { key: 'category', label: 'Category', type: 'text' },
              { key: 'items', label: 'Items', type: 'stringlist' },
            ]}
          />
        </section>

        {/* Experience */}
        <section className={card}>
          <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Experience</h2>
          <ObjectList
            items={content.experience || []}
            onChange={(v) => setSection('experience', v)}
            makeEmpty={() => ({ role: '', company: '', period: '', description: '', achievements: [] })}
            fields={[
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'company', label: 'Company', type: 'text' },
              { key: 'period', label: 'Period', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'achievements', label: 'Achievements', type: 'stringlist' },
            ]}
          />
        </section>

        {/* Projects */}
        <section className={card}>
          <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Projects</h2>
          <ObjectList
            items={content.projects || []}
            onChange={(v) => setSection('projects', v)}
            makeEmpty={() => ({ title: '', description: '', tags: [], period: '', repo: '', demo: '', featured: false })}
            fields={[
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'tags', label: 'Tags', type: 'stringlist' },
              { key: 'period', label: 'Period', type: 'text' },
              { key: 'repo', label: 'Repo URL', type: 'text' },
              { key: 'demo', label: 'Demo URL', type: 'text' },
              { key: 'featured', label: 'Featured', type: 'checkbox' },
            ]}
          />
        </section>

        {/* Education */}
        <section className={card}>
          <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Education</h2>
          <ObjectList
            items={content.education || []}
            onChange={(v) => setSection('education', v)}
            makeEmpty={() => ({ school: '', degree: '', location: '', period: '' })}
            fields={[
              { key: 'school', label: 'School', type: 'text' },
              { key: 'degree', label: 'Degree', type: 'text' },
              { key: 'location', label: 'Location', type: 'text' },
              { key: 'period', label: 'Period', type: 'text' },
            ]}
          />
        </section>

        {/* Achievements */}
        <section className={card}>
          <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Achievements</h2>
          <ObjectList
            items={content.achievements || []}
            onChange={(v) => setSection('achievements', v)}
            makeEmpty={() => ({ title: '', detail: '' })}
            fields={[
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'detail', label: 'Detail', type: 'textarea' },
            ]}
          />
        </section>

        {/* Raw JSON (advanced) */}
        <section className={card}>
          <button
            onClick={() => {
              if (!showRaw) setRaw(JSON.stringify(content, null, 2))
              setShowRaw((s) => !s)
            }}
            className="text-sm font-semibold text-brand-600 dark:text-brand-400"
          >
            {showRaw ? '▾ Hide' : '▸ Show'} advanced raw JSON editor
          </button>
          {showRaw && (
            <div className="mt-4 space-y-3">
              <textarea
                className="h-80 w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 font-mono text-xs text-slate-100 outline-none dark:border-slate-700"
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
              />
              <button
                onClick={() => {
                  try {
                    setContent(JSON.parse(raw))
                    setNotice('Applied raw JSON to the form. Review, then Save & publish.')
                    setError('')
                    setShowRaw(false)
                  } catch (err) {
                    setError(`Invalid JSON: ${err.message}`)
                  }
                }}
                className={`${btn} bg-brand-600 text-white hover:bg-brand-700`}
              >
                Apply JSON
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
