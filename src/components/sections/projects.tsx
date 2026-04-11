"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
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

function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) return; // skip touch devices

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const glare = card.querySelector<HTMLElement>(".card-glare");
    const inner = card.querySelector<HTMLElement>(".card-inner");
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg)`;

        if (glare) {
          glare.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.13) 0%, transparent 65%)`;
          glare.style.opacity = "1";
        }
        if (inner) {
          inner.style.transform = `translateX(${x * -5}px) translateY(${y * -5}px)`;
        }
      });
    };

    const onEnter = () => {
      card.style.transition = "box-shadow 0.3s ease";
      card.style.boxShadow = "0 24px 48px rgba(23,21,14,0.12), 0 8px 16px rgba(23,21,14,0.06)";
    };

    const onLeave = () => {
      cancelAnimationFrame(rafId);
      card.style.transition = "transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s ease";
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      card.style.boxShadow = "";
      if (glare) glare.style.opacity = "0";
      if (inner) {
        inner.style.transition = "transform 0.55s cubic-bezier(0.23,1,0.32,1)";
        inner.style.transform = "translateX(0) translateY(0)";
      }
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(rafId);
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useTilt(cardRef);

  const body = (
    <div
      ref={cardRef}
      className="relative h-full rounded-2xl border border-border/60 bg-bg overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* glare overlay */}
      <div
        className="card-glare pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 z-10"
        aria-hidden="true"
      />
      {/* inner content — shifts opposite to tilt */}
      <div className="card-inner p-6 md:p-8 h-full flex flex-col">
        {project.status === "coming-soon" && (
          <span className="mb-3 inline-block self-start rounded-full bg-amber-pale px-3 py-1 font-mono text-xs text-amber">
            Coming soon
          </span>
        )}
        <h3 className="font-heading text-xl font-semibold text-ink">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted flex-1">
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
          <p className="mt-4 font-mono text-xs text-amber">Read more →</p>
        )}
      </div>
    </div>
  );

  if (project.slug) {
    return (
      <Link href={`/projects/${project.slug}`} className="block h-full">
        {body}
      </Link>
    );
  }
  return body;
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

        <div
          ref={gridRef}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <div key={project.title} data-stagger>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <p className="mt-10 font-mono text-sm text-muted">
          more projects coming —{" "}
          <a
            href="https://github.com/HarithaSeddik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber transition-opacity hover:opacity-70"
          >
            github has the rest ↗
          </a>
        </p>
      </div>
    </section>
  );
}
