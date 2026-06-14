import { profile } from '../data'
import Section from './Section'
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from './Icons'

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Let's connect" title="Get In Touch">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-brand-50/50 p-10 text-center shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/50">
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          I'm always open to discussing new projects, backend and cloud
          opportunities, or just having a chat. Drop me a message and I'll get
          back to you as soon as I can.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-brand-600/40"
          >
            <MailIcon className="h-5 w-5" />
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-400"
          >
            <PhoneIcon className="h-5 w-5" />
            {profile.phone}
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
            <GitHubIcon className="h-6 w-6" />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
            <LinkedInIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </Section>
  )
}
