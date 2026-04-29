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

## Phase 1: Foundation ✅

- [x] Create new branch `feature/portfolio-v2` from `feature/setup-claude-md`
- [x] Initialize Next.js 16 (App Router) with TypeScript
- [x] Configure `next.config.ts`
- [x] Set up project folder structure
- [x] Install and configure Tailwind CSS
- [x] Set up design tokens (CSS custom properties): warm color palette, muted text, spacing scale
- [x] Configure fonts: Syne (headings) + Inter (body) + JetBrains Mono (code/tech)
- [x] Build root layout (`layout.tsx`) with metadata, fonts, global styles
- [x] Build minimal header with nav (smooth scroll on landing)
- [x] Build footer (social links, copyright)
- [x] Custom cursor — instant tracking, no lerp lag, amber glow, grows on hover
- [x] Verify Vercel preview deploys work on the branch
- [x] Responsive layout shell working on mobile, tablet, desktop

---

## Phase 2: Landing Page Sections ✅

### 2.1 Hero
- [x] Tagline: **"Software engineer exploring what happens when you give your code a brain."**
- [x] **Typewriter animation** — cycles through: "Haritha Seddik", "Software Engineer", "AI Automation Specialist", "Adventurer", "Curious Learner" with blinking cursor, infinite loop
- [x] ~~Integrate `pretext` library for hero headline character animation~~ — deferred to Phase 5 (pretext requires research; typewriter covers the need)
- [x] Generous whitespace — let the hero breathe
- [x] CTA buttons: "See what I'm building" + "Get in touch"

### 2.2 About / Journey
- [x] Casual, personal tone — journey narrative
- [x] Story arc: mechanical engineering → R&D → mobile → backend → Gen.AI
- [x] Concise (3-4 short paragraphs)
- [x] Personal touches (multilingual, Istanbul/Hanover)
- [x] **Headshot photo** alongside narrative text — `public/images/headshot.jpeg`

### 2.3 Projects (Cards)
- [x] Responsive grid of project cards
- [x] Replace placeholders with featured AI projects:
  1. **Vinted Shopping Agent** — AI personal shopper via browser automation
  2. **Halal Stock Screener & Analyst** — Multi-step research agent for Sharia-compliant investing
  3. **AI Job Applier** — Automated job applications with tailored resumes
- [x] Status badges (coming soon)
- [x] Subtle hover animation on cards
- [x] Cards link to MDX case study pages (`/projects/[slug]`)
- Remaining projects (Website Redesign, Content Pipeline, Market Digest) → full projects page later

### 2.4 Tech Stack Visualization
- [x] Visual representation grouped by category
- [x] AI/Gen.AI tools prominently highlighted
- [x] Clean grid layout

### 2.5 Contact / CTA
- [x] Email link, LinkedIn, GitHub
- [x] Warm closing line
- [x] No contact form in MVP

### 2.6 Beyond Code
- [x] Dedicated section between TechStack and Contact
- [x] Short intro: "When I'm not coding..."
- [x] 5 hobby/adventure photos — small cards with witty captions (DAA-style)
- [x] Uses `useSectionReveal` hook

---

## Phase 3: Project Case Study Pages ✅

- [x] Configure MDX support (`next-mdx-remote` for RSC + `gray-matter` for frontmatter)
- [x] Define frontmatter schema: title, description, date, tags, thumbnail, links
- [x] Build case study page template (`src/app/projects/[slug]/page.tsx`):
  - Project hero (title, description, date, tech tags)
  - MDX body (problem, approach, implementation, outcomes)
  - Back to projects link
  - Clean typography for long-form reading (`prose-portfolio` CSS class)
  - `generateMetadata` per page
- [x] Write case study for "this portfolio" — `src/content/projects/portfolio.mdx`
- [x] MDX stubs for 3 AI agent projects (Vinted Agent, Halal Screener, AI Job Applier)
- [x] Project cards link to case study pages

---

## Phase 4: Polish & Production

### 4.1 SEO & Metadata ✅
- [x] Dynamic `generateMetadata` for case study pages
- [x] OG images — `@vercel/og` edge route at `/og`, wired into all page metadata via `buildOgUrl()`
- [x] `robots.ts` and `sitemap.ts`
- [x] Structured data (JSON-LD person schema in root layout)

