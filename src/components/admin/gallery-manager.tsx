"use client";

import Image from "next/image";
import { useActionState } from "react";
import { uploadGalleryAction } from "@/app/admin/actions";
import type { ActionState } from "@/lib/forms";

const initialState: ActionState = {};

const buttonClass =
  "inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60";

function Status({ state }: { state: ActionState }) {
  if (state.error) {
    return <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>;
  }
  if (state.ok && state.message) {
    return <p role="status" className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-accent">{state.message}</p>;
  }
  return null;
}

export function GalleryManager({ images }: { images: string[] }) {
  const [state, action, pending] = useActionState(uploadGalleryAction, initialState);

  return (
    <section className="rounded-2xl border border-border bg-card/40 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Photo Gallery / Slideshow</h2>
        <p className="mt-1 text-sm text-muted">Upload pictures to display in the homepage slideshow.</p>
      </div>

      <form action={action} className="mb-6 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[200px]">
          <input
            type="file"
            name="gallery"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            required
            className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-card file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-background"
          />
        </div>
        <button type="submit" disabled={pending} className={buttonClass}>
          {pending ? "Uploading..." : "Add to Gallery"}
        </button>
      </form>
      <Status state={state} />

      {images.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl border border-border">
              <Image src={src} alt={`Gallery image ${idx + 1}`} width={400} height={300} className="aspect-[4/3] w-full object-cover" unoptimized />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-center text-sm text-muted">No images in gallery yet.</p>
      )}
    </section>
  );
}
