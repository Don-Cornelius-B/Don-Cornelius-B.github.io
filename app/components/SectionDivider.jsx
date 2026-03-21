import { motion, useTransform } from 'framer-motion';

export default function SectionDivider({ velocityValue, resumeMode = false }) {
  const x = useTransform(velocityValue, (velocity) => {
    const normalized = Math.max(-24, Math.min(24, velocity / 55));
    return normalized;
  });

  const opacity = useTransform(velocityValue, (velocity) => {
    const intensity = Math.min(1, Math.abs(velocity) / 1400);
    return 0.35 + intensity * 0.42;
  });

  if (resumeMode) {
    return <div className="my-8 h-px bg-slate-800/70" aria-hidden="true" />;
  }

  return (
    <div className="section-divider-wrap" aria-hidden="true">
      <motion.div className="section-divider" style={{ opacity, x }} />
    </div>
  );
}
