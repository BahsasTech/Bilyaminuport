import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages - Admin",
  robots: { index: false, follow: false },
};

export default function MessagesAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Contact Messages</h1>
        <p className="mt-2 text-muted">View messages from visitors</p>
      </div>

      <div className="rounded-xl border border-border bg-card/40 p-12 text-center">
        <p className="text-muted">No messages yet.</p>
        <p className="mt-1 text-sm text-muted">Contact form messages will appear here.</p>
      </div>
    </div>
  );
}
