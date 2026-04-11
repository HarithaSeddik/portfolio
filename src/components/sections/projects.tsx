"use client";

import Link from "next/link";
import { useSectionReveal } from "@/lib/use-section-reveal";
import { useStaggerReveal } from "@/lib/use-stagger-reveal";

interface Project {
  title: string;
  description: string;
  tags: string[];
  slug?: string;
  status: "live" | "coming-soon";
}

const projects: Project[] = [
  {
    title: "Vinted Shopping Agent",
    description:
      "An AI personal shopper that hunts rare finds on Vinted and automates listings — no API needed. Learns your taste, runs scheduled sweeps, and sends WhatsApp summaries of the best finds.",
    tags: ["Claude", "Browser Automation", "Agents", "WhatsApp"],
    slug: "vinted-agent",
    status: "coming-soon",
  },
  {
    title: "Halal Stock Screener",
    description:
      "An AI analyst that filters, researches, and charts stocks end to end — Sharia compliance screening, fundamental analysis, earnings review, and technical charting with entry/exit levels.",
    tags: ["AI Agents", "Finance", "Python", "Technical Analysis"],
    slug: "halal-stock-screener",
    status: "coming-soon",
  },
  {
    title: "AI Job Applier",
    description:
      "Recruiters automated screening — so we automated applying. Monitors job alerts, evaluates listings against your profile, tailors resumes per application, and submits automatically.",
    tags: ["Claude", "Browser Automation", "Email Parsing", "Agents"],
    slug: "ai-job-applier",
    status: "coming-soon",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <div className="group relative rounded-2xl border border-border/60 bg-bg p-6 transition-all duration-300 hover:border-amber/40 hover:shadow-[0_4px_24px_rgba(196,138,8,0.06)] md:p-8 h-full">
      {project.status === "coming-soon" && (
        <span className="mb-3 inline-block rounded-full bg-amber-pale px-3 py-1 font-mono text-xs text-amber">
          Coming soon
        </span>
      )}
      <h3 className="font-heading text-xl font-semibold text-ink">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.slug && (
        <p className="mt-4 font-mono text-xs text-amber transition-opacity group-hover:opacity-70">
          Read more →
        </p>
      )}
    </div>
  );

  if (project.slug) {
    return (
      <Link href={`/projects/${project.slug}`} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}

export function Projects() {
  const ref = useSectionReveal();
  const gridRef = useStaggerReveal(100);

  return (
    <section
      ref={ref}
      id="projects"
      className="section-reveal px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 font-mono text-sm text-amber tracking-wide">
          02 — Projects
        </p>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Things I&apos;m building
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          AI-first projects that explore the intersection of software
          engineering and generative AI.
        </p>

        <div ref={gridRef} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} data-stagger>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
