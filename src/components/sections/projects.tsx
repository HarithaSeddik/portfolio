"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { useRef, useEffect } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Chrome = "phone" | "browser" | "terminal";
interface ProjectState { label: string; caption: string; html: string }
interface Project {
  title: string; slug: string; blurb: string; tags: string[];
  hash: string; date: string; status: "live" | "coming-soon";
  chrome: Chrome; states: ProjectState[];
}

// ── Project data with 3 scroll-states each ───────────────────────────────────

const PROJECTS: Project[] = [
  {
    title: "Vinted Shopping Agent",
    slug: "vinted-agent",
    blurb: "an AI personal shopper that hunts rare finds on Vinted and automates listings — no API needed.",
    tags: ["Claude", "Browser Automation", "Agents", "WhatsApp"],
    hash: "a1f3c92", date: "Apr · 2026", status: "coming-soon", chrome: "phone",
    states: [
      {
        label: "scan", caption: "monitoring 14 sellers in your taste profile",
        html: `<div class="pp-mk pp-mk-vinted">
          <div class="pp-mk-statusbar"><span>9:41</span><span class="pp-mk-pill">scanning…</span></div>
          <div class="pp-mk-header"><div><div class="pp-mk-eyebrow">today's hunt</div><div class="pp-mk-h">working on it…</div></div><div class="pp-mk-avatar"></div></div>
          <div class="pp-st-scanrow"><span>margiela tabi</span><span class="pp-st-bar"><span style="width:74%"></span></span><span>74%</span></div>
          <div class="pp-st-scanrow"><span>issey miyake</span><span class="pp-st-bar"><span style="width:48%"></span></span><span>48%</span></div>
          <div class="pp-st-scanrow"><span>cdg homme</span><span class="pp-st-bar"><span style="width:91%"></span></span><span>91%</span></div>
          <div class="pp-st-scanrow"><span>maison mihara</span><span class="pp-st-bar"><span style="width:22%"></span></span><span>22%</span></div>
          <div class="pp-mk-footer"><span class="pp-mk-dot"></span><span>scanning · seller 9 of 14</span></div>
        </div>`,
      },
      {
        label: "match", caption: "3 rare finds that match your taste",
        html: `<div class="pp-mk pp-mk-vinted">
          <div class="pp-mk-statusbar"><span>9:41</span><span class="pp-mk-pill">3 new matches</span></div>
          <div class="pp-mk-header"><div><div class="pp-mk-eyebrow">today's hunt</div><div class="pp-mk-h">3 rare finds for you</div></div><div class="pp-mk-avatar"></div></div>
          <div class="pp-mk-row"><div class="pp-mk-thumb"></div><div class="pp-mk-row-body"><div class="pp-mk-row-title">margiela tabi · 38</div><div class="pp-mk-row-meta">€189 · 12% under market</div></div><div class="pp-mk-cta">view</div></div>
          <div class="pp-mk-row"><div class="pp-mk-thumb"></div><div class="pp-mk-row-body"><div class="pp-mk-row-title">issey miyake pleats</div><div class="pp-mk-row-meta">€72 · seller responsive</div></div><div class="pp-mk-cta">view</div></div>
          <div class="pp-mk-row"><div class="pp-mk-thumb"></div><div class="pp-mk-row-body"><div class="pp-mk-row-title">cdg homme plus tee</div><div class="pp-mk-row-meta">€34 · rare colorway</div></div><div class="pp-mk-cta">view</div></div>
          <div class="pp-mk-footer"><span class="pp-mk-dot"></span><span>14 sellers scanned</span></div>
        </div>`,
      },
      {
        label: "ping", caption: "morning digest delivered to your WhatsApp",
        html: `<div class="pp-mk pp-mk-vinted">
          <div class="pp-mk-statusbar"><span>9:42</span><span class="pp-mk-pill pp-mk-pill-green">whatsapp</span></div>
          <div class="pp-st-wa"><div class="pp-st-wa-bubble">
            <div class="pp-st-wa-from">vinted shopper · today</div>
            <div class="pp-st-wa-line"><span class="pp-st-wa-tick">✓</span> 3 rares this morning</div>
            <div class="pp-st-wa-line"><span class="pp-st-wa-tick">✓</span> margiela tabi 38 · €189</div>
            <div class="pp-st-wa-line"><span class="pp-st-wa-tick">✓</span> issey miyake pleats · €72</div>
            <div class="pp-st-wa-line"><span class="pp-st-wa-tick">✓</span> cdg homme tee · €34</div>
            <div class="pp-st-wa-foot">tap a row in the app to claim →</div>
          </div></div>
          <div class="pp-mk-footer"><span class="pp-mk-dot"></span><span>summary delivered</span></div>
        </div>`,
      },
    ],
  },
  {
    title: "Halal Stock Screener",
    slug: "halal-stock-screener",
    blurb: "an AI analyst that filters, researches, and charts stocks end to end.",
    tags: ["AI Agents", "Finance", "Python", "Technical Analysis"],
    hash: "7e09b40", date: "Mar · 2026", status: "coming-soon", chrome: "browser",
    states: [
      {
        label: "screen", caption: "filter 4,200 tickers down to a sharia-compliant watchlist",
        html: `<div class="pp-mk pp-mk-halal">
          <div class="pp-mk-toolbar"><span class="pp-mk-mono">universe · 4,200 tickers</span><span class="pp-mk-tag pp-mk-tag-pass">sharia screen</span><span class="pp-mk-tag">debt &lt; 33%</span></div>
          <div class="pp-st-screen">
            <div class="pp-st-screen-row"><span>$ASML</span><span class="pp-mk-tag pp-mk-tag-pass">pass</span></div>
            <div class="pp-st-screen-row"><span>$TSM</span><span class="pp-mk-tag pp-mk-tag-pass">pass</span></div>
            <div class="pp-st-screen-row"><span>$NVDA</span><span class="pp-mk-tag pp-mk-tag-pass">pass</span></div>
            <div class="pp-st-screen-row"><span>$JPM</span><span class="pp-st-fail">fail · debt 0.61</span></div>
            <div class="pp-st-screen-row"><span>$KO</span><span class="pp-st-fail">fail · cash 0.42</span></div>
            <div class="pp-st-screen-row"><span>$AAPL</span><span class="pp-mk-tag pp-mk-tag-pass">pass</span></div>
          </div>
          <div class="pp-st-screen-foot"><span>filtered: 38 / 4,200</span><span>·</span><span>updated 09:41</span></div>
        </div>`,
      },
      {
        label: "analyze", caption: "fundamentals & technicals on the survivors",
        html: `<div class="pp-mk pp-mk-halal">
          <div class="pp-mk-toolbar"><span class="pp-mk-mono">$ASML · fundamental</span><span class="pp-mk-tag">FCF +12%</span><span class="pp-mk-tag">ROE 28</span></div>
          <svg class="pp-mk-chart" viewBox="0 0 600 220" preserveAspectRatio="none">
            <defs><linearGradient id="haf2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="var(--amber)" stop-opacity="0.18"/><stop offset="100%" stop-color="var(--amber)" stop-opacity="0"/></linearGradient></defs>
            <g stroke="var(--border)" stroke-width="0.5"><line x1="0" y1="40" x2="600" y2="40"/><line x1="0" y1="100" x2="600" y2="100"/><line x1="0" y1="160" x2="600" y2="160"/></g>
            <path d="M0,170 L50,160 L100,148 L150,152 L200,128 L250,118 L300,98 L350,108 L400,82 L450,68 L500,72 L550,52 L600,40" fill="none" stroke="var(--amber)" stroke-width="2" stroke-linejoin="round"/>
            <path d="M0,170 L50,160 L100,148 L150,152 L200,128 L250,118 L300,98 L350,108 L400,82 L450,68 L500,72 L550,52 L600,40 L600,220 L0,220 Z" fill="url(#haf2)"/>
            <g font-family="JetBrains Mono,monospace" font-size="10" fill="var(--muted)"><text x="6" y="36">€890</text><text x="6" y="156">€560</text></g>
          </svg>
          <div class="pp-mk-grid">
            <div class="pp-mk-stat"><div class="pp-mk-stat-l">P/E</div><div class="pp-mk-stat-v">32.1</div></div>
            <div class="pp-mk-stat"><div class="pp-mk-stat-l">DCF</div><div class="pp-mk-stat-v">€890</div></div>
            <div class="pp-mk-stat"><div class="pp-mk-stat-l">moat</div><div class="pp-mk-stat-v">wide</div></div>
          </div>
        </div>`,
      },
      {
        label: "signal", caption: "concrete entry, target & stop — not vibes",
        html: `<div class="pp-mk pp-mk-halal">
          <div class="pp-mk-toolbar"><span class="pp-mk-mono">$ASML · technical</span><span class="pp-mk-tag pp-mk-tag-pass">long signal</span><span class="pp-mk-tag">R:R 4.4</span></div>
          <svg class="pp-mk-chart" viewBox="0 0 600 220" preserveAspectRatio="none">
            <g stroke="var(--border)" stroke-width="0.5"><line x1="0" y1="50" x2="600" y2="50"/><line x1="0" y1="110" x2="600" y2="110"/><line x1="0" y1="170" x2="600" y2="170"/></g>
            <line x1="0" y1="80" x2="600" y2="80" stroke="var(--amber)" stroke-dasharray="4 4" stroke-width="1"/>
            <line x1="0" y1="135" x2="600" y2="135" stroke="var(--ink)" stroke-dasharray="4 4" stroke-width="1" opacity="0.5"/>
            <line x1="0" y1="180" x2="600" y2="180" stroke="#b54a2a" stroke-dasharray="4 4" stroke-width="1"/>
            <path d="M0,165 L50,150 L100,158 L150,140 L200,148 L250,130 L300,140 L350,128 L400,138 L450,132" fill="none" stroke="var(--ink)" stroke-width="1.4"/>
            <circle cx="450" cy="132" r="5" fill="var(--amber)"/>
            <text x="468" y="78" font-family="JetBrains Mono,monospace" font-size="10" fill="var(--amber)">target €890</text>
            <text x="468" y="133" font-family="JetBrains Mono,monospace" font-size="10" fill="var(--muted)">entry €612</text>
            <text x="468" y="178" font-family="JetBrains Mono,monospace" font-size="10" fill="#b54a2a">stop €548</text>
          </svg>
          <div class="pp-mk-grid">
            <div class="pp-mk-stat"><div class="pp-mk-stat-l">entry</div><div class="pp-mk-stat-v">€612</div></div>
            <div class="pp-mk-stat"><div class="pp-mk-stat-l">target</div><div class="pp-mk-stat-v">€890</div></div>
            <div class="pp-mk-stat"><div class="pp-mk-stat-l">stop</div><div class="pp-mk-stat-v">€548</div></div>
          </div>
        </div>`,
      },
    ],
  },
  {
    title: "AI Job Applier",
    slug: "ai-job-applier",
    blurb: "recruiters automated screening — so I automated applying.",
    tags: ["Claude", "Browser Automation", "Email Parsing", "Agents"],
    hash: "3c52e1d", date: "Feb · 2026", status: "coming-soon", chrome: "terminal",
    states: [
      {
        label: "watch", caption: "inbox parser — listings unwrapped from email noise",
        html: `<div class="pp-mk pp-mk-job">
          <div class="pp-mk-term-head">~/applier · inbox.scan</div>
          <div class="pp-mk-term">
            <div><span class="pp-mk-term-amber">›</span> watching <span class="pp-mk-term-faint">linkedin · stepstone · xing</span></div>
            <div><span class="pp-mk-term-amber">›</span> 12 new alerts <span class="pp-mk-term-faint">last 24h</span></div>
            <div><span class="pp-mk-term-amber">›</span> parsing listings <span class="pp-mk-term-faint">…</span></div>
            <div><span class="pp-mk-term-amber">›</span> dedup, normalise, queue</div>
          </div>
          <div class="pp-mk-jobs">
            <div class="pp-mk-job-row"><span class="pp-mk-check">•</span><span class="pp-mk-job-title">Senior ML Engineer · Hugging Face</span><span class="pp-mk-mono">queued</span></div>
            <div class="pp-mk-job-row"><span class="pp-mk-check">•</span><span class="pp-mk-job-title">Staff Eng · Anthropic</span><span class="pp-mk-mono">queued</span></div>
            <div class="pp-mk-job-row"><span class="pp-mk-check">•</span><span class="pp-mk-job-title">AI Eng · DeepL · Cologne</span><span class="pp-mk-mono">queued</span></div>
          </div>
        </div>`,
      },
      {
        label: "score", caption: "match each listing against your profile",
        html: `<div class="pp-mk pp-mk-job">
          <div class="pp-mk-term-head">~/applier · score.match</div>
          <div class="pp-mk-term">
            <div><span class="pp-mk-term-amber">›</span> embedding profile <span class="pp-mk-term-faint">8 yrs · agents · llm</span></div>
            <div><span class="pp-mk-term-amber">›</span> scoring 12 listings <span class="pp-mk-term-faint">cosine + rubric</span></div>
            <div><span class="pp-mk-term-amber">›</span> 7 / 12 above threshold 0.78</div>
          </div>
          <div class="pp-mk-jobs">
            <div class="pp-mk-job-row"><span class="pp-mk-check">→</span><span class="pp-mk-job-title">Hugging Face · ML Engineer</span><span class="pp-mk-mono pp-st-score-hi">0.91</span></div>
            <div class="pp-mk-job-row"><span class="pp-mk-check">→</span><span class="pp-mk-job-title">Staff Eng · Anthropic</span><span class="pp-mk-mono pp-st-score-hi">0.88</span></div>
            <div class="pp-mk-job-row"><span class="pp-mk-check">→</span><span class="pp-mk-job-title">AI Eng · DeepL</span><span class="pp-mk-mono pp-st-score-hi">0.83</span></div>
            <div class="pp-mk-job-row pp-st-row-dim"><span class="pp-mk-check">×</span><span class="pp-mk-job-title">Frontend · Klarna</span><span class="pp-mk-mono">0.42</span></div>
          </div>
        </div>`,
      },
      {
        label: "apply", caption: "resumes tailored & submitted automatically",
        html: `<div class="pp-mk pp-mk-job">
          <div class="pp-mk-term-head">~/applier · submit</div>
          <div class="pp-mk-term">
            <div><span class="pp-mk-term-amber">›</span> tailoring resume per listing</div>
            <div><span class="pp-mk-term-amber">›</span> filling forms via browser-use</div>
            <div class="pp-mk-term-done">submitted 7 applications · saved 4h 20m</div>
          </div>
          <div class="pp-mk-jobs">
            <div class="pp-mk-job-row"><span class="pp-mk-check">✓</span><span class="pp-mk-job-title">Hugging Face · ML Engineer</span><span class="pp-mk-mono">sent</span></div>
            <div class="pp-mk-job-row"><span class="pp-mk-check">✓</span><span class="pp-mk-job-title">Anthropic · Staff Eng</span><span class="pp-mk-mono">sent</span></div>
            <div class="pp-mk-job-row"><span class="pp-mk-check">✓</span><span class="pp-mk-job-title">DeepL · AI Engineer</span><span class="pp-mk-mono">sent</span></div>
          </div>
        </div>`,
      },
    ],
  },
];

