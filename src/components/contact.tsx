import Link from "next/link";
import type { Profile } from "@/lib/profile";
import { ArrowRightIcon, GithubIcon, MailIcon } from "./icons";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-border bg-card/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-background px-6 py-14 sm:px-14 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_0%,var(--accent-glow),transparent_70%)]"
          />
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s build something together
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              I&apos;m open to freelance projects, contract work and full-time
              engineering roles. If you have a system that needs designing,
              hardening or shipping, I&apos;d like to hear about it.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <MailIcon className="h-4 w-4" />
                {profile.email}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <GithubIcon className="h-4 w-4" />
                {profile.githubHandle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js &amp;
          Tailwind CSS.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="#top"
            className="transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Back to top
          </a>
          <Link
            href="/resume"
            className="transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Resume
          </Link>
          <Link
            href="/admin"
            className="transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Admin
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
