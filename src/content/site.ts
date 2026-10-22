export const site = {
  name: "Bilyaminu Usman",
  role: "Software Engineer",
  tagline:
    "I design and build production-grade web systems — school platforms, cooperative societies and financial tools — with security, audit trails and tests baked in.",
  description:
    "Portfolio of BahsasTech, a full-stack developer building school management systems, cooperative society platforms and financial web apps with PHP, Node.js, Next.js and TypeScript.",
  email: "mbusman11@gmail.com",
  location: "Lagos, Nigeria",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bahsastech.vercel.app",
  github: "https://github.com/BahsasTech",
  githubHandle: "BahsasTech",
  availability: "Open to freelance and full-time roles",
  bio: [
    "I'm a self-taught software engineer with a strong bias toward systems that survive real use: role-based access control, audit logging, prepared statements, hashed credentials and automated tests.",
    "I've shipped domain-heavy products across education and cooperative finance — result processing and report cards for schools, double-entry accounting for savings and loan societies, and approval workflows for staff development. Most of my work lives in PHP 8 and Node.js on the server, with Next.js, React and TypeScript on the client.",
    "I work end to end: schema design, REST APIs, authentication, payment gateways, notification delivery, PDF generation and deployment.",
  ],
  stats: [
    { label: "Projects shipped", value: "8+" },
    { label: "Database tables designed", value: "24" },
    { label: "User roles supported", value: "9" },
    { label: "Languages & frameworks", value: "12+" },
  ],
} as const;

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "React 19",
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Material UI",
      "shadcn/ui",
      "JavaScript (ES2022)",
      "HTML5 & CSS3",
      "Recharts / Chart.js",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express",
      "PHP 8 (MVC)",
      "REST API design",
      "JWT sessions",
      "Argon2id / bcrypt / scrypt",
      "CSRF & rate limiting",
      "CLI tooling",
    ],
  },
  {
    title: "Data & Infrastructure",
    items: [
      "MySQL / MariaDB",
      "SQLite (node:sqlite)",
      "Prisma ORM",
      "Schema design",
      "Double-entry accounting",
      "Git & GitHub",
      "Vite",
      "Vitest & Playwright",
      "Headless Chromium",
    ],
  },
  {
    title: "Platform & Integrations",
    items: [
      "Paystack",
      "Remita",
      "Termii SMS",
      "Twilio",
      "SMTP email",
      "PDF report generation",
      "CSV import / export",
      "Vercel",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: "Education" | "Finance" | "Commerce" | "Tooling";
  year: string;
  stack: string[];
  highlights: string[];
  repo?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "bahsad-school-management",
    title: "BAHSAD School Management & Result Processing",
    summary:
      "Next.js rewrite of a legacy PHP school platform — result processing, report cards and fees.",
    description:
      "A full rebuild of a school management system on Next.js 15 with the App Router, server actions and a typed Prisma schema. Covers the full academic pipeline: continuous assessment, grading scales, attendance, behavioural and psychomotor assessments, student promotion, fee invoices and payments, and a parent portal. Rebuilt report-card PDF generation on headless Chromium after the original export path proved unreliable.",
    category: "Education",
    year: "2026",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "shadcn/ui",
      "Prisma",
      "Vitest",
      "Playwright",
    ],
    highlights: [
      "Six delivery phases, from result processing through to fees and payments",
      "Role-based access control with Argon2id-hashed sessions",
      "Report-card PDF export rendered via headless Chromium",
      "Unit tests with Vitest plus a Playwright browser smoke suite",
    ],
    featured: true,
  },
  {
    slug: "lsds",
    title: "LSDS — Learning & Staff Development System",
    summary:
      "Training approval workflow and document repository for staff development programmes.",
    description:
      "A PHP API paired with a vanilla-JavaScript admin SPA for managing staff training requests. Training runs through a multi-stage approval workflow, and the platform doubles as a repository for documents, videos and session records, with disbursement tracking and a full audit trail over every action.",
    category: "Education",
    year: "2025",
    stack: ["PHP 8", "MySQL", "REST API", "Vanilla JS", "SPA architecture"],
    highlights: [
      "26 controllers and repositories behind a front-controller router",
      "Multi-stage approval workflow with disbursement tracking",
      "30+ hand-written JavaScript modules for the admin SPA",
      "Audit trail records every state change",
    ],
    featured: true,
  },
  {
    slug: "umpcsl",
    title: "UMPCSL — Cooperative Society Management",
    summary:
      "Multi-purpose cooperative society platform with savings, loans and double-entry accounting.",
    description:
      "The core system for a multi-purpose cooperative society: membership and KYC, savings accounts, loan origination and servicing, a double-entry accounting engine, inventory with an e-store, and payment collection through Paystack and Remita. Members receive SMS and email notifications, and a CSV importer migrates legacy member records.",
    category: "Finance",
    year: "2025",
    stack: ["PHP 8", "MySQL / MariaDB", "Bootstrap 5", "Paystack", "Remita", "Termii"],
    highlights: [
      "Double-entry accounting engine for savings and loan ledgers",
      "Paystack and Remita payment gateways wired end to end",
      "SMS and email notifications via Termii, Twilio and SMTP",
      "CSV legacy member migrator with validation",
    ],
    featured: true,
  },
  {
    slug: "unity-savings-loan",
    title: "Unity Savings & Loan Portal",
    summary:
      "A dependency-free savings and loan portal built on Node's built-in SQLite.",
    description:
      "Deliberately zero-dependency: a raw node:http server, the built-in node:sqlite driver, scrypt password hashing and a hand-rolled JSON API, with a multi-page admin and member portal on the front end. Small, fast and auditable end to end.",
    category: "Finance",
    year: "2025",
    stack: ["Node.js", "node:http", "node:sqlite", "scrypt", "Vanilla JS"],
    highlights: [
      "Zero runtime dependencies — only Node's standard library",
      "scrypt password hashing with per-user salts",
      "Separate admin and member portals",
      "Hand-written JSON API and router",
    ],
    featured: true,
  },
  {
    slug: "edumanage",
    title: "EduManage — School Management System",
    summary:
      "Express and SQLite school platform with role-scoped portals for four user types.",
    description:
      "A school management system on Node and Express backed by SQLite, with JWT authentication and bcrypt password hashing. Four distinct roles — admin, teacher, student and parent — each get their own scoped portal and API surface.",
    category: "Education",
    year: "2025",
    stack: ["Node.js", "Express", "node:sqlite", "JWT", "bcrypt", "Vanilla ES Modules"],
    highlights: [
      "Four role-scoped portals: admin, teacher, student and parent",
      "JWT authentication with bcrypt password hashing",
      "REST API served from an Express backend",
      "ES-module front end with no framework overhead",
    ],
  },
  {
    slug: "bahsad-php",
    title: "BAHSAD — PHP 8 MVC School System",
    summary:
      "Framework-free PHP 8 MVC application on a 24-table MySQL schema with 9 roles.",
    description:
      "The original and still-running school system, hand-written without a framework: a custom router, view layer, auth layer, database abstraction, audit logging and XLSX export. The schema covers 24 tables across nine roles, includes QR-coded report cards, and was designed multi-school from the start so it can scale into a SaaS model.",
    category: "Education",
    year: "2024",
    stack: ["PHP 8", "MySQL / MariaDB", "Bootstrap 5", "Chart.js", "MVC"],
    highlights: [
      "Custom router, views, auth and database layer — no framework",
      "24-table schema with prepared statements throughout",
      "9 distinct user roles with permission checks",
      "QR-coded report cards, audit log and backup tooling",
    ],
  },
  {
    slug: "kasuwan-zazzau",
    title: "Kasuwan Zazzau — E-Commerce Marketplace",
    summary:
      "A Naira-priced product marketplace, built twice: vanilla JavaScript and React.",
    description:
      "A storefront with product listings, product detail pages and a persistent shopping cart. The first pass was plain HTML, CSS and JavaScript with a localStorage-backed cart; the second was a full rewrite on Vite with React 19, TypeScript and Material UI — a direct comparison of the two approaches for the same product.",
    category: "Commerce",
    year: "2024",
    stack: ["React 19", "TypeScript", "Vite", "Material UI", "React Router", "Vanilla JS"],
    highlights: [
      "Rebuilt from vanilla JavaScript onto a typed React stack",
      "Persistent shopping cart backed by localStorage",
      "Product listing and detail routes with React Router",
      "Material UI component system with toast feedback",
    ],
  },
  {
    slug: "developer-tools",
    title: "Company Name Generator & IP Generator",
    summary:
      "Two standalone browser tools: brand name generation and IPv4/IPv6 subnetting.",
    description:
      "A company name generator that assembles brand suggestions and copies them to the clipboard, and an IP generator that produces IPv4 and IPv6 addresses, computes subnets and exports results as CSV or TXT. Both are dependency-free browser tools built to be fast and genuinely useful rather than decorative.",
    category: "Tooling",
    year: "2024",
    stack: ["JavaScript", "HTML5", "CSS3", "BigInt bitwise math"],
    highlights: [
      "IPv4 and IPv6 generation with subnet calculation",
      "CSV and TXT export of generated results",
      "Clipboard copy for brand name suggestions",
      "Zero dependencies, loads instantly in the browser",
    ],
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;
