import { motion } from 'framer-motion';

export default function HeroSection({ spring }) {
  return (
    <motion.section
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="hero-grid accent-border panel noise-overlay overflow-hidden"
      id="main-content"
      aria-label="Introduction"
    >
      <div className="grid gap-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-cyan-300">Creative Technologist</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
            Building cloud-native software systems for real-world impact.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-slate-300 sm:text-lg">
            Don Cornelius B - 3rd Year CSE student focused on Cloud Computing and DevOps Engineering, shipping resilient
            products with automation-first workflows.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://linkedin.com/in/don-cornelius-livi/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-cyan-300/50 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-300/10"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Don-Cornelius-B"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-violet-300/50 px-4 py-2 text-sm text-violet-200 transition hover:bg-violet-300/10"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="glass rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Current Focus</p>
            <p className="mt-2 text-sm text-slate-200">Cloud-native systems and resilient DevOps delivery pipelines.</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Education</p>
            <p className="mt-2 text-sm text-slate-200">B.E CSE at Sathyabama Institute of Science and Technology.</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Workflow</p>
            <p className="mt-2 text-sm text-slate-200">Design -&gt; Build -&gt; Validate -&gt; Ship with strong CI checks.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
