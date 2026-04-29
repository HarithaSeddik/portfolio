"use client";

import { useInterSectionParallax } from "@/lib/use-inter-section-parallax";
import { ScrollProgress } from "./scroll-progress";

export function ParallaxEffects() {
  useInterSectionParallax();
  return <ScrollProgress />;
}
