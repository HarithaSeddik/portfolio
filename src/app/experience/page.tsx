import Link from "next/link";
import type { Metadata } from "next";
import { DirectionalTransition } from "@/components/ui/page-transition";

export const metadata: Metadata = {
  title: "Experience — Haritha Akkad",
  description:
    "Career timeline of Haritha Akkad — from mechanical engineering to mobile, backend, and generative AI.",
};

const experience = [
  {
    company: "Continental AG",
    location: "Hanover, Germany",
    role: "Senior Software Engineer",
    period: "Oct 2024 — Present",
    tags: ["Flutter", "Java / Spring Boot", "Kafka", "Kubernetes", "Jenkins"],
    highlights: [
      "Led UI/UX redesign of the core mobile navigation module across platforms",
      "Java Spring Boot microservices with Kafka event streaming",
      "Kubernetes deployments — 30% faster Jenkins CI/CD pipeline",
      "Quarterly mobile releases to Google Play and App Store",
    ],
  },
  {
    company: "Kobil GmbH",
    location: "Remote — Germany / Turkey",
    role: "Mobile Software Developer",
    period: "Nov 2021 — Sep 2024",
    tags: ["Flutter", "Swift", "Kotlin", "BLoC", "OpenTelemetry", "Sentry"],
    highlights: [
      "Led Flutter SDK for mobile banking security (Swift + Kotlin native bridges)",
      "\"Istanbul Is Yours\" — cross-platform app for 5M+ users, Istanbul municipality",
      "30% faster UI chunk loading via GetIt + BLoC architecture optimization",
      "OpenTelemetry + Sentry integration for crash and performance tracing",
    ],
  },
  {
    company: "RailAcoustic / Enekom",
    location: "Ankara, Turkey",
    role: "R&D Engineer",
    period: "Aug 2020 — Oct 2021",
    tags: ["Python", "Pandas", "NumPy", "SQLite3"],
    highlights: [
      "Python test automation for microcontroller-based railway safety devices",
      "Data analysis pipelines using Pandas, NumPy, and SQLite3",
    ],
  },
];

const education = {
  school: "Bilkent University",
  location: "Ankara, Turkey",
  degree: "BS Mechanical Engineering",
  period: "2016 — 2020",
  highlights: [
    "GPA 3.56 / 4.00 — High Honours",
    "Ranked 3rd of 162 in graduating class",
    "100% merit scholarship",
  ],
};

export default function ExperiencePage() {
  return (
    <DirectionalTransition>
      <div className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl">

          {/* Back link */}
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="font-mono text-sm text-muted transition-colors hover:text-ink"
          >
            ← back
          </Link>

          {/* Header */}
          <div className="mt-10">
            <p className="mb-2 font-mono text-sm text-amber tracking-wide">
              Experience
            </p>
            <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
              The path that got me here.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Started with mechanical engineering, pivoted through railway
              safety systems, built mobile apps for millions, and ended up deep
              in generative AI. The path was never linear — but it always made
              sense in hindsight.
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-16 relative">
            {/* Vertical amber line */}
            <div
              className="absolute left-0 top-2 bottom-2 w-px"
              style={{ background: "var(--amber)", opacity: 0.2 }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-14 pl-8">
              {experience.map((role, i) => (
                <div key={i} className="relative">
                  {/* Dot on timeline */}
                  <div
                    className="absolute -left-8 top-1.5 w-2 h-2 rounded-full"
                    style={{ background: "var(--amber)", opacity: 0.7, transform: "translateX(-3px)" }}
                    aria-hidden="true"
                  />

                  {/* Period */}
                  <p className="font-mono text-xs text-faint mb-2">{role.period}</p>

                  {/* Company + role */}
                  <h2 className="font-heading text-xl font-semibold text-ink leading-tight">
                    {role.role}
                  </h2>
                  <p className="mt-0.5 text-sm text-muted">
                    {role.company} &nbsp;·&nbsp; {role.location}
                  </p>

                  {/* Tech tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-0.5 font-mono text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="mt-4 space-y-2">
                    {role.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-0.5 shrink-0 font-mono text-amber">→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Education */}
              <div className="relative">
                <div
                  className="absolute -left-8 top-1.5 w-2 h-2 rounded-full"
                  style={{ background: "var(--faint)", transform: "translateX(-3px)" }}
                  aria-hidden="true"
                />

                <p className="font-mono text-xs text-faint mb-2">{education.period}</p>

                <h2 className="font-heading text-xl font-semibold text-ink leading-tight">
                  {education.degree}
                </h2>
                <p className="mt-0.5 text-sm text-muted">
                  {education.school} &nbsp;·&nbsp; {education.location}
                </p>

                <ul className="mt-4 space-y-2">
                  {education.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-0.5 shrink-0 font-mono text-faint">—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-20 border-t border-border pt-10">
            <p className="text-sm text-muted">
              Want to talk about any of this?{" "}
              <a
                href="mailto:akkad.haritha@gmail.com"
                className="text-amber transition-opacity hover:opacity-70"
              >
                akkad.haritha@gmail.com ↗
              </a>
            </p>
          </div>

        </div>
      </div>
    </DirectionalTransition>
  );
}
