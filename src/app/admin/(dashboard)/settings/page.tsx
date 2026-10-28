import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - Admin",
  robots: { index: false, follow: false },
};

export default function SettingsAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Website Settings</h1>
        <p className="mt-2 text-muted">Configure site-wide settings</p>
      </div>

      <div className="rounded-xl border border-border bg-card/40 p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Site URL</label>
            <input type="text" className="w-full max-w-md rounded-xl border border-border bg-background px-4 py-2.5 text-sm" defaultValue="https://bahsastech.vercel.app" />
          </div>
          <button className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-fg">Save Settings</button>
        </div>
      </div>
    </div>
  );
}
