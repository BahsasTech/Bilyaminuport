import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getProfile } from "@/lib/profile";
import "./globals.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();

  return {
    metadataBase: new URL(profile.url),
    title: {
      default: `${profile.name} - ${profile.role}`,
      template: `%s | ${profile.name}`,
    },
    description: profile.description,
    keywords: [
      profile.name,
      profile.githubHandle,
      "software engineer",
      "full-stack developer",
      "web developer",
      "PHP developer",
      "Node.js developer",
      "Next.js developer",
      "school management system",
      "cooperative society software",
      profile.location,
    ],
    authors: [{ name: profile.name, url: profile.github }],
    creator: profile.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: profile.url,
      siteName: profile.name,
      title: `${profile.name} - ${profile.role}`,
      description: profile.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name} - ${profile.role}`,
      description: profile.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(t!=="light"&&m)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
