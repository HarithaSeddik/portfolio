"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { useRef } from "react";
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
  placeholderColor: string;
}

const projects: Project[] = [
  {
    title: "Vinted Shopping Agent",
    description:
      "An AI personal shopper that hunts rare finds on Vinted and automates listings — no API needed. Learns your taste, runs scheduled sweeps, and sends WhatsApp summaries of the best finds.",
    tags: ["Claude", "Browser Automation", "Agents", "WhatsApp"],
    slug: "vinted-agent",
    status: "coming-soon",
    placeholderColor: "linear-gradient(135deg, #f0ead8 0%, #e8dfc8 50%, rgba(196,138,8,0.12) 100%)",
  },
  {
    title: "Halal Stock Screener",
    description:
      "An AI analyst that filters, researches, and charts stocks end to end — Sharia compliance screening, fundamental analysis, earnings review, and technical charting with entry/exit levels.",
    tags: ["AI Agents", "Finance", "Python", "Technical Analysis"],
    slug: "halal-stock-screener",
    status: "coming-soon",
    placeholderColor: "linear-gradient(135deg, #edf2ea 0%, #dce8d4 50%, rgba(80,140,80,0.12) 100%)",
  },
  {
    title: "AI Job Applier",
    description:
      "Recruiters automated screening — so we automated applying. Monitors job alerts, evaluates listings against your profile, tailors resumes per application, and submits automatically.",
    tags: ["Claude", "Browser Automation", "Email Parsing", "Agents"],
    slug: "ai-job-applier",
    status: "coming-soon",
    placeholderColor: "linear-gradient(135deg, #eaedf5 0%, #d8ddf0 50%, rgba(80,100,200,0.12) 100%)",
  },
];

// Sticky stack constants
const CARD_H = 460;   // visual card height (px)
const PEEK = 24;      // px each card's top peeks above the one stacked on it
const SPACER = 360;   // px of scroll room per card before next card arrives
const BASE_TOP = 88;  // sticky top offset (px) — clears the fixed header

export function Projects() {
  const sectionRef = useSectionReveal();
  // slotRefs: the outer wrapper div for each card (provides scroll room)
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  // innerRefs: the visual card div that gets scaled down when covered
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scale-down depth effect: as the next card arrives, the current card
  // compresses slightly to create a layered depth illusion
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (prefersReduced || isMobile) return;

    innerRefs.current.forEach((inner, i) => {
      if (!inner || i === projects.length - 1) return;
      const nextSlot = slotRefs.current[i + 1];
      if (!nextSlot) return;

      gsap.to(inner, {
        scale: 0.93,
        ease: "none",
        scrollTrigger: {
          trigger: nextSlot,
          // Start compressing when the next slot enters from the bottom,
          // finish by the time the next card has fully stacked on top
          start: "top bottom",
          end: `top+=${CARD_H * 0.6} bottom`,
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
        <p className="mb-2 font-mono text-sm text-amber tracking-wide">02 — Projects</p>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Things I&apos;m building
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          AI-first projects that explore the intersection of software engineering and generative AI.
        </p>

        {/* ── Sticky stack — desktop ───────────────────────────────────────── */}
        <div className="hidden md:block mt-16">
          {projects.map((project, i) => {
            const isLast = i === projects.length - 1;
            // Last slot gets extra height so the full stack stays visible a beat
            // before the section ends
            const slotHeight = CARD_H + SPACER + (isLast ? 280 : 0);

            return (
              <div
                key={project.title}
                ref={(el) => { slotRefs.current[i] = el; }}
                style={{ height: slotHeight, position: "relative" }}
              >
                {/*
                  The sticky wrapper is a DIRECT child of the slot and has
                  its own height. The slot is taller, providing the scroll room
                  that makes the sticky effect work.
                */}
                <div
                  style={{
                    position: "sticky",
                    top: BASE_TOP + i * PEEK,
                    zIndex: i + 1,
                    height: CARD_H,
                  }}
                >
                  {project.slug ? (
                    <Link
                      href={`/projects/${project.slug}`}
                      transitionTypes={["nav-forward"]}
                      style={{ display: "block", height: "100%", textDecoration: "none" }}
                    >
                      <StackCard
                        project={project}
                        index={i}
                        total={projects.length}
                        innerRef={(el) => { innerRefs.current[i] = el; }}
                      />
                    </Link>
                  ) : (
                    <StackCard
                      project={project}
                      index={i}
                      total={projects.length}
                      innerRef={(el) => { innerRefs.current[i] = el; }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile fallback ──────────────────────────────────────────────── */}
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

function StackCard({
  project,
  index,
  total,
  innerRef,
}: {
  project: Project;
  index: number;
  total: number;
  innerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={innerRef}
      style={{
        height: "100%",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(196,138,8,0.15)",
        background: "var(--bg)",
        boxShadow: `0 ${8 + index * 6}px ${40 + index * 20}px rgba(23,21,14,${0.07 + index * 0.02})`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        transformOrigin: "center top",
      }}
    >
      {/* Left: placeholder image */}
      <div
        aria-hidden="true"
        style={{ position: "relative", background: project.placeholderColor }}
      >
        {/* Subtle dot-grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(23,21,14,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "rgba(23,21,14,0.35)",
            letterSpacing: "0.1em",
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
          gap: 14,
        }}
      >
        {project.status === "coming-soon" && (
          <span
            style={{
              display: "inline-block",
              borderRadius: 999,
              padding: "4px 12px",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
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

        <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "var(--muted)" }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                borderRadius: 999,
                border: "1px solid var(--border)",
                padding: "3px 11px",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {project.slug && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--amber)",
              marginTop: 4,
            }}
          >
            Read more →
          </span>
        )}
      </div>
    </div>
  );
}

function MobileCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-bg overflow-hidden">
      <div
        aria-hidden="true"
        style={{ height: 140, background: project.placeholderColor }}
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
            <span key={tag} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
        {project.slug && <p className="mt-3 font-mono text-xs text-amber">Read more →</p>}
      </div>
    </div>
  );
}
