"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import type { Profile } from "@/lib/profile";
import {
  ArrowRightIcon,
  FileTextIcon,
  GithubIcon,
  LocationIcon,
  MailIcon,
} from "./icons";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Hero({ profile, gallery = [] }: { profile: Profile; gallery?: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = gallery.length > 0 ? gallery : (profile.avatarUrl ? [profile.avatarUrl] : []);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

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

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-3 text-lg font-medium text-accent sm:text-xl">
            {profile.role}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View my work
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FileTextIcon className="h-4 w-4" />
              View resume
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <MailIcon className="h-4 w-4" />
              Get in touch
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <GithubIcon className="h-4 w-4" />
              {profile.githubHandle}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <LocationIcon className="h-4 w-4" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <MailIcon className="h-4 w-4" />
              {profile.email}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(circle_at_35%_25%,var(--accent-glow),transparent_65%)]"
          />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border shadow-2xl shadow-accent/10">
            {images.length > 0 ? (
              <>
                {images.map((src, idx) => (
                  <Image
                    key={idx}
                    src={src}
                    alt={`Portrait ${idx + 1} of ${profile.name}`}
                    fill
                    priority={idx === 0}
                    unoptimized
                    className={`object-cover transition-opacity duration-1000 ${idx === currentIndex ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? "w-6 bg-accent" : "w-1.5 bg-white/60"}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-card text-6xl font-bold text-accent">
                {initials(profile.name)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
