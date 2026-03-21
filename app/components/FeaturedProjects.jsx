import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function ProjectStoryCard({ project, index, reduceMotion, fadeIn, spring, onProjectOpen, resumeMode }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 90%', 'end 45%'],
  });

  const storyY = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const storyOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.2, 0.7, 1]);
  const storyScale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);

  return (
    <motion.article
      ref={cardRef}
      initial={reduceMotion ? false : fadeIn.hidden}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ ...spring, delay: index * 0.08 }}
      whileHover={resumeMode ? undefined : { y: -6, scale: 1.01 }}
      style={resumeMode ? undefined : { y: storyY, opacity: storyOpacity, scale: storyScale }}
      className="group accent-border glass cursor-pointer rounded-xl p-4 focus-within:ring-2 focus-within:ring-cyan-300/60"
    >
      <button
        type="button"
        onClick={() => onProjectOpen(project)}
        className="w-full text-left"
        aria-label={`Open ${project.title} project details`}
      >
        <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cyan-300">{project.duration}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-slate-400">{project.role}</p>
        <p className="mt-2 text-sm text-slate-300">{project.description}</p>
        <p className="mt-3 rounded-lg border border-cyan-300/20 bg-slate-950/30 px-3 py-2 text-xs text-cyan-100">{project.impact}</p>
        <div className="mt-3 flex flex-wrap gap-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border px-2 py-1 text-xs" style={{ borderColor: project.theme.chipBorder, color: project.theme.chipText }}>
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">Open project deep dive</p>
      </button>
    </motion.article>
  );
}

export default function FeaturedProjects({
  projects,
  reduceMotion,
  fadeIn,
  spring,
  onProjectOpen,
  activeFilter,
  onFilterChange,
  filterOptions,
  resumeMode,
}) {
  return (
    <div className="panel">
      <h2 className="section-title mb-2">Featured Work</h2>
      <p className="mb-5 text-sm text-slate-300">
        Selected resume projects across embedded security, multimodal AI, and enterprise workflow systems.
      </p>
      <div className="mb-4 flex flex-wrap gap-2" aria-label="Project filters">
        <button
          type="button"
          className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.12em] transition ${
            activeFilter === 'all'
              ? 'border-cyan-300/70 bg-cyan-500/15 text-cyan-100'
              : 'border-slate-500/40 text-slate-300 hover:border-cyan-300/50 hover:text-cyan-100'
          }`}
          onClick={() => onFilterChange('all')}
          aria-pressed={activeFilter === 'all'}
        >
          All
        </button>
        {filterOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.12em] transition ${
              activeFilter === option
                ? 'border-cyan-300/70 bg-cyan-500/15 text-cyan-100'
                : 'border-slate-500/40 text-slate-300 hover:border-cyan-300/50 hover:text-cyan-100'
            }`}
            onClick={() => onFilterChange(option)}
            aria-pressed={activeFilter === option}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectStoryCard
            key={project.id}
            project={project}
            index={index}
            reduceMotion={reduceMotion}
            fadeIn={fadeIn}
            spring={spring}
            onProjectOpen={onProjectOpen}
            resumeMode={resumeMode}
          />
        ))}
      </div>
    </div>
  );
}
