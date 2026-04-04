import { experienceEntries } from '../../data/experience';
import { SectionHeader } from '../Section/SectionHeader';
import styles from './Work.module.css';

export function Work() {
  return (
    <section className="section" id="work">
      <SectionHeader title="Where I've worked" num="03 / 04" label="Section 3 of 4" />
      {experienceEntries.map((entry) => (
        <div key={entry.company} className={styles.expItem}>
          <span className={styles.expDate}>{entry.dateRange}</span>
          <div>
            <div className={styles.expRole}>{entry.role}</div>
            <div className={styles.expCompany}>{entry.company}</div>
            <p className={styles.expBody} data-animate>{entry.body}</p>
            <div className={styles.expTags}>
              {entry.tags.map((tag) => (
                <span key={tag} className={styles.eTag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
