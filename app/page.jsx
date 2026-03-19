'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const spring = { type: 'spring', stiffness: 120, damping: 16 };
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const projects = [
  {
    id: 'akon',
    title: 'AKON - Agnostic Key-stream Optimized Network',
    duration: '01/2026 - Present',
    description:
      'Built a P2P security gateway bridging mobile socket messaging with off-grid RF hardware for emergency response and resilient field communication.',
    tags: ['Python', 'C++', 'GitHub Actions', 'ESP32', 'Semtech SX1278 RA-02'],
    diagram: {
      nodes: [
        { id: 'mobile', label: 'Mobile Socket', x: 11, y: 16 },
        { id: 'gateway', label: 'Secure Gateway', x: 50, y: 16 },
        { id: 'rescue', label: 'Responder Console', x: 89, y: 16 },
        { id: 'crypto', label: 'Key-stream Layer', x: 32, y: 72 },
        { id: 'rf', label: 'RF Transceiver', x: 68, y: 72 },
      ],
      links: [
        { from: 'mobile', to: 'gateway' },
        { from: 'gateway', to: 'rescue' },
        { from: 'gateway', to: 'crypto' },
        { from: 'gateway', to: 'rf' },
      ],
    },
  },
  {
    id: 'multimodal-supply-chain',
    title: 'Multimodal AI Supply Chain Analysis',
    duration: '02/2026 - Present',
    description:
      'Developed a situational awareness system for supply-chain disruption detection by fusing real-time traffic, weather, and social signals into a multimodal AI pipeline.',
    tags: ['React', 'FastAPI', 'Python', 'CMU Multimodal SDK', 'TorchGeo', 'GitHub Actions'],
    diagram: {
      nodes: [
        { id: 'feeds', label: 'Traffic/Weather/Social', x: 11, y: 16 },
        { id: 'fusion', label: 'Fusion Engine', x: 50, y: 16 },
        { id: 'dashboard', label: 'React Dashboard', x: 89, y: 16 },
        { id: 'geo', label: 'TorchGeo Signals', x: 33, y: 72 },
        { id: 'api', label: 'FastAPI Service', x: 67, y: 72 },
      ],
      links: [
        { from: 'feeds', to: 'fusion' },
        { from: 'fusion', to: 'dashboard' },
        { from: 'fusion', to: 'geo' },
        { from: 'fusion', to: 'api' },
      ],
    },
  },
  {
    id: 'usda-marketplace',
    title: 'USDA Talent Mobility Marketplace',
    duration: '03/2026 - Present',
    description:
      'Designed and prototyped an internal gig-economy marketplace to unlock underutilized organizational talent and support fractional work assignments.',
    tags: ['Power Apps', 'Power Automate', 'Dataverse', 'Microsoft 365'],
    diagram: {
      nodes: [
        { id: 'staff', label: 'Employee Profiles', x: 11, y: 16 },
        { id: 'market', label: 'Talent Marketplace', x: 50, y: 16 },
        { id: 'admins', label: 'Program Leads', x: 89, y: 16 },
        { id: 'flows', label: 'Power Automate Flows', x: 33, y: 72 },
        { id: 'data', label: 'Dataverse Records', x: 67, y: 72 },
      ],
      links: [
        { from: 'staff', to: 'market' },
        { from: 'market', to: 'admins' },
        { from: 'market', to: 'flows' },
        { from: 'flows', to: 'data' },
      ],
    },
  },
];

const principles = [
  {
    title: 'Systems First',
    text: 'Every product choice starts from reliability, observability, and predictable behavior under load.',
  },
  {
    title: 'Motion with Meaning',
    text: 'Animation is used to signal structure and intent, never to distract from content clarity.',
  },
  {
    title: 'Build-to-Ship',
    text: 'Each project is designed with CI-friendly workflows and practical deployment paths from day one.',
  },
];

const capabilities = [
  ['Programming & APIs', 'Python', 'C++', 'Bash', 'FastAPI'],
  ['Cloud & Delivery', 'Docker', 'GitHub Actions', 'Git', 'GitHub'],
  ['Applied Platforms', 'ESP32', 'TorchGeo', 'Power Apps', 'Dataverse'],
];

