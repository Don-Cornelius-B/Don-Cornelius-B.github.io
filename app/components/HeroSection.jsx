import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function HeroSection({ spring, resumeMode, onResumeModeToggle, reduceMotion }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, { stiffness: 110, damping: 24, mass: 0.2 });
  const springY = useSpring(pointerY, { stiffness: 110, damping: 24, mass: 0.2 });

  const layerOneX = useTransform(springX, [-0.5, 0.5], ['-4px', '4px']);
  const layerOneY = useTransform(springY, [-0.5, 0.5], ['-5px', '5px']);
  const layerTwoX = useTransform(springX, [-0.5, 0.5], ['5px', '-5px']);
  const layerTwoY = useTransform(springY, [-0.5, 0.5], ['6px', '-6px']);

  useEffect(() => {
    if (reduceMotion || resumeMode) {
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
  }, [pointerX, pointerY, reduceMotion, resumeMode]);

  return (
    <motion.section
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="hero-grid accent-border panel noise-overlay overflow-hidden"
      id="main-content"
      aria-label="Introduction"
    >
      {!resumeMode && !reduceMotion && (
        <>
          <motion.div className="hero-parallax hero-parallax--one" style={{ x: layerOneX, y: layerOneY }} aria-hidden="true" />
          <motion.div className="hero-parallax hero-parallax--two" style={{ x: layerTwoX, y: layerTwoY }} aria-hidden="true" />
        </>
      )}

      <div className="grid gap-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-cyan-300">Creative Technologist</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
            Building cloud-native software systems for real-world impact.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-slate-300 sm:text-lg">
            Don Cornelius B - 3rd Year CSE student focused on Cloud Computing and DevOps Engineering, shipping resilient
            products with automation-first workflows.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onResumeModeToggle}
              aria-pressed={resumeMode}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                resumeMode
                  ? 'border-emerald-300/60 bg-emerald-400/15 text-emerald-100'
                  : 'border-slate-400/50 text-slate-200 hover:border-emerald-300/60 hover:text-emerald-100'
              }`}
            >
              Resume Mode: {resumeMode ? 'On' : 'Off'}
            </button>
            <a
              href="https://linkedin.com/in/don-cornelius-livi/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-cyan-300/50 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-300/10"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Don-Cornelius-B"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-violet-300/50 px-4 py-2 text-sm text-violet-200 transition hover:bg-violet-300/10"
            >
              GitHub
            </a>
            <a
              href="/resume-don-cornelius.pdf"
              download
              className="rounded-lg border border-emerald-300/55 px-4 py-2 text-sm text-emerald-100 transition hover:bg-emerald-400/12"
              aria-label="Download resume PDF"
            >
              Download Resume
            </a>
          </div>
          <p className="mt-2 text-xs text-slate-400">Recruiter quick action: download one-page PDF resume.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="glass rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Current Focus</p>
            <p className="mt-2 text-sm text-slate-200">Cloud-native systems and resilient DevOps delivery pipelines.</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Education</p>
            <p className="mt-2 text-sm text-slate-200">B.E CSE at Sathyabama Institute of Science and Technology.</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Workflow</p>
            <p className="mt-2 text-sm text-slate-200">Design -&gt; Build -&gt; Validate -&gt; Ship with strong CI checks.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
