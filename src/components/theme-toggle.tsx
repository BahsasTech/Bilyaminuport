"use client";

import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");
    root.classList.toggle("dark", nextIsDark);
    try {
      localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    } catch {
      // storage unavailable — theme still applies for this session
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-background hover:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="dark:hidden" />
    </button>
  );
}
