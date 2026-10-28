import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import {
  adminUsesDefaultPassword,
  isAdminConfigured,
  isAuthenticated,
} from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin");
  }

  const configured = isAdminConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          ← Back to portfolio
        </Link>

        <div className="mt-6 rounded-2xl border border-border bg-card/40 p-7 shadow-sm sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Admin
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-muted">
            Manage your profile picture, resume PDF and public profile details.
          </p>

          <div className="mt-7">
            {configured ? (
              <LoginForm
                hint={
                  adminUsesDefaultPassword()
                    ? "Development mode: the default password is “admin”. Set ADMIN_PASSWORD in .env.local to change it."
                    : undefined
                }
              />
            ) : (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                Admin access is not configured. Set the{" "}
                <code className="font-mono">ADMIN_PASSWORD</code> environment
                variable, then reload this page.
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Protected by a signed, HTTP-only session cookie.
        </p>
      </div>
    </main>
  );
}
