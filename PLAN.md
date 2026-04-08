# Portfolio Rebuild Plan

> Senior software engineer portfolio showcasing the transition from mobile/embedded to Gen.AI.
> Minimal & elegant, warm tones, strategic animations, hybrid structure.
> Built with Next.js 16, Tailwind CSS, MDX, deployed on Vercel.

## Design Philosophy (from inspiration research)

**Primary references:** Daniyal Admaney (storytelling, chapters, personality) + Tamara Sredojevic (relaxed UX, expertise-through-work, non-aggressive)

**Core principles:**
- **Story, not resume** — convey expertise through narrative and projects, not a job timeline. Visitor should feel "this person is accomplished" without seeing bullet points.
- **Chapter-based flow** — sections feel like chapters of a journey, not rigid portfolio blocks
- **Scroll-driven progressive disclosure** — content reveals as you scroll (Apple-style), giving a sense of discovery
- **Warm & relaxed** — off-white background, muted text (not pure black), generous whitespace, breathing room
- **Conversational tone** — "I'm a..." not "Professional profile:". Casual, personal, show personality through details
- **Animations serve the story** — text reveals (pretext), section fade-ins, scroll-triggered content. Never flashy, always purposeful
- **Custom cursor** — Franulovic-style, instant tracking (no lag), character-push physics from POC

---

## Phase 1: Foundation

- [ ] Create new branch `feature/portfolio-v2` from `main`
- [ ] Initialize Next.js 16 (App Router) with TypeScript
- [ ] Configure `next.config.ts` and `vercel.json` (or `vercel.ts`)
- [ ] Set up project folder structure:
  - `src/app/` — pages and layouts
  - `src/components/layout/` — Header, Footer, Nav, MobileNav
  - `src/components/sections/` — Hero, About, Projects, TechStack, Contact
  - `src/components/ui/` — Reusable primitives (Button, Card, Tag)
  - `src/content/projects/` — MDX project files
  - `src/lib/` — Fonts, metadata, utilities
  - `src/styles/` — Global CSS, design tokens
- [ ] Install and configure Tailwind CSS
- [ ] Set up design tokens (CSS custom properties):
  - Warm color palette (`--bg: #f9f7f2`, `--ink: #17150e`, `--muted: #7a7262`, `--amber: #c48a08`, etc.)
  - Muted text colors (never pure black — use dark browns/grays)
  - Spacing scale (4px base grid)
  - Typography scale
- [ ] Configure fonts: Syne (headings) + Inter (body) + monospace (code/tech)
- [ ] Build root layout (`layout.tsx`) with metadata, fonts, global styles
- [ ] Build minimal header with nav (smooth scroll on landing, page links for sub-pages)
- [ ] Build footer (social links, copyright)
- [ ] Verify Vercel preview deploys work on the new branch
- [ ] Responsive layout shell working on mobile, tablet, desktop

---

## Phase 2: Landing Page Sections

### 2.1 Hero
- [ ] Name and positioning tagline (conversational, not formal)
- [ ] Brief one-liner about the AI transition
- [ ] Integrate `pretext` library for hero headline character animation (text reveal, like Daniyal's word-by-word entrance)
- [ ] Generous whitespace — let the hero breathe
- [ ] CTA: subtle, not aggressive — "See what I'm building" or similar

### 2.2 About / Journey
- [ ] Casual, personal tone — "I'm a..." opening (Tamara-style)
- [ ] Soft journey narrative woven in: mechanical engineering → R&D → mobile → backend → Gen.AI
- [ ] NOT a resume recap — show the arc, the curiosity, the evolution
- [ ] Concise (3-4 short paragraphs max)
- [ ] Personal touches (multilingual, Istanbul/Hanover, interests)
- [ ] Generous spacing between paragraphs — relaxed reading pace

### 2.3 Projects (Cards)
- [ ] Responsive grid of project cards (1-2-3 columns)
- [ ] Each card: title, short description, tech tags, thumbnail/visual
- [ ] Cards link to `/projects/[slug]` for full case study
- [ ] Placeholder projects (portfolio itself + 2-3 planned AI projects)
- [ ] Scroll-triggered entrance animation (fade-up as cards enter viewport)
- [ ] Subtle hover animation on cards

### 2.4 Tech Stack Visualization
- [ ] Visual representation of skills/tools
- [ ] Grouped by category: Languages, Frameworks, AI/ML, Tools, Cloud
- [ ] AI/Gen.AI tools prominently highlighted (steer the narrative)
- [ ] Clean grid with icons or creative visualization
- [ ] Include tools from resume + new AI tools (Claude, Vercel AI SDK, etc.)

### 2.5 Contact / CTA
- [ ] Clear but relaxed call-to-action section
- [ ] Email link, LinkedIn, GitHub
- [ ] Optional: "Download CV" button
- [ ] No contact form in MVP (keep it simple)
- [ ] Warm closing line — personality, not corporate

---

## Phase 3: Project Case Study Pages

- [ ] Configure MDX support (`@next/mdx` or `next-mdx-remote`)
- [ ] Define frontmatter schema: title, description, date, tags, thumbnail, links
- [ ] Build case study page template:
  - Project hero (title, description, date, tech tags)
  - MDX body (problem, approach, implementation, outcomes)
  - Media support (screenshots, diagrams, code snippets)
  - Back to projects / next-previous navigation
  - Clean typography for long-form reading (generous line-height, max-width)
- [ ] Write case study for "this portfolio" as first project
- [ ] Create 2-3 placeholder entries for planned AI projects

---

## Phase 4: Polish & Production

### 4.1 SEO & Metadata
- [ ] Dynamic `generateMetadata` for all pages
- [ ] OG images (static or generated with `@vercel/og`)
- [ ] `robots.txt` and `sitemap.xml`
- [ ] Structured data (JSON-LD person schema)

### 4.2 Animations
- [ ] Custom cursor from POC — same visual style + character-push physics, but **no lerp lag** (set cursor position directly to mouse coordinates instead of exponential interpolation)
- [ ] Hero entrance animation with pretext (word-by-word or character reveal)
- [ ] Scroll-triggered section reveals (Intersection Observer, fade-up with stagger)
- [ ] Project card entrance animations (progressive disclosure as you scroll)
- [ ] Subtle hover states on interactive elements (cubic-bezier easing, like Franulovic)
- [ ] `prefers-reduced-motion` support

### 4.3 Performance & Accessibility
- [ ] Image optimization via `next/image`
- [ ] Font optimization via `next/font`
- [ ] Lighthouse audit — target 90+ across all metrics
- [ ] Semantic HTML throughout
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] Color contrast compliance

---

## Phase 5: Future (Post-MVP)

- [ ] **Blog / Writing** — MDX-powered, same content pipeline
- [ ] **AI Playground / Chatbot** — live AI agent (AI SDK + AI Gateway)
- [ ] **Dark mode toggle** — adaptive theme support
- [ ] **Multi-language (Turkish)** — i18n support
- [ ] **Custom domain** — configure when purchased
- [ ] **GitHub activity integration** — API-powered feed

---

## Awaiting from Haritha

- [x] Updated resume (saved to CLAUDE.md as internal reference — not served as static asset)
- [x] Inspiration portfolio links (analyzed and incorporated into design philosophy)
- [ ] Project ideas/descriptions for case study placeholders
- [ ] Domain name (when purchased)
- [ ] Headshot / personal photo (optional, for About section)
- [ ] Hero tagline / copy preferences
