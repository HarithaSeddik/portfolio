import { useEffect, useRef, type RefObject } from 'react';
import type { CharState, PretextModule } from '../data/types';

// Physics constants — identical to the original index.html
const RADIUS    = 52;   // cursor influence zone (px)
const PUSH      = 22;   // max radial displacement per character (px)
const STIFFNESS = 0.09; // spring return force
const DAMPING   = 0.72; // velocity decay per frame

interface Options {
  pretextRef: RefObject<PretextModule | null>;
  containerRef: RefObject<HTMLElement | null>;
}

/**
 * Runs the full animation loop:
 * 1. Cursor exponential lerp (0.10 factor)
 * 2. Per-character spring physics — radial push away from cursor
 *    (ambulance-parting effect), smoothstep falloff
 *
 * Everything lives in refs — zero setState calls — so the loop
 * never triggers a React re-render.
 */
export function useSpringLoop({ pretextRef, containerRef }: Options) {
  const rafIdRef   = useRef<number>(0);
  const mouseRef   = useRef({ x: 0, y: 0 });
  const cursorRef  = useRef({ x: 0, y: 0, live: false });
  const statesRef  = useRef<CharState[]>([]);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cursorElMaybe = document.getElementById('cursor');
    if (!cursorElMaybe) return;
    const cursorEl: HTMLElement = cursorElMaybe;

    // ── Mouse tracking ──────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!cursorRef.current.live) {
        cursorRef.current = { x: e.clientX, y: e.clientY, live: true };
        cursorEl.classList.add('visible');
      }
    };
    const onLeave = () => cursorEl.classList.remove('visible');
    const onEnter = () => {
      if (cursorRef.current.live) cursorEl.classList.add('visible');
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // ── Link/button hover — shrink cursor ───────────────────────────
    const addLink    = () => cursorEl.classList.add('on-link');
    const removeLink = () => cursorEl.classList.remove('on-link');
    const interactives = document.querySelectorAll('a, button');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', addLink);
      el.addEventListener('mouseleave', removeLink);
    });

    // ── Pretext annotation (non-blocking) ───────────────────────────
    function annotate() {
      const pt = pretextRef.current;
      const container = containerRef.current;
      if (!pt || !container) return;

      const containerW = container.clientWidth - 128; // 64px padding each side
      container.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
        try {
          const text     = el.textContent?.trim() ?? '';
          const font     = '300 18px Inter, sans-serif';
          const prepared = pt.prepareWithSegments(text, font);
          const { lines, lineCount } = pt.layoutWithLines(prepared, containerW, 28);

          el.dataset['ptLines'] = String(lineCount);
          el.dataset['ptWords'] = String(
            prepared.segments?.filter((s) => s.trim()).length ?? '?',
          );

          const charSpans = Array.from(el.querySelectorAll<HTMLElement>('.w'));
          let spanIdx = 0;
          lines.forEach((line, lineIdx) => {
            const wordsOnLine = line.text.trim().split(/\s+/).filter(Boolean);
            wordsOnLine.forEach(() => {
              if (charSpans[spanIdx]) {
                charSpans[spanIdx]!.dataset['line'] = String(lineIdx);
                spanIdx++;
              }
            });
          });
        } catch {
          // non-fatal — spring works without annotations
        }
      });
    }

    // ── Character position cache ────────────────────────────────────
    function cachePositions() {
      statesRef.current = [];
      document.querySelectorAll<HTMLElement>('[data-animate] .w').forEach((span) => {
        const r = span.getBoundingClientRect();
        statesRef.current.push({
          el: span,
          cx: r.left + r.width  / 2,
          cy: r.top  + r.height / 2 + window.scrollY,
          dx: 0, vx: 0,
          dy: 0, vy: 0,
        });
      });
    }

    // ── RAF tick ────────────────────────────────────────────────────
    function tick() {
      const cur   = cursorRef.current;
      const mouse = mouseRef.current;

      // Cursor lerp
      cur.x += (mouse.x - cur.x) * 0.10;
      cur.y += (mouse.y - cur.y) * 0.10;
      cursorEl.style.left = `${cur.x}px`;
      cursorEl.style.top  = `${cur.y}px`;

      // Spring physics
      if (!prefersReduced && cur.live) {
        const scrollY = window.scrollY;
        for (const w of statesRef.current) {
          const wordVY    = w.cy - scrollY;
          const toCursorX = cur.x - w.cx;
          const toCursorY = cur.y - wordVY;
          const dist      = Math.sqrt(toCursorX * toCursorX + toCursorY * toCursorY);

          const t = Math.max(0, 1 - dist / RADIUS);
          const influence = t * t * (3 - 2 * t); // smoothstep

          const safeD   = dist < 0.5 ? 0.5 : dist;
          const targetDx = -influence * PUSH * (toCursorX / safeD);
          const targetDy = -influence * PUSH * (toCursorY / safeD);

          w.vx += (targetDx - w.dx) * STIFFNESS;
          w.vy += (targetDy - w.dy) * STIFFNESS;
          w.vx *= DAMPING;
          w.vy *= DAMPING;
          w.dx += w.vx;
          w.dy += w.vy;

          if (
            Math.abs(w.dx) > 0.01 || Math.abs(w.dy) > 0.01 ||
            Math.abs(w.vx) > 0.005 || Math.abs(w.vy) > 0.005
          ) {
            w.el.style.transform = `translate(${w.dx.toFixed(2)}px,${w.dy.toFixed(2)}px)`;
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    }

    // ── Init ────────────────────────────────────────────────────────
    async function init() {
      await document.fonts.ready;
      annotate();
      cachePositions();
      rafIdRef.current = requestAnimationFrame(tick);

      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { annotate(); cachePositions(); }, 150);
      };
      window.addEventListener('resize', onResize, { passive: true });
    }

    void init();

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', addLink);
        el.removeEventListener('mouseleave', removeLink);
      });
    };
  }, []); // empty deps — all reads go through refs
}
