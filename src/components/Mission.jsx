import { useContent } from '../content/ContentContext'
import Section from './Section'

export default function Mission() {
  const { mission } = useContent()
  return (
    <Section id="mission" eyebrow="What drives me" title="Mission">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50/60 to-white p-8 shadow-sm sm:p-10 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/40">
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
          {mission.statement}
        </p>

        <div className="mt-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Currently focused on
          </h3>
          <div className="flex flex-wrap gap-3">
            {mission.focus.map((item) => (
              <span
                key={item}
                className="rounded-xl border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-brand-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-8 border-t border-slate-200 pt-6 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
          {mission.openTo}
        </p>
      </div>
    </Section>
  )
}
