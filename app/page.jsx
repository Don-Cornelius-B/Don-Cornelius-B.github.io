'use client';

            <motion.div\n+              animate={{ rotate: -360 }}\n+              transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}\n+              className="-translate-x-1/2 rounded-full border border-cyan-300/50 bg-slate-900/80 px-3 py-1 text-xs text-cyan-200 transition-all hover:bg-cyan-400/10 hover:shadow-[0_0_18px_rgba(56,189,248,0.35)]"\n+            >\n+              {item.name}\n+            </motion.div>
import { useMemo, useState } from 'react';
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
    title: 'AKON',
    description:
      'P2P security gateway bridging mobile sockets with RF hardware for emergency response. Designed for reliability with automated build/test checks for mobile socket messaging using GitHub Actions.',
    tags: ['Python', 'C++', 'ESP32'],
    diagram: {
      nodes: [
        { id: 'field', label: 'Field Device', x: 11, y: 16 },
        { id: 'relay', label: 'Secure Relay', x: 50, y: 16 },
        { id: 'ops', label: 'Ops Console', x: 89, y: 16 },
        { id: 'check', label: 'Threat Check', x: 33, y: 72 },
        { id: 'rf', label: 'RF Hardware', x: 67, y: 72 },
      ],
      links: [
        { from: 'field', to: 'relay' },
        { from: 'relay', to: 'ops' },
        { from: 'relay', to: 'check' },
        { from: 'relay', to: 'rf' },
      ],
    },
  },
  {
    id: 'virspace',
    title: 'VirSpace',
    description:
      'Scalable multi-user virtual world with 3D digital twins. Built around real-time state synchronization and low-latency data flow using Supabase.',
    tags: ['React', 'Supabase', 'Three.js'],
    diagram: {
      nodes: [
        { id: 'avatar', label: 'Client Avatars', x: 13, y: 16 },
        { id: 'sync', label: 'Realtime Sync', x: 50, y: 16 },
        { id: 'scene', label: 'Twin Scene', x: 87, y: 16 },
        { id: 'state', label: 'State Cache', x: 32, y: 72 },
        { id: 'db', label: 'Supabase', x: 68, y: 72 },
      ],
      links: [
        { from: 'avatar', to: 'sync' },
        { from: 'sync', to: 'scene' },
        { from: 'sync', to: 'state' },
        { from: 'sync', to: 'db' },
      ],
    },
  },
  {
    id: 'ecosphere',
    title: 'EcoSphere',
    description:
      '2D eco-simulation game engineered in Unity with dynamic logic loops and continuous feedback systems to model evolving environmental states.',
    tags: ['Unity', 'Piskel'],
    diagram: {
      nodes: [
        { id: 'player', label: 'Player Input', x: 13, y: 16 },
        { id: 'loop', label: 'Simulation Loop', x: 50, y: 16 },
        { id: 'hud', label: 'Game HUD', x: 87, y: 16 },
        { id: 'eco', label: 'Eco Rules', x: 30, y: 72 },
        { id: 'assets', label: 'Asset Pipeline', x: 70, y: 72 },
      ],
      links: [
        { from: 'player', to: 'loop' },
        { from: 'loop', to: 'hud' },
        { from: 'loop', to: 'eco' },
        { from: 'eco', to: 'assets' },
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
  ['Software Engineering', 'Python', 'C++', 'JavaScript'],
  ['Creative Tech', 'Unity', 'Blender', 'Figma'],
  ['Cloud & DevOps', 'GitHub Actions', 'Linux', 'Automation'],
];

const timeline = [
  { year: '2019 - 2021', stage: 'ZION', text: 'Higher Secondary foundation with strong focus on computing logic.' },
  {
    year: '2023 - Present',
    stage: 'Sathyabama B.E CSE',
    text: '3rd Year CSE building cloud-native systems, creative technology products, and automation-first workflows.',
  },
];

function Orbit() {
  const items = useMemo(
    () => [
      { name: 'Python', angle: 0 },
      { name: 'Unity', angle: 120 },
      { name: 'Docker / GHA', angle: 240 },
    ],
    []
  );

  return (
    <div className="relative mx-auto h-64 w-64">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
        className="absolute inset-0"
      >
        {items.map((item) => (
          <motion.div
            key={item.name}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${item.angle}deg) translateY(-126px)` }}
            transition={spring}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
              className="-translate-x-1/2 rounded-full border border-cyan-300/50 bg-slate-900/80 px-3 py-1 text-xs text-cyan-200 transition-all hover:bg-cyan-400/10 hover:shadow-[0_0_18px_rgba(56,189,248,0.35)]"
            >
              {item.name}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={false}
        animate={{ scale: 1, opacity: 1 }}
        transition={spring}
        className="glass absolute left-1/2 top-1/2 -ml-14 -mt-14 grid h-28 w-28 place-items-center rounded-full text-center text-sm font-semibold text-cyan-100"
      >
        Tech Stack Core
      </motion.div>
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
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-cyan-300">Creative Technologist</p>
            <h1 className="text-3xl font-bold leading-tight text-slate-50 sm:text-5xl">
              I design software experiences where engineering precision meets visual storytelling.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
              Don Cornelius B — 3rd Year CSE, building production-ready systems, immersive digital products, and
              automation-driven workflows.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
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

          <div className="grid gap-3">
            <div className="glass rounded-xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Current Focus</p>
              <p className="mt-2 text-sm text-slate-200">Cloud-native systems, telemetry-backed products, and resilient delivery pipelines.</p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Workflow</p>
              <p className="mt-2 text-sm text-slate-200">Design → Build → Validate → Ship, with CI checks and performance-aware UI architecture.</p>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="panel">
          <h2 className="section-title mb-2">Featured Work</h2>
          <p className="mb-5 text-sm text-slate-300">A product-centric set of builds across embedded systems, virtual platforms, and interaction design.</p>
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
          <h2 className="section-title mb-2">Tech Stack Orbit</h2>
          <p className="mb-4 text-sm text-slate-300">Core tools in continuous rotation around a build-first engineering mindset.</p>
          <Orbit />
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