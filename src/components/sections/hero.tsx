"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("in-view"));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-reveal flex min-h-[calc(100vh-64px)] flex-col justify-center px-6"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-4 text-sm font-mono text-amber tracking-wide">
          Hello, I&apos;m
        </p>
        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-ink md:text-7xl">
          Haritha Akkad
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          Senior software engineer exploring the edge of what&apos;s possible
          with generative AI. From mobile apps to backend systems to building
          with agents — I follow the curiosity.
        </p>
        <div className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-80"
          >
            See what I&apos;m building
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-ink hover:text-ink"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
