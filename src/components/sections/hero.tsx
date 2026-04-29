"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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

function useTypewriter(items: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
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
    if (prefersReducedMotion) {
      setText(items[0]);
      return;
    }
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
  const words = text.split(" ");
  let charCount = 0;
  return (
    <>
      {words.map((word, wi) => {
        const wordStart = charCount;
        charCount += word.length + 1; // +1 for the space
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
            {wi < words.length - 1 && "\u00a0"}
          </span>
        );
      })}
    </>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const displayText = useTypewriter(words);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("in-view"));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxY = scrollY * 0.22;
  const fadeOpacity = Math.max(0, 1 - scrollY / 520);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-reveal flex min-h-[calc(100vh-64px)] flex-col justify-center px-6"
    >
      <div
        ref={contentRef}
        className="mx-auto w-full max-w-5xl"
        style={{
          transform: `translateY(${parallaxY}px)`,
          opacity: fadeOpacity,
          willChange: "transform, opacity",
        }}
      >
        <p className="mb-4 text-sm font-mono text-amber tracking-wide">
          Hello, I&apos;m
        </p>
        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-ink md:text-7xl">
          <span>{displayText}</span>
          <span className="typewriter-cursor ml-0.5 text-amber">|</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          <CharReveal text={TAGLINE} baseDelay={0.3} />
        </p>
        <div className="mt-10 flex gap-4">
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
  );
}
