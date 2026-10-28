import { promises as fs } from "node:fs";
import path from "node:path";
import { list } from "@vercel/blob";
import { usesBlobStorage } from "./storage";

const GALLERY_DIR = path.join(process.cwd(), "public", "uploads", "gallery");
const GALLERY_PREFIX = "portfolio/gallery/";

export async function getGalleryImages(): Promise<string[]> {
  if (usesBlobStorage()) {
    try {
      const { blobs } = await list({ prefix: GALLERY_PREFIX, limit: 100 });
      return blobs
        .filter((b: { pathname: string }) => b.pathname.startsWith(GALLERY_PREFIX))
        .map((b: { url: string }) => b.url)
        .sort();
    } catch (error) {
      console.error("Could not read gallery from Vercel Blob.", error);
      return [];
    }
  }

  try {
    const entries = await fs.readdir(GALLERY_DIR);
    const files = entries
      .filter((name) => /\.(jpe?g|png|webp|gif|avif)$/i.test(name))
      .sort();
    return files.map((name) => `/uploads/gallery/${name}`);
  } catch {
    return [];
  }
}
