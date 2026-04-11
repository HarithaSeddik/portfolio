"use client";

import Image from "next/image";
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

export function BeyondCode() {
  const ref = useSectionReveal();

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

        <div className="mt-12 flex flex-wrap justify-center gap-5 md:gap-6">
          {photos.map((photo) => (
            <div key={photo.src} className="w-36 shrink-0 md:w-44">
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
