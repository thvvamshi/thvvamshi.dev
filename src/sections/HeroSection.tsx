import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { Container } from "../components/Container";
import { profile } from "../data/profile";
import { socials } from "../data/socials";

function socialHref(label: string) {
  return socials.find((social) => social.label === label)?.href ?? "#";
}

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-zinc-800/70">
      <div className="absolute inset-0 -z-10 bg-black" />

      <Container className="min-w-0 pt-1 pb-8 sm:pt-2 sm:pb-10 lg:pt-3 lg:pb-12">
        <div className="grid min-w-0 items-center gap-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(18rem,0.82fr)] lg:gap-10">
          <motion.div
            className="surface relative overflow-hidden rounded-[1.5rem] border border-zinc-800/80 bg-zinc-950/55 p-5 sm:p-6 lg:p-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_55%)]" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[0.64rem] font-medium uppercase tracking-[0.16em] text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]" />
                Live - Open for Software Engineer roles
              </span>

              <h1 className="mt-5 max-w-[12ch] text-balance text-[2.1rem] font-semibold leading-[0.98] tracking-tight text-zinc-50 sm:text-4xl lg:text-4xl">
                Software Engineer
                <br />
                building backend systems.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-[0.98rem]">
                Distributed systems, cloud infrastructure, AI products.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-50 transition hover:scale-[1.02] hover:border-zinc-600 hover:bg-white/[0.08]"
                  href="#projects"
                >
                  View projects
                  <ArrowDown size={16} />
                </a>
                <a
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-transparent px-5 py-3 text-sm font-medium text-zinc-200 transition hover:scale-[1.02] hover:border-zinc-600 hover:bg-white/[0.04]"
                  href={socialHref("GitHub")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} />
                  GitHub
                  <ArrowUpRight size={14} className="text-zinc-500" />
                </a>
                <a
                  className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-white/[0.04] text-zinc-300 transition hover:scale-[1.02] hover:border-zinc-600 hover:text-zinc-50"
                  href={socialHref("LinkedIn")}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={17} />
                </a>
              </div>

            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full min-w-0 max-w-[22rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[1.5rem] border border-zinc-700/70 bg-zinc-950/70 shadow-glass backdrop-blur-xl">
              <img
                className="aspect-[4/5] w-full object-cover object-top sm:aspect-[5/6]"
                src={profile.heroImage}
                alt="Portrait of Vamshi Kumar"
                decoding="async"
                fetchPriority="high"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-4 pt-20">
                <p className="text-sm font-medium text-zinc-50">{profile.name}</p>
                <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-zinc-500">
                  Software Engineer
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
