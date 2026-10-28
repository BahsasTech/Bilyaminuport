"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearSessionCookie,
  isAuthenticated,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";
import type { ActionState } from "@/lib/forms";
import {
  defaultProfile,
  getProfile,
  type Profile,
} from "@/lib/profile";
import {
  deleteAsset,
  saveUpload,
  writeStoredProfile,
  writeStoredEducation,
  writeStoredExperience,
  writeStoredProjects,
} from "@/lib/storage";
import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { usesBlobStorage } from "@/lib/storage";

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;
const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const MAX_GALLERY_BYTES = 10 * 1024 * 1024;

async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}

function readText(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function refreshPublicPages(): void {
  revalidatePath("/", "layout");
  revalidatePath("/resume");
  revalidatePath("/admin");
}

export async function loginAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");

  if (!password) {
    return { error: "Enter your password." };
  }

  if (!(await verifyPassword(password))) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { error: "Incorrect password. Try again." };
  }

  await setSessionCookie();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function saveProfileAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAuthenticated())) {
    return { error: "Your session expired. Sign in again." };
  }

  const current = await getProfile();
  const name = readText(formData, "name");
  const role = readText(formData, "role");
  const email = readText(formData, "email");

  if (!name || !role || !email) {
    return { error: "Name, role and email are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }

  const bio = readText(formData, "bio")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .slice(0, 8);

  const next: Profile = {
    ...current,
    name: name.slice(0, 120),
    role: role.slice(0, 120),
    tagline: readText(formData, "tagline").slice(0, 400),
    description: readText(formData, "description").slice(0, 400),
    email: email.slice(0, 160),
    location: readText(formData, "location").slice(0, 120),
    github: readText(formData, "github").slice(0, 300),
    githubHandle: readText(formData, "githubHandle").slice(0, 80),
    availability: readText(formData, "availability").slice(0, 160),
    resumeSummary: readText(formData, "resumeSummary").slice(0, 2000),
    bio: bio.length > 0 ? bio : defaultProfile.bio,
    updatedAt: new Date().toISOString(),
  };

  try {
    await writeStoredProfile(next);
  } catch (error) {
    console.error("Could not save the profile.", error);
    return {
      error: "Could not save the profile. Check the storage configuration and try again.",
    };
  }

  refreshPublicPages();
  return { ok: true, message: "Profile saved." };
}

export async function uploadAvatarAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAuthenticated())) {
    return { error: "Your session expired. Sign in again." };
  }

  const file = formData.get("avatar");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image to upload." };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "The profile picture must be an image file." };
  }

  if (file.size > MAX_AVATAR_BYTES) {
    return { error: "The profile picture must be 5 MB or smaller." };
  }

  const current = await getProfile();

  try {
    const url = await saveUpload(file, "avatar");
    await writeStoredProfile({
      ...current,
      avatarUrl: url,
      updatedAt: new Date().toISOString(),
    });
    await deleteAsset(current.avatarUrl);
  } catch (error) {
    console.error("Could not upload the profile picture.", error);
    return {
      error: "Could not upload the picture. Check the storage configuration and try again.",
    };
  }

  refreshPublicPages();
  return { ok: true, message: "Profile picture updated." };
}

export async function uploadResumeAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAuthenticated())) {
    return { error: "Your session expired. Sign in again." };
  }

  const file = formData.get("resume");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a PDF to upload." };
  }

  const looksLikePdf =
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

  if (!looksLikePdf) {
    return { error: "The resume must be a PDF file." };
  }

  if (file.size > MAX_RESUME_BYTES) {
    return { error: "The resume PDF must be 10 MB or smaller." };
  }

  const current = await getProfile();

  try {
    const url = await saveUpload(file, "resume");
    await writeStoredProfile({
      ...current,
      resumeUrl: url,
      updatedAt: new Date().toISOString(),
    });
    await deleteAsset(current.resumeUrl);
  } catch (error) {
    console.error("Could not upload the resume.", error);
    return {
      error: "Could not upload the resume. Check the storage configuration and try again.",
    };
  }

  refreshPublicPages();
  return { ok: true, message: "Resume PDF updated." };
}

export async function uploadGalleryAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAuthenticated())) {
    return { error: "Your session expired. Sign in again." };
  }

  const file = formData.get("gallery");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image to upload." };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "The file must be an image." };
  }

  if (file.size > MAX_GALLERY_BYTES) {
    return { error: "The image must be 10 MB or smaller." };
  }

  const rawExtension = file.name.includes(".")
    ? file.name.split(".").pop() ?? ""
    : "jpg";
  const extension = rawExtension.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8) || "jpg";
  const filename = `gallery-${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`;

  try {
    if (usesBlobStorage()) {
      await put(`portfolio/gallery/${filename}`, file, {
        access: "public",
        contentType: file.type || undefined,
        addRandomSuffix: false,
      });
    } else {
      const galleryDir = path.join(process.cwd(), "public", "uploads", "gallery");
      await fs.mkdir(galleryDir, { recursive: true });
      const bytes = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(galleryDir, filename), bytes);
    }
  } catch (error) {
    console.error("Could not upload to gallery.", error);
    return { error: "Could not upload the image. Try again." };
  }

  refreshPublicPages();
  return { ok: true, message: "Image added to gallery." };
}

export async function removeAvatarAction(): Promise<void> {
  await requireAdmin();
  const current = await getProfile();
  await writeStoredProfile({
    ...current,
    avatarUrl: null,
    updatedAt: new Date().toISOString(),
  });
  await deleteAsset(current.avatarUrl);
  refreshPublicPages();
}

export async function removeResumeAction(): Promise<void> {
  await requireAdmin();
  const current = await getProfile();
  await writeStoredProfile({
    ...current,
    resumeUrl: null,
    updatedAt: new Date().toISOString(),
  });
  await deleteAsset(current.resumeUrl);
  refreshPublicPages();
}

export async function saveEducationAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const items = JSON.parse(String(formData.get("items") ?? "[]"));
  await writeStoredEducation(items);
  revalidatePath("/resume");
  revalidatePath("/");
}

export async function saveExperienceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const items = JSON.parse(String(formData.get("items") ?? "[]"));
  await writeStoredExperience(items);
  revalidatePath("/resume");
  revalidatePath("/");
}

export async function saveProjectsAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const items = JSON.parse(String(formData.get("items") ?? "[]"));
  await writeStoredProjects(items);
  revalidatePath("/resume");
  revalidatePath("/");
}
