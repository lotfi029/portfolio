import { useContent } from '../content/ContentContext'
import Section from './Section'

export default function Experience() {
  const { experience } = useContent()
  return (
    <Section id="experience" eyebrow="Where I've worked" title="Experience">
      <div className="relative border-l border-slate-200 pl-8 dark:border-slate-800">
        {experience.map((job, i) => (
          <div key={i} className="relative pb-12 last:pb-0">
            {/* Timeline dot */}
            <span className="absolute -left-[37px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-brand-500 dark:border-slate-950" />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {job.role}
                <span className="text-brand-600 dark:text-brand-400"> · {job.company}</span>
              </h3>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {job.period}
              </span>
            </div>

            <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
              {job.description}
            </p>

            <ul className="mt-3 space-y-1.5">
              {job.achievements.map((a, j) => (
                <li key={j} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="mt-1 text-brand-500">▹</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
