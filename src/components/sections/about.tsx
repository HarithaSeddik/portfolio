"use client";

import { useSectionReveal } from "@/lib/use-section-reveal";

export function About() {
  const ref = useSectionReveal();

  return (
    <section
      ref={ref}
      id="about"
      className="section-reveal px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 font-mono text-sm text-amber tracking-wide">
          01 — About
        </p>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          The short version
        </h2>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
          <p>
            I&apos;m a software engineer who started in mechanical engineering,
            detoured through embedded systems and railway R&amp;D, then found my
            rhythm building mobile apps and backend services. Along the way I
            shipped Flutter apps used by millions, built SDKs for banking
            security, and optimized CI pipelines that saved teams hours every
            week.
          </p>
          <p>
            These days I&apos;m deep into generative AI — not just using the
            tools, but building with them. I&apos;m fascinated by how agents,
            code generation, and AI-assisted workflows are reshaping what a
            single developer can accomplish. This portfolio itself was built with
            Claude Code as a way of exploring that frontier.
          </p>
          <p>
            I speak English, Arabic, Turkish, and a bit of German. Currently
            based in Hanover, Germany — previously Istanbul and Ankara. When
            I&apos;m not coding, I&apos;m probably exploring a new city or down
            a research rabbit hole about something I just discovered.
          </p>
        </div>
      </div>
    </section>
  );
}
