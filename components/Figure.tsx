import type { Figure as FigureData } from "@/content/types";
import { T } from "./T";
import { YouTube } from "./YouTube";
import { Legend, Pins } from "./Annotations";

export const KIND_LABEL: Record<FigureData["kind"], string> = {
  photo: "Photo",
  cad: "CAD",
  diagram: "Figure",
  screenshot: "Screenshot",
  video: "Video",
  code: "Code",
};

/** The image itself, or a clearly marked placeholder when the asset is missing. */
export function FigureMedia({ figure, priority = false }: { figure: FigureData; priority?: boolean }) {
  const { src, alt, kind, youtube, poster, fit } = figure;
  const style = fit === "contain" ? { objectFit: "contain" as const } : undefined;
  if (youtube) return <YouTube id={youtube} title={alt} />;
  if (!src) {
    return (
      <div className="fig__placeholder" role="img" aria-label={`Placeholder: ${alt}`} data-missing>
        <span className="fig__placeholder-kind">{KIND_LABEL[kind]} needed</span>
        <span className="fig__placeholder-alt">{alt}</span>
      </div>
    );
  }
  if (kind === "video") {
    return <video src={src} poster={poster} controls playsInline preload="none" aria-label={alt} style={style} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" style={style} />;
}

export function FigureCaption({ figure, index }: { figure: FigureData; index?: string }) {
  return (
    <figcaption className="caption">
      {index && <span className="caption__index">{index}</span>}
      <span className="caption__kind">{KIND_LABEL[figure.kind]}</span>
      <T>{figure.caption}</T>
    </figcaption>
  );
}

export function Figure({
  figure,
  index,
  priority = false,
  frame,
  className = "",
}: {
  figure: FigureData;
  index?: string;
  priority?: boolean;
  /** "browser" wraps app screenshots in a minimal window bar. */
  frame?: "browser";
  className?: string;
}) {
  return (
    <figure className={`fig ${className}`}>
      <div className={`fig__frame ${frame === "browser" ? "fig__frame--browser" : ""}`}>
        {frame === "browser" && (
          <div className="fig__chrome" aria-hidden="true">
            <span /><span /><span />
          </div>
        )}
        <div className="fig__media" style={{ aspectRatio: figure.aspect ?? "4 / 3" }}>
          <FigureMedia figure={figure} priority={priority} />
          {figure.src && <Pins items={figure.annotations} />}
        </div>
      </div>
      <FigureCaption figure={figure} index={index} />
      {figure.src && <Legend items={figure.annotations} />}
    </figure>
  );
}
