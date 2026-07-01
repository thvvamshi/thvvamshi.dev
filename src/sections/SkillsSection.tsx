import { motion } from "framer-motion";
import { AnimatedSection } from "../components/AnimatedSection";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";
import { skillMarks } from "../data/skills";

export function SkillsSection() {
  return (
    <AnimatedSection id="skills" className="border-y border-white/[0.06] bg-white/[0.012]">
      <Container>
        <SectionHeader
          eyebrow="Technical Capability"
          title="Stack"
        />

        <div className="surface rounded-2xl p-4 sm:p-5">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
            {skillMarks.map((mark, index) => {
              const Icon = mark.icon;

              return (
                <motion.button
                  key={mark.label}
                  type="button"
                  title={`${mark.label} - ${mark.category}`}
                  aria-label={`${mark.label} - ${mark.category}`}
                  className="group relative aspect-square rounded-2xl border border-zinc-800 bg-zinc-950/55 text-zinc-100 backdrop-blur-xl transition duration-300 hover:border-zinc-600 hover:bg-white/[0.05]"
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: index * 0.035 }}
                  whileHover={{ scale: 1.06, rotate: -1 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_56%)] opacity-70 transition group-hover:opacity-100" />
                  <span className="relative z-10 flex h-full items-center justify-center">
                    <Icon
                      className="h-7 w-7 transition duration-300 group-hover:scale-110"
                      style={{ color: mark.color ?? "#f5f5f5" }}
                    />
                  </span>
                  <span className="absolute inset-x-2 bottom-2 translate-y-1 rounded-md border border-zinc-800 bg-black/85 px-2 py-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-zinc-300 opacity-0 backdrop-blur-md transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    {mark.label}
                  </span>
                  <span className="absolute left-2 top-2 rounded-full border border-zinc-800 bg-black/70 px-2 py-1 text-[0.55rem] font-medium uppercase tracking-[0.12em] text-zinc-500 opacity-0 transition duration-200 group-hover:opacity-100">
                    {mark.category}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
