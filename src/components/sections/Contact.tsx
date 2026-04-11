"use client";

import { useSectionReveal } from "@/lib/use-section-reveal";

export function Contact() {
  const ref = useSectionReveal();

  return (
    <section
      ref={ref}
      id="contact"
      className="section-reveal px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 font-mono text-sm text-amber tracking-wide">
          05 — Contact
        </p>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Let&apos;s talk
        </h2>
        <p className="mt-4 text-muted md:text-lg">
          Whether it&apos;s a project, an idea, or just a conversation about
          what AI can do — I&apos;d love to hear from you.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="mailto:akkad.haritha@gmail.com"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-80"
          >
            Say hello
          </a>
          <a
            href="https://linkedin.com/in/HarithaSeddik"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-ink hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/HarithaSeddik"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-ink hover:text-ink"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
