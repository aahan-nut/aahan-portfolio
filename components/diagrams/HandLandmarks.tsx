/**
 * Reference illustration of MediaPipe's 21-point hand-landmark layout
 * (0 = wrist; 4 points per finger, knuckle → tip). It shows how the library
 * describes a hand — it is not output captured from the project.
 */
export const LANDMARKS: [number, number][] = [
  [200, 440], // 0 wrist
  [150, 410], [115, 370], [92, 330], [75, 292], // thumb 1–4
  [160, 300], [150, 236], [145, 190], [140, 148], // index 5–8
  [200, 294], [200, 222], [200, 170], [200, 122], // middle 9–12
  [240, 302], [246, 236], [250, 190], [254, 152], // ring 13–16
  [275, 322], [292, 270], [301, 236], [308, 206], // pinky 17–20
];

export const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20], [0, 17],
];

export const VIEW = { w: 400, h: 500 };

export function HandLandmarks({
  highlight = [],
  title,
  className = "",
}: {
  highlight?: number[];
  title?: string;
  className?: string;
}) {
  const hl = new Set(highlight);
  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className={`hand ${className}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g className="hand__bones">
        {CONNECTIONS.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={LANDMARKS[a][0]}
            y1={LANDMARKS[a][1]}
            x2={LANDMARKS[b][0]}
            y2={LANDMARKS[b][1]}
            className={hl.has(a) && hl.has(b) ? "is-hl" : undefined}
          />
        ))}
      </g>
      <g className="hand__joints">
        {LANDMARKS.map(([x, y], i) => (
          <g key={i} className={hl.has(i) ? "is-hl" : undefined} style={{ "--i": i } as React.CSSProperties}>
            <circle cx={x} cy={y} r={hl.has(i) ? 7 : 4.5} />
            <text x={x + 9} y={y - 8}>{i}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
