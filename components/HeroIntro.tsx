"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Hero entrance. The animation is pure CSS keyed on data-intro="play", which
 * is server-rendered so it starts on first paint. This component only
 * replays it: when the visitor clicks a link back to the top of the homepage,
 * or scrolls back up to the hero after leaving it.
 */
export function HeroIntro({ children, className = "", labelledBy }: {
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const replay = () => {
      el.removeAttribute("data-intro");
      void el.offsetWidth; // restart CSS animations
      el.setAttribute("data-intro", "play");
    };

    // Scrolled away (hero fully out of view), then back.
    let left = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio === 0) left = true;
        else if (left && e.intersectionRatio > 0.35) {
          left = false;
          replay();
        }
      },
      { threshold: [0, 0.35] },
    );
    io.observe(el);

    // Clicks on links to the homepage top (header name, "/" links) while already here.
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement).closest("a");
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.origin === location.origin && url.pathname === "/" && (!url.hash || url.hash === "#main")) {
        window.scrollTo({ top: 0 });
        replay();
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <section ref={ref} className={className} data-intro="play" aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}

/** Splits text into per-character spans with a staggered delay (visual only). */
export function Chars({ text, start = 0, step = 30, className = "" }: {
  text: string;
  start?: number;
  step?: number;
  className?: string;
}) {
  return (
    <span className={className} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} className="ch" style={{ "--d": `${start + i * step}ms` } as CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
