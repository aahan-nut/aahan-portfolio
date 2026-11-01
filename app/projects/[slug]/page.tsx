import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, nextProject, projectHref, readyProjects } from "@/lib/content";
import { isPair, isTodo, type Project } from "@/content/types";
import { Diagram } from "@/components/diagrams";
import { SystemDiagram } from "@/components/diagrams/SystemDiagram";
import { Explainers } from "@/components/Explainer";
import { Figure } from "@/components/Figure";
import { LinkList } from "@/components/LinkList";
import { MediaSwap } from "@/components/MediaSwap";
import { Milestones } from "@/components/features/parts";
import { Paras, T } from "@/components/T";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Reveal } from "@/components/Reveal";
import { StatusTag } from "@/components/StatusTag";
import { Toc } from "@/components/Toc";

export const dynamicParams = false;

export function generateStaticParams() {
  return readyProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: p.title, description: isTodo(p.summary) ? undefined : p.summary };
}

type SectionDef = { id: string; label: string; render: (p: Project) => React.ReactNode };

/** Order and labels of the case-study sections. Sections without content are skipped. */
const SECTIONS: SectionDef[] = [
  {
    id: "overview",
    label: "Overview",
    render: (p) => p.overview && <div className="prose prose--lead"><Paras items={p.overview} /></div>,
  },
  {
    id: "contribution",
    label: "My contribution",
    render: (p) =>
      p.contribution && (
        <>
          <ol className="contrib">
            {p.contribution.items.map((item, i) => (
              <li key={i}>
                <span className="contrib__n">{String(i + 1).padStart(2, "0")}</span>
                <T>{item}</T>
              </li>
            ))}
          </ol>
          {p.contribution.note && <div className="contrib__note"><T as="p">{p.contribution.note}</T></div>}
        </>
      ),
  },
  {
    id: "how-it-works",
    label: "How it works",
    render: (p) => {
      if (!p.howItWorks) return null;
      const h = p.howItWorks;
      // Fig. 01 is the lead image (when there is one); number the rest in reading order.
      let n = p.media ? 1 : 0;
      const fig = () => `Fig. ${String(++n).padStart(2, "0")}`;
      return (
        <>
          <div className="prose"><Paras items={h.body} /></div>
          {p.secondary && (
            <Reveal className="how__figure"><Figure figure={p.secondary} index={fig()} /></Reveal>
          )}
          {h.system && (
            <Reveal className="how__figure"><SystemDiagram data={h.system} index={fig()} /></Reveal>
          )}
          {h.diagram && (
            <Reveal className="how__figure"><Diagram id={h.diagram} index={fig()} milestones={p.milestones} /></Reveal>
          )}
          {h.explainers && (
            <>
              <p className="label how__label">Technical detail — expand to read</p>
              <Explainers items={h.explainers} />
            </>
          )}
          {h.gallery && (
            <div className="gallery">
              {h.gallery.map((f, i) => (
                <Reveal key={i} delay={i * 80}><Figure figure={f} index={fig()} /></Reveal>
              ))}
            </div>
          )}
        </>
      );
    },
  },
  {
    id: "decisions",
    label: "Technical decisions",
    render: (p) =>
      p.decisions && (
        <ul className="decisions">
          {p.decisions.map((d) => (
            <li key={d.title} className="decision">
              <h3 className="decision__title">{d.title}</h3>
              <div className="decision__body"><T as="p">{d.body}</T></div>
            </li>
          ))}
        </ul>
      ),
  },
  {
    id: "results",
    label: "Results",
    render: (p) =>
      p.results && (
        <>
          {p.results.metrics && (
            <dl className="metrics">
              {p.results.metrics.map((m) => (
                <div key={m.label} className="metric">
                  <dt className="metric__label">{m.label}</dt>
                  <dd className="metric__value">{m.value}</dd>
                  {m.context && <dd className="metric__context"><T>{m.context}</T></dd>}
                </div>
              ))}
            </dl>
          )}
          {p.results.notes && <div className="prose"><Paras items={p.results.notes} /></div>}
        </>
      ),
  },
  {
    id: "planned",
    label: "Planned work",
    render: (p) =>
      p.planned && (
        <div className="planned panel">
          <p className="label">Not yet completed</p>
          <ul className="planned__list">
            {p.planned.map((t, i) => <li key={i}><T>{t}</T></li>)}
          </ul>
        </div>
      ),
  },
  {
    id: "reflection",
    label: "Reflection",
    render: (p) => p.reflection && <div className="prose"><Paras items={p.reflection} /></div>,
  },
  {
    id: "links",
    label: "Links",
    render: (p) => p.links && <LinkList links={p.links} />,
  },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.pageReady) notFound();

  const sections = SECTIONS.map((s) => ({ ...s, node: s.render(project) })).filter((s) => s.node);
  const next = nextProject(slug);
  const media = project.media;

  return (
    <article className="case">
      <ReadingProgress />

      <header className="case-hero wrap">
        <Reveal stagger>
          <Link href={`/#${project.slug}`} className="back">← Back to work</Link>
          <p className="label case-hero__kicker">{project.domains.join(" / ")}</p>
          <h1 className="case-hero__title">{project.title}</h1>
          <p className="case-hero__tagline"><T>{project.tagline}</T></p>
        </Reveal>
        <Reveal stagger className="case-hero__meta">
          <dl className="spec spec--grid">
            <div className="spec__row"><dt>Status</dt><dd><StatusTag status={project.status} /></dd></div>
            <div className="spec__row"><dt>Period</dt><dd><T>{project.period}</T></dd></div>
            {project.facts?.map((f) => (
              <div key={f.label} className="spec__row"><dt>{f.label}</dt><dd><T>{f.value}</T></dd></div>
            ))}
          </dl>
          {project.milestones && <Milestones items={project.milestones} title="Stages" />}
        </Reveal>
      </header>

      {media && <Reveal className="case-lead wrap">
        {isPair(media) ? (
          <MediaSwap pair={media} index="Fig. 01" priority />
        ) : (
          <Figure figure={media} index="Fig. 01" priority frame={project.composition === "app" ? "browser" : undefined} />
        )}
      </Reveal>}

      <div className="case-body wrap">
        <Toc items={sections.map(({ id, label }) => ({ id, label }))} />
        <div className="case-sections">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="case-section" aria-labelledby={`${s.id}-title`}>
              <Reveal stagger className="case-section__head">
                <span className="label__n">{String(i + 1).padStart(2, "0")}</span>
                <h2 id={`${s.id}-title`} className="case-section__title">{s.label}</h2>
              </Reveal>
              {s.node}
            </section>
          ))}
        </div>
      </div>

      <nav className="next wrap" aria-label="Next project">
        <Link href={projectHref(next)} className="next__link">
          <span className="label">Next project{!next.pageReady && " · case study in progress"}</span>
          <span className="next__title">{next.title}</span>
          <span className="next__tagline"><T>{next.tagline}</T></span>
          <span className="next__arrow" aria-hidden="true">→</span>
        </Link>
      </nav>
    </article>
  );
}
