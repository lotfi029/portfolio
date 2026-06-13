import { profile } from '../data'
import Section from './Section'
import { GitHubIcon, LinkedInIcon, TwitterIcon, MailIcon } from './Icons'

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Let's connect" title="Get In Touch">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-brand-50/50 p-10 text-center shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/50">
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          I'm always open to discussing new projects, opportunities, or just
          having a chat. Drop me a message and I'll get back to you as soon as I can.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-brand-600/40"
        >
          <MailIcon className="h-5 w-5" />
          Say hello
        </a>

        <div className="mt-8 flex items-center justify-center gap-6">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
            <GitHubIcon className="h-6 w-6" />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
            <LinkedInIcon className="h-6 w-6" />
          </a>
          <a href={profile.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
            <TwitterIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </Section>
  )
}
