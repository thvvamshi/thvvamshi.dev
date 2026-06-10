import { lazy, Suspense } from "react";
import { AboutSection } from "../sections/AboutSection";
import { ContactSection } from "../sections/ContactSection";
import { EducationSection } from "../sections/EducationSection";
import { ExperienceSection } from "../sections/ExperienceSection";
import { Footer } from "../sections/Footer";
import { HeroSection } from "../sections/HeroSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { SkillsSection } from "../sections/SkillsSection";

const GitHubActivitySection = lazy(() =>
  import("../sections/GitHubActivitySection").then((module) => ({
    default: module.GitHubActivitySection,
  })),
);

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-20 text-center text-sm font-semibold text-zinc-500 sm:px-6 lg:px-8">
            Loading GitHub activity...
          </div>
        }
      >
        <GitHubActivitySection />
      </Suspense>
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
