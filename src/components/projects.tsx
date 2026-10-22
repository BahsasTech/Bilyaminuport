"use client";

import { useMemo, useState } from "react";
import { projects, type Project } from "@/content/site";
import { ExternalLinkIcon, GithubIcon, SparkIcon } from "./icons";

const filters = ["All", "Education", "Finance", "Commerce", "Tooling"] as const;
type Filter = (typeof filters)[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-accent">
            {project.category}
          </span>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground">
            {project.title}
          </h3>
        </div>
        <span className="shrink-0 rounded-md border border-border px-2 py-0.5 text-xs text-muted">
          {project.year}
        </span>
      </div>

      <p className="mt-3 text-sm font-medium text-foreground/90">
        {project.summary}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <ul className="mt-5 space-y-2">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2.5 text-sm text-muted">
            <SparkIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-card px-2 py-1 text-xs text-muted ring-1 ring-border"
          >
            {tech}
          </span>
        ))}
      </div>

      {(project.repo || project.live) && (
        <div className="mt-6 flex items-center gap-4 border-t border-border pt-4">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <GithubIcon className="h-4 w-4" />
              Source
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Live demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export function Projects() {
  const [active, setActive] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.category === active),
    [active],
  );

  return (
    <section
      id="projects"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Portfolio
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Selected projects
            </h2>
            <p className="mt-4 text-base text-muted">
              Real systems built for schools, cooperative societies and
              organisations — not toy demos.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={active === filter}
                className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active === filter
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border bg-card text-muted hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
