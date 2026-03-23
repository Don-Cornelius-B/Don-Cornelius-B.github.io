'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useVelocity } from 'framer-motion';
import Image from 'next/image';
import HeroSection from './components/HeroSection';
import FeaturedProjects from './components/FeaturedProjects';
import HonorsSection from './components/HonorsSection';
import PrinciplesSection from './components/PrinciplesSection';
import ProjectModal from './components/ProjectModal';
import SectionDivider from './components/SectionDivider';
import SkillOrbitSection from './components/SkillOrbitSection';
import SkillsProjectionDeck from './components/SkillsProjectionDeck';
import TimelineSection from './components/TimelineSection';
import { capabilities, honors, principles, projects, techProjectionLanes, timeline } from './data/portfolio';

const spring = { type: 'spring', stiffness: 120, damping: 16 };
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [resumeMode, setResumeMode] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  const [isCardMode, setIsCardMode] = useState(false);
  const cardModeRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 120, damping: 24 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (typeof window === 'undefined') {
      return;
    }

    const enterThreshold = Math.max(460, window.innerHeight * 0.92);
    const exitThreshold = Math.max(340, window.innerHeight * 0.7);

    if (!cardModeRef.current && latest >= enterThreshold) {
      cardModeRef.current = true;
      setIsCardMode(true);
      return;
    }

    if (cardModeRef.current && latest <= exitThreshold) {
      cardModeRef.current = false;
      setIsCardMode(false);
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
    const resolved = stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light';
    setThemeMode(resolved);
    document.documentElement.dataset.theme = resolved;
  }, []);

  const handleThemeToggle = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextMode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('portfolio-theme', nextMode);
    }
    document.documentElement.dataset.theme = nextMode;
  };

  const filterOptions = [...new Set(projects.flatMap((project) => project.tags))].slice(0, 8);
  const filteredProjects = activeFilter === 'all' ? projects : projects.filter((project) => project.tags.includes(activeFilter));

  const sectionDelays = {
    projects: 0.04,
    skills: 0.1,
    capabilities: 0.16,
    principles: 0.22,
    honors: 0.28,
    orbit: 0.34,
  };

  const handleProjectOpen = (project) => {
    lastFocusedRef.current = document.activeElement;
    setActiveProject(project);
  };

  const handleProjectClose = () => {
    setActiveProject(null);
  };

  useEffect(() => {
    if (!activeProject) {
      lastFocusedRef.current?.focus?.();
      return undefined;
    }

    closeButtonRef.current?.focus?.();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleProjectClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeProject]);

  return (
    <>
      <HeroSection
        spring={spring}
        resumeMode={resumeMode}
        onResumeModeToggle={() => setResumeMode((prev) => !prev)}
        themeMode={themeMode}
        onThemeToggle={handleThemeToggle}
        reduceMotion={reduceMotion}
        isCardMode={isCardMode}
      />

      <main className={`main-canvas ${isCardMode ? 'main-canvas--card' : ''}`} id="content-root">
        <div className="content-shell mx-auto max-w-7xl px-4 pb-14 sm:px-6">
          <section className="section-cluster section-cluster--first grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <motion.div
          initial={reduceMotion || resumeMode ? false : fadeIn.hidden}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ ...spring, delay: sectionDelays.projects }}
        >
          <FeaturedProjects
            projects={filteredProjects}
            reduceMotion={reduceMotion}
            fadeIn={fadeIn}
            spring={spring}
            onProjectOpen={handleProjectOpen}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            filterOptions={filterOptions}
            resumeMode={resumeMode}
            isCardMode={isCardMode}
            themeMode={themeMode}
          />
        </motion.div>

        <motion.div
          initial={reduceMotion || resumeMode ? false : fadeIn.hidden}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ ...spring, delay: sectionDelays.skills }}
          className="panel skill-atlas-panel"
        >
          <h2 className="section-title mb-2">Tech Stack Projection</h2>
          <p className="mb-4 text-sm text-[color:var(--ink-soft)]">
            {resumeMode
              ? 'Resume mode keeps this section visible with low motion for quick scanning.'
              : 'Applied tools grouped by how they deliver production value.'}
          </p>
          <SkillsProjectionDeck techProjectionLanes={techProjectionLanes} disableAnimation={resumeMode || reduceMotion} />
        </motion.div>
          </section>

          <SectionDivider velocityValue={smoothVelocity} resumeMode={resumeMode} isCardMode={isCardMode} />

          <section className="section-cluster grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={reduceMotion || resumeMode ? false : fadeIn.hidden}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...spring, delay: sectionDelays.capabilities }}
          className="panel capability-frame"
        >
          <h2 className="section-title mb-2">Capability Matrix</h2>
          <p className="mb-4 text-sm text-[color:var(--ink-soft)]">Core strengths across engineering, tooling, and delivery.</p>
          <div className="capability-grid">
            {capabilities.map(([heading, ...skills]) => (
              <div key={heading} className="capability-card">
                <h3 className="capability-card__title">{heading}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="capability-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <TimelineSection timeline={timeline} reduceMotion={reduceMotion} fadeIn={fadeIn} spring={spring} />
          </section>

          <SectionDivider velocityValue={smoothVelocity} resumeMode={resumeMode} isCardMode={isCardMode} />

          <motion.div
        initial={reduceMotion || resumeMode ? false : fadeIn.hidden}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ ...spring, delay: sectionDelays.principles }}
      >
        <PrinciplesSection principles={principles} reduceMotion={reduceMotion || resumeMode} fadeIn={fadeIn} spring={spring} />
          </motion.div>

          <SectionDivider velocityValue={smoothVelocity} resumeMode={resumeMode} isCardMode={isCardMode} />

          <motion.div
        initial={reduceMotion || resumeMode ? false : fadeIn.hidden}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ ...spring, delay: sectionDelays.honors }}
      >
        <HonorsSection honors={honors} reduceMotion={reduceMotion || resumeMode} fadeIn={fadeIn} spring={spring} />
          </motion.div>

          <SectionDivider velocityValue={smoothVelocity} resumeMode={resumeMode} isCardMode={isCardMode} />

          <motion.div
        initial={reduceMotion || resumeMode ? false : fadeIn.hidden}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ ...spring, delay: sectionDelays.orbit }}
      >
        <SkillOrbitSection techProjectionLanes={techProjectionLanes} reduceMotion={reduceMotion} resumeMode={resumeMode} isCardMode={isCardMode} />
          </motion.div>

          <footer className="mt-10 panel site-signoff">
        <div className="site-signoff__row">
          <div>
            <p className="site-signoff__eyebrow">Build log</p>
            <p className="site-signoff__owner">© {new Date().getFullYear()} Don Cornelius B</p>
          </div>
          <a
            href="https://github.com/Don-Cornelius-B/My-Portfolio/actions/workflows/main.yml"
            target="_blank"
            rel="noreferrer"
            className="site-signoff__status"
          >
            <Image
              src="https://github.com/Don-Cornelius-B/My-Portfolio/actions/workflows/main.yml/badge.svg"
              alt="Deployment Status"
              width={110}
              height={20}
              className="h-5"
            />
            Deployment status
          </a>
        </div>
          </footer>
        </div>

        <ProjectModal
        activeProject={activeProject}
        reduceMotion={reduceMotion}
        resumeMode={resumeMode}
        spring={spring}
        onClose={handleProjectClose}
        dialogRef={dialogRef}
        closeRef={closeButtonRef}
        themeMode={themeMode}
      />
      </main>
    </>
  );
}