// ── Injected CSS ──────────────────────────────────────────────────────────────

const SCRUB_CSS = `
/* Scroll-state transitions */
[data-d4-state] {
  position: absolute; inset: 0;
  opacity: 0; transform: translateX(56px) scale(0.97);
  transition: opacity 480ms cubic-bezier(0.16,1,0.3,1), transform 480ms cubic-bezier(0.16,1,0.3,1);
  will-change: transform, opacity;
}
[data-d4-state].d4-active { opacity: 1; transform: translateX(0) scale(1); }
[data-d4-state].d4-past   { opacity: 0; transform: translateX(-56px) scale(0.97); }

[data-d4-step] { transition: color 300ms cubic-bezier(0.16,1,0.3,1); }
[data-d4-step].d4-active { color: var(--ink) !important; }
[data-d4-step].d4-active [data-d4-caption] { opacity: 1 !important; }

[data-d4-nav]  { position: relative; transition: color 300ms cubic-bezier(0.16,1,0.3,1); }
[data-d4-nav]::after {
  content: ''; position: absolute; bottom: 0; left: 16px; right: 16px;
  height: 2px; background: var(--amber); border-radius: 2px 2px 0 0;
  transform: scaleX(0); transform-origin: left;
  transition: transform 340ms cubic-bezier(0.16,1,0.3,1);
}
[data-d4-nav].d4-active { color: var(--ink) !important; }
[data-d4-nav].d4-active::after { transform: scaleX(1); }
[data-d4-nav].d4-past { color: var(--muted) !important; }
[data-d4-nav].d4-past::after { transform: scaleX(1); opacity: 0.3; }

/* Mini mockup base */
.pp-mk { font-family: var(--font-sans); color: var(--ink); height: 100%; display: flex; flex-direction: column; }
.pp-mk-mono { font-family: var(--font-mono); font-size: 11px; color: var(--muted); letter-spacing: 0.02em; }

/* Vinted (phone) */
.pp-mk-vinted { padding: 16px 20px 14px; gap: 12px; background: var(--bg); }
.pp-mk-statusbar { display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 11px; color: var(--muted); }
.pp-mk-pill { background: var(--amber-pale); color: var(--amber); padding: 2px 10px; border-radius: 9999px; font-size: 10px; }
.pp-mk-pill-green { background: rgba(90,142,79,0.15); color: #5a8e4f; }
.pp-mk-header { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 4px; }
.pp-mk-eyebrow { font-family: var(--font-mono); font-size: 10px; color: var(--amber); letter-spacing: 0.05em; margin-bottom: 4px; }
.pp-mk-h { font-family: var(--font-heading); font-size: 18px; font-weight: 600; line-height: 1.2; max-width: 14ch; letter-spacing: -0.015em; }
.pp-mk-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--amber-pale), #f3eee5); border: 1px solid var(--border); flex: 0 0 auto; }
.pp-mk-row { display: flex; align-items: center; gap: 12px; padding: 10px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg); }
.pp-mk-thumb { width: 44px; height: 44px; border-radius: 8px; background: #f3eee5; border: 1px solid var(--border); flex: 0 0 auto; position: relative; overflow: hidden; }
.pp-mk-thumb::after { content: ""; position: absolute; inset: 0; background: linear-gradient(135deg, transparent 40%, rgba(196,138,8,0.18) 60%, transparent 80%); }
.pp-mk-row-body { flex: 1; min-width: 0; }
.pp-mk-row-title { font-size: 12.5px; font-weight: 500; color: var(--ink); line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pp-mk-row-meta  { font-family: var(--font-mono); font-size: 10.5px; color: var(--muted); margin-top: 2px; }
.pp-mk-cta { font-family: var(--font-mono); font-size: 11px; color: var(--ink); border: 1px solid var(--ink); border-radius: 9999px; padding: 4px 12px; flex: 0 0 auto; }
.pp-mk-footer { margin-top: auto; padding-top: 8px; display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 10.5px; color: var(--muted); border-top: 1px solid var(--border); }
.pp-mk-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--amber); animation: pp-pulse 1.6s cubic-bezier(0.16,1,0.3,1) infinite; }
@keyframes pp-pulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }

/* Vinted scan-bar state */
.pp-st-scanrow { display: grid; grid-template-columns: 1fr 1.4fr 36px; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 11px; color: var(--muted); }
.pp-st-bar { height: 4px; background: #f3eee5; border-radius: 9999px; overflow: hidden; border: 1px solid var(--border); }
.pp-st-bar > span { display: block; height: 100%; background: var(--amber); }

/* Vinted WhatsApp state */
.pp-st-wa { flex: 1; padding-top: 10px; display: flex; align-items: flex-start; }
.pp-st-wa-bubble { background: var(--amber-pale); color: var(--ink); border-radius: 14px 14px 14px 4px; padding: 12px 14px; font-family: var(--font-sans); font-size: 13px; line-height: 1.55; max-width: 96%; border: 1px solid rgba(196,138,8,0.18); }
.pp-st-wa-from { font-family: var(--font-mono); font-size: 10.5px; color: var(--amber); margin-bottom: 6px; letter-spacing: 0.04em; }
.pp-st-wa-line { display: flex; gap: 8px; align-items: baseline; font-size: 12.5px; color: var(--ink); margin: 2px 0; }
.pp-st-wa-tick { color: var(--amber); font-family: var(--font-mono); }
.pp-st-wa-foot { margin-top: 8px; font-family: var(--font-mono); font-size: 11px; color: var(--muted); }

/* Halal (browser) */
.pp-mk-halal { padding: 18px 22px; gap: 14px; background: var(--bg); }
.pp-mk-toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.pp-mk-toolbar .pp-mk-mono { color: var(--ink); font-weight: 500; font-size: 12.5px; margin-right: auto; }
.pp-mk-tag { font-family: var(--font-mono); font-size: 10px; padding: 3px 9px; border-radius: 9999px; border: 1px solid var(--border); color: var(--muted); }
.pp-mk-tag-pass { background: var(--amber-pale); color: var(--amber); border-color: rgba(196,138,8,.18); }
.pp-mk-chart { width: 100%; height: 180px; display: block; }
.pp-mk-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
.pp-mk-stat { border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; background: #f3eee5; }
.pp-mk-stat-l { font-family: var(--font-mono); font-size: 10px; color: var(--muted); letter-spacing: 0.04em; }
.pp-mk-stat-v { font-family: var(--font-heading); font-size: 22px; font-weight: 600; color: var(--ink); margin-top: 2px; letter-spacing: -0.01em; }

/* Halal screen state */
.pp-st-screen { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 14px; margin: 6px 0; }
.pp-st-screen-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; border: 1px solid var(--border); border-radius: 8px; font-family: var(--font-mono); font-size: 11.5px; color: var(--ink); }
.pp-st-fail { color: #b54a2a; font-family: var(--font-mono); font-size: 10px; }
.pp-st-screen-foot { display: flex; gap: 10px; font-family: var(--font-mono); font-size: 11px; color: var(--muted); margin-top: auto; padding-top: 8px; border-top: 1px solid var(--border); }

/* Job applier (terminal) */
.pp-mk-job { background: var(--ink); color: var(--bg); padding: 0; }
.pp-mk-term-head { font-family: var(--font-mono); font-size: 11px; color: var(--faint); padding: 12px 18px; border-bottom: 1px solid rgba(255,255,255,0.08); letter-spacing: 0.02em; }
.pp-mk-term { padding: 14px 18px; font-family: var(--font-mono); font-size: 12px; line-height: 1.8; flex: 1; }
.pp-mk-term > div { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pp-mk-term-amber { color: var(--amber); margin-right: 8px; }
.pp-mk-term-faint { color: var(--faint); margin-left: 8px; font-size: 11px; }
.pp-mk-term-done  { color: var(--amber); margin-top: 6px; padding-top: 8px; border-top: 1px dashed rgba(255,255,255,0.12); }
.pp-mk-jobs { padding: 6px 18px 18px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 6px; }
.pp-mk-job-row { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 11.5px; padding: 6px 10px; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; }
.pp-mk-check { color: var(--amber); flex: 0 0 auto; width: 14px; }
.pp-mk-job-title { color: var(--bg); flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pp-mk-job-row .pp-mk-mono { color: var(--faint); flex: 0 0 auto; }
.pp-st-row-dim { opacity: 0.45; }
.pp-st-score-hi { color: var(--amber) !important; }
`;

