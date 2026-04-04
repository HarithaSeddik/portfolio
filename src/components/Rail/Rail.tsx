import { statusRows } from '../../data/status';
import { socialLinks } from '../../data/social';
import { RailNav } from './RailNav';
import styles from './Rail.module.css';

export function Rail() {
  return (
    <aside className={`rail ${styles.rail}`}>
      <div className={styles.top}>
        <div className={styles.nameBlock}>
          <span className={styles.nameBig}>Haritha<br />Akkad</span>
          <span className={styles.nameSub}>Software Developer · Istanbul</span>
        </div>

        <div className={styles.amberBar} />

        <p className={styles.bio}>
          Four years shipping production apps. Now deep in{' '}
          <strong>agentic AI</strong> — building, learning, tinkering.
        </p>

        <RailNav />

        <div className={styles.status} role="list" aria-label="Quick stats">
          {statusRows.map((row) => (
            <div key={row.key} className={styles.statusRow} role="listitem">
              <span className={styles.statusKey}>{row.key}</span>
              <span className={`${styles.statusVal}${row.accent ? ` ${styles.amber}` : ''}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.social}>
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.socialLink}
            {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            {...(link.download ? { download: true } : {})}
          >
            {link.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
