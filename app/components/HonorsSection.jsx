import { motion } from 'framer-motion';

export default function HonorsSection({ honors, reduceMotion, fadeIn, spring }) {
  return (
    <section className="mt-10 panel">
      <h2 className="section-title mb-2">Honors</h2>
      <p className="mb-5 text-sm text-slate-300">Recognition and challenge programs that shaped high-impact, production-minded work.</p>
      <div className="grid gap-4">
        {honors.map((honor, index) => (
          <motion.article
            key={honor.title}
            initial={reduceMotion ? false : fadeIn.hidden}
            whileInView={fadeIn.visible}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ ...spring, delay: index * 0.08 }}
            className="glass rounded-xl p-5"
          >
            <h3 className="text-base font-semibold text-cyan-200">{honor.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cyan-300">{honor.period}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {honor.points.map((point) => (
                <li key={point} className="border-l-2 border-cyan-400/40 pl-3">
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
