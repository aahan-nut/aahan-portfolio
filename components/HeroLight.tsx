"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pointer-reactive light for the desktop hero. Only runs for fine pointers
 * with motion allowed; the light layer never takes pointer events.
 */
export function HeroLight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (!fine.matches || reduced.matches) return;
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      el.classList.add("is-lit");
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => el.classList.remove("is-lit");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`hero-light ${className}`}>
      <div className="hero-light__layer" aria-hidden="true" />
      {children}
    </div>
  );
}
