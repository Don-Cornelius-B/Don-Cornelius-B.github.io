import { motion } from 'framer-motion';

export default function SkillsProjectionDeck({ techProjectionLanes }) {
  return (
    <div className="space-y-4">
      <div className="relative hidden h-[35rem] overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/35 p-5 md:block">
        <motion.div
          className="pointer-events-none absolute inset-y-3 z-0 w-14 bg-gradient-to-r from-transparent via-cyan-300/14 to-transparent blur-sm"
          animate={{ x: ['-15%', '108%'] }}
          transition={{ repeat: Infinity, duration: 7.2, ease: 'linear' }}
        />

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 h-44 w-[74%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.15),transparent_72%)]" />

        <div className="relative z-30 mt-1 space-y-4 pb-3">
          {techProjectionLanes.map((lane, index) => (
            <motion.div
              key={lane.title}
              className={`mx-auto w-[94%] rounded-xl border px-4 py-3 backdrop-blur-sm ${lane.accent}`}
              initial={false}
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 4.4 + index * 0.4, ease: 'easeInOut' }}
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-200/95">{lane.title}</p>
              <div className="mt-2 flex flex-wrap gap-2.5">
                {lane.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="rounded-full border border-cyan-300/45 bg-slate-900/85 px-2.5 py-1 text-xs text-cyan-100"
                    whileHover={{ y: -2, scale: 1.04, boxShadow: '0 0 16px rgba(56,189,248,0.34)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {techProjectionLanes.map((lane) => (
          <div key={lane.title} className={`glass mx-auto w-[94%] rounded-xl border p-4 ${lane.accent}`}>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">{lane.title}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {lane.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-cyan-300/45 px-2 py-1 text-xs text-cyan-100">
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
