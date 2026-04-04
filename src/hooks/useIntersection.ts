import { useEffect } from 'react';

/**
 * Two IntersectionObservers — identical config to the original index.html:
 *
 * 1. navObserver — rootMargin '-35% 0px -60% 0px'
 *    Toggles 'active' class on .rail-nav anchor matching the visible section.
 *
 * 2. fadeObserver — threshold 0.05
 *    Adds 'in-view' to each .section as it enters the viewport.
 *
 * Both write classList directly — no setState — so they never trigger
 * React re-renders.
 */
export function useIntersection() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.section');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.rail-nav a');

    // Sections already visible on load get in-view immediately
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top < window.innerHeight) {
        s.classList.add('in-view');
      }
    });

    const navObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove('active'));
            const link = document.querySelector<HTMLAnchorElement>(
              `.rail-nav a[href="#${entry.target.id}"]`,
            );
            link?.classList.add('active');
          }
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 },
    );

    sections.forEach((s) => {
      navObserver.observe(s);
      if (!s.classList.contains('in-view')) fadeObserver.observe(s);
    });

    return () => {
      navObserver.disconnect();
      fadeObserver.disconnect();
    };
  }, []);
}
