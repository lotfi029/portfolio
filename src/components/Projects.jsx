import { useContent } from '../content/ContentContext'
import Section from './Section'
import { ExternalLinkIcon, GitHubIcon, CodeIcon } from './Icons'

function ProjectCard({ project }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400">
          <CodeIcon className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-3">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" aria-label="Source code" className="text-slate-400 transition-colors hover:text-brand-600 dark:hover:text-brand-400">
              <GitHubIcon className="h-5 w-5" />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" aria-label="Live demo" className="text-slate-400 transition-colors hover:text-brand-600 dark:hover:text-brand-400">
              <ExternalLinkIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {project.title}
      </h3>
      {project.period && (
        <p className="mt-0.5 text-xs font-medium text-slate-400 dark:text-slate-500">
          {project.period}
        </p>
      )}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const { projects } = useContent()
  return (
    <Section id="projects" eyebrow="Some things I've built" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  )
}
