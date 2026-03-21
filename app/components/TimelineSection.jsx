import { motion } from 'framer-motion';

export default function TimelineSection({ timeline, reduceMotion, fadeIn, spring }) {
  return (
    <motion.div
      initial={reduceMotion ? false : fadeIn.hidden}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...spring, delay: 0.08 }}
      className="panel timeline-ledger"
    >
      <p className="timeline-ledger__eyebrow">Milestones</p>
      <h2 className="section-title mb-2">Journey Timeline</h2>
      <p className="timeline-ledger__intro">From computing foundations to production-focused system design.</p>
      <div className="timeline-ledger__track">
        <div className="timeline-ledger__line" />
        <div className="timeline-ledger__list">
          {timeline.map((item, index) => (
            <article key={item.stage} className="timeline-ledger__item">
              <div className="timeline-ledger__dot" />
              <p className="timeline-ledger__year">{item.year}</p>
              <h3 className="timeline-ledger__stage">{item.stage}</h3>
              <p className="timeline-ledger__text">{item.text}</p>
              <p className="timeline-ledger__index">Phase {String(index + 1).padStart(2, '0')}</p>
            </article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
