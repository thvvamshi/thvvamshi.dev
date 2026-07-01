import { AnimatedSection } from "../components/AnimatedSection";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";
import { TimelineCard } from "../components/TimelineCard";
import { experience } from "../data/experience";

export function ExperienceSection() {
  return (
    <AnimatedSection id="experience" className="border-y border-white/[0.06] bg-white/[0.012]">
      <Container>
        <SectionHeader
          eyebrow="Experience"
          title="Selected work"
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {experience.map((item, index) => (
            <TimelineCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
