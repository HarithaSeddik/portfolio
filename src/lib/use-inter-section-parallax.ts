"use client";

import { useEffect } from "react";

export function useInterSectionParallax() {
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
        const viewportMid = window.innerHeight / 2;

        // Labels — drift at ~75% scroll speed (factor 0.08)
        document
          .querySelectorAll<HTMLElement>("[data-parallax='label']")
          .forEach((el) => {
            const rect = el.getBoundingClientRect();
            const dist = rect.top + rect.height / 2 - viewportMid;
            el.style.transform = `translateY(${dist * 0.08}px)`;
          });

        // Headings — drift at ~85% scroll speed (factor 0.04)
        document
          .querySelectorAll<HTMLElement>("[data-parallax='heading']")
          .forEach((el) => {
            const rect = el.getBoundingClientRect();
            const dist = rect.top + rect.height / 2 - viewportMid;
            el.style.transform = `translateY(${dist * 0.04}px)`;
          });

        // Dividers — drift at ~60% scroll speed (factor 0.12)
        document
          .querySelectorAll<HTMLElement>("[data-parallax='divider']")
          .forEach((el) => {
            const rect = el.getBoundingClientRect();
            const dist = rect.top + rect.height / 2 - viewportMid;
            el.style.transform = `translateY(${dist * 0.12}px)`;
          });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
