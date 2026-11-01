"use client";

import { Fragment, useState } from "react";
import type { SystemDiagram as SystemData } from "@/content/types";
import { T } from "../T";

/**
 * Stage-by-stage diagram from content. Select a node to highlight its
 * detail; every detail is also listed below, so nothing depends on hover.
 */
export function SystemDiagram({ data, index }: { data: SystemData; index?: string }) {
  const flat = data.stages.flatMap((s, si) => s.nodes.map((n, ni) => ({ ...n, key: `${si}-${ni}` })));
  const [active, setActive] = useState(flat[0]?.key);

  return (
    <figure className="fig system">
      <div className="fig__frame system__frame">
        <div
          className="system__stages"
          style={{ "--cols": data.stages.map(() => "minmax(0, 1fr)").join(" 44px ") } as React.CSSProperties}
        >
          {data.stages.map((stage, si) => (
            <Fragment key={stage.label}>
              {si > 0 && <span className="system__arrow" aria-hidden="true" />}
              <div className="system__stage">
                <p className="label system__stage-label">
                  <span className="label__n">{String(si + 1).padStart(2, "0")}</span> {stage.label}
                </p>
                <ul className="system__nodes">
                  {stage.nodes.map((n, ni) => {
                    const key = `${si}-${ni}`;
                    const num = flat.findIndex((f) => f.key === key) + 1;
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          className="system__node"
                          aria-pressed={active === key}
                          onClick={() => setActive(key)}
                          onMouseEnter={() => setActive(key)}
                          onFocus={() => setActive(key)}
                        >
                          <span className="system__node-n">{num}</span>
                          <span className="system__node-label">{n.label}</span>
                          {n.sub && <span className="system__node-sub">{n.sub}</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Fragment>
          ))}
        </div>
        {data.footer && <p className="system__footer label">{data.footer}</p>}
      </div>
      <ol className="system__legend">
        {flat.map((n, i) => (
          <li key={n.key} data-active={active === n.key}>
            <span className="annotated__n">{String(i + 1).padStart(2, "0")}</span>
            <span className="system__legend-label">{n.label}</span>
            <span className="system__legend-detail"><T>{n.detail}</T></span>
          </li>
        ))}
      </ol>
      <figcaption className="caption">
        {index && <span className="caption__index">{index}</span>}
        <span className="caption__kind">Diagram</span>
        <span>{data.title}</span>
        {data.note && <T>{data.note}</T>}
      </figcaption>
    </figure>
  );
}
