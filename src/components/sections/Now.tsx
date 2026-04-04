import { SectionHeader } from '../Section/SectionHeader';
import styles from './Now.module.css';

export function Now() {
  return (
    <section className="section" id="now">
      <SectionHeader title="Right now" num="02 / 04" label="Section 2 of 4" />
      <div className={styles.currently}>
        <div className={styles.label}>Currently exploring</div>
        <p className={styles.body} data-animate>
          <strong>Agentic AI systems</strong> — multi-agent workflows, Claude + MCP
          integrations, and building software that can reason and act on its own.
          Not an expert yet. Getting there.
        </p>
      </div>
    </section>
  );
}
