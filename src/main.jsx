import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import './index.css'

// Tiny hash-based router: `#admin` shows the dashboard, everything else the site.
// Hash routing keeps it working on GitHub Pages without server rewrites.
function Root() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash.startsWith('#admin'))

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash.startsWith('#admin'))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return isAdmin ? <AdminApp /> : <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
