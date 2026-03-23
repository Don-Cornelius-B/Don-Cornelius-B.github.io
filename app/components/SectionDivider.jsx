import { motion, useTransform } from 'framer-motion';

export default function SectionDivider({ velocityValue, resumeMode = false, isCardMode = false }) {
  const x = useTransform(velocityValue, (velocity) => {
    const spread = isCardMode ? 13 : 24;
    const divisor = isCardMode ? 92 : 55;
    const normalized = Math.max(-spread, Math.min(spread, velocity / divisor));
    return normalized;
  });

  const opacity = useTransform(velocityValue, (velocity) => {
    const intensity = Math.min(1, Math.abs(velocity) / 1400);
    const base = isCardMode ? 0.48 : 0.35;
    const gain = isCardMode ? 0.24 : 0.42;
    return base + intensity * gain;
  });

  if (resumeMode) {
    return <div className="my-8 h-px bg-[color:var(--accent-copper-solid)]/30" aria-hidden="true" />;
  }

  return (
    <div className="section-divider-wrap" aria-hidden="true">
      <motion.div className="section-divider" style={{ opacity, x }} />
    </div>
  );
}
