import { useRef } from 'react';
import { Cursor }    from './components/Cursor/Cursor';
import { Rail }      from './components/Rail/Rail';
import { Intro }     from './components/sections/Intro';
import { Now }       from './components/sections/Now';
import { Work }      from './components/sections/Work';
import { Contact }   from './components/sections/Contact';
import { usePretext }       from './hooks/usePretext';
import { useCharSplitter }  from './hooks/useCharSplitter';
import { useSpringLoop }    from './hooks/useSpringLoop';
import { useIntersection }  from './hooks/useIntersection';
import styles from './App.module.css';

export function App() {
  const mainRef    = useRef<HTMLElement>(null);
  const pretextRef = usePretext();

  // Hook order matters: char splitting must complete before spring loop
  // caches character positions (both run after the same commit phase,
  // but useCharSplitter's useEffect fires first due to declaration order).
  useCharSplitter(mainRef);
  useSpringLoop({ pretextRef, containerRef: mainRef });
  useIntersection();

  return (
    <>
      <Cursor />
      <Rail />
      <main ref={mainRef} className={styles.main}>
        <Intro />
        <Now />
        <Work />
        <Contact />
      </main>
    </>
  );
}
