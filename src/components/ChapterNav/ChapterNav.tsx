import { useEffect, useState } from 'react';
import styles from './ChapterNav.module.css';

const SECTIONS = [
  { id: 'intro',   label: 'Intro' },
  { id: 'now',     label: 'Right now' },
  { id: 'work',    label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export function ChapterNav() {
  const [activeId, setActiveId] = useState('intro');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.nav} aria-label="Page sections">
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${styles.item} ${activeId === id ? styles.active : ''}`}
          aria-label={label}
        >
          <span className={styles.label}>{label}</span>
          <span className={styles.dot} />
        </a>
      ))}
    </nav>
  );
}
