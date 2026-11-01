/**
 * Content schema. Everything a visitor reads lives in /content; components
 * in /components only decide how it looks.
 *
 * Honesty rules for content:
 * - Anything not yet supplied is written as `todo("what is needed")`.
 *   It renders as a visible MISSING marker during development.
 * - Work that is not finished goes in `planned` / milestones marked
 *   "planned" or "in-progress", never in results.
 */

/** A placeholder for information that has not been supplied yet. */
export type Todo = { todo: string };

/** Either real copy, or a marker describing what is missing. */
export type Text = string | Todo;

export const todo = (what: string): Todo => ({ todo: what });
export const isTodo = (t: unknown): t is Todo =>
  typeof t === "object" && t !== null && "todo" in t;

export type Domain =
  | "Robotics"
  | "Computer Vision"
  | "Research"
  | "Software"
  | "Mechanical";

export type Status = "completed" | "in-progress" | "planned" | "unconfirmed";

export type FigureKind = "photo" | "cad" | "diagram" | "screenshot" | "video" | "code";

export type Annotation = {
  /** Position as a percentage of the figure box (0–100). */
  x: number;
  y: number;
  label: string;
  detail?: Text;
};

export type Figure = {
  kind: FigureKind;
  /** Path under /public. Leave undefined until the asset exists. */
  src?: string;
  /** YouTube video id; embedded via youtube-nocookie. */
  youtube?: string;
  /** Still frame shown before a video plays. */
  poster?: string;
  /** "contain" shows the whole image (figures, portrait photos); default fills the frame. */
  fit?: "cover" | "contain";
  alt: string;
  caption: Text;
  /** CSS aspect-ratio, e.g. "4 / 3". */
  aspect?: string;
  /** Numbered callouts drawn over the figure. */
  annotations?: Annotation[];
};

/** Two views of the same thing, e.g. Photo / CAD. */
export type FigurePair = { a: Figure; b: Figure; labels: [string, string] };

export type Metric = { value: string; label: string; context?: Text };

export type Decision = { title: string; body: Text };

export type Link = {
  label: string;
  href?: string;
  /** Shown when href is missing. */
  missing?: string;
};

export type Milestone = {
  label: Text;
  state: Status;
  when?: Text;
  /** Ties the milestone to a part of a schematic (e.g. "frame"). */
  part?: string;
};

/** Expandable technical explanation. */
export type Explainer = { title: string; body: Text[] };

/**
 * A left-to-right system diagram defined in content: stages of nodes, each
 * node with a detail that is always listed (and highlighted on selection).
 */
export type SystemDiagram = {
  title: string;
  stages: { label: string; nodes: { label: string; sub?: string; detail: Text }[] }[];
  /** Shown under the diagram, e.g. "Deployed on Vercel". */
  footer?: string;
  /** What still needs confirming about the diagram itself. */
  note?: Text;
};

/** Code-drawn figures; content refers to them by id. */
export type DiagramId = "hand-landmarks" | "tandem-kart";

/**
 * How a project is composed on the homepage. Each has its own layout so
 * features don't all look the same.
 */
export type Composition = "hardware" | "app" | "research" | "data" | "build" | "in-progress";

export type Project = {
  slug: string;
  title: string;
  /** One line under the title. */
  tagline: Text;
  period: Text;
  domains: Domain[];
  status: Status;
  composition: Composition;
  featured?: boolean;
  /** Only projects with a finished case-study layout get a /projects/[slug] page. */
  pageReady?: boolean;

  /** Homepage copy. */
  summary: Text;
  /** Main visual. Hardware projects use a pair for the Photo / CAD toggle.
   *  Omit when there is no real image yet; the page leads with its diagram instead. */
  media?: Figure | FigurePair;
  /** Extra figure shown in some compositions (code panel, CV output…). */
  secondary?: Figure;
  stack?: string[];
  /** Short labelled facts, shown as a spec list. */
  facts?: { label: string; value: Text }[];
  /** One number set large in the "data" composition. */
  keyFigure?: { value: string; label: string };
  /** Short bullet highlights for the feature (only supplied facts). */
  highlights?: Text[];
  milestones?: Milestone[];

  overview?: Text[];
  contribution?: { items: Text[]; note?: Text };
  howItWorks?: {
    body: Text[];
    diagram?: DiagramId;
    system?: SystemDiagram;
    explainers?: Explainer[];
    /** Extra figures shown after the explanation. */
    gallery?: Figure[];
  };
  decisions?: Decision[];
  results?: { metrics?: Metric[]; notes?: Text[] };
  reflection?: Text[];
  /** Work that has not been completed. Never mixed with results. */
  planned?: Text[];
  links?: Link[];
};

export const isPair = (m: Figure | FigurePair): m is FigurePair => "labels" in m;

/** Competition robotics is summarised on the homepage and lives on its own site. */
export type RoboticsSeason = {
  robot: string;
  season: string;
  summary: Text;
  highlights: Metric[];
  tools: string[];
  photos?: Figure[];
};
