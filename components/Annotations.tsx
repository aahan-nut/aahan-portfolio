import type { Annotation } from "@/content/types";

/** Numbered pins over a figure. Decorative: the legend carries the text. */
export function Pins({ items }: { items?: Annotation[] }) {
  if (!items?.length) return null;
  return (
    <>
      {items.map((a, i) => (
        <span key={i} className="fig__pin" style={{ left: `${a.x}%`, top: `${a.y}%` }} aria-hidden="true">
          {i + 1}
        </span>
      ))}
    </>
  );
}

export function Legend({ items }: { items?: Annotation[] }) {
  if (!items?.length) return null;
  return (
    <ol className="fig__legend">
      {items.map((a, i) => (
        <li key={i}>
          <span className="fig__legend-n">{String(i + 1).padStart(2, "0")}</span> {a.label}
        </li>
      ))}
    </ol>
  );
}
