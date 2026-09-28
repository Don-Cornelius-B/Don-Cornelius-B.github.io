'use client';
import { useState, useEffect } from 'react';
import styles from './css/page.module.css';
import Terminal from './components/Terminal';
import AuxConsole from './components/AuxConsole';
import Visualizer from './components/Visualizer';
import OverallViewSwitch from './components/OverallViewSwitch';
import NerdTree from './components/NerdTree';

function Home() {
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [phase, setPhase] = useState(0);
  const [selectedFile, setSelectedFile] = useState('multimodal-ai.txt');

  useEffect(() => {
    let t1, t2;
    if (isExplorerOpen) {
      setPhase(1); // Phase 1: Slide Out
      t1 = setTimeout(() => {
        setPhase(2); // Phase 2: Accordion Down
        t2 = setTimeout(() => {
          setPhase(3); // Phase 3: Split Grid
        }, 400);
      }, 400);
    } else {
      if (phase > 0) {
        setPhase(2); // Reverse Phase 3: Un-split Grid
        t1 = setTimeout(() => {
          setPhase(1); // Reverse Phase 2: Collapse height
          t2 = setTimeout(() => {
            setPhase(0); // Reverse Phase 1: Slide in
          }, 400);
        }, 400);
      }
    }
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isExplorerOpen]);

  const slideOutClass = phase >= 1 ? styles.slideOut : '';
  const expandedTopClass = phase >= 2 ? styles.expandedTop : '';
  const gridSplitClass = phase >= 3 ? styles.gridSplit : '';

  return (
    <main className={styles.main}>
      <div className={`${styles.grid} ${gridSplitClass}`}>
        <Terminal 
          phase={phase} 
          setIsExplorerOpen={setIsExplorerOpen} 
          selectedFile={selectedFile}
        />
        <aside className={styles.aside}>
          <section 
            className={`${styles.languageContainer} ${expandedTopClass}`}
            style={{ transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <div className={styles.topRightControls}>
              <OverallViewSwitch isExplorerOpen={isExplorerOpen} setIsExplorerOpen={setIsExplorerOpen} />
              {phase >= 2 && <NerdTree selectedFile={selectedFile} setSelectedFile={setSelectedFile} />}
            </div>
          </section>
          <article 
            className={`${styles.bars} ${slideOutClass}`}
            style={{ transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease' }}
          >
            <Visualizer />
          </article>
          <article 
            className={`${styles.auxConsole} ${slideOutClass}`}
            style={{ transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease' }}
          >
            <AuxConsole />
          </article>
        </aside>
      </div>
    </main>
  );
}

export default Home;