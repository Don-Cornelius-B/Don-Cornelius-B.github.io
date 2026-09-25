'use client';
import styles from './css/page.module.css';
import Terminal from './components/Terminal';
import AuxConsole from './components/AuxConsole';
import Visualizer from './components/Visualizer';
import LanguageSwitch from './components/LanguageSwitch';
import dynamic from 'next/dynamic';

const Model = dynamic(() => import('./components/Model'), { ssr: false });

function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <Terminal />
        <aside className={styles.aside}>
          <section className={styles.languageContainer}>
            <article className={styles.canvas}>
              <Model />
            </article>
            <LanguageSwitch />
          </section>
          <article className={styles.bars}>
            <Visualizer />
          </article>
          <article className={styles.auxConsole}>
            <AuxConsole />
          </article>
        </aside>
      </div>
    </main>
  );
}

export default Home;