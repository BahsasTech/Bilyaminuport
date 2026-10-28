import { About, Skills } from "@/components/about";
import { Contact, Footer } from "@/components/contact";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { ResumeCta } from "@/components/resume-cta";
import { getProfile } from "@/lib/profile";
import { getGalleryImages } from "@/lib/gallery";

export default async function Home() {
  const profile = await getProfile();
  const gallery = await getGalleryImages();

  return (
    <>
      <Header profile={profile} />
      <main>
        <Hero profile={profile} gallery={gallery} />
        <About profile={profile} />
        <Skills />
        <Projects />
        <ResumeCta profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
