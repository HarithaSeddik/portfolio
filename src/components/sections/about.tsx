"use client";

import Image from "next/image";
import { useSectionReveal } from "@/lib/use-section-reveal";

export function About() {
  const ref = useSectionReveal();

  return (
    <section
      ref={ref}
      id="about"
      className="section-reveal px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <div data-parallax="label">
          <p
            className="reveal-item mb-2 font-mono text-sm text-amber tracking-wide"
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
          >
            01 — About
          </p>
        </div>
        <div data-parallax="heading">
          <h2
            className="reveal-item font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl"
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            The short version
          </h2>
        </div>

        <div
          className="reveal-item mt-10 flex flex-col items-start gap-10 md:flex-row"
          style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
        >
          <div className="relative shrink-0 w-[220px] self-stretch min-h-[280px]">
            <Image
              src="/images/headshot.jpeg"
              alt="Haritha Akkad"
              fill
              className="rounded-2xl object-cover object-top"
              sizes="220px"
              priority
            />
          </div>

          <div className="space-y-6 text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
            <p>
              i studied mechanical engineering, ended up writing software for
              railway safety systems, somehow pivoted to mobile apps, then
              backend, then — well, here we are. the path was never linear but
              it always made sense in hindsight.
            </p>
            <p>
              along the way i shipped flutter apps used by millions, built
              banking security SDKs, and spent more time than i&apos;d like to
              admit optimizing CI pipelines. now i&apos;m deep into generative
              AI — not the hype, the actual building. agents, automation,
              workflows that didn&apos;t exist a year ago. this portfolio itself
              was built with claude code because i wanted to see how far that
              goes.
            </p>
            <p>
              i speak arabic, english, turkish, and just enough german to order
              coffee. currently based in hanover, germany — previously istanbul
              and ankara. when i&apos;m not coding, i&apos;m probably
              somewhere vertical.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
