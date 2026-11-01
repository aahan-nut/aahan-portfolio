"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Fades content in once as it scrolls into view. With `stagger`, direct
 * children enter one after another. CSS disables it for reduced motion.
 */
export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  stagger = false,
  id,
}: {
  children: ReactNode;
  as?: "div" | "section" | "li" | "article" | "header";
  className?: string;
  delay?: number;
  stagger?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      el.classList.add("is-visible");
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && show(), {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.05,
    });
    // Jump links can skip an element entirely; reveal anything already scrolled past.
    const onScroll = () => el.getBoundingClientRect().top < window.innerHeight && show();
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
