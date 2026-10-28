"use client";

import { useState, useTransition } from "react";
import { saveEducationAction } from "@/app/admin/actions";

type EducationItem = {
  id: number;
  institution: FormDataEntryValue | null;
  degree: FormDataEntryValue | null;
  year: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
};

export default function EducationAdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const item: EducationItem = {
      id: Date.now(),
      institution: formData.get("institution"),
      degree: formData.get("degree"),
      year: formData.get("year"),
      description: formData.get("description"),
    };
    const next = [...education, item];
    setEducation(next);
    setShowForm(false);
    e.currentTarget.reset();
    const fd = new FormData();
    fd.append("items", JSON.stringify(next));
    startTransition(() => {
      void saveEducationAction(fd);
    });
  };

  const handleDelete = (id: number) => {
    const next = education.filter((e) => e.id !== id);
    setEducation(next);
    const fd = new FormData();
    fd.append("items", JSON.stringify(next));
    startTransition(() => {
      void saveEducationAction(fd);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Education & Certifications</h1>
          <p className="mt-2 text-muted">Manage education and certifications</p>
        </div>
        <button onClick={() => setShowForm(true)} className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.01]">
          Add Education
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl border border-border bg-background p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Add Education</h2>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-foreground">?</button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Institution</label>
                <input name="institution" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Degree/Certification</label>
                <input name="degree" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Year</label>
                <input name="year" required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
                <textarea name="description" rows={3} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-fg">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-border px-4 py-2 text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {education.length === 0 ? (
        <div className="rounded-xl border border-border bg-card/40 p-12 text-center">
          <p className="text-muted">No education or certifications added yet.</p>
          <p className="mt-1 text-sm text-muted">Click &quot;Add Education&quot; to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {education.map((item) => (
            <div key={item.id} className="rounded-xl border border-border bg-card/40 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{String(item.degree ?? "")}</h3>
                  <p className="text-accent">{String(item.institution ?? "")}</p>
                  <p className="mt-1 text-sm text-muted">{String(item.year ?? "")}</p>
                  {item.description ? <p className="mt-2 text-sm text-muted">{String(item.description)}</p> : null}
                </div>
                <button disabled={isPending} onClick={() => handleDelete(item.id)} className="text-sm text-red-600 disabled:opacity-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
