'use client';
import { useState, useRef, useEffect } from 'react';
import styles from '../css/visualizer.module.css';
import { TRACKS } from '../data/tracks';
import { vt323 } from '../fonts/fonts';

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00';
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const Visualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const audioRef = useRef(null);

  // Synchronize audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Broadcast audio playback state for AuxConsole and global listeners
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__PORTFOLIO_AUDIO_PLAYING__ = isPlaying;
      window.dispatchEvent(new CustomEvent('portfolio-audio-state', { detail: { isPlaying } }));
    }
  }, [isPlaying]);

  // Handle Play/Pause execution
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio playback interrupted or blocked:", err);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Auto-Play Trigger on Track Shift
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = TRACKS[currentTrackIndex].src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const handlePrev = () => setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  const handleNext = () => setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);

  const decreaseVolume = () => setVolume((prev) => Math.max(0, prev - 0.05));
  const increaseVolume = () => setVolume((prev) => Math.min(1.0, prev + 0.05));

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => handleNext();
  const handleError = (e) => {
    console.warn("Audio load error:", e);
    setIsPlaying(false);
  };

  const currentTrack = TRACKS[currentTrackIndex];
  const volumePercent = Math.round(volume * 100);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <article 
      className={`${styles.playerContainer} ${vt323.className}`} 
      style={{ fontFamily: `${vt323.style.fontFamily}, monospace` }}
    >
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
      />
      
      <div className={styles.discWrapper}>
        <svg
          viewBox="0 0 52 52"
          shapeRendering="crispEdges"
          className={`${styles.disc} ${isPlaying ? styles.playing : ''}`}
          width="100%"
          height="100%"
        >
          <circle cx="26" cy="26" r="24" fill="#000000" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="26" cy="26" r="19" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="26" cy="26" r="14" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="26" cy="26" r="8" fill="#000000" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="26" cy="26" r="3" fill="#000000" stroke="#FFFFFF" strokeWidth="1.5" />
          
          <rect x="25" y="4" width="2" height="4" fill="#FFFFFF" />
          <rect x="25" y="44" width="2" height="4" fill="#FFFFFF" />
          <rect x="4" y="25" width="4" height="2" fill="#FFFFFF" />
          <rect x="44" y="25" width="4" height="2" fill="#FFFFFF" />
        </svg>
      </div>

      <div className={styles.telemetryContainer}>
        <div className={styles.telemetryLine}>
          TRACK: {currentTrack.title}
        </div>
        
        <div className={styles.progressRow}>
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className={styles.progressBar}
            style={{
              background: `linear-gradient(to right, #ffffff ${progressPercent}%, transparent ${progressPercent}%)`
            }}
          />
          <span>{formatTime(duration)}</span>
        </div>
        
        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={handlePrev} title="Previous">
            |&lt;
          </button>
          <button className={styles.controlBtn} onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? '||' : ' > '}
          </button>
          <button className={styles.controlBtn} onClick={handleNext} title="Next">
            &gt;|
          </button>
          
          <div className={styles.volumeGroup}>
            <button className={styles.controlBtn} onClick={decreaseVolume} title="Decrease Volume">
              [-]
            </button>
            <span className={styles.volumeLabel}>
              VOL: {volumePercent.toString().padStart(3, '\u00A0')}%
            </span>
            <button className={styles.controlBtn} onClick={increaseVolume} title="Increase Volume">
              [+]
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Visualizer;
