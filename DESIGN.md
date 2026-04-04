# Portfolio Design System — Left Rail

> Selected design direction for `hartitha-portfolio.vercel.app`.
> Reference this file in any Claude conversation working on the portfolio.

---

## Aesthetic

**Vibe:** Editorial calm. Structured warmth. A personal site that reads like a well-organized notebook — not a marketing page.

**What it is NOT:**
- No dark backgrounds
- No gradient hero sections
- No floating icons or blob shapes
- No blue "AI" aesthetic
- Not a resume dump

**What it IS:**
- Light, airy, off-white/cream background
- Sticky left sidebar with identity + navigation
- Main content scrolls in a clean reading column
- Amber/gold as the only accent color — used sparingly
- Polaroid-style photo blocks for human warmth
- Honest, first-person voice in copy

---

## Color Tokens

```css
:root {
  --bg:          #f9f7f2;  /* warm off-white — page background */
  --ink:         #17150e;  /* near-black — headings, strong text */
  --muted:       #7a7262;  /* warm gray — body text, secondary */
  --faint:       #c0b9a8;  /* light warm gray — labels, placeholders */
  --amber:       #c48a08;  /* gold amber — accent, links, highlights */
  --amber-pale:  #fdf4df;  /* very light amber — tag backgrounds, hover fills */
  --border:      #e2dbd0;  /* warm border — dividers, card edges */
}
```

**Amber usage rules:**
- Active nav item background: `--amber-pale` fill + `--amber` text
- Accent bar: 32×2px solid `--amber`
- Status "Available" value: `--amber`
- `<em>` inside intro text: `--amber`
- Tag backgrounds: `--amber-pale` + `--amber` text
- Hover states on links: transition to `--amber`
- Currently-block left border: 3px solid `--amber`

---

## Typography

| Role | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Display / Headings | Syne | 700 | clamp(28px, 3vw, 38px) | letter-spacing: -.025em |
| Rail name | Syne | 700 | 22px | letter-spacing: -.02em, line-height: 1 |
| Experience role | Syne | 600 | 17px | letter-spacing: -.01em |
| Body / UI | Inter | 300–500 | 13–18px | -webkit-font-smoothing: antialiased |
| Intro paragraph | Inter | 300 | 18px | line-height: 1.85 |
| Label / metadata | Inter | 400–500 | 10–11px | letter-spacing: .04–.12em, uppercase |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
```

---

## Layout

```
┌──────────────────────────────────────────────────────────┐
│  280px rail (sticky)  │  main content (scrolls)          │
│                       │  padding: 60px 64px              │
│  position: sticky     │  max-width: 800px                │
│  top: 0               │                                  │
│  height: 100vh        │                                  │
│  overflow-y: auto     │                                  │
└──────────────────────────────────────────────────────────┘
```

```css
body {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

/* Mobile: rail hidden, single column */
@media (max-width: 900px) {
  body { grid-template-columns: 1fr; }
  .rail { display: none; }
  main { padding: 40px 24px; }
}
```

---

## Left Rail Structure

Top to bottom order:
1. **Name block** — "Haritha\nAkkad" in Syne 700/22px + subtitle in Inter 400/12px muted
2. **Amber accent bar** — `width: 32px; height: 2px; background: var(--amber)`
3. **Bio** — 13px Inter 300, muted, one or two lines max
4. **Nav links** — section anchors with active state (amber-pale bg + amber text + visible →)
5. **Status table** — key/value rows with 1px border-bottom, "Available" in amber
6. **Social links** (pushed to bottom) — GitHub, LinkedIn, Download CV; underline hover to amber

Rail has `border-right: 1px solid var(--border)` and `padding: 40px 32px`.

---

## Main Content Sections

Each section follows this pattern:
```html
<section class="section" id="slug">
  <div class="section-header">
    <h2 class="section-title">Section name</h2>
    <span class="section-num">01 / 04</span>
  </div>
  <!-- content -->
</section>
```

`section-header` has `border-bottom: 1px solid var(--border)` + `margin-bottom: 36px`.
Sections are spaced `margin-bottom: 80px`.

### Intro text
```css
.intro-text {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.85;
  color: var(--muted);
}
.intro-text strong { color: var(--ink); font-weight: 500; }
.intro-text em { font-style: italic; color: var(--amber); }
```

### Currently block (amber callout)
```css
.currently {
  background: var(--amber-pale);
  border-left: 3px solid var(--amber);
  padding: 20px 24px;
  border-radius: 0 8px 8px 0;
}
```
Label is `10px Inter 500 uppercase letter-spacing:.12em` in amber.

### Experience items
Two-column grid: `100px date | 1fr content`.
- Date: 11px faint, letter-spacing .04em
- Role: Syne 600 17px
- Company: Inter 14px muted
- Body: Inter 300 14px muted, line-height 1.6
- Tags: amber text on amber-pale bg, 11px, border-radius 4px

### Polaroid photos
```css
.polaroid {
  background: #fff;
  padding: 10px 10px 36px;
  box-shadow: 0 2px 12px rgba(0,0,0,.07);
  transform: rotate(-1deg);
  transition: transform .25s;
}
.polaroid:nth-child(2) { transform: rotate(.8deg); }
.polaroid:hover { transform: rotate(0) scale(1.02) !important; }
```
Caption: 10px italic, color `#b0a898`.

---

## Interactions & Motion

| Element | Interaction | Transition |
|---|---|---|
| Nav links | hover/active → amber-pale bg + amber text | `background .2s, color .2s` |
| Nav arrow `→` | opacity 0 → 1 on hover/active | `opacity .2s` |
| Social links | color + border-color → amber | `.2s` |
| Polaroids | rotate(0) + scale(1.02) on hover | `.25s` |

**Planned (not yet built):**
- Nav active state updates on scroll via IntersectionObserver
- Sections fade up as they enter viewport
- Polaroids stagger reveal on load

**Always include:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

---

## Sections to Build (full site)

1. **Intro** (`#intro`) — Two intro paragraphs + polaroid row
2. **Right now** (`#now`) — Currently block about agentic AI
3. **Work** (`#work`) — Experience items: Kobil, Enekom, Drone
4. **Contact** (`#contact`) — Simple links, no form

---

## Copy Voice

- First person, honest, not corporate
- Acknowledge learner status on AI ("Not an expert yet. Getting there.")
- Lead with scale ("10 million users") but don't oversell
- Personal details add humanity ("I started with a drone that hunts other drones")
- Short sentences. No filler words.

---

## File Structure

```
portfolio/
├── index.html          ← production (deploy from main)
├── DESIGN.md           ← this file
└── .claude/
    └── launch.json     ← dev server config (python3 http.server 3000)
```

Production URL: `hartitha-portfolio.vercel.app`
Deploy: push to `main` → Vercel auto-deploys.
