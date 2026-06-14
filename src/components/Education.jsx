import { useContent } from '../content/ContentContext'
import Section from './Section'
import { GradCapIcon, AwardIcon } from './Icons'

export default function Education() {
  const { education, achievements } = useContent()
  return (
    <Section id="education" eyebrow="Learning & recognition" title="Education & Achievements">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Education */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <GradCapIcon className="h-5 w-5 text-brand-500" />
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {edu.school}
                  </h4>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {edu.period}
                  </span>
                </div>
                <p className="mt-1 text-brand-600 dark:text-brand-400">{edu.degree}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {edu.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
            <AwardIcon className="h-5 w-5 text-brand-500" />
            Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((a, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h4 className="font-semibold text-slate-900 dark:text-white">{a.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {a.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
