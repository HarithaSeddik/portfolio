import { SectionHeader } from '../Section/SectionHeader';
import { Polaroid } from '../Polaroid/Polaroid';
import styles from './Intro.module.css';

export function Intro() {
  return (
    <section className="section" id="intro">
      <SectionHeader title="Hello." num="01 / 04" label="Section 1 of 4" />
      <p className={styles.introText} data-animate>
        I'm a <strong>mobile and web developer</strong> who's been shipping production
        apps for four years. My day job is Flutter at Kobil GmbH — Turkey's first
        SuperApp, <strong>10 million users</strong>. My curiosity right now lives
        in <em>agentic AI</em>.
      </p>
      <p className={styles.introText} data-animate>
        I didn't start in mobile. I started with a drone that hunts other drones.
        Then energy R&D. Then SuperApps. Then AI. It all makes sense in reverse.
      </p>
      <div className={styles.polaroidRow} aria-hidden="true">
        <Polaroid altText="photo placeholder" caption="somewhere in istanbul" />
        <Polaroid altText="project screenshot" caption="10M users and counting" />
      </div>
    </section>
  );
}
