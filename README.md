# Bilyaminu Usman — Portfolio

A personal developer portfolio built with **Next.js 15 (App Router)** and **Tailwind CSS v4**, deployed free on **Vercel**.

Dark/light theme, fully responsive, zero UI dependencies, plus a password-protected admin area for updating the profile picture, resume and profile details.

---

## Quick start

```bash
npm install
Copy-Item .env.example .env.local   # PowerShell
# cp .env.example .env.local        # macOS / Linux
npm run dev                         # http://localhost:3000
```

Without `ADMIN_PASSWORD`, development falls back to the password `admin`. Set it
in `.env.local` before deploying.

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npx tsc --noEmit # type check
```

---

## Editing the content

**Almost everything you'll want to change lives in one file:**

```
src/content/site.ts
```

It exports:

| Export         | What it controls                                              |
| -------------- | ------------------------------------------------------------- |
| `site`         | Name, role, tagline, bio, email, GitHub URL, location, stats  |
| `skillGroups`  | The four skill cards and their items                          |
| `projects`     | All 8 project cards — title, summary, description, stack, etc. |
| `navLinks`     | The header navigation links                                   |

To add a project, append an object to the `projects` array:

```ts
{
  slug: "my-new-app",
  title: "My New App",
  summary: "One-line pitch shown in bold.",
  description: "The longer paragraph.",
  category: "Education",           // Education | Finance | Commerce | Tooling
  year: "2026",
  stack: ["Next.js", "TypeScript"],
  highlights: ["Thing it does", "Another thing"],
  repo: "https://github.com/...",   // optional
  live: "https://...",              // optional
  featured: true,                   // optional
}
```

The filter buttons above the project grid are generated from the `category` values automatically.

### Changing the site URL

`site.url` defaults to `https://bahsastech.vercel.app`. Once Vercel gives you your
real domain, either edit that value or set an environment variable:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

It feeds the canonical URL, Open Graph tags, `sitemap.xml` and `robots.txt`.

---

## Admin dashboard

The site includes a small, self-contained admin area:

| Route          | What it does                                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `/admin/login` | Single-password sign in using `ADMIN_PASSWORD`.                                                                                    |
| `/admin`       | Upload or replace the profile picture and resume PDF, and edit name, role, tagline, bio, contact links, availability and summary. |
| `/resume`      | Public web resume built from the profile, with print/save-as-PDF and an optional uploaded PDF download.                            |

Authentication uses a signed, HTTP-only session cookie valid for 8 hours. Password
comparison and signature verification are constant-time. Set a long random
`ADMIN_SESSION_SECRET` in production.

### Storage

| Environment                           | Profile data             | Uploaded files                   |
| ------------------------------------- | ------------------------ | -------------------------------- |
| Local development                     | `.data/profile.json`     | `public/uploads/`                |
| Production with `BLOB_READ_WRITE_TOKEN` | Vercel Blob              | Vercel Blob (`portfolio/uploads/`) |

To enable production uploads:

1. In the Vercel dashboard open **Storage → Create → Blob**, then connect the store to the project.
2. Add `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` and `BLOB_READ_WRITE_TOKEN` under **Settings → Environment Variables**.
3. Redeploy.

Without a Blob token, Vercel's filesystem is read-only/ephemeral, so profile edits
and uploads will not persist. The public site still works using the defaults in
`src/content/site.ts`.

`site.ts` remains the source of truth for skills, projects, stats and navigation;
the admin dashboard only overrides the profile fields listed above.

---

## Project structure

```
src/
  app/
    layout.tsx          # metadata, fonts, no-flash theme script
    page.tsx            # page composition
    globals.css         # theme tokens (light/dark), Tailwind entry, print styles
    icon.svg            # favicon
    robots.ts
    sitemap.ts
    resume/page.tsx     # public web resume
    admin/
      actions.ts        # login/logout + profile and upload server actions
      login/page.tsx    # public sign-in page
      (dashboard)/
        layout.tsx      # auth guard + admin chrome
        page.tsx        # dashboard
  components/
    header.tsx          # sticky nav + mobile menu
    hero.tsx            # hero with profile picture and resume CTA
    about.tsx           # About + Skills sections
    projects.tsx        # filterable project grid (client component)
    resume-cta.tsx      # resume teaser on the home page
    contact.tsx         # Contact + Footer
    theme-toggle.tsx
    print-button.tsx
    icons.tsx           # inline SVG icons (no icon library dependency)
    admin/
      login-form.tsx
      admin-dashboard.tsx
  content/
    site.ts             # skills, projects, stats, nav + profile defaults
  lib/
    auth.ts             # password check, signed session cookie
    profile.ts          # profile type, defaults and merge logic
    storage.ts          # Vercel Blob / local file storage
    forms.ts            # shared server-action state type
```


---

## Deploying to Vercel (free)

### Option A — Import from GitHub (recommended)

1. Push this folder to its **own GitHub repository** (see below).
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub.
3. Import the repository.
4. Leave **Framework Preset = Next.js** and **Build Command = `npm run build`** — both are detected automatically.
5. Add the environment variables from `.env.example` (**Settings → Environment Variables**), including a Vercel Blob token so admin uploads persist.
6. Click **Deploy**. You get a free `*.vercel.app` URL.
7. Optional: add a custom domain under **Settings → Domains**.

### Option B — Deploy from the command line

```bash
npm i -g vercel
vercel          # first run: link the project to your account
vercel --prod   # production deploy
```

### Option C — Drag and drop

Run `npm run build`, then upload the `.next` folder contents… — actually for a Next.js
project use `vercel deploy` instead; drag-and-drop works best for plain static sites.

---

## Giving this folder its own Git repository

This folder currently sits inside a larger repository. To deploy it on its own and
keep it independent:

```bash
cd "C:\Users\USER\OneDrive\Documents\MyProject\Portfolio"
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

`node_modules`, `.next`, `.data`, uploaded files and `.env*` are already excluded
by `.gitignore`; `.env.example` is intentionally kept.

---

## Customising the theme

Colours are CSS custom properties in `src/app/globals.css`:

```css
:root {
  --accent: #0f766e;      /* teal — change to your brand colour */
  --accent-glow: rgba(15, 118, 110, 0.14);
}

.dark {
  --accent: #2dd4bf;
  --accent-glow: rgba(45, 212, 191, 0.12);
}
```

The default theme follows the visitor's OS preference and remembers the manual
toggle in `localStorage` under the `theme` key.

---

## Notes

- **Node version**: Node 20.9+ is required by Next.js 15. Use Node 22 or newer.
- **Admin security**: use a strong, unique `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`.
  The session cookie lasts 8 hours. `/admin` is excluded from search engines and
  `robots.txt`, but the real protection is the password.
- **Uploads**: local development writes to `.data/profile.json` and `public/uploads/`.
  In production, set `BLOB_READ_WRITE_TOKEN` so edits survive deployments.
- **OneDrive**: this project lives in a OneDrive-synced folder. `node_modules` is
  large and syncs slowly — consider moving the project to a plain local folder
  (e.g. `C:\Projects\Portfolio`) if builds feel sluggish, or add the folder to
  OneDrive's "Files On-Demand" exclusion list.
