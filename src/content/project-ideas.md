# Project Ideas — AI Agent Portfolio

> Source material for case study pages. Each project showcases a different AI agent pattern: browser automation, financial analysis, content generation, and workflow orchestration.

---

## 1. Vinted Shopping Agent

**One-liner:** An AI personal shopper that hunts rare finds on Vinted and automates listings — no API needed.

**The problem:** Vinted has no public API, so finding rare or undervalued items means manually scrolling through listings multiple times a day. Preparing sell listings is equally tedious — photos, descriptions, pricing research.

**What it does:**
- Learns your taste — you teach the agent what qualifies as a good, rare, or undervalued find
- Runs 1–3 automated sweeps per day using Claude-powered browser automation
- Bookmarks matches and sends a WhatsApp summary with the best finds
- Assists in preparing sell listings: generates descriptions, suggests pricing, formats photos
- Works entirely through the browser UI, bypassing the lack of an API

**AI patterns:** Browser automation agent, preference learning, scheduled task orchestration, WhatsApp integration

---

## 2. Halal Stock Screener & Analyst

**One-liner:** An AI analyst that filters, researches, and charts stocks — following a Sharia-compliant investment process end to end.

**The problem:** Evaluating stocks for halal investing is a multi-step, manual process: compliance screening, fundamental analysis, earnings review, analyst signal checks, and technical charting. Each stock takes significant time, and the watchlist keeps growing.

**What it does:**
- Takes an unfiltered watchlist collected from various sources
- Screens each stock for Sharia compliance and halal investment eligibility
- Analyzes fundamentals: P/E ratios, recent earnings, financial health indicators
- Reviews analyst signals and sentiment
- Performs technical analysis: draws support/resistance bands, determines entry and exit points
- Records qualified stocks with a summary, entry/exit levels, and rationale
- Continuously monitors the watchlist and re-evaluates as conditions change

**AI patterns:** Multi-step research agent, financial data retrieval, technical chart analysis, persistent watchlist management

---

## 3. Daily Market Digest (Arabic)

**One-liner:** An automated morning briefing on yesterday's market close — written in Arabic, ready to send to clients.

**The problem:** Preparing a daily market summary across multiple asset classes (crypto, US equities, UAE equities, precious metals) is repetitive work that follows the same structure every day but requires fresh data and analysis each morning.

**What it does:**
- Pulls closing data from multiple markets: crypto, NYSE, ADX (Abu Dhabi Securities Exchange), gold, and silver
- Analyzes key movers, trends, and notable events from the previous session
- Generates a polished written report in Arabic
- Formats for easy distribution to clients (WhatsApp, email, or messaging)
- Runs daily on a schedule — report ready before the next market open

**AI patterns:** Scheduled automation, multi-source data aggregation, Arabic language generation, templated report writing

---

## 4. Website Redesign Demo Agent

**One-liner:** Give it a URL, get back a deployed preview of a modernized redesign — in minutes.

**The problem:** Pitching web redesign services means spending hours mocking up what a client's site *could* look like. Most prospects need to see a tangible before/after to commit.

**What it does:**
- Takes a URL of an outdated website
- Analyzes the existing site: brand identity, color palette, content structure, business type
- Preserves the brand's essence while modernizing the design, layout, and UX
- Generates a working POC with polished UI
- Deploys a live preview on Vercel — shareable link ready in minutes
- Serves as a sales tool: "Here's what your site could look like with our services"

**AI patterns:** Web scraping + analysis, UI/UX generation, Vercel deployment automation, rapid prototyping

**Built with:** Vercel, AI SDK, v0-style generation

---

## 5. Social Media Content Pipeline

**One-liner:** From idea to posted content — AI generates short-form videos and posts, you just approve.

**The problem:** Creating consistent social media content across platforms is a grind: ideation, design, editing, formatting for each platform, scheduling, and posting. The creative bottleneck kills consistency.

**What it does:**
- Takes a content idea + a prepared canvas/brand template
- Generates short-form video content and social media posts
- Adapts output for each platform: Instagram Reels, TikTok, YouTube Shorts
- Routes to human approval before anything goes live
- Handles automated posting across connected accounts on approval
- Future: evolves into a full social media account manager agent

**AI patterns:** Content generation, template-aware design, multi-platform publishing, human-in-the-loop approval workflow

---

## 6. AI Job Applier

**One-liner:** Recruiters automated screening — so we automated applying.

**The problem:** Job hunting is a numbers game with diminishing returns. Tailoring resumes, filtering listings, and submitting applications is hours of repetitive work per day. Meanwhile, most applications are screened by automated systems anyway.

**What it does:**
- Deeply understands your professional profile across multiple resume versions and experiences
- Monitors Gmail for LinkedIn daily job alert emails
- Filters opportunities based on your preferences: role, location, company size, compensation
- Evaluates job descriptions against your actual experience and interests
- Tailors your resume for each application — selects the right base resume and adjusts emphasis to match the job description
- Submits applications automatically
- Tracks application status and follow-ups

**AI patterns:** Email parsing, document generation, preference matching, browser automation, multi-resume management
