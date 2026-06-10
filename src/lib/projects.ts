import { projects } from "../content/projects";

export const getProjects = () => projects;

export const getFeaturedProjects = () =>
  getProjects().filter((project) => project.featured);

export const getProjectCategories = () =>
  Array.from(new Set(getProjects().map((project) => project.category))).sort();

export const getProjectTechnologies = () =>
  Array.from(
    new Set(getProjects().flatMap((project) => project.techStack)),
  ).sort();
