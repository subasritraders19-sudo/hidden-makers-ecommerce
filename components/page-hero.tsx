export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <section className="border-b border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-balance font-serif text-4xl text-foreground md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