// ── Chrome frame wrappers ─────────────────────────────────────────────────────

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      borderRadius: 32, border: "8px solid var(--ink)", overflow: "hidden",
      boxShadow: "0 30px 80px rgba(23,21,14,0.22), 0 12px 32px rgba(196,138,8,0.08)",
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
    }}>
      {children}
    </div>
  );
}

function BrowserFrame({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 18,
      overflow: "hidden", display: "flex", flexDirection: "column", height: "100%",
      boxShadow: "0 20px 60px rgba(23,21,14,0.10), 0 6px 20px rgba(23,21,14,0.07)",
    }}>
      <div style={{
        flex: "0 0 auto", height: 36, display: "flex", alignItems: "center", gap: 8,
        padding: "0 14px", background: "#f3eee5", borderBottom: "1px solid var(--border)",
      }}>
        {[0,1,2].map(i => (
          <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--faint)", opacity: 0.55, display: "block" }} />
        ))}
        <div style={{
          marginLeft: 8, height: 20, borderRadius: 6, background: "var(--bg)", flex: 1,
          maxWidth: 280, border: "1px solid var(--border)", fontFamily: "var(--font-mono)",
          fontSize: 10.5, color: "var(--muted)", display: "flex", alignItems: "center", padding: "0 10px",
        }}>
          {slug}.app
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

