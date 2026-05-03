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

// Apple Wallet stack constants
const CARD_H = 480;       // visible card height (px)
const PEEK = 32;          // px each card's top edge peeks above the one in front
const N = projects.length;

// Container height = full card + peek strips for every card behind it
const CONTAINER_H = CARD_H + PEEK * (N - 1); // 480 + 64 = 544px

export function Projects() {
  const sectionRef = useSectionReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (prefersReduced || isMobile) return;

    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!container || cards.length < 2) return;

    // Park cards 2+ below the container's visible area so they start hidden.
    // overflow:hidden on the container clips them until GSAP slides them up.
    for (let i = 1; i < cards.length; i++) {
      gsap.set(cards[i], { y: CONTAINER_H + (i - 1) * CARD_H });
    }

    // Timeline is scrubbed to scroll. Two phases (one per incoming card) with
    // a brief hold between them so the visitor reads each stacked state.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top+=64",                      // pin just below the header
        end: `+=${(N - 1) * 640 + 480}`,          // ~1760px total scroll room
        pin: true,
        pinSpacing: true,
        scrub: 1.5,
      },
    });

    for (let i = 1; i < N; i++) {
      const phaseStart = (i - 1) * 1.8; // each phase separated by 1.8 timeline units

      // Incoming card slides up from off-screen to its stacked y position
      tl.to(cards[i], {
        y: PEEK * i,        // e.g. card 1 → 32px, card 2 → 64px
        ease: "none",
        duration: 1,
      }, phaseStart);

      // Every card below the incoming one compresses slightly (depth illusion)
      for (let j = 0; j < i; j++) {
        const depthBelow = i - j;          // 1 = directly below, 2 = two layers below
        tl.to(cards[j], {
          scale: 1 - depthBelow * 0.03,   // 0.97 / 0.94 — subtle but readable
          ease: "none",
          duration: 1,
        }, phaseStart);
      }
    }

    // Final hold: full wallet stack is visible for a beat before section unpins
    tl.to({}, { duration: 1.2 });
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

        {/* ── Apple Wallet stack — desktop ─────────────────────────────────── */}
        {/*
          All cards are position:absolute inside this container.
          overflow:hidden clips the off-screen starting positions.
          GSAP pins the container and scrubs the timeline to scroll.
        */}
        <div
          ref={containerRef}
          className="hidden md:block mt-16 relative"
          style={{ height: CONTAINER_H, overflow: "hidden" }}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: CARD_H,
                zIndex: i + 1,
                transformOrigin: "center top",
              }}
            >
              {project.slug ? (
                <Link
                  href={`/projects/${project.slug}`}
                  transitionTypes={["nav-forward"]}
                  style={{ display: "block", height: "100%", textDecoration: "none" }}
                >
                  <WalletCard project={project} index={i} total={N} />
                </Link>
              ) : (
                <WalletCard project={project} index={i} total={N} />
              )}
            </div>
          ))}
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

function WalletCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <div
      style={{
        height: "100%",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(196,138,8,0.15)",
        background: "var(--bg)",
        boxShadow: `0 ${8 + index * 8}px ${36 + index * 24}px rgba(23,21,14,${0.07 + index * 0.025})`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {/* Left: placeholder image panel */}
      <div aria-hidden="true" style={{ position: "relative", background: project.placeholderColor }}>
        {/* Dot-grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(23,21,14,0.07) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
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
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--amber)", marginTop: 4 }}>
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
      <div aria-hidden="true" style={{ height: 140, background: project.placeholderColor }} />
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
