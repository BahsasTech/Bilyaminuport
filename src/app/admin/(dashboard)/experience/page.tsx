"use client";

// import type { Metadata } from "next";
import { useState, useTransition } from "react";
import { saveExperienceAction } from "@/app/admin/actions";

export default function ExperienceAdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [experiences, setExperiences] = useState<Array<Record<string, unknown>>>([]);
  const [isPending, startTransition] = useTransition();

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const experience: Record<string, unknown> = {
      id: Date.now(),
      company: formData.get("company"),
      position: formData.get("position"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      description: formData.get("description"),
    };
    const next = [...experiences, experience];
    setExperiences(next);
    setShowForm(false);
    e.currentTarget.reset();
    const fd = new FormData();
    fd.append("items", JSON.stringify(next));
    startTransition(() => {
      void saveExperienceAction(fd);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Work Experience</h1>
          <p className="mt-2 text-muted">Manage your work history</p>
        </div>
        <button onClick={() => setShowForm(true)} className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.01]">
          Add Experience
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl border border-border bg-background p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Add Experience</h2>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-foreground">?</button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Company</label>
                <input name="company" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Position</label>
                <input name="position" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Start Date</label>
                  <input name="startDate" type="date" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">End Date</label>
                  <input name="endDate" type="date" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
                <textarea name="description" rows={4} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-fg">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-border px-4 py-2 text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {experiences.length === 0 ? (
        <div className="rounded-xl border border-border bg-card/40 p-12 text-center">
          <p className="text-muted">No work experience added yet.</p>
          <p className="mt-1 text-sm text-muted">Click &quot;Add Experience&quot; to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4">
              {experiences.map((exp: Record<string, unknown>) => (
                <div key={exp.id as number} className="rounded-xl border border-border bg-card/40 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{exp.position as string}</h3>
                      <p className="text-accent">{exp.company as string}</p>
                      <p className="mt-1 text-sm text-muted">{exp.startDate as string} - {(exp.endDate as string) || "Present"}</p>
                      {typeof exp.description === "string" && exp.description ? <p className="mt-2 text-sm text-muted">{exp.description}</p> : null}
                    </div>
                    <button disabled={isPending} onClick={() => {
                      const next = experiences.filter((e: Record<string, unknown>) => e.id !== exp.id);
                      setExperiences(next);
                      const fd = new FormData();
                      fd.append("items", JSON.stringify(next));
                      startTransition(() => { void saveExperienceAction(fd); });
                    }} className="text-sm text-red-600 disabled:opacity-50">Delete</button>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
