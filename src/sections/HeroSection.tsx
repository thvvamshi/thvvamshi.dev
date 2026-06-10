import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Cpu,
  Github,
  Linkedin,
  Server,
  Terminal,
} from "lucide-react";
import { Container } from "../components/Container";
import { profile } from "../data/profile";
import { socials } from "../data/socials";

const systemSignals = [
  { label: "Architecture", value: "Event-driven", icon: Cpu },
  { label: "Runtime", value: "Cloud-native", icon: Server },
  { label: "Delivery", value: "Production-ready", icon: Check },
];

const consoleLines = [
  { key: "role", value: '"Software Engineer"', tone: "text-cyan-300" },
  { key: "focus", value: '["Backend", "Distributed Systems"]', tone: "text-accent-300" },
  { key: "building", value: '"Cloud + AI applications"', tone: "text-emerald-300" },
  { key: "status", value: '"open_to_engineering"', tone: "text-violet-300" },
];

function socialHref(label: string) {
  return socials.find((social) => social.label === label)?.href ?? "#";
}

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden border-b border-white/[0.06] pt-20">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#060708_0%,#090b0d_58%,#060708_100%)]" />
      <Container className="grid min-h-[calc(100vh-5rem)] items-center gap-14 py-16 lg:grid-cols-[minmax(0,1.06fr)_minmax(24rem,0.74fr)] lg:gap-16 lg:py-20">
        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>
              Available for engineering roles
            </span>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-zinc-600">
              Warangal, India
            </span>
          </div>

          <motion.h1
            className="max-w-5xl break-words text-4xl font-black leading-[1.02] tracking-normal text-white min-[375px]:text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            I engineer reliable
            <span className="block text-accent-400">production systems.</span>
          </motion.h1>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
          >
            <span className="text-lg font-black text-white sm:text-xl">{profile.name}</span>
            <span className="h-1 w-1 rounded-full bg-accent-300" />
            <span className="text-sm font-semibold text-zinc-400 sm:text-base">{profile.title}</span>
          </motion.div>

          <motion.p
            className="mt-6 max-w-2xl text-pretty text-base leading-8 text-zinc-400 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {profile.about} I work across event-driven architecture, cloud infrastructure,
            realtime systems, and AI-powered products.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6 }}
          >
            <a
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-accent-400 px-5 py-3 text-sm font-black text-black transition hover:bg-accent-300"
              href="#projects"
            >
              Explore my work
              <ArrowDown size={16} />
            </a>
            <a
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/[0.12] bg-white/[0.035] px-5 py-3 text-sm font-bold text-white transition hover:border-white/25 hover:bg-white/[0.07]"
              href={socialHref("GitHub")}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} />
              GitHub profile
              <ArrowUpRight size={14} className="text-zinc-500" />
            </a>
            <a
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/[0.12] text-zinc-400 transition hover:border-accent-300/40 hover:text-accent-300"
              href={socialHref("LinkedIn")}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={17} />
            </a>
          </motion.div>

          <motion.div
            className="mt-12 grid max-w-3xl border-y border-white/[0.08] sm:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.48 } },
            }}
          >
            {systemSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <motion.div
                  key={signal.label}
                  className="flex items-center gap-3 border-b border-white/[0.08] py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Icon size={17} className="text-accent-300" />
                  <div>
                    <p className="technical-label">{signal.label}</p>
                    <p className="mt-1 text-sm font-bold text-zinc-200">{signal.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto min-w-0 w-full max-w-[32rem]"
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="surface relative overflow-hidden rounded-lg">
            <div className="flex h-11 items-center justify-between border-b border-white/[0.08] bg-black/25 px-4">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-accent-300" />
                <span className="font-mono text-[0.68rem] font-semibold text-zinc-400">
                  engineer.profile.ts
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-zinc-700" />
                <span className="h-2 w-2 rounded-full bg-zinc-700" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            <div className="grid sm:grid-cols-[0.82fr_1.18fr]">
              <div className="relative min-h-80 overflow-hidden border-b border-white/[0.08] sm:min-h-64 sm:border-b-0 sm:border-r">
                <img
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-90 sm:object-center"
                  src={profile.heroImage}
                  alt="Portrait of Vamshi Kumar"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-lg font-black text-white">{profile.name}</p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent-300">
                    Backend / Cloud / AI
                  </p>
                </div>
              </div>

              <div className="min-w-0 overflow-hidden bg-[#08090b] p-5 font-mono text-xs leading-7 sm:p-6">
                <p className="text-zinc-600">// Engineering profile</p>
                <p className="mt-2 text-zinc-300">
                  <span className="text-violet-300">const</span>{" "}
                  <span className="text-cyan-300">vamshi</span>{" "}
                  <span className="text-zinc-500">=</span> {"{"}
                </p>
                {consoleLines.map((line) => (
                  <p key={line.key} className="break-words pl-4 text-zinc-500">
                    <span className="text-zinc-300">{line.key}</span>:{" "}
                    <span className={line.tone}>{line.value}</span>,
                  </p>
                ))}
                <p className="text-zinc-300">{"};"}</p>
                <div className="mt-5 border-t border-white/[0.08] pt-4">
                  <p className="flex items-center gap-2 text-emerald-300">
                    <Check size={13} />
                    system status: healthy
                  </p>
                  <p className="mt-1 text-zinc-600">last deploy: portfolio@v2</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-3 hidden border border-accent-300/25 bg-[#0a0b0d] px-4 py-3 shadow-glass sm:block">
            <p className="technical-label">Current focus</p>
            <p className="mt-1 text-sm font-bold text-white">Distributed systems</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
