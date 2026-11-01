import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Engineering Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card, generated at build time in the site's palette. */
export default function OpengraphImage() {
  const grid = "rgba(232,236,240,0.07)";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0d0f11",
          backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          color: "#ecebe6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: 4, color: "#a7acb0" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#5ce1f0" }} />
          ENGINEERING PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 148, fontWeight: 600, letterSpacing: -6, lineHeight: 0.95 }}>{site.name.split(" ")[0]}</div>
          <div style={{ fontSize: 148, fontWeight: 600, letterSpacing: -6, lineHeight: 0.95, color: "#a7acb0", paddingLeft: 80 }}>
            {site.name.split(" ")[1]}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, color: "#5ce1f0" }}>
          {site.role.toUpperCase()}
        </div>
      </div>
    ),
    size,
  );
}
