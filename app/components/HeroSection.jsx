import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function HeroSection({ spring, resumeMode, onResumeModeToggle, reduceMotion, isCardMode }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, { stiffness: 110, damping: 24, mass: 0.2 });
  const springY = useSpring(pointerY, { stiffness: 110, damping: 24, mass: 0.2 });

  const layerOneX = useTransform(springX, [-0.5, 0.5], ['-2px', '2px']);
  const layerOneY = useTransform(springY, [-0.5, 0.5], ['-3px', '3px']);
  const layerTwoX = useTransform(springX, [-0.5, 0.5], ['2px', '-2px']);
  const layerTwoY = useTransform(springY, [-0.5, 0.5], ['3px', '-3px']);

  useEffect(() => {
    if (reduceMotion || resumeMode || isCardMode) {
      pointerX.set(0);
      pointerY.set(0);
      return undefined;
    }

    const onMouseMove = (event) => {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;
      pointerX.set(normalizedX);
      pointerY.set(normalizedY);
    };

    const onDeviceOrientation = (event) => {
      if (event.gamma == null || event.beta == null) {
        return;
      }

      const normalizedX = Math.max(-0.5, Math.min(0.5, event.gamma / 90));
      const normalizedY = Math.max(-0.5, Math.min(0.5, event.beta / 180));
      pointerX.set(normalizedX);
      pointerY.set(normalizedY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('deviceorientation', onDeviceOrientation);
    };
  }, [pointerX, pointerY, reduceMotion, resumeMode, isCardMode]);

  return (
    <motion.section
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="hero-atlas hero-atlas--immersive"
      id="main-content"
      aria-label="Introduction"
    >
      <>
        <div aria-hidden="true" className="hero-stars hero-stars--far" />
        <div aria-hidden="true" className="hero-stars hero-stars--near" />
      </>

      {!resumeMode && !reduceMotion && !isCardMode && (
        <>
          <motion.div className="hero-parallax hero-parallax--one" style={{ x: layerOneX, y: layerOneY }} aria-hidden="true" />
          <motion.div className="hero-parallax hero-parallax--two" style={{ x: layerTwoX, y: layerTwoY }} aria-hidden="true" />
        </>
      )}

      <div className="hero-atlas__grid">
        <div>
          <p className="hero-eyebrow">Cloud Systems Atelier</p>
          <h1 className="hero-display">
            Engineering resilient systems with timeless execution.
          </h1>
          <p className="hero-lead">
            Don Cornelius B, 3rd-year CSE technologist shaping cloud-native products with operational rigor, composure, and craft.
          </p>

          <div className="hero-cta-row">
            <button
              type="button"
              onClick={onResumeModeToggle}
              aria-pressed={resumeMode}
              className={`hero-cta ${resumeMode ? 'hero-cta--mode-active' : 'hero-cta--mode'}`}
            >
              Resume Mode: {resumeMode ? 'On' : 'Off'}
            </button>

            <a
              href="/resume-don-cornelius.pdf"
              download
              className="hero-cta hero-cta--primary"
              aria-label="Download resume PDF"
            >
              Download Resume
            </a>

            <a
              href="https://linkedin.com/in/don-cornelius-livi/"
              target="_blank"
              rel="noreferrer"
              className="hero-cta hero-cta--secondary"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/Don-Cornelius-B"
              target="_blank"
              rel="noreferrer"
              className="hero-cta hero-cta--tertiary"
            >
              GitHub
            </a>
          </div>

          <p className="hero-quick-note">Curated for immersive first impression, then structured executive scan.</p>
        </div>

        <div className="hero-aside">
          <div className="hero-aside-card">
            <p className="hero-aside-label">Current Focus</p>
            <p className="hero-aside-text">Cloud-native systems and resilient DevOps pipelines.</p>
          </div>

          <div className="hero-aside-card">
            <p className="hero-aside-label">Education</p>
            <p className="hero-aside-text">B.E. CSE, Sathyabama Institute of Science and Technology.</p>
          </div>

          <div className="hero-aside-card">
            <p className="hero-aside-label">Workflow</p>
            <p className="hero-aside-text">Design -&gt; Build -&gt; Validate -&gt; Ship.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
