import { useContent } from '../content/ContentContext'
import Section from './Section'

export default function About() {
  const { about, profile } = useContent()
  return (
    <Section id="about" eyebrow="Get to know me" title="About">
      <div className="grid gap-12 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-slate-600 dark:text-slate-300">
              {p}
            </p>
          ))}
          <p className="pt-2 text-sm text-slate-500 dark:text-slate-400">
            📍 {profile.location}
          </p>
        </div>

        <div className="space-y-4">
          {about.highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-3xl font-extrabold text-brand-600 dark:text-brand-400">
                {h.value}
              </div>
              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {h.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
