import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { Container } from "../components/Container";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { SectionHeader } from "../components/SectionHeader";
import {
  getProjectCategories,
  getProjects,
  getProjectTechnologies,
} from "../lib/projects";
import type { Project } from "../types/project";

const allFilter = "All";
const initialProjectCount = 6;
const maxProjectCount = 10;

export function ProjectsSection() {
  const projects = useMemo(() => {
    const seen = new Set<string>();

    return getProjects().filter((project) => {
      const key = `${project.title.toLowerCase()}|${project.category.toLowerCase()}`;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }, []);
  const categories = useMemo(() => [allFilter, ...getProjectCategories()], []);
  const technologies = useMemo(() => [allFilter, ...getProjectTechnologies()], []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(allFilter);
  const [technology, setTechnology] = useState(allFilter);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        [project.title, project.description, project.category, ...project.techStack]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesCategory = category === allFilter || project.category === category;
      const matchesTechnology =
        technology === allFilter || project.techStack.includes(technology);

      return matchesSearch && matchesCategory && matchesTechnology;
    });
  }, [category, projects, search, technology]);

  const visibleProjects = showAllProjects
    ? filteredProjects.slice(0, maxProjectCount)
    : filteredProjects.slice(0, initialProjectCount);

  const clearFilters = () => {
    setSearch("");
    setCategory(allFilter);
    setTechnology(allFilter);
    setShowAllProjects(false);
  };

  return (
    <AnimatedSection id="projects">
      <Container>
        <SectionHeader
          eyebrow="Engineering Work"
          title="Selected projects."
          description="A focused archive of backend platforms, distributed systems, realtime applications, and AI products."
        />

        <div className="surface mb-8 rounded-lg p-3 sm:p-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search projects</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                className="focus-ring h-11 w-full rounded-md border border-white/10 bg-black/30 pl-12 pr-4 text-sm font-medium text-white transition placeholder:text-zinc-600 focus:border-accent-300/60"
                type="search"
                value={search}
                placeholder="Search projects, technologies, or categories"
                onChange={(event) => {
                  setSearch(event.target.value);
                  setShowAllProjects(false);
                }}
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2 lg:w-[28rem]">
              <label className="relative">
                <span className="sr-only">Filter by technology</span>
                <select
                  className="focus-ring h-11 w-full appearance-none rounded-md border border-white/10 bg-black/30 px-4 pr-10 text-xs font-semibold text-white transition focus:border-accent-300/60"
                  value={technology}
                  onChange={(event) => {
                    setTechnology(event.target.value);
                    setShowAllProjects(false);
                  }}
                >
                  {technologies.map((item) => (
                    <option key={item} value={item}>
                      {item === allFilter ? "All technologies" : item}
                    </option>
                  ))}
                </select>
                <SlidersHorizontal
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={17}
                />
              </label>
              <button
                className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/10 px-4 text-xs font-bold text-zinc-400 transition hover:border-accent-300/60 hover:text-accent-300"
                type="button"
                onClick={clearFilters}
              >
                <X size={16} />
                Clear
              </button>
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto border-t border-white/[0.08] pt-3">
            {categories.map((item) => {
              const isActive = item === category;

              return (
                <button
                  key={item}
                  className={`focus-ring whitespace-nowrap rounded-md border px-3 py-2 text-xs font-bold transition ${
                    isActive
                      ? "border-accent-300 bg-accent-300 text-black"
                      : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-accent-300/60 hover:text-accent-300"
                  }`}
                  type="button"
                  onClick={() => {
                    setCategory(item);
                    setShowAllProjects(false);
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="technical-label text-accent-300">Project archive</p>
            <h3 className="mt-2 text-xl font-black text-white">Focused repository work.</h3>
          </div>
          <p className="text-xs font-semibold text-zinc-500">
            {filteredProjects.length} result{filteredProjects.length === 1 ? "" : "s"} indexed
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredProjects.length ? (
            <motion.div
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
              layout
              initial={false}
            >
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={setSelectedProject}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="rounded-lg border border-white/10 bg-white/[0.035] p-8 text-center"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
            >
              <p className="text-lg font-bold text-white">No projects match the current filters.</p>
              <p className="mt-2 text-sm text-zinc-400">
                Try clearing search, category, or technology filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProjects.length > initialProjectCount ? (
          <div className="mt-8 flex justify-center">
            <button
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-accent-300/30 bg-accent-300/[0.07] px-5 py-3 text-sm font-black text-accent-300 transition hover:border-accent-300/60 hover:bg-accent-300/[0.12]"
              type="button"
              onClick={() => setShowAllProjects((current) => !current)}
            >
              {showAllProjects ? (
                <>
                  View Less
                  <ChevronUp size={17} />
                </>
              ) : (
                <>
                  View More
                  <ChevronDown size={17} />
                </>
              )}
            </button>
          </div>
        ) : null}

        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </Container>
    </AnimatedSection>
  );
}
