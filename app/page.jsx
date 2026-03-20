'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import HeroSection from './components/HeroSection';
import FeaturedProjects from './components/FeaturedProjects';
import ProjectModal from './components/ProjectModal';
import SkillsProjectionDeck from './components/SkillsProjectionDeck';
import { capabilities, honors, principles, projects, techProjectionLanes, timeline } from './data/portfolio';

const spring = { type: 'spring', stiffness: 120, damping: 16 };
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);

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
      <HeroSection spring={spring} />

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <FeaturedProjects
          projects={projects}
          reduceMotion={reduceMotion}
          fadeIn={fadeIn}
          spring={spring}
          onProjectOpen={handleProjectOpen}
        />

        <div className="panel">
          <h2 className="section-title mb-2">Tech Stack Projection</h2>
          <p className="mb-4 text-sm text-slate-300">A layered projection deck of resume skills grouped by delivery workflow.</p>
          <SkillsProjectionDeck techProjectionLanes={techProjectionLanes} />
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={reduceMotion ? false : fadeIn.hidden}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={spring}
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

        <motion.div
          initial={reduceMotion ? false : fadeIn.hidden}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...spring, delay: 0.08 }}
          className="panel"
        >
          <h2 className="section-title mb-2">Journey Timeline</h2>
          <p className="mb-4 text-sm text-slate-300">A progression from foundational computing to production-minded system design.</p>
          <div className="relative pl-6">
            <div className="absolute left-[11px] top-0 h-full w-[2px] bg-gradient-to-b from-cyan-300 to-violet-400" />
            {timeline.map((item) => (
              <div key={item.stage} className="relative mb-6 last:mb-0">
                <div className="absolute -left-[19px] top-1 h-4 w-4 rounded-full border border-cyan-300 bg-slate-950" />
                <p className="text-xs text-slate-400">{item.year}</p>
                <h3 className="text-base font-semibold text-slate-100">{item.stage}</h3>
                <p className="text-sm text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mt-10 panel">
        <h2 className="section-title mb-2">Engineering Principles</h2>
        <p className="mb-5 text-sm text-slate-300">How I balance product intent, technical depth, and long-term maintainability.</p>
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              initial={reduceMotion ? false : fadeIn.hidden}
              whileInView={fadeIn.visible}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ ...spring, delay: index * 0.08 }}
              className="glass rounded-xl p-4"
            >
              <h3 className="text-base font-semibold text-cyan-200">{principle.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{principle.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mt-10 panel">
        <h2 className="section-title mb-2">Honors</h2>
        <p className="mb-5 text-sm text-slate-300">Recognition and challenge programs that shaped high-impact, production-minded work.</p>
        <div className="grid gap-4">
          {honors.map((honor, index) => (
            <motion.article
              key={honor.title}
              initial={reduceMotion ? false : fadeIn.hidden}
              whileInView={fadeIn.visible}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ ...spring, delay: index * 0.08 }}
              className="glass rounded-xl p-5"
            >
              <h3 className="text-base font-semibold text-cyan-200">{honor.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cyan-300">{honor.period}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {honor.points.map((point) => (
                  <li key={point} className="border-l-2 border-cyan-400/40 pl-3">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

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