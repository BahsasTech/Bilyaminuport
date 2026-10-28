import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  DownloadIcon,
  GithubIcon,
  LocationIcon,
  MailIcon,
} from "@/components/icons";
import { PrintButton } from "@/components/print-button";
import { projects, skillGroups } from "@/content/site";
import { getProfile } from "@/lib/profile";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: "Resume",
    description: `Resume of ${profile.name}, ${profile.role}.`,
  };
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function ResumePage() {
  const profile = await getProfile();
  const featured = projects.filter((project) => project.featured);

  return (
    <main className="min-h-screen bg-card/30 px-5 py-10 print:min-h-0 print:bg-white print:p-0">
      <div className="mx-auto max-w-4xl">
        <div className="no-print flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            ← Back to portfolio
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <PrintButton />
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <DownloadIcon className="h-4 w-4" />
                Download PDF
              </a>
            )}
          </div>
        </div>

        <article className="mt-6 overflow-hidden rounded-3xl border border-border bg-background shadow-sm print:mt-0 print:rounded-none print:border-0 print:shadow-none">
          <header className="border-b border-border bg-card/40 px-6 py-8 sm:px-10 print:bg-white print:px-0">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              {profile.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt={`Portrait of ${profile.name}`}
                  width={128}
                  height={128}
                  priority
                  unoptimized
                  className="h-24 w-24 shrink-0 rounded-full border border-border object-cover sm:h-28 sm:w-28"
                />
              ) : (
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-border bg-card text-2xl font-bold text-accent sm:h-28 sm:w-28">
                  {initials(profile.name)}
                </div>
              )}

              <div className="min-w-0">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {profile.name}
                </h1>
                <p className="mt-1 text-lg font-medium text-accent">
                  {profile.role}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                  <span className="inline-flex items-center gap-2">
                    <LocationIcon className="h-4 w-4" />
                    {profile.location}
                  </span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                  >
                    <MailIcon className="h-4 w-4" />
                    {profile.email}
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                  >
                    <GithubIcon className="h-4 w-4" />
                    {profile.githubHandle}
                  </a>
                </div>
              </div>
            </div>
          </header>

          <div className="space-y-8 px-6 py-8 sm:px-10 print:space-y-6 print:px-0 print:py-6">
            <section className="break-inside-avoid">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
                Summary
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {profile.resumeSummary}
              </p>
            </section>

            <section className="break-inside-avoid">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
                Core skills
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-xl border border-border bg-card/40 px-4 py-3 print:border-0 print:bg-white print:px-0 print:py-1"
                  >
                    <h3 className="text-sm font-semibold text-foreground">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {group.items.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
                Selected projects
              </h2>
              <div className="mt-3 space-y-5">
                {featured.map((project) => (
                  <div
                    key={project.slug}
                    className="break-inside-avoid border-l-2 border-accent/30 pl-4"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <span className="text-xs text-muted">{project.year}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <p className="mt-1.5 text-xs text-muted">
                      <span className="font-medium text-foreground/80">
                        Stack:
                      </span>{" "}
                      {project.stack.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="break-inside-avoid">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
                Experience
              </h2>
              <div className="mt-3 space-y-4">
                <div className="break-inside-avoid border-l-2 border-accent/30 pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">Graduate Assistant</h3>
                    <span className="text-xs text-muted">April 2025 – Present</span>
                  </div>
                  <p className="text-xs text-muted">Iconic Open University | Sokoto, Nigeria</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-muted">
                    <li>Assist lecturers with academic activities and instructional delivery.</li>
                    <li>Support student supervision and academic development.</li>
                    <li>Assist with practical sessions and learning activities.</li>
                    <li>Contribute to an effective teaching and learning environment.</li>
                  </ul>
                </div>
                <div className="break-inside-avoid border-l-2 border-accent/30 pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">Lecturer</h3>
                    <span className="text-xs text-muted">January 2025 – March 2025</span>
                  </div>
                  <p className="text-xs text-muted">The Genus Computer Academy | Birnin Kebbi, Nigeria</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-muted">
                    <li>Delivered lectures and supported students in their learning activities.</li>
                    <li>Applied communication and instructional skills to explain technical concepts.</li>
                    <li>Supported students&apos; academic development.</li>
                  </ul>
                </div>
                <div className="break-inside-avoid border-l-2 border-accent/30 pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">Assistant Lecturer — NYSC</h3>
                    <span className="text-xs text-muted">2019–2020</span>
                  </div>
                  <p className="text-xs text-muted">Institute of Cooperative Security and Intelligence Studies | Kano, Nigeria</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-muted">
                    <li>Supported teaching and academic activities.</li>
                    <li>Assisted students with their learning and understanding of course materials.</li>
                    <li>Contributed to instructional and departmental activities.</li>
                  </ul>
                </div>
                <div className="break-inside-avoid border-l-2 border-accent/30 pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">General Manager</h3>
                    <span className="text-xs text-muted">2020–2024</span>
                  </div>
                  <p className="text-xs text-muted">Amas General Merchant and Service Ltd | Kano, Nigeria</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-muted">
                    <li>Supported business operations and day-to-day management.</li>
                    <li>Applied leadership, coordination, and organisational skills.</li>
                    <li>Contributed to business administration and operational activities.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="break-inside-avoid">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
                Education &amp; Certifications
              </h2>
              <div className="mt-3 space-y-4">
                <div className="break-inside-avoid border-l-2 border-accent/30 pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">Bachelor of Science (BSc), Computer Science</h3>
                    <span className="text-xs text-muted">2015–2018</span>
                  </div>
                  <p className="text-xs text-muted">Kebbi State University of Science and Technology, Aliero</p>
                </div>
                <div className="break-inside-avoid border-l-2 border-accent/30 pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">Diploma in Website Design and Graphics</h3>
                    <span className="text-xs text-muted">2013–2014</span>
                  </div>
                  <p className="text-xs text-muted">SIIT</p>
                </div>
                <div className="break-inside-avoid border-l-2 border-accent/30 pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">National Diploma (ND), Computer Science</h3>
                    <span className="text-xs text-muted">2011–2013</span>
                  </div>
                  <p className="text-xs text-muted">Waziri Umaru Federal Polytechnic, Birnin Kebbi</p>
                </div>
                <div className="break-inside-avoid border-l-2 border-accent/30 pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">Senior Secondary School Certificate</h3>
                    <span className="text-xs text-muted">2010</span>
                  </div>
                  <p className="text-xs text-muted">Government Day Secondary School, Kalgo</p>
                </div>
                <div className="break-inside-avoid border-l-2 border-accent/30 pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">Senior Secondary School Certificate</h3>
                    <span className="text-xs text-muted">2004–2009</span>
                  </div>
                  <p className="text-xs text-muted">Army Day Secondary School, Birnin Kebbi</p>
                </div>
                <div className="break-inside-avoid border-l-2 border-accent/30 pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">Primary School Certificate</h3>
                    <span className="text-xs text-muted">1999–2004</span>
                  </div>
                  <p className="text-xs text-muted">Waziri Umaru Nizzamiyya Model Primary School</p>
                </div>
              </div>
            </section>

            <section className="break-inside-avoid rounded-2xl border border-border bg-card/40 px-5 py-4 print:border-0 print:bg-white print:px-0">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
                Availability
              </h2>
              <p className="mt-2 text-sm font-medium text-foreground">
                {profile.availability}
              </p>
              <p className="mt-1 text-sm text-muted">
                {profile.location} · {profile.email} · {profile.githubHandle}
              </p>
            </section>
          </div>
        </article>

        <p className="no-print mt-6 text-center text-xs text-muted">
          Use “Print / Save as PDF” for a clean, paper-friendly copy.
        </p>
      </div>
    </main>
  );
}
