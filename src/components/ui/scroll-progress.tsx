"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "beyond", label: "Beyond" },
  { id: "contact", label: "Contact" },
];

export function ScrollProgress() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.querySelector("footer");

    // Show after hero exits viewport, hide when footer appears
    const boundaryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === hero) setVisible(!e.isIntersecting);
          if (e.target === footer && e.isIntersecting) setVisible(false);
        });
      },
      { threshold: 0.1 }
    );
    if (hero) boundaryObserver.observe(hero);
    if (footer) boundaryObserver.observe(footer);

    // Track which section is most in view
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      boundaryObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Vertical track line */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{ background: "var(--amber)", opacity: 0.15 }}
      />
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={`Go to ${label} section`}
          style={{
            display: "block",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
            width: active === id ? 8 : 5,
            height: active === id ? 8 : 5,
            borderRadius: "50%",
            background: active === id ? "var(--amber)" : "var(--faint)",
            transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      ))}
    </nav>
  );
}
