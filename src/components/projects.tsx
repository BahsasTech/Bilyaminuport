"use client";

import { useState } from "react";
import { projects } from "@/content/site";

type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  year: string;
  stack: string[];
  highlights: string[];
  featured: boolean;
};

export function Projects() {
  const [active, setActive] = useState("All");
  const filters = ["All", "Education", "Finance", "Commerce", "Tooling"];
  const visible = active === "All" ? (projects as Project[]) : (projects as Project[]).filter((p) => p.category === active);
  const featured = (projects as Project[]).filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="scroll-mt-20 border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Portfolio</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Selected projects</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button key={filter} onClick={() => setActive(filter)} className={`rounded-lg border px-3.5 py-2 text-sm ${active === filter ? "border-accent bg-accent text-accent-fg" : "border-border bg-card text-muted"}`}>{filter}</button>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {visible.map((project: Project) => (
            <article key={project.slug} className="rounded-2xl border border-border bg-background p-6">
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              <p className="mt-2 text-sm text-muted">{project.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

