import { navLinks } from '../../data/nav';
import styles from './RailNav.module.css';

// Global class "rail-nav" is intentional — useIntersection queries
// `.rail-nav a` selectors via document.querySelectorAll to toggle
// the "active" class. Must stay as a plain class, not a CSS Module hash.
export function RailNav() {
  return (
    <nav className={`rail-nav ${styles.nav}`} aria-label="Page sections">
      {navLinks.map((link, i) => (
        <a
          key={link.href}
          href={link.href}
          className={i === 0 ? 'active' : ''}
        >
          {link.label}
          <span className="arr" aria-hidden="true">→</span>
        </a>
      ))}
    </nav>
  );
}
