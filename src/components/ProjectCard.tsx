import { motion } from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";
import { memo } from "react";
import type { Project } from "../types/project";
import { Badge } from "./Badge";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

function ProjectCardComponent({ project, index, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      className="surface-interactive group flex h-full flex-col overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
    >
      <div className="flex h-9 items-center justify-between border-b border-white/[0.08] bg-black/25 px-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            {project.category}
          </span>
        </div>
        <span className="font-mono text-[0.62rem] text-zinc-700">{project.id}.tsx</span>
      </div>

      <button
        className="focus-ring relative block aspect-[16/8.5] w-full overflow-hidden text-left"
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open details for ${project.title}`}
      >
        <img
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          src={project.image}
          alt={`${project.title} preview`}
          loading={project.featured ? "eager" : "lazy"}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#08090a] to-transparent" />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <button
            className="focus-ring text-left text-base font-black leading-6 text-white transition group-hover:text-accent-300"
            type="button"
            onClick={() => onOpen(project)}
          >
            {project.title}
          </button>
          {project.featured ? (
            <span className="rounded-md border border-accent-300/20 bg-accent-300/[0.07] px-2 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-accent-300">
              Case Study
            </span>
          ) : null}
        </div>

        <p className="line-clamp-3 text-xs leading-6 text-zinc-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.techStack.length > 4 ? <Badge>+{project.techStack.length - 4}</Badge> : null}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-white/[0.08] pt-4">
          <a
            className="focus-ring inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-[0.68rem] font-bold text-zinc-300 transition hover:border-accent-300/60 hover:text-accent-300"
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={14} />
            GitHub
          </a>
          {project.liveUrl ? (
            <a
              className="focus-ring inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-[0.68rem] font-bold text-zinc-300 transition hover:border-accent-300/60 hover:text-accent-300"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={14} />
              Live
            </a>
          ) : null}
          <button
            className="focus-ring ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[0.68rem] font-bold text-zinc-500 transition hover:text-white"
            type="button"
            onClick={() => onOpen(project)}
          >
            <Layers size={14} />
            Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export const ProjectCard = memo(ProjectCardComponent);
