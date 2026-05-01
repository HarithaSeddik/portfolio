"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { useRef, useEffect } from "react";
import { useSectionReveal } from "@/lib/use-section-reveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tags: string[];
  slug?: string;
  status: "live" | "coming-soon";
  placeholderColor: string; // gradient for placeholder image
}

const projects: Project[] = [
  {
    title: "Vinted Shopping Agent",
    description:
      "An AI personal shopper that hunts rare finds on Vinted and automates listings — no API needed. Learns your taste, runs scheduled sweeps, and sends WhatsApp summaries of the best finds.",
    tags: ["Claude", "Browser Automation", "Agents", "WhatsApp"],
    slug: "vinted-agent",
    status: "coming-soon",
    placeholderColor: "linear-gradient(135deg, #f9f7f2 0%, #e8e0cc 40%, rgba(196,138,8,0.15) 100%)",
  },
  {
    title: "Halal Stock Screener",
    description:
      "An AI analyst that filters, researches, and charts stocks end to end — Sharia compliance screening, fundamental analysis, earnings review, and technical charting with entry/exit levels.",
    tags: ["AI Agents", "Finance", "Python", "Technical Analysis"],
    slug: "halal-stock-screener",
    status: "coming-soon",
    placeholderColor: "linear-gradient(135deg, #f9f7f2 0%, #dce8d8 40%, rgba(80,140,80,0.15) 100%)",
  },
  {
    title: "AI Job Applier",
    description:
      "Recruiters automated screening — so we automated applying. Monitors job alerts, evaluates listings against your profile, tailors resumes per application, and submits automatically.",
    tags: ["Claude", "Browser Automation", "Email Parsing", "Agents"],
    slug: "ai-job-applier",
    status: "coming-soon",
    placeholderColor: "linear-gradient(135deg, #f9f7f2 0%, #dde0ea 40%, rgba(80,100,180,0.15) 100%)",
  },
];

// Card heights / stacking offset for sticky parallax depth
const CARD_OFFSET = 20; // px each card peeks above the previous
const CARD_H = 420;     // px approximate card height

function StackyCard({
  project,
  index,
  total,
  cardRef,
}: {
  project: Project;
  index: number;
  total: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const isLast = index === total - 1;

  return (
    <div
      ref={cardRef}
      className="stacky-card"
      style={{
        position: "sticky",
        top: `${80 + index * CARD_OFFSET}px`,
        zIndex: index + 1,
        marginBottom: isLast ? 0 : 0,
        willChange: "transform",
      }}
    >
      <div
        className="stacky-card-inner"
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(196,138,8,0.15)",
          background: "var(--bg)",
          boxShadow: `0 ${8 + index * 4}px ${32 + index * 16}px rgba(23,21,14,${0.06 + index * 0.02})`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: `${CARD_H}px`,
        }}
      >
        {/* Left: placeholder image */}
        <div
          aria-hidden="true"
          style={{
            background: project.placeholderColor,
            position: "relative",
            minHeight: `${CARD_H}px`,
          }}
        >
          {/* Subtle grid overlay for texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(23,21,14,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,21,14,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Project number */}
          <span
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--muted)",
              letterSpacing: "0.08em",
            }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Right: content */}
        <div
          style={{
            padding: "40px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          {project.status === "coming-soon" && (
            <span
              style={{
                display: "inline-block",
                borderRadius: "999px",
                padding: "4px 12px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--amber)",
                background: "rgba(196,138,8,0.08)",
                width: "fit-content",
              }}
            >
              Coming soon
            </span>
          )}

          {project.slug ? (
            <ViewTransition name={`project-title-${project.slug}`} share="text-morph" default="none">
              <h3
                className="font-heading"
                style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.2 }}
              >
                {project.title}
              </h3>
            </ViewTransition>
          ) : (
            <h3
              className="font-heading"
              style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.2 }}
            >
              {project.title}
            </h3>
          )}

          <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--muted)" }}>
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  borderRadius: "999px",
                  border: "1px solid var(--border)",
                  padding: "4px 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--muted)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {project.slug && (
            <Link
              href={`/projects/${project.slug}`}
              transitionTypes={["nav-forward"]}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--amber)",
                textDecoration: "none",
                marginTop: "4px",
              }}
            >
              Read more →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useSectionReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Subtle parallax scale: cards further back compress slightly as you scroll past
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (prefersReduced || isMobile) return;

    cardRefs.current.forEach((card, i) => {
      if (!card || i === projects.length - 1) return;
      // Earlier cards scale down as the next card stacks on top
      gsap.to(card, {
        scale: 0.96,
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: `+=${CARD_H * 0.8}`,
          scrub: true,
        },
      });
    });
  });

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
          AI-first projects that explore the intersection of software engineering and generative AI.
        </p>

        {/* Stacky sticky scroll — desktop */}
        <div
          ref={containerRef}
          className="hidden md:block mt-16"
          style={{
            // Total scroll height: each card gets ~half a screen of scroll room
            paddingBottom: `${(projects.length - 1) * Math.round(CARD_H * 0.6)}px`,
          }}
        >
          {projects.map((project, i) =>
            project.slug ? (
              <Link
                key={project.title}
                href={`/projects/${project.slug}`}
                transitionTypes={["nav-forward"]}
                style={{ display: "block", textDecoration: "none" }}
              >
                <StackyCard
                  project={project}
                  index={i}
                  total={projects.length}
                  cardRef={(el) => { cardRefs.current[i] = el; }}
                />
              </Link>
            ) : (
              <StackyCard
                key={project.title}
                project={project}
                index={i}
                total={projects.length}
                cardRef={(el) => { cardRefs.current[i] = el; }}
              />
            )
          )}
        </div>

        {/* Mobile fallback — simple stack */}
        <div className="mt-10 flex flex-col gap-6 md:hidden">
          {projects.map((project) =>
            project.slug ? (
              <Link key={project.title} href={`/projects/${project.slug}`} transitionTypes={["nav-forward"]}>
                <MobileCard project={project} />
              </Link>
            ) : (
              <MobileCard key={project.title} project={project} />
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

function MobileCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-bg overflow-hidden">
      {/* Placeholder image strip */}
      <div
        aria-hidden="true"
        style={{ height: "140px", background: project.placeholderColor }}
      />
      <div className="p-6">
        {project.status === "coming-soon" && (
          <span className="mb-3 inline-block rounded-full bg-amber-pale px-3 py-1 font-mono text-xs text-amber">
            Coming soon
          </span>
        )}
        {project.slug ? (
          <ViewTransition name={`project-title-${project.slug}`} share="text-morph" default="none">
            <h3 className="font-heading text-lg font-semibold text-ink">{project.title}</h3>
          </ViewTransition>
        ) : (
          <h3 className="font-heading text-lg font-semibold text-ink">{project.title}</h3>
        )}
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
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
    </div>
  );
}
