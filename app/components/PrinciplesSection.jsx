import { motion } from 'framer-motion';

export default function PrinciplesSection({ principles, reduceMotion, fadeIn, spring }) {
  return (
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
  );
}
