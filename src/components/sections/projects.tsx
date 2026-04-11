"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useSectionReveal } from "@/lib/use-section-reveal";

interface Project {
  title: string;
  description: string;
  tags: string[];
  slug?: string;
  status: "live" | "coming-soon";
  // layout config for scattered effect
  layout: {
    x: string;       // left offset (%)
    y: number;       // top offset (px) from container top
    rotate: number;  // deg
    zIndex: number;  // visual depth (1=back, 3=front)
    scrollSpeed: number; // parallax factor (back=slow, front=fast)
    width: string;   // card width
  };
}

const projects: Project[] = [
  {
    title: "Vinted Shopping Agent",
    description:
      "An AI personal shopper that hunts rare finds on Vinted and automates listings — no API needed. Learns your taste, runs scheduled sweeps, and sends WhatsApp summaries of the best finds.",
    tags: ["Claude", "Browser Automation", "Agents", "WhatsApp"],
    slug: "vinted-agent",
    status: "coming-soon",
    layout: { x: "2%", y: 60, rotate: -4, zIndex: 2, scrollSpeed: 0.25, width: "340px" },
  },
  {
    title: "Halal Stock Screener",
    description:
      "An AI analyst that filters, researches, and charts stocks end to end — Sharia compliance screening, fundamental analysis, earnings review, and technical charting with entry/exit levels.",
    tags: ["AI Agents", "Finance", "Python", "Technical Analysis"],
    slug: "halal-stock-screener",
    status: "coming-soon",
    layout: { x: "30%", y: 20, rotate: 2.5, zIndex: 1, scrollSpeed: 0.12, width: "320px" },
  },
  {
    title: "AI Job Applier",
    description:
      "Recruiters automated screening — so we automated applying. Monitors job alerts, evaluates listings against your profile, tailors resumes per application, and submits automatically.",
    tags: ["Claude", "Browser Automation", "Email Parsing", "Agents"],
    slug: "ai-job-applier",
    status: "coming-soon",
    layout: { x: "58%", y: 80, rotate: -2, zIndex: 3, scrollSpeed: 0.38, width: "330px" },
  },
];

function useScrollParallax(
  containerRef: React.RefObject<HTMLDivElement | null>,
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>
) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        // progress: 0 when container bottom enters viewport, 1 when top exits
        const viewportH = window.innerHeight;
        const progress = 1 - (rect.bottom / (viewportH + rect.height));

        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const speed = projects[i].layout.scrollSpeed;
          const offset = progress * speed * 220;
          card.style.transform =
            `rotate(${projects[i].layout.rotate}deg) translateY(${-offset}px)`;
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [containerRef, cardRefs]);
}

export function Projects() {
  const sectionRef = useSectionReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState(false);

  useScrollParallax(containerRef, cardRefs);

  // stagger cards in when section enters view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
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

        {/* Scattered layout — desktop only */}
        <div
          ref={containerRef}
          className="relative mt-16 hidden md:block"
          style={{ height: "520px" }}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute"
              style={{
                left: project.layout.x,
                top: project.layout.y,
                width: project.layout.width,
                zIndex: project.layout.zIndex,
                transform: `rotate(${project.layout.rotate}deg)`,
                opacity: revealed ? 1 : 0,
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 180}ms, box-shadow 0.3s ease`,
                boxShadow: "0 20px 60px rgba(23,21,14,0.10), 0 6px 20px rgba(23,21,14,0.07)",
                borderRadius: "16px",
              }}
            >
              {project.slug ? (
                <Link href={`/projects/${project.slug}`} className="block">
                  <ScatteredCard project={project} />
                </Link>
              ) : (
                <ScatteredCard project={project} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile fallback — simple stack */}
        <div className="mt-10 flex flex-col gap-6 md:hidden">
          {projects.map((project) =>
            project.slug ? (
              <Link key={project.title} href={`/projects/${project.slug}`}>
                <ScatteredCard project={project} />
              </Link>
            ) : (
              <ScatteredCard key={project.title} project={project} />
            )
          )}
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

function ScatteredCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-bg p-6 transition-all duration-300 hover:border-amber/30">
      {project.status === "coming-soon" && (
        <span className="mb-3 inline-block rounded-full bg-amber-pale px-3 py-1 font-mono text-xs text-amber">
          Coming soon
        </span>
      )}
      <h3 className="font-heading text-lg font-semibold text-ink">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
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
        <p className="mt-3 font-mono text-xs text-amber">Read more →</p>
      )}
    </div>
  );
}
