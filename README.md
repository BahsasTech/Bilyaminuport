# Bilyaminu Usman — Portfolio

A personal developer portfolio built with **Next.js 15 (App Router)** and **Tailwind CSS v4**, deployed free on **Vercel**.

Dark/light theme, fully responsive, zero UI dependencies, statically prerendered (so it stays fast and free on the Hobby plan).

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

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

## Project structure

```
src/
  app/
    layout.tsx      # metadata, fonts, no-flash theme script
    page.tsx        # page composition
    globals.css     # theme tokens (light/dark) + Tailwind entry
    icon.svg        # favicon
    robots.ts
    sitemap.ts
  components/
    header.tsx      # sticky nav + mobile menu
    hero.tsx
    about.tsx       # About + Skills sections
    projects.tsx    # filterable project grid (client component)
    contact.tsx     # Contact + Footer
    theme-toggle.tsx
    icons.tsx       # inline SVG icons (no icon library dependency)
  content/
    site.ts         # <- edit this
```

---

## Deploying to Vercel (free)

### Option A — Import from GitHub (recommended)

1. Push this folder to its **own GitHub repository** (see below).
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub.
3. Import the repository.
4. Leave **Framework Preset = Next.js** and **Build Command = `npm run build`** — both are detected automatically.
5. Click **Deploy**. You get a free `*.vercel.app` URL.
6. Optional: add a custom domain under **Settings → Domains**.

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

`node_modules`, `.next` and `.env*` are already excluded by `.gitignore`.

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
- **OneDrive**: this project lives in a OneDrive-synced folder. `node_modules` is
  large and syncs slowly — consider moving the project to a plain local folder
  (e.g. `C:\Projects\Portfolio`) if builds feel sluggish, or add the folder to
  OneDrive's "Files On-Demand" exclusion list.
