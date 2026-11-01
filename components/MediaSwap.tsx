"use client";

import { useId, useState } from "react";
import type { FigurePair } from "@/content/types";
import { FigureCaption, FigureMedia } from "./Figure";
import { Legend, Pins } from "./Annotations";

/**
 * Two views of one object (Photo / CAD, Photo / Video). The toggle is a real
 * control on every device; hover only adds a gentle zoom.
 */
export function MediaSwap({
  pair,
  index,
  priority = false,
  className = "",
  annotate = true,
}: {
  pair: FigurePair;
  /** Draw numbered pins and their key (off on the homepage). */
  annotate?: boolean;
  index?: string;
  priority?: boolean;
  className?: string;
}) {
  const [sel, setSel] = useState<0 | 1>(0);
  const id = useId();
  const figs = [pair.a, pair.b] as const;
  const active = figs[sel];

  return (
    <figure className={`fig swap ${className}`}>
      <div className="fig__frame">
        <div className="fig__media swap__stage" style={{ aspectRatio: active.aspect ?? "4 / 3" }} id={id}>
          {figs.map((f, i) => (
            <div key={i} className="swap__layer" data-active={sel === i} aria-hidden={sel !== i}>
              <FigureMedia figure={f} priority={priority && i === 0} />
              {annotate && f.src && <Pins items={f.annotations} />}
            </div>
          ))}
        </div>
        <div className="seg swap__controls" role="group" aria-label="Choose view">
          {pair.labels.map((label, i) => (
            <button
              key={label}
              type="button"
              className="seg__btn"
              aria-pressed={sel === i}
              aria-controls={id}
              onClick={() => setSel(i as 0 | 1)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <FigureCaption figure={active} index={index} />
      {annotate && active.src && <Legend items={active.annotations} />}
    </figure>
  );
}
