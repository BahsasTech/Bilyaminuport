import { cache } from "react";
import { site } from "@/content/site";
import { readStoredProfile } from "./storage";

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  url: string;
  github: string;
  githubHandle: string;
  availability: string;
  bio: string[];
  avatarUrl: string | null;
  resumeUrl: string | null;
  resumeSummary: string;
  updatedAt: string | null;
};

export const defaultProfile: Profile = {
  name: site.name,
  role: site.role,
  tagline: site.tagline,
  description: site.description,
  email: site.email,
  location: site.location,
  url: site.url,
  github: site.github,
  githubHandle: site.githubHandle,
  availability: site.availability,
  bio: [...site.bio],
  avatarUrl: null,
  resumeUrl: null,
  resumeSummary:
    "Full-stack software engineer who designs and ships production web systems for schools, cooperative societies and small businesses. Strong across PHP 8, Node.js, Next.js and TypeScript, with a focus on security, audit trails and end-to-end delivery.",
  updatedAt: null,
};

export const getProfile = cache(async (): Promise<Profile> => {
  const stored = await readStoredProfile();
  if (!stored) return defaultProfile;

  const bio = Array.isArray(stored.bio)
    ? stored.bio.filter(
        (paragraph): paragraph is string =>
          typeof paragraph === "string" && paragraph.trim().length > 0,
      )
    : [];

  return {
    ...defaultProfile,
    ...stored,
    name: stored.name?.trim() || defaultProfile.name,
    role: stored.role?.trim() || defaultProfile.role,
    tagline: stored.tagline?.trim() || defaultProfile.tagline,
    description: stored.description?.trim() || defaultProfile.description,
    email: stored.email?.trim() || defaultProfile.email,
    location: stored.location?.trim() || defaultProfile.location,
    github: stored.github?.trim() || defaultProfile.github,
    githubHandle: stored.githubHandle?.trim() || defaultProfile.githubHandle,
    availability: stored.availability?.trim() || defaultProfile.availability,
    bio: bio.length > 0 ? bio : defaultProfile.bio,
    avatarUrl:
      typeof stored.avatarUrl === "string" && stored.avatarUrl
        ? stored.avatarUrl
        : null,
    resumeUrl:
      typeof stored.resumeUrl === "string" && stored.resumeUrl
        ? stored.resumeUrl
        : null,
    resumeSummary:
      stored.resumeSummary?.trim() || defaultProfile.resumeSummary,
    updatedAt: stored.updatedAt ?? null,
  };
});
