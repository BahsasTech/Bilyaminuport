"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      Print / Save as PDF
    </button>
  );
}
