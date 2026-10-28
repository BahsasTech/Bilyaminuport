import Link from "next/link";
import { site } from "@/content/site";
import type { Profile } from "@/lib/profile";
import { ArrowRightIcon, DownloadIcon, FileTextIcon } from "./icons";

export function ResumeCta({ profile }: { profile: Profile }) {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 px-6 py-12 sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_20%_0%,var(--accent-glow),transparent_70%)]"
          />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
                <FileTextIcon className="h-4 w-4" />
                Resume
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                The full story, on one page
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                {profile.resumeSummary}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/resume"
                  className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Read the resume
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download PDF
                  </a>
                )}
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3">
              {site.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-background px-5 py-4"
                >
                  <dt className="text-xs text-muted">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
