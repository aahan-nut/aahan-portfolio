"use client";

import { useState } from "react";
import { HandLandmarks, LANDMARKS, VIEW } from "./HandLandmarks";

/** Callouts describe MediaPipe's landmark model, not measured project results. */
const NOTES: { label: string; points: number[]; detail: string }[] = [
  { label: "Wrist", points: [0], detail: "Landmark 0. Every finger chain connects back to it." },
  { label: "Knuckles", points: [5, 9, 13, 17], detail: "Landmarks 5, 9, 13, 17 — the base joint of each finger." },
  { label: "Thumb", points: [1, 2, 3, 4], detail: "Landmarks 1–4, from the base of the thumb to its tip." },
  { label: "Index finger", points: [5, 6, 7, 8], detail: "Landmarks 5–8. Each finger is a chain of four points, knuckle to tip." },
  { label: "Fingertips", points: [4, 8, 12, 16, 20], detail: "Landmarks 4, 8, 12, 16, 20." },
];

const pinFor = (points: number[]) => {
  const p = LANDMARKS[points[points.length - 1]];
  return { left: `${(p[0] / VIEW.w) * 100}%`, top: `${(p[1] / VIEW.h) * 100}%` };
};

export function AnnotatedHand({ index = "Fig." }: { index?: string }) {
  const [active, setActive] = useState(0);
  const note = NOTES[active];

  return (
    <figure className="fig annotated">
      <div className="annotated__grid">
        <div className="fig__frame annotated__stage">
          <div className="annotated__canvas">
            <HandLandmarks
              highlight={note.points}
              title="Diagram of the 21 hand landmarks MediaPipe reports, numbered 0 to 20"
            />
            {NOTES.map((n, i) => (
              <button
                key={n.label}
                type="button"
                className="pin"
                style={pinFor(n.points)}
                aria-pressed={active === i}
                aria-label={`${i + 1}: ${n.label}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <ol className="annotated__legend">
          {NOTES.map((n, i) => (
            <li key={n.label}>
              <button type="button" aria-pressed={active === i} onClick={() => setActive(i)}>
                <span className="annotated__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="annotated__label">{n.label}</span>
              </button>
              <p className="annotated__detail">{n.detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="caption">
        <span className="caption__index">{index}</span>
        <span className="caption__kind">Reference diagram</span>
        <span>MediaPipe&rsquo;s 21-point hand-landmark layout. Illustration — not captured from this project.</span>
      </figcaption>
    </figure>
  );
}
