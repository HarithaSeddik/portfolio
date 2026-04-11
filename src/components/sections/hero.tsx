"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const words = [
  "Haritha Seddik",
  "Software Engineer",
  "AI Automation Specialist",
  "Adventurer",
  "Curious Learner",
];

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

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const displayText = useTypewriter(words);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("in-view"));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-reveal flex min-h-[calc(100vh-64px)] flex-col justify-center px-6"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-4 text-sm font-mono text-amber tracking-wide">
          Hello, I&apos;m
        </p>
        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-ink md:text-7xl">
          <span>{displayText}</span>
          <span className="typewriter-cursor ml-0.5 text-amber">|</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          Software engineer exploring what happens when you give your code a
          brain.
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
