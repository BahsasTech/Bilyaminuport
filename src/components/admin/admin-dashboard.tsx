"use client";

import Image from "next/image";
import { useActionState } from "react";
import {
  removeAvatarAction,
  removeResumeAction,
  saveProfileAction,
  uploadAvatarAction,
  uploadResumeAction,
} from "@/app/admin/actions";
import type { ActionState } from "@/lib/forms";
import type { Profile } from "@/lib/profile";

const initialState: ActionState = {};

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20";

const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

const buttonClass =
  "inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60";

function Status({ state }: { state: ActionState }) {
  if (state.error) {
    return (
      <p
        role="alert"
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
      >
        {state.error}
      </p>
    );
  }

  if (state.ok && state.message) {
    return (
      <p
        role="status"
        className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-accent"
      >
        {state.message}
      </p>
    );
  }

  return null;
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

export function AdminDashboard({ profile }: { profile: Profile }) {
  const [profileState, profileAction, profilePending] = useActionState(
    saveProfileAction,
    initialState,
  );
  const [avatarState, avatarAction, avatarPending] = useActionState(
    uploadAvatarAction,
    initialState,
  );
  const [resumeState, resumeAction, resumePending] = useActionState(
    uploadResumeAction,
    initialState,
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="text-lg font-semibold text-foreground">
            Profile picture
          </h2>
          <p className="mt-1 text-sm text-muted">
            Shown in the hero and on your resume page. PNG, JPG, WebP or GIF up
            to 5 MB.
          </p>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                width={112}
                height={112}
                unoptimized
                className="h-28 w-28 shrink-0 rounded-full border border-border object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-dashed border-border bg-background text-2xl font-bold text-muted">
                {initials(profile.name)}
              </div>
            )}

            <form
              key={profile.avatarUrl ?? "no-avatar"}
              action={avatarAction}
              className="min-w-0 flex-1 space-y-3"
            >
              <input
                type="file"
                name="avatar"
                accept="image/png,image/jpeg,image/webp,image/gif"
                required
                className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-card file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-background"
              />
              <button
                type="submit"
                disabled={avatarPending}
                className={buttonClass}
              >
                {avatarPending ? "Uploading…" : "Upload picture"}
              </button>
              <Status state={avatarState} />
            </form>
          </div>

          {profile.avatarUrl && (
            <form action={removeAvatarAction} className="mt-4">
              <button
                type="submit"
                className="text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400"
              >
                Remove picture
              </button>
            </form>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="text-lg font-semibold text-foreground">
            Resume PDF
          </h2>
          <p className="mt-1 text-sm text-muted">
            Upload the PDF people can download. The web resume page is built
            from the profile below. PDF up to 10 MB.
          </p>

          <form
            key={profile.resumeUrl ?? "no-resume"}
            action={resumeAction}
            className="mt-5 space-y-3"
          >
            <input
              type="file"
              name="resume"
              accept="application/pdf,.pdf"
              required
              className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-card file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-background"
            />
            <button
              type="submit"
              disabled={resumePending}
              className={buttonClass}
            >
              {resumePending ? "Uploading…" : "Upload resume PDF"}
            </button>
            <Status state={resumeState} />
          </form>

          {profile.resumeUrl ? (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-accent hover:underline"
              >
                View current PDF
              </a>
              <form action={removeResumeAction}>
                <button
                  type="submit"
                  className="font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400"
                >
                  Remove PDF
                </button>
              </form>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">
              No PDF uploaded yet. The resume page still works without one.
            </p>
          )}
        </section>
      </div>

      <section className="rounded-2xl border border-border bg-card/40 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Profile details
          </h2>
          <p className="mt-1 text-sm text-muted">
            These values update the hero, about section, contact links, SEO
            metadata and the resume page.
          </p>
        </div>

        <form
          key={profile.updatedAt ?? "profile"}
          action={profileAction}
          className="space-y-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                defaultValue={profile.name}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="role" className={labelClass}>
                Role
              </label>
              <input
                id="role"
                name="role"
                required
                defaultValue={profile.role}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                defaultValue={profile.email}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="location" className={labelClass}>
                Location
              </label>
              <input
                id="location"
                name="location"
                defaultValue={profile.location}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="github" className={labelClass}>
                GitHub URL
              </label>
              <input
                id="github"
                name="github"
                type="url"
                defaultValue={profile.github}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="githubHandle" className={labelClass}>
                GitHub handle
              </label>
              <input
                id="githubHandle"
                name="githubHandle"
                defaultValue={profile.githubHandle}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="availability" className={labelClass}>
              Availability badge
            </label>
            <input
              id="availability"
              name="availability"
              defaultValue={profile.availability}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="tagline" className={labelClass}>
              Hero tagline
            </label>
            <textarea
              id="tagline"
              name="tagline"
              rows={3}
              defaultValue={profile.tagline}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              SEO description
            </label>
            <textarea
              id="description"
              name="description"
              rows={2}
              defaultValue={profile.description}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="resumeSummary" className={labelClass}>
              Resume summary
            </label>
            <textarea
              id="resumeSummary"
              name="resumeSummary"
              rows={4}
              defaultValue={profile.resumeSummary}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="bio" className={labelClass}>
              About paragraphs
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={8}
              defaultValue={profile.bio.join("\n\n")}
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-muted">
              Separate paragraphs with a blank line.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={profilePending}
              className={buttonClass}
            >
              {profilePending ? "Saving…" : "Save profile"}
            </button>
            <Status state={profileState} />
          </div>
        </form>
      </section>
    </div>
  );
}
