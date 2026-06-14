import { useContent } from '../content/ContentContext'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

export default function Hero() {
  const { profile } = useContent()
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Decorative background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl dark:bg-brand-700/20" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-fuchsia-300/30 blur-3xl dark:bg-fuchsia-800/20" />
      </div>

      <div className="mx-auto grid max-w-6xl animate-fade-up items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Hi, my name is
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
            {profile.name}
          </h1>
          <h2 className="mt-3 text-2xl font-bold text-slate-500 sm:text-3xl lg:text-4xl dark:text-slate-400">
            {profile.role}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-brand-600/40"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-400"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
              <GitHubIcon className="h-6 w-6" />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
              <LinkedInIcon className="h-6 w-6" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
              <MailIcon className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Profile photo */}
        <div className="order-first flex justify-center md:order-last">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-brand-500 to-fuchsia-500 opacity-20 blur-2xl" />
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white shadow-xl ring-1 ring-slate-200 sm:h-64 sm:w-64 dark:border-slate-800 dark:ring-slate-700">
              <img
                src={profile.photo}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
