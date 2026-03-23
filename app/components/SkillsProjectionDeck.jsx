import { motion } from 'framer-motion';

export default function SkillsProjectionDeck({ techProjectionLanes, disableAnimation = false }) {
  return (
    <div className="skills-atlas">
      <div className="skills-atlas__desktop hidden md:block">
        {!disableAnimation && (
          <motion.div
            className="skills-atlas__scanner"
            animate={{ x: ['-15%', '108%'] }}
            transition={{ repeat: Infinity, duration: 7.2, ease: 'linear' }}
          />
        )}

        <div className="skills-atlas__glow" />

        <div className="skills-atlas__lane-stack">
          {techProjectionLanes.map((lane, index) => (
            <motion.div
              key={lane.title}
              className={`skills-atlas__lane ${lane.accent}`}
              initial={false}
              animate={disableAnimation ? undefined : { y: [0, -2, 0] }}
              transition={disableAnimation ? undefined : { repeat: Infinity, duration: 4.4 + index * 0.4, ease: 'easeInOut' }}
            >
              <p className="skills-atlas__lane-title">{lane.title}</p>
              <div className="skills-atlas__chips">
                {lane.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skills-atlas__chip"
                    whileHover={disableAnimation ? undefined : { y: -2, scale: 1.04, boxShadow: '0 0 16px rgba(43,138,138,0.34)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="skills-atlas__mobile md:hidden">
        {techProjectionLanes.map((lane, index) => (
          <div key={lane.title} className={`skills-atlas__mobile-lane ${lane.accent}`}>
            <div className="skills-atlas__mobile-head">
              <p className="skills-atlas__lane-title">{lane.title}</p>
              <p className="skills-atlas__index">{String(index + 1).padStart(2, '0')}</p>
            </div>
            <div className="skills-atlas__chips">
              {lane.skills.map((skill) => (
                <span key={skill} className="skills-atlas__chip">
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
