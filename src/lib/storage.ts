import { del, list, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Profile } from "./profile";

const PROFILE_PATHNAME = "portfolio/profile.json";
const UPLOAD_PREFIX = "portfolio/uploads/";
const DATA_DIR = path.join(process.cwd(), ".data");
const PROFILE_FILE = path.join(DATA_DIR, "profile.json");
const EDUCATION_FILE = path.join(DATA_DIR, "education.json");
const EXPERIENCE_FILE = path.join(DATA_DIR, "experience.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export function usesBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function readStoredProfile(): Promise<Partial<Profile> | null> {
  if (usesBlobStorage()) {
    try {
      const { blobs } = await list({ prefix: PROFILE_PATHNAME, limit: 10 });
      const blob = blobs.find((item) => item.pathname === PROFILE_PATHNAME);
      if (!blob) return null;

      const response = await fetch(blob.url, { cache: "no-store" });
      if (!response.ok) return null;

      return (await response.json()) as Partial<Profile>;
    } catch (error) {
      console.error("Could not read the profile from Vercel Blob.", error);
      return null;
    }
  }

  try {
    const raw = await fs.readFile(PROFILE_FILE, "utf8");
    return JSON.parse(raw) as Partial<Profile>;
  } catch {
    return null;
  }
}

export async function writeStoredProfile(profile: Profile): Promise<void> {
  const payload = JSON.stringify(profile, null, 2);

  if (usesBlobStorage()) {
    await put(PROFILE_PATHNAME, payload, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(PROFILE_FILE, payload, "utf8");
}

export async function readStoredEducation<T = unknown[]>(): Promise<T | null> {
  try {
    const raw = await fs.readFile(EDUCATION_FILE, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeStoredEducation<T = unknown>(data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(EDUCATION_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function readStoredExperience<T = unknown[]>(): Promise<T | null> {
  try {
    const raw = await fs.readFile(EXPERIENCE_FILE, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeStoredExperience<T = unknown>(data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(EXPERIENCE_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function readStoredProjects<T = unknown[]>(): Promise<T | null> {
  try {
    const raw = await fs.readFile(PROJECTS_FILE, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeStoredProjects<T = unknown>(data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(data, null, 2), "utf8");
}

export type UploadKind = "avatar" | "resume";

export async function saveUpload(
  file: File,
  kind: UploadKind,
): Promise<string> {
  const rawExtension = file.name.includes(".")
    ? file.name.split(".").pop() ?? ""
    : kind === "avatar"
      ? "png"
      : "pdf";
  const fallback = kind === "avatar" ? "png" : "pdf";
  const extension =
    rawExtension.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8) ||
    fallback;
  const filename = `${kind}-${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`;

  if (usesBlobStorage()) {
    const blob = await put(`${UPLOAD_PREFIX}${filename}`, file, {
      access: "public",
      contentType: file.type || undefined,
      addRandomSuffix: false,
    });
    return blob.url;
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), bytes);
  return `/uploads/${filename}`;
}

export async function deleteAsset(
  url: string | null | undefined,
): Promise<void> {
  if (!url) return;

  try {
    if (url.startsWith("/uploads/")) {
      await fs.unlink(path.join(UPLOAD_DIR, path.basename(url)));
      return;
    }

    if (url.startsWith("https://") && usesBlobStorage()) {
      await del(url);
    }
  } catch (error) {
    console.error("Could not remove the previous file.", error);
  }
}
