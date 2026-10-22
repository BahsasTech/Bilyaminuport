"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/content/site";
import { CloseIcon, GithubIcon, MenuIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-fg transition-transform group-hover:scale-105">
            B
          </span>
          <span className="tracking-tight">
            {site.name}
            <span className="ml-1.5 hidden text-sm font-normal text-muted sm:inline">
              / {site.role}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:border-accent/60 hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <GithubIcon />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-sm text-muted transition-colors hover:bg-card hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
