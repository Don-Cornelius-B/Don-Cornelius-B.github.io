import { motion } from 'framer-motion';

export default function TimelineSection({ timeline, reduceMotion, fadeIn, spring }) {
  return (
    <motion.div
      initial={reduceMotion ? false : fadeIn.hidden}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...spring, delay: 0.08 }}
      className="panel"
    >
      <h2 className="section-title mb-2">Journey Timeline</h2>
      <p className="mb-4 text-sm text-slate-300">A progression from foundational computing to production-minded system design.</p>
      <div className="relative pl-6">
        <div className="absolute left-[11px] top-0 h-full w-[2px] bg-gradient-to-b from-cyan-300 to-violet-400" />
        <div className="space-y-4">
          {timeline.map((item) => (
            <article key={item.stage} className="relative rounded-xl border border-cyan-300/20 bg-slate-950/30 p-4">
              <div className="absolute -left-[19px] top-5 h-4 w-4 rounded-full border border-cyan-300 bg-slate-950" />
              <p className="text-xs text-slate-400">{item.year}</p>
              <h3 className="text-base font-semibold text-slate-100">{item.stage}</h3>
              <p className="mt-1 text-sm text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