const timeline = [
  { year: '2019 - 2021', stage: 'ZION', text: 'Higher Secondary foundation with strong focus on computing logic.' },
  {
    year: '2023 - Present',
    stage: 'Sathyabama B.E CSE',
    text: '3rd Year CSE building cloud-native systems, creative technology products, and automation-first workflows.',
  },
];

const honors = [
  {
    title: 'ChallengeX Participant | George Mason University',
    period: '02/2026 - Present',
    points: [
      'Selected for an 8-week high-impact hackathon focused on federal and private-sector challenges.',
      'Built focused solutions for Supply Chain Situational Awareness (CNA) and Talent Mobility (USDA).',
      'Collaborating in a multidisciplinary team to ship production-ready prototypes and multimodal AI architectures.',
    ],
  },
];

const techProjectionLanes = [
  {
    title: 'Languages',
    accent: 'border-cyan-300/35 bg-cyan-500/5',
    skills: ['Python', 'Bash', 'C++'],
  },
  {
    title: 'Version Control + CI/CD',
    accent: 'border-sky-300/35 bg-sky-500/5',
    skills: ['Git', 'GitHub', 'GitHub Actions', 'Docker'],
  },
  {
    title: 'AI + Application',
    accent: 'border-indigo-300/35 bg-indigo-500/5',
    skills: ['React', 'FastAPI', 'CMU Multimodal SDK', 'TorchGeo'],
  },
  {
    title: 'Hardware + Enterprise',
    accent: 'border-emerald-300/35 bg-emerald-500/5',
    skills: ['ESP32', 'Semtech SX1278 RA-02', 'Power Apps', 'Power Automate', 'Dataverse', 'Microsoft 365 Integration'],
  },
];

