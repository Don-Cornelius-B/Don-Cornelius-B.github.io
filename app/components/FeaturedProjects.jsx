import { motion } from 'framer-motion';

function ProjectStoryCard({ project, index, reduceMotion, fadeIn, spring, onProjectOpen, resumeMode, isCardMode }) {
  const accentStyle = {
    '--project-edge': project.theme.edge,
    '--project-chip-border': project.theme.chipBorder,
    '--project-chip-text': project.theme.chipText,
  };

  return (
    <motion.article
      initial={reduceMotion || resumeMode ? false : fadeIn.hidden}
      whileInView={resumeMode ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={resumeMode ? { duration: 0 } : { ...spring, delay: index * 0.08 }}
      whileHover={resumeMode || isCardMode ? undefined : { y: -5 }}
      className={`project-strip group ${isCardMode ? 'project-strip--card' : 'project-strip--immersive'}`}
    >
      <button
        type="button"
        onClick={() => onProjectOpen(project)}
        className="project-strip__button"
        aria-label={`Open ${project.title} project details`}
        style={accentStyle}
      >
        <div className="project-strip__meta-row">
          <p className="project-strip__duration">{project.duration}</p>
          <p className="project-strip__open">Open details</p>
        </div>

        <h3 className="project-strip__title">{project.title}</h3>

        <div className="project-strip__content-grid">
          <div>
            <p className="project-strip__body">{project.description}</p>
            <div className="project-strip__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-strip__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="project-strip__aside">
            <p className="project-strip__role">{project.role}</p>
            <p className="project-strip__impact">{project.impact}</p>
            <p className="project-strip__frame">Story frame {String(index + 1).padStart(2, '0')}</p>
          </div>
        </div>
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
  isCardMode,
}) {
  return (
    <div className={`panel project-atlas ${isCardMode ? 'project-atlas--card' : 'project-atlas--immersive'}`}>
      <p className="project-atlas__eyebrow">Selected builds</p>
      <h2 className="section-title mb-2">Featured Work</h2>
      <p className="project-atlas__intro">
        Projects across embedded security, multimodal AI, and enterprise workflows.
      </p>

      <div className="project-filter-row" aria-label="Project filters">
        <button
          type="button"
          className={`project-filter ${activeFilter === 'all' ? 'project-filter--active' : ''}`}
          onClick={() => onFilterChange('all')}
          aria-pressed={activeFilter === 'all'}
        >
          All
        </button>
        {filterOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={`project-filter ${activeFilter === option ? 'project-filter--active' : ''}`}
            onClick={() => onFilterChange(option)}
            aria-pressed={activeFilter === option}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="project-list">
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
            isCardMode={isCardMode}
          />
        ))}
      </div>
    </div>
  );
}
