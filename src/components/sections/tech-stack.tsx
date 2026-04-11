"use client";

import { useSectionReveal } from "@/lib/use-section-reveal";

interface StackCategory {
  label: string;
  items: string[];
  highlight?: boolean;
}

const stack: StackCategory[] = [
  {
    label: "AI & Gen.AI",
    items: ["Claude / AI SDK", "LLM Agents", "Prompt Engineering", "Python"],
    highlight: true,
  },
  {
    label: "Mobile",
    items: ["Flutter", "iOS", "Android"],
  },
  {
    label: "Backend",
    items: ["Java / Spring Boot", "Kafka", "REST APIs"],
  },
  {
    label: "Frontend",
    items: ["Next.js / React", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "DevOps",
    items: ["Kubernetes", "Jenkins", "CI/CD"],
  },
];

export function TechStack() {
  const ref = useSectionReveal();

  return (
    <section
      ref={ref}
      id="stack"
      className="section-reveal px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 font-mono text-sm text-amber tracking-wide">
          03 — Stack
        </p>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Tools I work with
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          From mobile SDKs to AI agents — the stack evolves, but the
          fundamentals stay solid.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((category) => (
            <div key={category.label}>
              <h3
                className={`font-heading text-sm font-semibold tracking-wide uppercase ${
                  category.highlight ? "text-amber" : "text-ink"
                }`}
              >
                {category.label}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {category.items.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