function TerminalFrame({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--ink)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18,
      overflow: "hidden", display: "flex", flexDirection: "column", height: "100%",
      boxShadow: "0 20px 60px rgba(23,21,14,0.10), 0 6px 20px rgba(23,21,14,0.07)",
    }}>
      <div style={{
        flex: "0 0 auto", height: 36, display: "flex", alignItems: "center", gap: 8,
        padding: "0 14px", background: "rgba(0,0,0,0.25)", borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        {[0,1,2].map(i => (
          <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--faint)", opacity: 0.6, display: "block" }} />
        ))}
        <div style={{
          marginLeft: 8, height: 20, borderRadius: 6, background: "rgba(255,255,255,0.05)",
          flex: 1, maxWidth: 280, border: "1px solid rgba(255,255,255,0.08)",
          fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--faint)",
          display: "flex", alignItems: "center", padding: "0 10px",
        }}>
          ~/{slug}
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function Projects() {
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stages = stageRefs.current;
    let raf = 0;

    const clamp = (v: number) => Math.max(0, Math.min(1, v));

    const update = () => {
      raf = 0;
      stages.forEach((stage) => {
        if (!stage) return;
        const rect = stage.getBoundingClientRect();
        const vh = window.innerHeight;
        const h = stage.offsetHeight;
        const totalScroll = h - vh;
        if (totalScroll <= 0) return;

        const p = -rect.top / totalScroll;
        const sceneP = clamp((p - 0.05) / 0.9);
        const N = 3;
        const activeI = Math.min(N - 1, Math.max(0, Math.floor(sceneP * N)));

        stage.querySelectorAll<HTMLElement>("[data-d4-state]").forEach((el, si) => {
          el.classList.toggle("d4-active", si === activeI);
          el.classList.toggle("d4-past",   si  < activeI);
        });
        stage.querySelectorAll<HTMLElement>("[data-d4-step]").forEach((el, si) => {
          el.classList.toggle("d4-active", si <= activeI);
        });
        stage.querySelectorAll<HTMLElement>("[data-d4-nav]").forEach((el, si) => {
          el.classList.toggle("d4-active", si === activeI);
          el.classList.toggle("d4-past",   si  < activeI);
        });

        const fill = stage.querySelector<HTMLElement>("[data-d4-fill]");
        if (fill) fill.style.width = `${sceneP * 100}%`;

        const haze = stage.querySelector<HTMLElement>("[data-d4-haze]");
        if (haze) {
          haze.style.setProperty("--hx", `${20 + sceneP * 60}%`);
          haze.style.setProperty("--hy", `${30 + sceneP * 40}%`);
        }

        const stack = stage.querySelector<HTMLElement>("[data-d4-stack]");
        if (stack) stack.style.transform = `translateY(${(0.5 - sceneP) * 30}px)`;
      });
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="projects">
      <style>{SCRUB_CSS}</style>

      {/* Section header */}
      <div style={{ padding: "96px 80px 64px", maxWidth: 1280, margin: "0 auto" }}>
        <p className="font-mono text-sm tracking-wide" style={{ color: "var(--amber)", marginBottom: 8 }}>
          02 — Projects
        </p>
        <h2 className="font-heading font-semibold tracking-tight" style={{ fontSize: "clamp(1.875rem, 4vw, 2.25rem)", color: "var(--ink)", margin: 0 }}>
          Things I&apos;m building
        </h2>
        <p style={{ marginTop: 16, maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: "var(--muted)" }}>
          AI-first projects at the intersection of software engineering and generative AI.
          Scroll through each to watch the product flow play out.
        </p>
      </div>

      {/* Desktop: sticky scrub sections */}
      <div className="hidden md:block">
        {PROJECTS.map((project, i) => {
          const isWide = project.chrome !== "phone";
          return (
            <div
              key={project.slug}
              ref={(el) => { stageRefs.current[i] = el; }}
              style={{ height: "320vh", position: "relative" }}
            >
              <div style={{
                position: "sticky", top: 0, height: "100vh", overflow: "hidden",
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56,
                padding: "0 80px", alignItems: "center",
              }}>
                {/* Soft amber haze */}
                <div
                  data-d4-haze
                  style={{
                    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
                    background: "radial-gradient(ellipse 60vw 60vh at var(--hx,30%) var(--hy,40%), rgba(196,138,8,0.10), transparent 60%)",
                    transition: "background 200ms linear",
                  } as React.CSSProperties}
                />

                {/* Left: text + rail */}
                <div style={{ position: "relative", zIndex: 3, maxWidth: 540 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--amber)",
                    letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: 8,
                  }}>
                    <span style={{ color: "var(--faint)" }}>/</span>{project.slug}
                  </span>

                  {project.slug ? (
                    <Link href={`/projects/${project.slug}`} transitionTypes={["nav-forward"]} style={{ textDecoration: "none" }}>
                      <ViewTransition name={`project-title-${project.slug}`} share="text-morph" default="none">
                        <h2 style={{
                          fontFamily: "var(--font-heading)", fontWeight: 600,
                          fontSize: "clamp(48px, 5vw, 72px)", lineHeight: 0.95,
                          letterSpacing: "-0.025em", margin: "18px 0 0", color: "var(--ink)",
                        }}>
                          {project.title}
                        </h2>
                      </ViewTransition>
                    </Link>
                  ) : (
                    <h2 style={{
                      fontFamily: "var(--font-heading)", fontWeight: 600,
                      fontSize: "clamp(48px, 5vw, 72px)", lineHeight: 0.95,
                      letterSpacing: "-0.025em", margin: "18px 0 0", color: "var(--ink)",
                    }}>
                      {project.title}
                    </h2>
                  )}

                  <p style={{ margin: "22px 0 0", fontSize: 18, lineHeight: 1.55, color: "var(--muted)", maxWidth: 480 }}>
                    {project.blurb}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "24px 0" }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{
                        padding: "4px 12px", borderRadius: 9999,
                        border: "1px solid var(--border)",
                        fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 18, fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--faint)", letterSpacing: "0.04em" }}>
                    <span style={{ color: "var(--amber)" }}>#{project.hash}</span>
                    <span>{project.date}</span>
                    <span>coming soon</span>
                  </div>

                  {/* Step rail */}
                  <div style={{ marginTop: 36, display: "flex", position: "relative" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "var(--border)" }} />
                    <div
                      data-d4-fill
                      style={{
                        position: "absolute", top: -1, left: 0, height: 3,
                        background: "var(--amber)", width: "0%", borderRadius: 2,
                        transition: "width 250ms cubic-bezier(0.16,1,0.3,1)",
                      }}
                    />
                    {project.states.map((state, si) => (
                      <div
                        key={si}
                        data-d4-step
                        style={{
                          flex: 1, padding: "14px 4px 0",
                          fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--faint)",
                          letterSpacing: "0.04em", display: "flex", flexDirection: "column", gap: 6,
                        }}
                      >
                        <span style={{ fontWeight: 500 }}>{state.label}</span>
                        <span
                          data-d4-caption
                          style={{
                            fontFamily: "var(--font-sans)", fontSize: 12.5, lineHeight: 1.4,
                            color: "var(--muted)", maxWidth: "18ch", letterSpacing: 0,
                            opacity: si === 0 ? 1 : 0.5, transition: "opacity 300ms cubic-bezier(0.16,1,0.3,1)",
                          }}
                        >
                          {state.caption}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: mockup stack */}
                <div style={{
                  position: "relative", zIndex: 2, height: "78vh", maxHeight: 720,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
                }}>
                  <div
                    data-d4-stack
                    style={{
                      position: "relative",
                      width: isWide ? "100%" : 300,
                      maxWidth: isWide ? 520 : 300,
                      height: isWide ? "68vh" : "100%",
                      maxHeight: isWide ? 520 : 620,
                      borderRadius: isWide ? 18 : 32,
                      overflow: "hidden",
                    }}
                  >
                    {project.states.map((state, si) => (
                      <div key={si} data-d4-state className={si === 0 ? "d4-active" : ""}>
                        {project.chrome === "phone" ? (
                          <PhoneFrame>
                            <div dangerouslySetInnerHTML={{ __html: state.html }} style={{ flex: 1, minHeight: 0 }} />
                          </PhoneFrame>
                        ) : project.chrome === "browser" ? (
                          <BrowserFrame slug={project.slug}>
                            <div dangerouslySetInnerHTML={{ __html: state.html }} style={{ flex: 1, minHeight: 0 }} />
                          </BrowserFrame>
                        ) : (
                          <TerminalFrame slug={project.slug}>
                            <div dangerouslySetInnerHTML={{ __html: state.html }} style={{ flex: 1, minHeight: 0 }} />
                          </TerminalFrame>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Nav strip */}
                  <nav style={{ display: "flex", alignItems: "center", position: "relative" }}>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "var(--border)" }} />
                    {project.states.map((state, si) => (
                      <div
                        key={si}
                        data-d4-nav
                        className={si === 0 ? "d4-active" : ""}
                        style={{
                          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em",
                          color: si === 0 ? "var(--ink)" : "var(--faint)",
                          padding: "10px 16px 9px", whiteSpace: "nowrap",
                        }}
                      >
                        {state.label}
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: simple cards */}
      <div className="md:hidden px-6 pb-16">
        <div className="flex flex-col gap-6">
          {PROJECTS.map((project) => (
            project.slug ? (
              <Link key={project.slug} href={`/projects/${project.slug}`} transitionTypes={["nav-forward"]} style={{ textDecoration: "none" }}>
                <MobileCard project={project} />
              </Link>
            ) : (
              <MobileCard key={project.slug} project={project} />
            )
          ))}
        </div>
      </div>

      {/* Outro */}
      <div style={{ padding: "48px 80px 96px", borderTop: "1px solid var(--border)", maxWidth: 1280, margin: "0 auto" }}>
        <p className="font-mono text-sm" style={{ color: "var(--muted)" }}>
          more projects coming —{" "}
          <a
            href="https://github.com/HarithaSeddik"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            style={{ color: "var(--amber)" }}
          >
            github has the rest ↗
          </a>
        </p>
      </div>
    </section>
  );
}

function MobileCard({ project }: { project: Project }) {
  const stateLabels = project.states.map((s) => s.label).join(" → ");
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--bg)" }}>
      <div style={{ padding: "28px 24px 8px", borderBottom: "1px solid var(--border)", background: "#f3eee5" }}>
        <p className="font-mono" style={{ fontSize: 11, color: "var(--amber)", letterSpacing: "0.04em", marginBottom: 6 }}>
          /{project.slug}
        </p>
        <p className="font-mono" style={{ fontSize: 11, color: "var(--muted)" }}>{stateLabels}</p>
      </div>
      <div style={{ padding: "20px 24px 24px" }}>
        <span className="inline-block rounded-full font-mono" style={{ fontSize: 11, padding: "3px 12px", background: "var(--amber-pale)", color: "var(--amber)", marginBottom: 10 }}>
          Coming soon
        </span>
        <ViewTransition name={`project-title-${project.slug}`} share="text-morph" default="none">
          <h3 className="font-heading font-semibold" style={{ fontSize: "1.125rem", color: "var(--ink)", marginBottom: 8 }}>
            {project.title}
          </h3>
        </ViewTransition>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--muted)", marginBottom: 14 }}>
          {project.blurb}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full font-mono" style={{ fontSize: 11, padding: "3px 10px", border: "1px solid var(--border)", color: "var(--muted)" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
