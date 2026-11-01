import type { Project } from "@/content/types";
import { Figure } from "../Figure";
import { KartSchematic } from "../diagrams/KartSchematic";
import { Reveal } from "../Reveal";
import { T } from "../T";
import { Facts, FeatureFoot, FeatureLabel, FeatureMedia, FeatureTitle, Highlights, Milestones } from "./parts";

/**
 * One homepage feature. Each composition is laid out differently so the
 * page doesn't repeat one card; type, spacing and colour stay shared.
 */
export function Feature({ project: p, n }: { project: Project; n: number }) {
  const body = (() => {
    switch (p.composition) {
      /* Full-bleed media with Photo/CAD toggle; text set in three columns below. */
      case "hardware":
        return (
          <>
            <Reveal className="c-hw__media"><FeatureMedia project={p} priority={n === 1} /></Reveal>
            <Reveal stagger className="c-hw__text">
              <div>
                <FeatureLabel project={p} n={n} />
                <FeatureTitle project={p} size="l" />
              </div>
              <div className="f-summary"><T as="p">{p.summary}</T></div>
              <div>
                {p.milestones && <Milestones items={p.milestones} title="Stages" />}
                <FeatureFoot project={p} />
              </div>
            </Reveal>
          </>
        );

      /* Narrow text column beside a browser-framed screenshot; stack as a spec sheet. */
      case "app":
        return (
          <>
            <Reveal stagger className="c-app__text">
              <FeatureLabel project={p} n={n} />
              <FeatureTitle project={p} size="l" />
              <div className="f-summary"><T as="p">{p.summary}</T></div>
              <Highlights project={p} />
              <FeatureFoot project={p} />
            </Reveal>
            <Reveal className="c-app__media" delay={120}>
              <FeatureMedia project={p} />
              <Facts project={p} className="c-app__spec" />
            </Reveal>
          </>
        );

      /* Paper-like: centred title block, figure and code panel side by side. */
      case "research":
        return (
          <>
            <Reveal stagger className="c-res__head">
              <FeatureLabel project={p} n={n} />
              <FeatureTitle project={p} size="l" />
              <div className="f-summary"><T as="p">{p.summary}</T></div>
            </Reveal>
            <Reveal stagger className="c-res__figs">
              <FeatureMedia project={p} />
              {p.secondary && <Figure figure={p.secondary} className="f-media f-media--code" />}
            </Reveal>
            <Reveal className="c-res__foot">
              <Facts project={p} className="spec--row" />
              <FeatureFoot project={p} />
            </Reveal>
          </>
        );

      /* Typographic number leads; screenshot offset; outputs listed. */
      case "data":
        return (
          <>
            <Reveal stagger className="c-data__lead">
              <FeatureLabel project={p} n={n} />
              {p.keyFigure && (
                <p className="c-data__number">
                  {p.keyFigure.value}
                  <span>{p.keyFigure.label}</span>
                </p>
              )}
              <FeatureTitle project={p} size="m" />
              <div className="f-summary"><T as="p">{p.summary}</T></div>
            </Reveal>
            <Reveal className="c-data__media" delay={120}>
              <FeatureMedia project={p} />
            </Reveal>
            <Reveal stagger className="c-data__detail">
              <div>
                <p className="label">Outputs</p>
                <Highlights project={p} />
              </div>
              <div>
                <Facts project={p} />
                <FeatureFoot project={p} />
              </div>
            </Reveal>
          </>
        );

      /* Lab-notebook: media left, the record called out, spec list. */
      case "build":
        return (
          <>
            <Reveal className="c-build__media"><FeatureMedia project={p} /></Reveal>
            <Reveal stagger className="c-build__text">
              <FeatureLabel project={p} n={n} />
              <FeatureTitle project={p} size="l" />
              {p.highlights?.[0] && <p className="c-build__record"><T>{p.highlights[0]}</T></p>}
              <div className="f-summary"><T as="p">{p.summary}</T></div>
              <Facts project={p} />
              <FeatureFoot project={p} />
            </Reveal>
          </>
        );

      /* Dashed "work in progress" frame with a milestone checklist. */
      case "in-progress":
        return (
          <>
            <Reveal stagger className="c-wip__text">
              <FeatureLabel project={p} n={n} />
              <FeatureTitle project={p} size="l" />
              <div className="f-summary"><T as="p">{p.summary}</T></div>
              <Facts project={p} />
              <FeatureFoot project={p} />
            </Reveal>
            <Reveal className="c-wip__media" delay={120}>
              {p.milestones?.some((m) => m.part) ? <KartSchematic milestones={p.milestones} /> : <FeatureMedia project={p} />}
            </Reveal>
          </>
        );
    }
  })();

  return (
    <article id={p.slug} className={`feature c-${p.composition}`} aria-labelledby={`${p.slug}-t`}>
      {body}
    </article>
  );
}
