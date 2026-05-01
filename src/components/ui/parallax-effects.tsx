"use client";

import { useInterSectionParallax } from "@/lib/use-inter-section-parallax";

// ScrollProgress replaced by the GSAP scroll timeline in hero.tsx
export function ParallaxEffects() {
  useInterSectionParallax();
  return null;
}
