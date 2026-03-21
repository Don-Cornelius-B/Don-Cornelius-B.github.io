import { motion } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function SectionDivider({ velocityValue, resumeMode = false }) {
  const [velocity, setVelocity] = useState(0);

  useMotionValueEvent(velocityValue, 'change', (latest) => {
    setVelocity(latest);
  });

  if (resumeMode) {
    return <div className="my-8 h-px bg-slate-800/70" aria-hidden="true" />;
  }

  const intensity = Math.min(1, Math.abs(velocity) / 1500);

  return (
    <div className="section-divider-wrap" aria-hidden="true">
      <motion.div
        className="section-divider"
        animate={{
          opacity: 0.35 + intensity * 0.45,
          backgroundPositionX: velocity >= 0 ? ['0%', '100%'] : ['100%', '0%'],
        }}
        transition={{
          backgroundPositionX: {
            duration: 2.1 - intensity * 0.8,
            repeat: Infinity,
            ease: 'linear',
          },
          opacity: { duration: 0.2 },
        }}
      />
    </div>
  );
}
