"use client";

import Image from "next/image";
import { useRef, useCallback } from "react";
import { useSectionReveal } from "@/lib/use-section-reveal";

const photos = [
  {
    src: "/images/beyond/bouldering.jpeg",
    alt: "Indoor bouldering",
    caption: "chalk is a lifestyle // hanover, germany",
  },
  {
    src: "/images/beyond/hiking.jpeg",
    alt: "Hiking in the Alps",
    caption: "the alps had better wifi than my office // germany",
  },
  {
    src: "/images/beyond/belaying.jpeg",
    alt: "Belaying outdoors",
    caption: "trust falls, but vertical // turkey",
  },
  {
    src: "/images/beyond/mountaineering.jpeg",
    alt: "Mountaineering at sunset",
    caption: "summit o'clock // turkey",
  },
  {
    src: "/images/beyond/rock-climbing.jpeg",
    alt: "Rock climbing",
    caption: "gravity is just a suggestion // antalya, turkey",
  },
];

const MAX_SCALE = 1.18;
const RANGE = 220;

export function BeyondCode() {
  const ref = useSectionReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    itemRefs.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
      const scale = dist >= RANGE
        ? 1
        : Math.min(1 + (MAX_SCALE - 1) * Math.pow(1 - dist / RANGE, 1.4), MAX_SCALE);
      el.style.transform = `scale(${scale})`;
      el.style.zIndex = scale > 1.1 ? "10" : "1";
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    itemRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transform = "scale(1)";
      el.style.zIndex = "1";
    });
  }, []);

  return (
    <section
      ref={ref}
      id="beyond"
      className="section-reveal px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div data-parallax="label">
          <p className="mb-2 font-mono text-sm text-amber tracking-wide">
            04 — Beyond Code
          </p>
        </div>
        <div data-parallax="heading">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            When I&apos;m not coding
          </h2>
        </div>
        <p className="mt-4 max-w-xl text-muted">
          You&apos;ll probably find me on a wall, a trail, or a summit
          somewhere.
        </p>

        <div
          ref={containerRef}
          className="mt-12 flex flex-wrap justify-center gap-5 md:gap-6"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="w-36 shrink-0 md:w-44"
              style={{
                transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                transformOrigin: "bottom center",
              }}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={176}
                  height={235}
                  sizes="(max-width: 768px) 144px, 176px"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-xs leading-snug text-muted">
                {photo.caption.split(" ").map((word, wi) => (
                  <span key={wi} className="caption-word-clip">
                    <span
                      className="caption-word-inner"
                      style={{ "--caption-delay": `${i * 0.12 + wi * 0.045}s` } as React.CSSProperties}
                    >
                      {word}{wi < photo.caption.split(" ").length - 1 ? "\u00a0" : ""}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
