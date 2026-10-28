import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getProfile } from "@/lib/profile";
import { usesBlobStorage } from "@/lib/storage";
import { GalleryManager } from "@/components/admin/gallery-manager";
import { getGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Profile - Admin",
  robots: { index: false, follow: false },
};

export default async function ProfileAdminPage() {
  const profile = await getProfile();
  const blobStorage = usesBlobStorage();
  const gallery = await getGalleryImages();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Profile & Resume</h1>
        <p className="mt-2 text-muted">Manage your personal information, profile picture, and CV.</p>
        <p className={`mt-4 rounded-xl border px-4 py-3 text-sm ${blobStorage ? "border-accent/30 bg-accent/10 text-accent" : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200"}`}>
          {blobStorage ? "Storage: Vercel Blob. Uploads persist across deployments." : "Storage: local fallback. Files are written to public/uploads and .data on this machine."}
        </p>
      </div>
      <AdminDashboard profile={profile} />
      <GalleryManager images={gallery} />
    </div>
  );
}
