import { useContent } from '../content/ContentContext'

export default function Footer() {
  const { profile } = useContent()
  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-6 text-sm text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <a href="#admin" className="text-xs text-slate-400 transition-colors hover:text-brand-600 dark:text-slate-600 dark:hover:text-brand-400">
          Admin
        </a>
      </div>
    </footer>
  )
}
