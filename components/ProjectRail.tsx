import Link from "next/link";
import type { Project } from "@/content/types";
import { projectHref } from "@/lib/content";
import { StatusTag } from "./StatusTag";
import { T } from "./T";

/** Compact index of every project, for quick navigation. */
export function ProjectRail({ projects }: { projects: Project[] }) {
  return (
    <nav className="rail" aria-label="All projects">
      <p className="label">Index</p>
      <ol>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link href={projectHref(p)} className="rail__row">
              <span className="rail__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="rail__title">{p.title}</span>
              <span className="rail__meta">{p.domains[0]} · <T>{p.period}</T></span>
              <StatusTag status={p.status} />
            </Link>
          </li>
        ))}
        <li>
          <Link href="/#robotics" className="rail__row">
            <span className="rail__n">{String(projects.length + 1).padStart(2, "0")}</span>
            <span className="rail__title">Competition Robotics</span>
            <span className="rail__meta">Robotics · 2024–26</span>
            <StatusTag status="completed" />
          </Link>
        </li>
      </ol>
    </nav>
  );
}
