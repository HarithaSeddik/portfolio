import type { PolaroidItem } from '../../data/types';
import styles from './Polaroid.module.css';

export function Polaroid({ altText, caption }: PolaroidItem) {
  return (
    <div className={styles.polaroid}>
      <div className={styles.img} aria-label={altText} />
      <p className={styles.cap}>{caption}</p>
    </div>
  );
}
