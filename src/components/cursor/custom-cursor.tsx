"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      if (!el.classList.contains("visible")) {
        el.classList.add("visible");
      }
    };

    const onLeave = () => el.classList.remove("visible");
    const onEnter = () => el.classList.add("visible");

    const addLink = () => el.classList.add("on-link");
    const removeLink = () => el.classList.remove("on-link");

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const bindInteractives = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", addLink);
        el.addEventListener("mouseleave", removeLink);
      });
    };

    bindInteractives();
    const observer = new MutationObserver(bindInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-[width,height,opacity] duration-150 ease-out"
      style={{
        width: "20px",
        height: "20px",
        background: "rgba(196, 138, 8, 0.25)",
        border: "1.5px solid rgba(196, 138, 8, 0.5)",
      }}
    />
  );
}
