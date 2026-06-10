import { Brain, Cloud, DatabaseZap, Network } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";
import { profile } from "../data/profile";

const focusAreas = [
  {
    title: "Backend Engineering",
    description: "APIs, auth, data modeling, realtime services, and maintainable server architecture.",
    icon: DatabaseZap,
  },
  {
    title: "Distributed Systems",
    description: "Event-driven workflows, queues, streaming, async workers, and failure-aware design.",
    icon: Network,
  },
  {
    title: "Cloud Infrastructure",
    description: "Dockerized workloads, AWS services, deployment automation, and CI/CD workflows.",
    icon: Cloud,
  },
  {
    title: "AI Applications",
    description: "LLM integrations, voice interactions, async AI pipelines, and product-grade UX.",
    icon: Brain,
  },
];

export function AboutSection() {
  return (
    <AnimatedSection id="about">
      <Container>
        <SectionHeader
          eyebrow="About Me"
          title="Software engineer with a systems mindset."
          description="I care about the full path from a clear product interface to the backend architecture, infrastructure, and operational decisions that keep it reliable."
        />

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <div className="surface relative overflow-hidden rounded-lg p-6 sm:p-8">
            <div className="absolute left-0 top-8 h-20 w-px bg-accent-300" />
            <p className="text-xl font-semibold leading-9 text-zinc-100">{profile.about}</p>
            <p className="mt-5 leading-8 text-zinc-300">{profile.interests}</p>
            <p className="mt-5 leading-8 text-zinc-300">{profile.philosophy}</p>

            <dl className="mt-8 grid gap-0 border-t border-white/[0.08]">
              {profile.details.map((detail) => (
                <div
                  key={detail.label}
                  className="grid gap-1 border-b border-white/[0.08] py-3 sm:grid-cols-[8rem_1fr]"
                >
                  <dt className="technical-label">
                    {detail.label}
                  </dt>
                  <dd className="break-words text-sm font-semibold text-zinc-100 sm:text-base">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
                  className={`surface-interactive group relative overflow-hidden rounded-lg p-6 ${
                    index === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="absolute right-4 top-3 font-mono text-5xl font-black text-white/[0.025]">
                    0{index + 1}
                  </span>
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-md border border-accent-300/25 bg-accent-300/[0.07] text-accent-300 transition group-hover:border-accent-300/50">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{area.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{area.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
