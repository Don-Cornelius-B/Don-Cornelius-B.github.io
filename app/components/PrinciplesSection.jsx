import { motion } from 'framer-motion';

export default function PrinciplesSection({ principles, reduceMotion, fadeIn, spring }) {
  return (
    <section className="mt-10 panel principles-constellation">
      <p className="principles-constellation__eyebrow">Operating model</p>
      <h2 className="section-title mb-2">Engineering Principles</h2>
      <p className="principles-constellation__intro">How product intent, technical depth, and maintainability stay aligned across every build.</p>
      <div className="principles-constellation__grid">
        {principles.map((principle, index) => (
          <motion.article
            key={principle.title}
            initial={reduceMotion ? false : fadeIn.hidden}
            whileInView={fadeIn.visible}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ ...spring, delay: index * 0.08 }}
            className="principles-constellation__card"
          >
            <p className="principles-constellation__index">Principle {String(index + 1).padStart(2, '0')}</p>
            <h3 className="principles-constellation__title">{principle.title}</h3>
            <p className="principles-constellation__text">{principle.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
