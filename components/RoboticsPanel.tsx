import { competitionRobotics as r } from "@/content/robotics";
import { Figure } from "./Figure";
import { LinkList } from "./LinkList";
import { T } from "./T";

/** Condensed competition-robotics feature; full detail lives on the separate site. */
export function RoboticsPanel() {
  return (
    <section id="robotics" className="robotics panel" aria-labelledby="robotics-title">
      <div className="robotics__head">
        <p className="label">Competition robotics · 2 seasons</p>
        <h3 id="robotics-title" className="robotics__title">{r.title}</h3>
        <p className="robotics__intro"><T>{r.intro}</T></p>
        <p className="robotics__program"><T>{r.program}</T></p>
      </div>
      <ol className="robotics__seasons">
        {r.seasons.map((s) => (
          <li key={s.robot} className="season">
            <div className="season__head">
              <span className="season__robot">{s.robot}</span>
              <span className="season__year">{s.season}</span>
            </div>
            <p className="season__summary"><T>{s.summary}</T></p>
            {s.highlights.length > 0 && (
              <dl className="season__stats">
                {s.highlights.map((h) => (
                  <div key={h.label}>
                    <dt>{h.label}</dt>
                    <dd>{h.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="season__tools">{s.tools.join(" · ")}</p>
            {s.photos && (
              <div className={`season__photos season__photos--${s.photos.length}`}>
                {s.photos.map((f) => (
                  <Figure key={f.src ?? f.alt} figure={f} className="f-media" />
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
      <div className="robotics__link">
        <LinkList links={[r.site]} variant="inline" />
      </div>
    </section>
  );
}
