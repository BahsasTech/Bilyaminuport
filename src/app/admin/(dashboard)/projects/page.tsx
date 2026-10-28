"use client";

import { projects as initialProjects } from "@/content/site";
import { useState, useTransition } from "react";
import { saveProjectsAction } from "@/app/admin/actions";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Array<Record<string, unknown>>>(initialProjects as Array<Record<string, unknown>>);
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const project: Record<string, unknown> = {
      slug: String(formData.get("slug") || ""),
      title: String(formData.get("title") || ""),
      summary: String(formData.get("summary") || ""),
      description: String(formData.get("description") || ""),
      category: formData.get("category"),
      year: String(formData.get("year") || ""),
      stack: String(formData.get("stack") || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      highlights: String(formData.get("highlights") || "").split("\n").filter(Boolean),
      featured: formData.get("featured") === "on",
    };
    const next = [project, ...projects];
    setProjects(next);
    setShowForm(false);
    e.currentTarget.reset();
    const fd = new FormData();
    fd.append("items", JSON.stringify(next));
    startTransition(() => {
      void saveProjectsAction(fd);
    });
  };

  const handleDelete = (slug: unknown) => {
    const next = projects.filter((p: Record<string, unknown>) => p.slug !== slug);
    setProjects(next);
    const fd = new FormData();
    fd.append("items", JSON.stringify(next));
    startTransition(() => {
      void saveProjectsAction(fd);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Projects</h1>
          <p className="mt-2 text-muted">Manage your portfolio projects</p>
        </div>
        <button onClick={() => setShowForm(true)} className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.01]">
          Add Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-xl border border-border bg-background p-6 my-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Add Project</h2>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-foreground">?</button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Slug</label>
                  <input name="slug" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Title</label>
                  <input name="title" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Summary</label>
                <input name="summary" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
                <textarea name="description" rows={3} required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Category</label>
                  <select name="category" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm">
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Tooling">Tooling</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Year</label>
                  <input name="year" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input name="featured" type="checkbox" id="featured" className="rounded" />
                  <label htmlFor="featured" className="text-sm text-foreground">Featured</label>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Stack (comma separated)</label>
                <input name="stack" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Highlights (one per line)</label>
                <textarea name="highlights" rows={3} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-fg">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-border px-4 py-2 text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {projects.map((project: Record<string, unknown>) => (
          <div key={project.slug as string} className="rounded-xl border border-border bg-card/40 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-foreground">{project.title as string}</h3>
                  {project.featured ? <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">Featured</span> : null}
                  <span className="rounded-full bg-card px-2 py-0.5 text-xs text-muted">{project.category as string}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{project.summary as string}</p>
                <p className="mt-2 text-xs text-muted">Year: {project.year as string}</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-card hover:text-foreground">Edit</button>
                <button disabled={isPending} onClick={() => handleDelete(project.slug)} className="rounded-lg px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