function SkillsProjectionDeck() {
  return (
    <div className="space-y-4">
      <div className="relative hidden h-[35rem] overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/35 p-5 md:block">
        <motion.div
          className="pointer-events-none absolute inset-y-3 z-0 w-14 bg-gradient-to-r from-transparent via-cyan-300/14 to-transparent blur-sm"
          animate={{ x: ['-15%', '108%'] }}
          transition={{ repeat: Infinity, duration: 7.2, ease: 'linear' }}
        />

        <div className="absolute bottom-6 left-1/2 z-20 h-14 w-44 -translate-x-1/2 rounded-full border border-cyan-300/35 bg-slate-900/92 text-center text-xs uppercase tracking-[0.2em] text-cyan-200 shadow-[0_0_34px_rgba(6,182,212,0.28)]">
          <div className="mt-3">Projection Core</div>
        </div>
        <div className="pointer-events-none absolute bottom-12 left-1/2 z-10 h-52 w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.18),transparent_72%)]" />

        <div className="relative z-30 mt-1 space-y-4 pb-24 [perspective:1000px]">
          {techProjectionLanes.map((lane, index) => (
            <motion.div
              key={lane.title}
              className={`rounded-xl border px-4 py-3 backdrop-blur-sm ${lane.accent}`}
              style={{
                marginLeft: `${index * 14}px`,
                marginRight: `${index * 8}px`,
                transform: `rotateX(8deg) translateZ(${(3 - index) * 6}px)`,
                transformOrigin: 'center bottom',
              }}
              initial={false}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 4.2 + index * 0.5, ease: 'easeInOut' }}
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-200/95">{lane.title}</p>
              <div className="mt-2 flex flex-wrap gap-2.5">
                {lane.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="rounded-full border border-cyan-300/45 bg-slate-900/85 px-2.5 py-1 text-xs text-cyan-100"
                    whileHover={{ y: -2, scale: 1.04, boxShadow: '0 0 16px rgba(56,189,248,0.34)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {techProjectionLanes.map((lane) => (
          <div key={lane.title} className={`glass rounded-xl border p-4 ${lane.accent}`}>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">{lane.title}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {lane.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-cyan-300/45 px-2 py-1 text-xs text-cyan-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchitectureDiagram({ diagram }) {
  if (!diagram?.nodes?.length) {
    return null;
  }

  const nodesById = Object.fromEntries(diagram.nodes.map((node) => [node.id, node]));

  return (
    <div className="architecture glass mt-4 overflow-hidden rounded-xl p-3">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        {diagram.links?.map((link, index) => {
          const from = nodesById[link.from];
          const to = nodesById[link.to];

          if (!from || !to) {
            return null;
          }

          const bridgeY = Math.max(26, Math.min(62, (from.y + to.y) / 2));

          return (
            <polyline
              key={`${link.from}-${link.to}-${index}`}
              points={`${from.x},${from.y} ${from.x},${bridgeY} ${to.x},${bridgeY} ${to.x},${to.y}`}
              fill="none"
              stroke="rgba(103, 232, 249, 0.55)"
              strokeWidth="0.65"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {diagram.nodes.map((node) => (
        <div
          key={node.id}
          className="node -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);
  const [showLogs, setShowLogs] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6">
      <motion.section
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="hero-grid accent-border panel noise-overlay overflow-hidden"
      >
        <div className="grid gap-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-cyan-300">Creative Technologist</p>
            <h1 className="text-3xl font-bold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Building cloud-native software systems for real-world impact.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-300 sm:text-lg">
              Don Cornelius B - 3rd Year CSE student focused on Cloud Computing and DevOps Engineering, shipping
              resilient products with automation-first workflows.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
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
            </div>
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

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="panel">
          <h2 className="section-title mb-2">Featured Work</h2>
          <p className="mb-5 text-sm text-slate-300">Selected resume projects across embedded security, multimodal AI, and enterprise workflow systems.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={reduceMotion ? false : fadeIn.hidden}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ ...spring, delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group accent-border glass cursor-pointer rounded-xl p-4"
                onClick={() => setActiveProject(project)}
              >
                <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cyan-300">{project.duration}</p>
                <p className="mt-2 text-sm text-slate-300">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 opacity-0 transition group-hover:opacity-100">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-cyan-300/50 px-2 py-1 text-xs text-cyan-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowLogs(true);
                    setActiveProject(project);
                  }}
                  className="mt-4 rounded-md border border-slate-400/40 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10"
                >
                  View Technical Specs
                </button>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2 className="section-title mb-2">Tech Stack Projection</h2>
          <p className="mb-4 text-sm text-slate-300">A layered projection deck of resume skills grouped by delivery workflow.</p>
          <SkillsProjectionDeck />
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

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 grid place-items-center bg-black/70 p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={reduceMotion ? false : { y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={spring}
              onClick={(event) => event.stopPropagation()}
              className="glass max-h-[88vh] w-full max-w-2xl overflow-auto rounded-2xl p-6"
            >
              <h3 className="text-2xl font-bold text-slate-100">{activeProject.title} — Project Deep Dive</h3>
              <p className="mt-2 text-slate-300">{activeProject.description}</p>
              <ArchitectureDiagram diagram={activeProject.diagram} />
              <div className="mt-4 flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-cyan-300/40 px-2 py-1 text-xs text-cyan-200">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="mt-5 rounded-lg border border-slate-400/50 px-4 py-2 text-sm text-slate-100"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4"
            onClick={() => setShowLogs(false)}
          >
            <motion.div
              initial={reduceMotion ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={spring}
              onClick={(event) => event.stopPropagation()}
              className="scanline w-full max-w-3xl rounded-xl border border-emerald-400/40 bg-black/90 p-4 font-mono text-xs text-emerald-300"
            >
              <div className="mb-3 flex items-center justify-between border-b border-emerald-500/30 pb-2">
                <span>SYSTEM LOGS :: {activeProject?.title || 'Project'} :: TECHNICAL SPECS</span>
                <button type="button" className="text-emerald-200" onClick={() => setShowLogs(false)}>
                  EXIT
                </button>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed">
{`[INFO] Initializing diagnostics pipeline...
[INFO] Build validation: PASS
[INFO] Runtime checks: PASS
[INFO] Telemetry stream: ACTIVE
[INFO] Integrity monitor: STABLE
[INFO] Last deployment source: GitHub Actions / main.yml
[READY] Technical profile rendered successfully.`}
              </pre>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}