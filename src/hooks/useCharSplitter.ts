import { useEffect, type RefObject } from 'react';

/**
 * After React commits to the DOM, walks all [data-animate] elements
 * inside containerRef and wraps every non-whitespace grapheme in
 * <span class="w"> so the spring physics loop can displace individual
 * characters.
 *
 * Cleanup restores original innerHTML — handles React StrictMode
 * double-invoke in development correctly.
 */
export function useCharSplitter(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>('[data-animate]');
    const originals = new Map<HTMLElement, string>();

    targets.forEach((el) => {
      originals.set(el, el.innerHTML);
      wrapCharsIn(el);
    });

    return () => {
      originals.forEach((html, el) => { el.innerHTML = html; });
    };
  }, [containerRef]);
}

function wrapCharsIn(el: HTMLElement): void {
  const children = Array.from(el.childNodes);
  for (const node of children) {
    if (node.nodeType === Node.TEXT_NODE) {
      const raw = node.textContent ?? '';
      if (!raw.trim()) continue;

      const chars =
        typeof Intl.Segmenter !== 'undefined'
          ? [...new Intl.Segmenter().segment(raw)].map((s) => s.segment)
          : [...raw];

      const frag = document.createDocumentFragment();
      for (const ch of chars) {
        if (/^\s+$/.test(ch)) {
          frag.appendChild(document.createTextNode(ch));
        } else {
          const span = document.createElement('span');
          span.className = 'w';
          span.textContent = ch;
          frag.appendChild(span);
        }
      }
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el2 = node as HTMLElement;
      if (['SCRIPT', 'STYLE'].includes(el2.tagName)) continue;
      if (el2.classList.contains('w')) continue;
      wrapCharsIn(el2);
    }
  }
}
