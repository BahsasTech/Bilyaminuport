import type { Metadata } from "next";
import Link from "next/link";
import { getProfile } from "@/lib/profile";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const profile = await getProfile();
  const projectCount = projects.length;
  const featuredCount = projects.filter((p) => p.featured).length;

  const stats = [
    { label: "Total Projects", value: projectCount, href: "/admin/projects" },
    { label: "Featured Projects", value: featuredCount, href: "/admin/projects" },
    { label: "Skills Groups", value: "4", href: "/admin/skills" },
    { label: "Messages", value: "0", href: "/admin/messages" },
  ];

  const quickActions = [
    { label: "Edit Profile", href: "/admin/profile", description: "Update personal information" },
    { label: "Add Project", href: "/admin/projects", description: "Add new project to portfolio" },
    { label: "Manage Skills", href: "/admin/skills", description: "Update skill sets" },
    { label: "Edit Resume", href: "/resume?edit=true", description: "Add and edit resume information" },
    { label: "View Messages", href: "/admin/messages", description: "Check contact messages" },
    { label: "Settings", href: "/admin/settings", description: "Website configuration" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="mt-2 text-muted">Welcome back, {profile.name}. Manage your portfolio from here.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="rounded-xl border border-border bg-card/40 p-6 transition-colors hover:border-accent/60 hover:bg-card">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href} className="rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-accent/60 hover:bg-card">
              <p className="font-medium text-foreground">{action.label}</p>
              <p className="mt-1 text-sm text-muted">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
