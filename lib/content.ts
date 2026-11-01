import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

export const allProjects = (): Project[] => projects;

export const featuredProjects = (): Project[] => projects.filter((p) => p.featured);

export const readyProjects = (): Project[] => projects.filter((p) => p.pageReady);

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

/** Case-study page if it exists, otherwise the project's feature on the homepage. */
export const projectHref = (p: Project) => (p.pageReady ? `/projects/${p.slug}` : `/#${p.slug}`);

/** The next featured project, wrapping around. */
export const nextProject = (slug: string): Project => {
  const list = featuredProjects();
  const i = list.findIndex((p) => p.slug === slug);
  return list[(i + 1) % list.length];
};
