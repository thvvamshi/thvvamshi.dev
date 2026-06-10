import { motion } from "framer-motion";
import { Braces, CloudCog, Code2, Database, GitBranch, ServerCog } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";
import { skillGroups, skillSignals } from "../data/skills";

const icons = [Code2, Braces, ServerCog, Database, CloudCog, GitBranch];

export function SkillsSection() {
  return (
    <AnimatedSection id="skills" className="border-y border-white/[0.06] bg-white/[0.012]">
      <Container>
        <SectionHeader
          eyebrow="Technical Capability"
          title="A stack selected for shipping, scaling, and operating software."
          description="I combine product-minded frontend execution with backend depth, realtime infrastructure, data systems, and practical cloud delivery."
        />

        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="surface rounded-lg p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <p className="technical-label">Capability index</p>
                <p className="mt-2 text-lg font-black text-white">Engineering focus</p>
              </div>
              <span className="font-mono text-xs text-emerald-300">active</span>
            </div>

            <div className="grid gap-6">
              {skillSignals.map((signal, index) => (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-zinc-200">{signal.label}</p>
                    <p className="font-mono text-xs font-bold text-accent-300">{signal.value}%</p>
                  </div>
                  <div className="h-1 overflow-hidden bg-white/[0.08]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent-400 via-accent-300 to-emerald-300"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${signal.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 + index * 0.08 }}
                      role="progressbar"
                      aria-label={`${signal.label} proficiency`}
                      aria-valuenow={signal.value}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-5">
              <p className="text-sm leading-7 text-zinc-400">
                Strongest at connecting frontend experience to reliable APIs, data models,
                realtime events, and deployment workflows.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#08090a]">
            {skillGroups.map((group, index) => {
              const Icon = icons[index] ?? Code2;

              return (
                <motion.article
                  key={group.title}
                  className="group grid gap-4 border-b border-white/[0.08] p-5 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:items-center sm:p-6"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.035] text-accent-300 transition group-hover:border-accent-300/[0.35]">
                      <Icon size={17} />
                    </span>
                    <h3 className="text-sm font-black text-white">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {group.items.map((item) => (
                      <motion.span
                        key={item}
                        className="font-mono text-xs font-medium text-zinc-400 transition hover:text-accent-300"
                        whileHover={{ x: 2 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
