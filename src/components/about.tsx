import { skillGroups, site } from "@/content/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            About
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Building systems that hold up in production
          </h2>
        </div>

        <div className="space-y-5 text-base leading-relaxed text-muted">
          {site.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-border bg-card/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Toolkit
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skills & technologies
          </h2>
          <p className="mt-4 text-base text-muted">
            Most of my work spans the whole stack — database design on the left of
            the diagram, deployment on the right.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-accent/50"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
