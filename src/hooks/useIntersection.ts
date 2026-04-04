import { useEffect } from 'react';

/**
 * Adds 'in-view' to each .section as it enters the viewport (threshold 0.05).
 * Sections already visible on load are marked immediately.
 * Writes classList directly — no setState — so it never triggers React re-renders.
 *
 * Active nav state is owned by ChapterNav (its own IntersectionObserver).
 */
export function useIntersection() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.section');

    // Sections already visible on load get in-view immediately
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top < window.innerHeight) {
        s.classList.add('in-view');
      }
    });

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
      if (!s.classList.contains('in-view')) fadeObserver.observe(s);
    });

    return () => fadeObserver.disconnect();
  }, []);
}
