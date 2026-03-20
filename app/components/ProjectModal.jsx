import { AnimatePresence, motion } from 'framer-motion';

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
            <p className="mt-2 text-slate-300">{activeProject.description}</p>
            <ArchitectureDiagram project={activeProject} />
            <div className="mt-4 flex flex-wrap gap-2">
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
