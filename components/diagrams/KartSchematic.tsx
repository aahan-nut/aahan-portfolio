"use client";

import { useState } from "react";
import type { Milestone, Status } from "@/content/types";
import { T } from "../T";

/**
 * Top-view schematic of a tandem go-kart. Generic outline (not traced from
 * the real design); each part is coloured by its milestone status in content.
 */
const STATE_LABEL: Record<Status, string> = {
  completed: "Done",
  "in-progress": "In progress",
  planned: "Planned",
  unconfirmed: "Status needed",
};

function Part({ id, active, state, onEnter, children }: {
  id: string;
  active: string | null;
  state: Status;
  onEnter: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <g
      className={`kart__part kart__part--${state}${active === id ? " is-active" : ""}`}
      onMouseEnter={() => onEnter(id)}
    >
      {children}
    </g>
  );
}

export function KartSchematic({ milestones, index }: { milestones: Milestone[]; index?: string }) {
  const parts = milestones.filter((m) => m.part);
  const [active, setActive] = useState<string | null>(null);
  const stateOf = (part: string): Status => parts.find((m) => m.part === part)?.state ?? "planned";
  const done = parts.filter((m) => m.state === "completed").length;
  const p = { active, onEnter: setActive };

  return (
    <figure className="fig kart">
      <div className="kart__grid">
        <div className="fig__frame kart__stage" onMouseLeave={() => setActive(null)}>
          <p className="label kart__badge">
            <span className="pulse" aria-hidden="true" /> In progress · {done} of {parts.length} parts done
          </p>
          <svg viewBox="0 0 660 340" className="kart__svg" role="img" aria-label={`Top-view schematic of the tandem go-kart. ${parts.map((m) => `${typeof m.label === "string" ? m.label : m.part}: ${STATE_LABEL[m.state]}`).join(". ")}.`}>
            {/* Seats are context only — not tracked parts */}
            <g className="kart__context">
              <rect x="205" y="132" width="78" height="76" rx="14" />
              <rect x="325" y="132" width="78" height="76" rx="14" />
              <text x="244" y="175" textAnchor="middle">Seat 2</text>
              <text x="364" y="175" textAnchor="middle">Seat 1</text>
            </g>

            <Part id="frame" state={stateOf("frame")} {...p}>
              <path d="M90 120 H470 L540 140 V200 L470 220 H90 Z" className="kart__shape" />
              <path d="M190 120 V220 M305 120 V220 M420 120 V220" className="kart__shape kart__shape--thin" />
            </Part>

            <Part id="wheels" state={stateOf("wheels")} {...p}>
              {[[90, 66], [90, 228], [470, 66], [470, 228]].map(([x, y]) => (
                <rect key={`${x}-${y}`} x={x - 34} y={y} width="68" height="46" rx="8" className="kart__shape" />
              ))}
            </Part>

            <Part id="engine" state={stateOf("engine")} {...p}>
              <rect x="112" y="142" width="62" height="56" rx="4" className="kart__shape" />
              <path d="M90 112 V228" className="kart__shape kart__shape--thin" />
            </Part>

            <Part id="brakes" state={stateOf("brakes")} {...p}>
              <rect x="80" y="200" width="20" height="14" rx="2" className="kart__shape" />
              <rect x="80" y="126" width="20" height="14" rx="2" className="kart__shape" />
            </Part>

            <Part id="steering" state={stateOf("steering")} {...p}>
              <circle cx="430" cy="170" r="20" className="kart__shape" />
              <path d="M450 170 H490 M490 112 V228" className="kart__shape kart__shape--thin" />
            </Part>

            {/* Leader labels */}
            <g className="kart__labels">
              <text x="90" y="40" textAnchor="middle">Wheels</text>
              <line x1="90" y1="46" x2="90" y2="64" />
              <text x="143" y="318" textAnchor="middle">Engine</text>
              <line x1="143" y1="304" x2="143" y2="200" />
              <text x="40" y="296" textAnchor="start">Brakes</text>
              <line x1="62" y1="282" x2="86" y2="216" />
              <text x="430" y="318" textAnchor="middle">Steering</text>
              <line x1="430" y1="304" x2="430" y2="192" />
              <text x="560" y="114" textAnchor="start">Frame</text>
              <line x1="572" y1="120" x2="540" y2="146" />
              <text x="556" y="174" textAnchor="start" className="kart__front">Front →</text>
            </g>
          </svg>
        </div>

        <ol className="kart__legend">
          {parts.map((m) => (
            <li key={m.part}>
              <button
                type="button"
                className={`kart__key kart__key--${m.state}`}
                aria-pressed={active === m.part}
                onClick={() => setActive(active === m.part ? null : m.part!)}
                onFocus={() => setActive(m.part!)}
              >
                <span className="kart__swatch" aria-hidden="true" />
                <span className="kart__key-label"><T>{m.label}</T></span>
                <span className="kart__key-state">{STATE_LABEL[m.state]}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="caption">
        {index && <span className="caption__index">{index}</span>}
        <span className="caption__kind">Schematic</span>
        <span>Top view, not to scale — a generic outline, not the actual design. Solid cyan = done; dashed = in progress.</span>
      </figcaption>
    </figure>
  );
}
