import Link from "next/link";
import type { Milestone, Project } from "@/content/types";
import { isPair } from "@/content/types";
import { projectHref } from "@/lib/content";
import { Figure } from "../Figure";
import { MediaSwap } from "../MediaSwap";
import { StatusTag } from "../StatusTag";
import { LinkList } from "../LinkList";
import { T } from "../T";

export function FeatureLabel({ project, n }: { project: Project; n: number }) {
  return (
    <div className="f-label">
      <span className="f-label__n">{String(n).padStart(2, "0")}</span>
      <span className="f-label__domains">{project.domains.join(" / ")}</span>
      <StatusTag status={project.status} />
    </div>
  );
}

export function FeatureTitle({ project, size = "l" }: { project: Project; size?: "xl" | "l" | "m" }) {
  return (
    <>
      <h3 id={`${project.slug}-t`} className={`f-title f-title--${size}`}>
        {project.pageReady ? <Link href={projectHref(project)}>{project.title}</Link> : project.title}
      </h3>
      <p className="f-tagline">
        <T>{project.tagline}</T> <span className="f-tagline__sep">/</span> <T>{project.period}</T>
      </p>
    </>
  );
}

export function FeatureMedia({ project, priority }: { project: Project; priority?: boolean }) {
  const m = project.media;
  if (!m) return null;
  return isPair(m) ? (
    <MediaSwap pair={m} priority={priority} className="f-media" annotate={false} />
  ) : (
    <Figure figure={m} priority={priority} className="f-media" frame={project.composition === "app" ? "browser" : undefined} />
  );
}

export function Facts({ project, className = "" }: { project: Project; className?: string }) {
  if (!project.facts?.length) return null;
  return (
    <dl className={`spec ${className}`}>
      {project.facts.map((f) => (
        <div key={f.label} className="spec__row">
          <dt>{f.label}</dt>
          <dd><T>{f.value}</T></dd>
        </div>
      ))}
    </dl>
  );
}

export function Highlights({ project }: { project: Project }) {
  if (!project.highlights?.length) return null;
  return (
    <ul className="highlights">
      {project.highlights.map((h, i) => (
        <li key={i}><T>{h}</T></li>
      ))}
    </ul>
  );
}

export function CaseLink({ project }: { project: Project }) {
  if (project.pageReady) {
    return (
      <Link href={projectHref(project)} className="btn btn--primary">
        Open case study <span aria-hidden="true">→</span>
        <span className="sr-only">: {project.title}</span>
      </Link>
    );
  }
  return <span className="btn btn--ghost" aria-disabled="true">Case study in progress</span>;
}

export function FeatureFoot({ project }: { project: Project }) {
  return (
    <div className="f-foot">
      <CaseLink project={project} />
      {project.links && <LinkList links={project.links} variant="inline" />}
    </div>
  );
}

const STATE_LABEL: Record<Milestone["state"], string> = {
  completed: "Done",
  "in-progress": "In progress",
  planned: "Planned",
  unconfirmed: "Status needed",
};

export function Milestones({ items, title = "Milestones" }: { items: Milestone[]; title?: string }) {
  return (
    <div className="milestones">
      <p className="label">{title}</p>
      <ol>
        {items.map((m, i) => (
          <li key={i} className={`milestone milestone--${m.state}`}>
            <span className="milestone__dot" aria-hidden="true" />
            <span className="milestone__label"><T>{m.label}</T></span>
            <span className="milestone__state">
              {m.when ? <T>{m.when}</T> : STATE_LABEL[m.state]}
              <span className="sr-only"> — {STATE_LABEL[m.state]}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
