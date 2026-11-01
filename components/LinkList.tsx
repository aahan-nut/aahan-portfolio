import type { Link as LinkData } from "@/content/types";

/** "large" for contact rows, "inline" for compact links under a feature. */
export function LinkList({ links, variant = "large" }: { links: LinkData[]; variant?: "large" | "inline" }) {
  return (
    <ul className={`links links--${variant}`}>
      {links.map((l) => (
        <li key={l.label}>
          {l.href ? (
            <a href={l.href} target={l.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="links__a">
              <span className="links__label">{l.label}</span>
              <span className="links__arrow" aria-hidden="true">↗</span>
              {!l.href.startsWith("mailto:") && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          ) : (
            <span className="links__a links__a--missing" data-missing>
              <span className="links__label">{l.label}</span>
              <span className="missing"><span className="missing__tag">Missing</span> {l.missing ?? "URL"}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
