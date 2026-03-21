import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useState } from 'react';

const TABS = ['overview', 'architecture', 'outcomes', 'links'];

function ArchitectureDiagram({ project }) {
  if (!project?.diagram?.nodes?.length) {
    return null;
  }

  const { diagram, theme } = project;
  const nodesById = Object.fromEntries(diagram.nodes.map((node) => [node.id, node]));

  return (
    <div
      className="architecture mt-4 overflow-hidden rounded-xl p-3"
      style={{
        background: theme?.panelBg,
        border: `1px solid ${theme?.nodeBorder || 'rgba(103, 232, 249, 0.35)'}`,
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -10px 22px rgba(0,0,0,0.28), 0 10px 24px rgba(2,8,23,0.28)',
      }}
    >
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
              stroke={theme?.edge || 'rgba(103, 232, 249, 0.55)'}
              strokeWidth="0.65"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {diagram.nodes.map((node) => (
        <div key={node.id} className="node node--skeu -translate-x-1/2 -translate-y-1/2" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
          <span
            style={{
              borderColor: theme?.nodeBorder,
              color: theme?.nodeText,
              background: theme?.nodeBg,
            }}
          >
            {node.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ProjectModal({ activeProject, reduceMotion, spring, onClose, dialogRef, closeRef }) {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (activeProject) {
      setActiveTab('overview');
    }
  }, [activeProject]);

  return (
    <AnimatePresence>
      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 grid place-items-center bg-black/70 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={reduceMotion ? false : { y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={spring}
            onClick={(event) => event.stopPropagation()}
            className="glass max-h-[88vh] w-full max-w-2xl overflow-auto rounded-2xl p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            ref={dialogRef}
            tabIndex={-1}
          >
            <h3 id="project-modal-title" className="text-2xl font-bold text-slate-100">
              {activeProject.title} - Project Deep Dive
            </h3>
            <p className="mt-2 text-sm uppercase tracking-[0.14em] text-cyan-300">{activeProject.duration}</p>
            <p className="mt-1 text-slate-300">{activeProject.role}</p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" role="tablist" aria-label="Project details tabs">
              {TABS.map((tab) => {
                const selected = activeTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={`rounded-lg border px-3 py-2 text-xs uppercase tracking-[0.12em] transition ${
                      selected
                        ? 'border-cyan-300/70 bg-cyan-500/15 text-cyan-100'
                        : 'border-slate-500/40 text-slate-300 hover:border-cyan-300/50 hover:text-cyan-100'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {activeTab === 'overview' && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-slate-300">{activeProject.description}</p>
                <p className="rounded-lg border border-cyan-300/25 bg-slate-950/40 px-3 py-2 text-sm text-cyan-100">
                  {activeProject.impact}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-2 py-1 text-xs"
                      style={{ borderColor: activeProject.theme.chipBorder, color: activeProject.theme.chipText }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'architecture' && <ArchitectureDiagram project={activeProject} />}

            {activeTab === 'outcomes' && (
              <ol className="project-stepper mt-4" aria-label="Challenge decision outcome timeline">
                {activeProject.stepper?.map((step) => (
                  <li key={step.phase} className="project-stepper__item">
                    <span className="project-stepper__dot" aria-hidden="true" />
                    <div className="project-stepper__card">
                      <p className="project-stepper__phase">{step.phase}</p>
                      <p className="project-stepper__text">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {activeTab === 'links' && (
              <div className="mt-4 grid gap-2">
                {activeProject.links?.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit rounded-lg border border-cyan-300/45 px-3 py-2 text-sm text-cyan-100 hover:bg-cyan-500/15"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-lg border border-slate-400/50 px-4 py-2 text-sm text-slate-100"
              ref={closeRef}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
