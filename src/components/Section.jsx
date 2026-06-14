// Reusable section wrapper with a consistent heading style.
export default function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-24 ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-12">
          {eyebrow && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {title}
            </h2>
          )}
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-500" />
        </div>
      )}
      {children}
    </section>
  )
}