### 4.2 Animations ✅
- [x] Custom cursor — instant tracking, no lerp lag
- [x] ~~Hero entrance animation with pretext~~ — deferred to Phase 5
- [x] Scroll-triggered section reveals (Intersection Observer)
- [x] Project card entrance animations — staggered fade-in + slide-up via `useStaggerReveal` hook
- [x] Subtle hover states on interactive elements (cubic-bezier easing)
- [x] Hero scroll parallax — content drifts + fades as you scroll past
- [x] Hero tagline word-reveal (pretext-style, per-word clip animation)
- [x] Beyond Code dock animation — proximity-based photo magnification
- [x] Staggered `.reveal-item` pattern for per-element reveals within sections
- [x] `prefers-reduced-motion` support

### 4.4 Advanced Animations ✅

#### ~~Project Card 3D Tilt Parallax~~ — aborted (scattered depth layout chosen instead)

#### Inter-Section Scroll Parallax ✅
- [x] **Section label parallax** — amber labels drift at ~75% scroll speed via `data-parallax="label"` wrappers + `useInterSectionParallax` hook
- [x] **Headings at 85% scroll speed** — `data-parallax="heading"` wrappers, factor 0.04
- [x] **Scroll progress sidebar** — thin amber vertical line + dots, fades in after hero, fades out at footer, active section dot pulses. Desktop only (`lg:flex`). `src/components/ui/scroll-progress.tsx`
- [x] **Section dividers** — decorative amber dot between every chapter, parallaxes at 60% speed
- [x] Implementation: single `useInterSectionParallax` hook, passive scroll listener, direct DOM mutation (60fps, no setState)
- [x] Respects `prefers-reduced-motion` + touch device guard

#### View Transitions (React ViewTransition API) ✅
- [x] `experimental.viewTransition: true` enabled
- [x] `DirectionalTransition` wrapper — type-keyed `nav-forward` / `nav-back` slides
- [x] Home page + case study pages wrapped; `transitionTypes` on all project links + back link
- [x] Shared element morph — card h3 title ↔ case study h1 (`text-morph` recipe)
- [x] Header isolated with `viewTransitionName: "site-header"` + backdrop-blur workaround

#### Web Interface Guidelines ✅
- [x] `text-wrap: balance` on all h1/h2/h3 globally
- [x] `color-scheme: light` on `<html>`
- [x] `Intl.DateTimeFormat` on case study date
- [x] `beyond-code.tsx` dock animation — direct DOM mutation, no useState (60fps)
- [x] Nav link underline micro-interaction (`nav-link` CSS class)
- [x] All VT animation CSS recipes added to globals.css

### 4.3 Performance & Accessibility ✅
- [x] Image optimization via `next/image` — all images audited with proper width/height/sizes/alt
- [x] Headshot `priority` flag set (above-the-fold)
- [x] Font optimization via `next/font`
- [ ] Lighthouse audit — target 90+ across all metrics
- [x] Semantic HTML throughout
- [x] Keyboard navigation — all interactive elements focusable
- [x] Focus indicators — amber `:focus-visible` outline in globals.css
- [x] Color contrast compliance — `--muted` darkened to `#5c5549` (6.88:1 ratio)

---

## Phase 5: Future (Post-MVP)

- [ ] **Blog / Writing** — MDX-powered, same content pipeline
- [ ] **AI Playground / Chatbot** — live AI agent (AI SDK + AI Gateway)
- [ ] **Dark mode toggle** — adaptive theme support
- [ ] **Multi-language (Turkish)** — i18n support
- [ ] **Custom domain** — configure when purchased
- [ ] **GitHub activity integration** — API-powered feed
- [ ] **pretext hero animation** — character-level reveal on hero headline
- [ ] **OG image generation** — `@vercel/og` dynamic images per page

---

## Awaiting from Haritha

- [x] Updated resume (saved to CLAUDE.md as internal reference — not served as static asset)
- [x] Inspiration portfolio links (analyzed and incorporated into design philosophy)
- [x] Project ideas/descriptions — 6 AI agent projects documented in `src/content/project-ideas.md`
- [ ] Domain name (when purchased)
- [x] Headshot / personal photos — `my_photos/head_shot_photo.jpeg` + 5 hobby/adventure photos
- [x] Hero tagline — "Software engineer exploring what happens when you give your code a brain."
