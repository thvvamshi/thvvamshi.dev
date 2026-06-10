import { AnimatedSection } from "../components/AnimatedSection";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";
import { TimelineCard } from "../components/TimelineCard";
import { education } from "../data/education";
import { profile } from "../data/profile";

export function EducationSection() {
  return (
    <AnimatedSection id="education">
      <Container>
        <SectionHeader
          eyebrow="Education"
          title="Academic foundation."
          description="A multidisciplinary foundation spanning computer science, software engineering principles, and earlier training in electrical systems."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {education.map((item, index) => (
            <TimelineCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            className="focus-ring inline-flex items-center justify-center rounded-md bg-accent-400 px-6 py-3 text-sm font-black text-black transition hover:bg-accent-300"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Download Resume
          </a>
        </div>
      </Container>
    </AnimatedSection>
  );
}
