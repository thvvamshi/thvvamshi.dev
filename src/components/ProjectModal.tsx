import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { useEffect } from "react";
import type { Project } from "../types/project";
import { Badge } from "./Badge";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/[0.78] p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onMouseDown={onClose}
        >
          <motion.div
            className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg border border-white/[0.12] bg-ink-900 shadow-2xl"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/8] max-h-72 overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-black/40" />
              <button
                className="focus-ring absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-black/[0.45] text-white backdrop-blur-md transition hover:bg-white/10"
                type="button"
                aria-label="Close project details"
                onClick={onClose}
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(90vh-18rem)] overflow-y-auto p-6 sm:p-8">
              <p className="technical-label text-accent-300">
                {project.category}
              </p>
              <h3 id="project-modal-title" className="mt-3 text-2xl font-black text-white sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-5 text-base leading-8 text-zinc-300">{project.description}</p>

              {project.highlights?.length ? (
                <div className="mt-7 border-y border-white/10 bg-white/[0.025] py-5">
                  <h4 className="technical-label">
                    System Highlights
                  </h4>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-300">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent-300" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-7 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="focus-ring inline-flex items-center gap-2 rounded-md bg-accent-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-accent-300"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={16} />
                  View GitHub
                </a>
                {project.liveUrl ? (
                  <a
                    className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-5 py-3 text-sm font-bold text-white transition hover:border-accent-300/60 hover:text-accent-300"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={16} />
                    Open Live
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
