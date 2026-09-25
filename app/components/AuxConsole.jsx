'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/auxconsole.module.css';
import { vt323 } from '../fonts/fonts';

const FREQ_BANDS = ['60Hz', '150Hz', '400Hz', '1kHz', '2.5k', '6kHz', '12k', '16k'];
// Unicode block character levels: empty space, 1/8 to 8/8 full block
const BLOCK_LEVELS = [' ', ' ', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
const ROWS_PER_BAND = 3; // 3 vertical character blocks per frequency band column

const MACROS = [
  { id: 'help', label: '[ ? help ]', cmd: 'help', desc: 'Display help commands' },
  { id: 'projects', label: '[ * projects ]', cmd: 'projects', desc: 'List verified projects' },
  { id: 'bio', label: '[ @ bio ]', cmd: 'bio', desc: 'Display engineer bio' },
  { id: 'clear', label: '[ ! clear ]', cmd: 'clear', desc: 'Clear terminal buffer' },
];

export default function AuxConsole() {
  const [activeMode, setActiveMode] = useState('KEYS'); // Default to KEYS for immediate macro triggers
  const [isPlaying, setIsPlaying] = useState(false);
  const [flashedBtn, setFlashedBtn] = useState(null);

  // 8 bands with level amplitudes (0 to ROWS_PER_BAND * 8)
  const maxAmplitude = ROWS_PER_BAND * 8;
  const [bandAmplitudes, setBandAmplitudes] = useState(() => Array(8).fill(2));
  const animFrameRef = useRef(null);
  const lastTickRef = useRef(0);
  const isPlayingRef = useRef(false);

  // Sync ref with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Synchronize audio playback state with Visualizer and DOM audio elements
  useEffect(() => {
    // 1. Initial check
    if (typeof window !== 'undefined' && window.__PORTFOLIO_AUDIO_PLAYING__ !== undefined) {
      setIsPlaying(Boolean(window.__PORTFOLIO_AUDIO_PLAYING__));
    }

    // 2. Custom event listener from Visualizer
    const handleAudioState = (e) => {
      if (e?.detail?.isPlaying !== undefined) {
        setIsPlaying(Boolean(e.detail.isPlaying));
      }
    };
    window.addEventListener('portfolio-audio-state', handleAudioState);

    // 3. Audio element direct event listeners
    const audioElement = document.querySelector('audio');
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    if (audioElement) {
      if (!audioElement.paused && audioElement.currentTime > 0) {
        setIsPlaying(true);
      }
      audioElement.addEventListener('play', onPlay);
      audioElement.addEventListener('pause', onPause);
      audioElement.addEventListener('ended', onPause);
    }

    return () => {
      window.removeEventListener('portfolio-audio-state', handleAudioState);
      if (audioElement) {
        audioElement.removeEventListener('play', onPlay);
        audioElement.removeEventListener('pause', onPause);
        audioElement.removeEventListener('ended', onPause);
      }
    };
  }, []);

  // EQ Spectrum Animation Loop
  useEffect(() => {
    let phase = 0;

    const animateSpectrum = (time) => {
      // Throttle updates to ~40ms (25fps) for authentic retro digital phosphor step rate
      if (time - lastTickRef.current > 40) {
        lastTickRef.current = time;
        phase += 0.15;

        setBandAmplitudes((prev) => {
          return prev.map((current, index) => {
            if (isPlayingRef.current) {
              // Algorithmic frequency profile behavior
              let target = 0;
              // Bass bands (60Hz, 150Hz) pulse to kick/bass rhythms
              if (index === 0) {
                target = Math.floor(8 + Math.sin(phase * 1.8) * 10 + (Math.random() > 0.6 ? 6 : 0));
              } else if (index === 1) {
                target = Math.floor(10 + Math.sin(phase * 1.4 + 1) * 11 + (Math.random() > 0.5 ? 4 : 0));
              }
              // Mid bands (400Hz, 1kHz, 2.5k) react to chords/leads
              else if (index >= 2 && index <= 4) {
                const offset = index * 0.8;
                target = Math.floor(7 + Math.sin(phase * 2.2 + offset) * 8 + Math.cos(phase * 1.1) * 5);
              }
              // Treble bands (6kHz, 12k, 16k) provide snappy transient sparkle
              else {
                const jitter = Math.random() * 12;
                target = Math.floor(5 + Math.sin(phase * 3.1 + index) * 6 + jitter);
              }

              // Clamp target
              target = Math.max(1, Math.min(maxAmplitude, target));
              // Smooth interpolation with fast rise, decay
              return target > current 
                ? Math.min(maxAmplitude, current + 4) 
                : Math.max(1, current - 2);
            } else {
              // Paused: gracefully decay down to idle floor level
              const floorLevel = (index % 2 === 0) ? 2 : 1;
              if (current > floorLevel) {
                return current - 1;
              }
              // Subtle ambient floor breathing
              return Math.random() > 0.85 ? floorLevel + 1 : floorLevel;
            }
          });
        });
      }

      animFrameRef.current = requestAnimationFrame(animateSpectrum);
    };

    animFrameRef.current = requestAnimationFrame(animateSpectrum);
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [maxAmplitude]);

  // Execute terminal macro command
  const handleMacroClick = (cmd, id) => {
    // Provide instant tactile visual feedback
    setFlashedBtn(id);
    setTimeout(() => setFlashedBtn(null), 150);

    // Dispatch terminal command event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('terminal-cmd', { detail: cmd }));
    }
  };

  // Convert raw band amplitude into 3 stacked block characters
  const getRenderedBandRows = (amplitude) => {
    const rows = [];
    for (let r = ROWS_PER_BAND - 1; r >= 0; r--) {
      const rowFloor = r * 8;
      const rowValue = amplitude - rowFloor;
      if (rowValue <= 0) {
        rows.push(' ');
      } else if (rowValue >= 8) {
        rows.push('█');
      } else {
        rows.push(BLOCK_LEVELS[Math.max(1, Math.min(8, rowValue))]);
      }
    }
    return rows;
  };

  return (
    <section 
      className={`${styles.container} ${vt323.className}`}
      style={{ fontFamily: `${vt323.style.fontFamily}, monospace` }}
    >
      {/* Console Header with Mode Switcher */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={isPlaying ? styles.statusDot : styles.statusDotIdle} />
          <span>AUX_CONSOLE // {activeMode}</span>
        </div>

        <div className={styles.tabSwitcher}>
          <span className={styles.tabBracket}>[</span>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeMode === 'EQ' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveMode('EQ')}
            title="Switch to Audio Spectrum EQ View"
          >
            EQ
          </button>
          <span className={styles.tabDivider}>|</span>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeMode === 'KEYS' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveMode('KEYS')}
            title="Switch to Terminal Macro Keys View"
          >
            KEYS
          </button>
          <span className={styles.tabBracket}>]</span>
        </div>
      </div>

      {/* Main Sub-view Deck */}
      <div className={styles.deckBody}>
        {activeMode === 'EQ' ? (
          /* VIEW 1: [ EQ ] MODE - 8-BAND ASCII SPECTRUM */
          <div className={styles.eqContainer}>
            <div className={styles.eqGrid}>
              {FREQ_BANDS.map((label, idx) => {
                const rows = getRenderedBandRows(bandAmplitudes[idx]);
                return (
                  <div key={label} className={styles.eqCol}>
                    <div className={styles.eqBarsStack}>
                      {rows.map((char, rIdx) => (
                        <div key={rIdx} className={styles.eqBarRow}>
                          {char}
                        </div>
                      ))}
                    </div>
                    <span className={styles.eqLabel}>{label}</span>
                  </div>
                );
              })}
            </div>
            <div className={styles.eqFooter}>
              <span>CH-01: 8-BAND SPECTRUM</span>
              <span>{isPlaying ? 'STATUS: DANCING' : 'STATUS: IDLE'}</span>
            </div>
          </div>
        ) : (
          /* VIEW 2: [ KEYS ] MODE - TERMINAL MACRO DISPATCHER */
          <div className={styles.keysContainer}>
            <div className={styles.macroGrid}>
              {MACROS.map((macro) => {
                const isFlashed = flashedBtn === macro.id;
                return (
                  <button
                    key={macro.id}
                    type="button"
                    className={`${styles.macroBtn} ${isFlashed ? styles.macroBtnFlashed : ''}`}
                    onClick={() => handleMacroClick(macro.cmd, macro.id)}
                    title={macro.desc}
                  >
                    {macro.label}
                  </button>
                );
              })}
            </div>
            <div className={styles.keysStatus}>
              <span>CLICK TO DISPATCH TO TERMINAL</span>
              <span>AUTO_EXEC: ON</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
