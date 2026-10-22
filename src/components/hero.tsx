import { site } from "@/content/site";
import { ArrowRightIcon, GithubIcon, LocationIcon, MailIcon } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--accent-glow),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]"
      />

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {site.availability}
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {site.name}
          </h1>

          <p className="mt-3 text-lg font-medium text-accent sm:text-xl">
            {site.role}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {site.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View my work
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <MailIcon className="h-4 w-4" />
              Get in touch
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <GithubIcon className="h-4 w-4" />
              {site.githubHandle}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <LocationIcon className="h-4 w-4" />
              {site.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <MailIcon className="h-4 w-4" />
              {site.email}
            </span>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="bg-background px-6 py-7">
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
