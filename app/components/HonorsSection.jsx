import { motion } from 'framer-motion';

export default function HonorsSection({ honors, reduceMotion, fadeIn, spring }) {
  return (
    <section className="mt-10 panel honors-dossier">
      <p className="honors-dossier__eyebrow">Recognition</p>
      <h2 className="section-title mb-2">Honors</h2>
      <p className="honors-dossier__intro">Challenge programs and selective tracks that sharpened production-focused delivery.</p>
      <div className="honors-dossier__list">
        {honors.map((honor, index) => (
          <motion.article
            key={honor.title}
            initial={reduceMotion ? false : fadeIn.hidden}
            whileInView={fadeIn.visible}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ ...spring, delay: index * 0.08 }}
            className="honors-dossier__item"
          >
            <div className="honors-dossier__head">
              <h3 className="honors-dossier__title">{honor.title}</h3>
              <p className="honors-dossier__period">{honor.period}</p>
            </div>
            <ul className="honors-dossier__points">
              {honor.points.map((point, pointIndex) => (
                <li key={point} className="honors-dossier__point">
                  <span className="honors-dossier__point-index">{String(pointIndex + 1).padStart(2, '0')}</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
