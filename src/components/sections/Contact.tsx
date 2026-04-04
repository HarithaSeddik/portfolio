import { contactLinks } from '../../data/contact';
import { SectionHeader } from '../Section/SectionHeader';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section className="section" id="contact">
      <SectionHeader title="Let's talk" num="04 / 04" label="Section 4 of 4" />
      <p className={styles.intro} data-animate>
        Open to new opportunities — full-time roles, contract work, or a conversation
        about something interesting.
      </p>
      <div className={styles.links}>
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.link}
            {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <span className={styles.linkLabel}>{link.label}</span>
            <span>{link.display}</span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        ))}
      </div>
      <p className={styles.credit}>
        Text measurement powered by{' '}
        <a href="https://github.com/chenglou/pretext" target="_blank" rel="noreferrer">
          @chenglou/pretext
        </a>{' '}
        — character-level layout without DOM thrash.
      </p>
    </section>
  );
}
