"use client";

import { useSectionReveal } from "@/lib/use-section-reveal";

interface Project {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  status: "live" | "coming-soon";
}

const projects: Project[] = [
  {
    title: "This Portfolio",
    description:
      "Built entirely with Claude Code + Next.js + Vercel. A meta-showcase of AI-assisted development — from planning to deployment, every step was a collaboration with AI.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Claude Code", "Vercel"],
    status: "live",
  },
  {
    title: "AI Automation Toolkit",
    description:
      "A collection of automation tools powered by LLMs for real-world developer workflows. Code review agents, documentation generators, and more.",
    tags: ["Python", "Claude API", "Agents", "Automation"],
    status: "coming-soon",
  },
  {
    title: "Gen.AI Dev Workflows",
    description:
      "Exploring how generative AI transforms software development — from agentic coding to AI-assisted architecture decisions. Case studies and tools.",
    tags: ["AI SDK", "Vercel", "Claude", "Developer Tools"],
    status: "coming-soon",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative rounded-2xl border border-border/60 bg-bg p-6 transition-all duration-300 hover:border-amber/40 hover:shadow-[0_4px_24px_rgba(196,138,8,0.06)] md:p-8">
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
    </div>
  );
}

export function Projects() {
  const ref = useSectionReveal();

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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
