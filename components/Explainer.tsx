import type { Explainer as ExplainerData } from "@/content/types";
import { Paras } from "./T";

/** Native <details>, so it works without JS and with the keyboard. */
export function Explainers({ items }: { items: ExplainerData[] }) {
  return (
    <div className="explainers">
      {items.map((e, i) => (
        <details key={e.title} className="explainer">
          <summary>
            <span className="explainer__n">{String(i + 1).padStart(2, "0")}</span>
            <span className="explainer__title">{e.title}</span>
            <span className="explainer__icon" aria-hidden="true" />
          </summary>
          <div className="explainer__body">
            <Paras items={e.body} />
          </div>
        </details>
      ))}
    </div>
  );
}
