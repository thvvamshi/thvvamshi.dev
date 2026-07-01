import { projects } from "../content/projects";

export const getProjects = () => {
  const seen = new Set<string>();

  return projects.filter((project) => {
    const key = `${project.id.toLowerCase()}|${project.title.toLowerCase()}`;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

export const getFeaturedProjects = () =>
  getProjects().filter((project) => project.featured);

export const getProjectCategories = () =>
  Array.from(new Set(getProjects().map((project) => project.category))).sort();

export const getProjectTechnologies = () =>
  Array.from(
    new Set(getProjects().flatMap((project) => project.techStack)),
  ).sort();
