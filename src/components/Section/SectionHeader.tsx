import styles from './SectionHeader.module.css';

interface Props {
  title: string;
  num: string;
  label: string;
}

export function SectionHeader({ title, num, label }: Props) {
  return (
    <div className={styles.header}>
      <span className={styles.title}>{title}</span>
      <span className={styles.num} aria-label={label}>{num}</span>
    </div>
  );
}
