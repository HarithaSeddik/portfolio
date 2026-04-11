# CLAUDE.md — Portfolio Project

## Project Overview

Personal portfolio for Haritha Akkad — a senior software engineer showcasing the transition from mobile/embedded development to Gen.AI. The site serves multiple goals: landing jobs, freelance clients, personal brand, and AI project showcase.

**Live on Vercel.** GitHub-connected for preview deploys on every branch push.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + CSS custom properties for design tokens
- **Content:** MDX files for project case studies (in `src/content/projects/`)
- **Fonts:** Syne (headings) + Inter (body) + monospace for code/tech elements
- **Animations:** Custom cursor (from POC, no lerp — instant tracking, keeps character-push physics), `@chenglou/pretext` for hero text animation, Intersection Observer for scroll reveals
- **Deploy:** Vercel (auto-preview on branches, production on main)

## Architecture

```
src/
  app/                    # Next.js App Router pages
    layout.tsx            # Root layout
    page.tsx              # Landing page (all sections)
    projects/[slug]/      # Dynamic case study pages
  components/
    layout/               # Header, Footer, Nav, MobileNav
    sections/             # Hero, About, Projects, TechStack, Contact
    ui/                   # Reusable primitives (Button, Card, Tag)
  content/
    projects/             # MDX files with frontmatter
  lib/                    # Fonts, metadata, utilities
  styles/                 # globals.css, design tokens
```

## Design Direction

**Inspiration:** Daniyal Admaney (storytelling, chapters, personality) + Tamara Sredojevic (relaxed UX, expertise-through-work) + Franulovic (cursor, scroll animations) + Apple product pages (progressive disclosure on scroll)

- **Aesthetic:** Minimal & elegant, warm & relaxed — generous whitespace, breathing room
- **Colors:** Warm palette — off-white background (`#f9f7f2`), muted ink (never pure black — `#17150e`), muted grays (`#7a7262`), amber accent (`#c48a08`)
- **Animations:** Strategic moments — hero text reveal (pretext), scroll-triggered section entrances, subtle hover states. Never flashy, always purposeful.
- **Layout:** Hybrid — scrolling landing page with chapter-like sections + separate pages for project case studies
- **Tone:** Conversational ("I'm a..." not "Professional profile:"). Show expertise through projects and narrative, NOT a resume repeat.
- **Responsive:** Mobile-first
- **Key principle:** Visitor should feel "this person is accomplished" without seeing job bullet points

## Coding Conventions

- Functional components only — no class components
- Minimal comments — code should be self-explanatory, add comments only when logic is non-obvious
- TypeScript strict mode — no `any` types unless absolutely necessary
- Use `next/image` for all images, `next/font` for font loading
- CSS custom properties for design tokens, Tailwind for layout and utilities
- File naming: `kebab-case` for files, `PascalCase` for components
- One component per file

## Workflow Rules

- **Never push to main/production without asking first**
- **Never auto-commit** — only commit when explicitly asked
- **Always run `npm run build`** before considering a task complete
- **Vercel preview deploys** are the source of truth for visual verification
- **`PLAN.md` is the single source of truth** — it must ALWAYS be up to date. Before starting any work, check PLAN.md to see where we are. After completing work or making new decisions, update PLAN.md immediately. Every implementation task should trace back to a section in PLAN.md. If it doesn't exist there yet, add it before executing.
- Mark completed tasks with `[x]` in PLAN.md as work progresses

## Content Management

- Project case studies live as MDX files in `src/content/projects/`
- Frontmatter schema: `title`, `description`, `date`, `tags`, `thumbnail`, `links`
- About section tone: casual, personal, with a soft journey narrative

## Owner Reference (NOT for website content — internal context only)

**Name:** Harisa Seddik (goes by Haritha Akkad)
**Email:** akkad.haritha@gmail.com
**LinkedIn:** linkedin.com/in/HarithaSeddik
**GitHub:** github.com/HarithaSeddik
**Location:** Hanover, Germany (previously Istanbul/Ankara, Turkey)
**Education:** BS Mechanical Engineering, Bilkent University (Ankara) — 3.56/4.00, high honors, ranked 3/162, 100% merit scholarship
**Languages:** English (native/bilingual), Arabic (native/bilingual), Turkish (full professional), German (basic)

### Work Experience

1. **Senior Mobile Engineer (Flutter) / Backend Engineer — Continental AG** (Oct 2024 – Present, Hanover)
   - Flutter cross-platform apps, led UI/UX redesign of core module
   - Java Spring Boot backend: RESTful APIs, microservices, JPA/SQL
   - Kafka streaming data consumption
   - Kubernetes deployments, Jenkins CI/CD optimization (30% faster builds)
   - Quarterly mobile releases to Google Play / App Store
   - State management: Provider + Freezed

2. **Mobile Software Developer (Flutter) — Kobil GmbH** (Nov 2021 – Sep 2024, Remote Germany/Turkey)
   - Led Flutter SDK wrapper for mobile banking security (Swift, Kotlin, React Native)
   - Customer-facing technical support, product/MVP demos to clients
   - OpenTelemetry + Sentry for crash/performance tracing
   - "Istanbul Is Yours" app (5M users, Istanbul municipality)
   - BLoC + GetIt architecture, UI chunk loading optimization (30% faster)
   - TeamCity CI/CD automation

3. **R&D Engineer — RailAcoustic / Enekom** (Aug 2020 – Oct 2021, Ankara)
   - Python automation for testing microcontroller-based railway safety devices
   - Data analysis: Pandas, NumPy, SQLite3

### Tech Skills (from resume)
Python, Jupyter, Dart/Flutter, Java/Spring Boot, SQL/JPA, Kafka, Jenkins/TeamCity, Kubernetes, Azure/AWS (basic), Native Android/iOS, Microservices

### Notes
- Resume will be updated later to better reflect Gen.AI narrative and Continental AI work
- DO NOT serve resume PDFs as static assets — this data is for Claude's context only

## What's Deferred (Phase 5)

These are NOT in scope for the MVP build:
- Blog / writing
- AI playground / chatbot
- Dark mode
- Multi-language support
- Custom domain configuration
