"use client";

import { skillGroups as initialSkills } from "@/content/site";
import { useState } from "react";

export default function SkillsAdminPage() {
  const [skillGroups, setSkillGroups] = useState(initialSkills);
  const [showForm, setShowForm] = useState(false);
  const [newGroup, setNewGroup] = useState({ title: "", items: "" });

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    const items = newGroup.items.split(",").map(s => s.trim()).filter(Boolean);
    setSkillGroups([...skillGroups, { title: newGroup.title, items }]);
    setShowForm(false);
    setNewGroup({ title: "", items: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Skills</h1>
          <p className="mt-2 text-muted">Manage skill groups and technologies</p>
        </div>
        <button onClick={() => setShowForm(true)} className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.01]">
          Add Skill Group
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl border border-border bg-background p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Add Skill Group</h2>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-foreground">?</button>
            </div>
            <form onSubmit={handleAddGroup} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Group Title</label>
                <input value={newGroup.title} onChange={(e) => setNewGroup({...newGroup, title: e.target.value})} required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Skills (comma separated)</label>
                <textarea value={newGroup.items} onChange={(e) => setNewGroup({...newGroup, items: e.target.value})} rows={3} required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" placeholder="React, TypeScript, Node.js" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-fg">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-border px-4 py-2 text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group, idx) => (
          <div key={idx} className="rounded-xl border border-border bg-card/40 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
              <button onClick={() => setSkillGroups(skillGroups.filter((_, i) => i !== idx))} className="text-sm text-red-600">Delete</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-lg bg-background px-2.5 py-1 text-sm text-foreground">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
