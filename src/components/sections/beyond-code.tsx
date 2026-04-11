"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
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

const MAX_SCALE = 1.4;
const RANGE = 160;

export function BeyondCode() {
  const ref = useSectionReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>(photos.map(() => 1));

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const newScales = itemRefs.current.map((el) => {
      if (!el) return 1;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
      if (dist >= RANGE) return 1;
      const t = 1 - dist / RANGE;
      const scale = 1 + (MAX_SCALE - 1) * Math.pow(t, 1.4);
      return Math.min(scale, MAX_SCALE);
    });
    setScales(newScales);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setScales(photos.map(() => 1));
  }, []);

  return (
    <section
      ref={ref}
      id="beyond"
      className="section-reveal px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 font-mono text-sm text-amber tracking-wide">
          04 — Beyond Code
        </p>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          When I&apos;m not coding
        </h2>
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
                transform: `scale(${scales[i]})`,
                transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transformOrigin: "bottom center",
                zIndex: scales[i] > 1.1 ? 10 : 1,
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
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
