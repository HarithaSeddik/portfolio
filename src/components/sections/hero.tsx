"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const words = [
  "Haritha Seddik",
  "Software Engineer",
  "AI Automation Specialist",
  "Adventurer",
  "Curious Learner",
];

const TAGLINE = "Software engineer exploring what happens when you give your code a brain.";

const TYPING_SPEED = 80;
const DELETING_SPEED = 50;
const PAUSE_AFTER_TYPED = 2000;
const PAUSE_AFTER_DELETED = 500;

// Sections for the scroll-scrubbed timeline (hero is intentionally excluded)
const NAV_SECTIONS = [
  { id: "about",    label: "About" },
  { id: "projects", label: "Projects" },
  { id: "stack",    label: "Stack" },
  { id: "beyond",   label: "Beyond" },
  { id: "contact",  label: "Contact" },
];

function useTypewriter(items: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const tick = useCallback(() => {
    const currentWord = items[wordIndex];
    if (isDeleting) {
      setText(currentWord.substring(0, text.length - 1));
    } else {
      setText(currentWord.substring(0, text.length + 1));
    }
  }, [items, wordIndex, text, isDeleting]);

  useEffect(() => {
    if (prefersReducedMotion) { setText(items[0]); return; }
    const currentWord = items[wordIndex];
    let delay: number;
    if (!isDeleting && text === currentWord) {
      delay = PAUSE_AFTER_TYPED;
      const timeout = setTimeout(() => setIsDeleting(true), delay);
      return () => clearTimeout(timeout);
    } else if (isDeleting && text === "") {
      delay = PAUSE_AFTER_DELETED;
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % items.length);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;
      const timeout = setTimeout(tick, delay);
      return () => clearTimeout(timeout);
    }
  }, [text, isDeleting, wordIndex, items, tick, prefersReducedMotion]);

  return text;
}

function CharReveal({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const ws = text.split(" ");
  let charCount = 0;
  return (
    <>
      {ws.map((word, wi) => {
        const wordStart = charCount;
        charCount += word.length + 1;
        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => (
              <span key={ci} className="char-reveal-clip">
                <span
                  className="char-reveal-inner"
                  style={{ animationDelay: `${baseDelay + (wordStart + ci) * 0.012}s` }}
                >
                  {char}
                </span>
              </span>
            ))}
            {wi < ws.length - 1 && " "}
          </span>
        );
      })}
    </>
  );
}

function ScrollTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  // Fades in after hero exits, out near footer — mirrors original ScrollProgress behaviour
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.querySelector("footer");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === hero) setVisible(!e.isIntersecting);
          if (e.target === footer && e.isIntersecting) setVisible(false);
        });
      },
      { threshold: 0.1 }
    );
    if (hero) obs.observe(hero);
    if (footer) obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Scrubbed fill line — tracks overall page scroll progress
    gsap.fromTo(
      lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );

    // Activate/deactivate each section's dot and label
    NAV_SECTIONS.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => activate(i),
        onEnterBack: () => activate(i),
        onLeave: () => deactivate(i),
        onLeaveBack: () => deactivate(i),
      });
    });

    function activate(i: number) {
      const dot = dotRefs.current[i];
      const label = labelRefs.current[i];
      if (dot) gsap.to(dot, { scale: 1.6, backgroundColor: "var(--amber)", duration: 0.3, overwrite: true });
      if (label) label.style.opacity = "1";
    }
    function deactivate(i: number) {
      const dot = dotRefs.current[i];
      const label = labelRefs.current[i];
      if (dot) gsap.to(dot, { scale: 1, backgroundColor: "rgba(196,138,8,0.3)", duration: 0.3, overwrite: true });
      if (label) label.style.opacity = "0";
    }
  });

  return (
    <nav
      ref={containerRef}
      aria-label="Page sections"
      className="fixed top-1/2 right-6 -translate-y-1/2 z-40 hidden md:flex flex-col items-center"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <style>{`
        .tl-label {
          position: absolute;
          right: 18px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--amber);
          opacity: 0;
          transition: opacity 0.3s;
          white-space: nowrap;
          pointer-events: none;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>

      <div className="relative" style={{ width: 2, height: `${(NAV_SECTIONS.length - 1) * 44 + 8}px` }}>
        {/* Track background */}
        <div className="absolute inset-x-0 top-0 bottom-0 rounded-full"
          style={{ background: "rgba(196,138,8,0.15)" }} />
        {/* Scrubbed fill */}
        <div ref={lineRef} className="absolute inset-x-0 top-0 rounded-full"
          style={{ height: "0%", background: "var(--amber)", opacity: 0.7 }} />

        {NAV_SECTIONS.map((section, i) => (
          <div
            key={section.id}
            className="absolute"
            style={{ top: i * 44, left: "50%", transform: "translateX(-50%)" }}
          >
            <div
              ref={(el) => { dotRefs.current[i] = el; }}
              className="rounded-full"
              style={{
                width: 8, height: 8,
                backgroundColor: "rgba(196,138,8,0.3)",
                cursor: "pointer",
                transformOrigin: "center",
              }}
              onClick={() =>
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
              }
            />
            <span ref={(el) => { labelRefs.current[i] = el; }} className="tl-label">
              {section.label}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const displayText = useTypewriter(words);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("in-view"));
  }, []);

  // Apple-style GSAP pin: content scales + fades as you scroll into the next section
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (prefersReduced || isMobile) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
        },
      });

      tl.to(headingRef.current, { scale: 0.85, opacity: 0, y: -40, ease: "power1.in" }, 0);
      tl.to(taglineRef.current, { y: -60, opacity: 0, ease: "power1.in" }, 0.08);
      tl.to(ctasRef.current, { y: -60, opacity: 0, ease: "power1.in" }, 0.14);
    },
    { scope: sectionRef as unknown as React.RefObject<HTMLElement> }
  );

  // Amber blob drifts at 0.5x scroll speed
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const blob = blobRef.current;
    if (!blob) return;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        blob.style.transform = `translateY(${-self.progress * window.innerHeight * 0.5}px)`;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <>
      <ScrollTimeline />
      <section
        ref={sectionRef}
        id="hero"
        className="section-reveal relative flex min-h-[calc(100vh-64px)] flex-col justify-center px-6 overflow-hidden"
      >
        {/* Blurred amber blob — drifts at 0.5x scroll speed */}
        <div
          ref={blobRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,138,8,0.16) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            willChange: "transform",
          }}
        />

        <div className="mx-auto w-full max-w-5xl relative z-10">
          <p className="mb-4 text-sm font-mono text-amber tracking-wide">Hello, I&apos;m</p>
          <h1
            ref={headingRef}
            className="font-heading text-5xl font-bold leading-tight tracking-tight text-ink md:text-7xl"
            style={{ willChange: "transform, opacity" }}
          >
            <span>{displayText}</span>
            <span className="typewriter-cursor ml-0.5 text-amber">|</span>
          </h1>
          <p
            ref={taglineRef}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
            style={{ willChange: "transform, opacity" }}
          >
            <CharReveal text={TAGLINE} baseDelay={0.3} />
          </p>
          <div
            ref={ctasRef}
            className="mt-10 flex gap-4"
            style={{ willChange: "transform, opacity" }}
          >
            <a
              href="#projects"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-80"
            >
              See what I&apos;m building
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-ink hover:text-ink"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
