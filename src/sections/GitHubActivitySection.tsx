import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";
import { github } from "../data/github";

const githubPanels = [
  {
    label: "GitHub stats",
    src: github.stats,
    alt: "GitHub stats for thvvamshi",
    className: "lg:col-span-7",
  },
  {
    label: "Top languages",
    src: github.languages,
    alt: "Top GitHub languages for thvvamshi",
    className: "lg:col-span-5",
  },
  {
    label: "Contribution streak",
    src: github.streak,
    alt: "GitHub streak for thvvamshi",
    className: "lg:col-span-5",
  },
  {
    label: "Contribution graph",
    src: github.contributions,
    alt: "GitHub contribution chart for thvvamshi",
    className: "lg:col-span-7",
    wide: true,
  },
];

export function GitHubActivitySection() {
  return (
    <AnimatedSection id="github">
      <Container>
        <SectionHeader
          eyebrow="GitHub Activity"
          title="The work is visible in the repository history."
          description="A live development signal covering repository activity, contribution rhythm, language distribution, and consistent hands-on engineering."
        />

        <div className="grid gap-4 lg:grid-cols-12">
          {githubPanels.map((panel) => (
            <a
              key={panel.label}
              className={`surface-interactive group overflow-hidden rounded-lg ${panel.className}`}
              href={github.profileUrl}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex h-11 items-center justify-between border-b border-white/[0.08] bg-black/20 px-4">
                <div className="flex items-center gap-2">
                  <Github size={15} className="text-accent-300" />
                  <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                    {panel.label}
                  </span>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-zinc-600 transition group-hover:text-accent-300"
                />
              </div>
              <div className={`bg-[#08090a] p-4 ${panel.wide ? "overflow-x-auto" : ""}`}>
                <img
                  className={`${panel.wide ? "min-w-[40rem]" : "w-full"} rounded-md`}
                  src={panel.src}
                  alt={panel.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
