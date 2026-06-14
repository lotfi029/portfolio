import { createContext, useContext, useEffect, useState } from 'react'
import { defaultContent, fallbackPhoto } from './defaults'

const ContentContext = createContext(null)

// Merge fetched content (from content.json / the admin API) over the defaults.
// Top-level sections are replaced wholesale; `profile` is shallow-merged so a
// partial edit doesn't wipe untouched fields, and the photo falls back to the
// bundled asset when no URL is provided.
export function mergeContent(defaults, data) {
  if (!data || typeof data !== 'object') return withPhoto(defaults)
  const merged = { ...defaults, ...data }
  merged.profile = { ...defaults.profile, ...(data.profile || {}) }
  if (data.profile && data.profile.socials) {
    merged.profile.socials = { ...defaults.profile.socials, ...data.profile.socials }
  }
  return withPhoto(merged)
}

function withPhoto(content) {
  const profile = { ...content.profile }
  if (!profile.photo) profile.photo = fallbackPhoto
  return { ...content, profile }
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => withPhoto(defaultContent))
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true
    fetch(`${import.meta.env.BASE_URL}content.json`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && data) setContent(mergeContent(defaultContent, data))
      })
      .catch(() => {})
      .finally(() => active && setLoaded(true))
    return () => {
      active = false
    }
  }, [])

  return (
    <ContentContext.Provider value={{ content, loaded }}>
      {children}
    </ContentContext.Provider>
  )
}

// Convenience hook: returns the merged content object.
export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within a ContentProvider')
  return ctx.content
}
