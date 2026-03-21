'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useVelocity } from 'framer-motion';
import Image from 'next/image';
import HeroSection from './components/HeroSection';
import FeaturedProjects from './components/FeaturedProjects';
import HonorsSection from './components/HonorsSection';
import PrinciplesSection from './components/PrinciplesSection';
import ProjectModal from './components/ProjectModal';
import SectionDivider from './components/SectionDivider';
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
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 120, damping: 24 });

  const filterOptions = [...new Set(projects.flatMap((project) => project.tags))].slice(0, 8);
  const filteredProjects = activeFilter === 'all' ? projects : projects.filter((project) => project.tags.includes(activeFilter));

  const sectionDelays = {
    projects: 0.04,
    skills: 0.1,
    capabilities: 0.16,
    principles: 0.22,
    honors: 0.28,
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
    <main className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6" id="content-root">
      <HeroSection
        spring={spring}
        resumeMode={resumeMode}
        onResumeModeToggle={() => setResumeMode((prev) => !prev)}
        reduceMotion={reduceMotion}
      />

      <SectionDivider velocityValue={smoothVelocity} resumeMode={resumeMode} />

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
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
          />
        </motion.div>

        {!resumeMode && (
          <motion.div
            initial={reduceMotion ? false : fadeIn.hidden}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ ...spring, delay: sectionDelays.skills }}
            className="panel"
          >
            <h2 className="section-title mb-2">Tech Stack Projection</h2>
            <p className="mb-4 text-sm text-slate-300">A layered projection deck of resume skills grouped by delivery workflow.</p>
            <SkillsProjectionDeck techProjectionLanes={techProjectionLanes} />
          </motion.div>
        )}
      </section>

      <SectionDivider velocityValue={smoothVelocity} resumeMode={resumeMode} />

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={reduceMotion || resumeMode ? false : fadeIn.hidden}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...spring, delay: sectionDelays.capabilities }}
          className="panel"
        >
          <h2 className="section-title mb-2">Capability Matrix</h2>
          <p className="mb-4 text-sm text-slate-300">Cross-disciplinary strength across code, creative tooling, and deployment systems.</p>
          <div className="grid gap-4">
            {capabilities.map(([heading, ...skills]) => (
              <div key={heading} className="glass rounded-xl p-4">
                <h3 className="text-sm uppercase tracking-wide text-cyan-300">{heading}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-cyan-300/40 px-2 py-1 text-xs text-cyan-100">
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

      <SectionDivider velocityValue={smoothVelocity} resumeMode={resumeMode} />

      <motion.div
        initial={reduceMotion || resumeMode ? false : fadeIn.hidden}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ ...spring, delay: sectionDelays.principles }}
      >
        <PrinciplesSection principles={principles} reduceMotion={reduceMotion || resumeMode} fadeIn={fadeIn} spring={spring} />
      </motion.div>

      <SectionDivider velocityValue={smoothVelocity} resumeMode={resumeMode} />

      <motion.div
        initial={reduceMotion || resumeMode ? false : fadeIn.hidden}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ ...spring, delay: sectionDelays.honors }}
      >
        <HonorsSection honors={honors} reduceMotion={reduceMotion || resumeMode} fadeIn={fadeIn} spring={spring} />
      </motion.div>

      <footer className="mt-10 panel">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-300">© {new Date().getFullYear()} Don Cornelius B</p>
          <a
            href="https://github.com/Don-Cornelius-B/My-Portfolio/actions/workflows/main.yml"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-emerald-300/50 px-3 py-2 text-xs text-emerald-200"
          >
            <Image
              src="https://github.com/Don-Cornelius-B/My-Portfolio/actions/workflows/main.yml/badge.svg"
              alt="Deployment Status"
              width={110}
              height={20}
              className="h-5"
            />
            Deployment Status
          </a>
        </div>
      </footer>

      <ProjectModal
        activeProject={activeProject}
        reduceMotion={reduceMotion}
        spring={spring}
        onClose={handleProjectClose}
        dialogRef={dialogRef}
        closeRef={closeButtonRef}
      />
    </main>
  );
}