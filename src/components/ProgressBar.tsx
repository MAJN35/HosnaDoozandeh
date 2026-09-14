import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Language } from '../types';

interface ProgressBarProps {
  lang: Language;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ lang }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const isRtl = lang === 'fa';

  return (
    <div
      className="fixed top-0 inset-x-0 h-[3.5px] z-60 pointer-events-none overflow-visible"
      aria-hidden="true"
    >
      {/* Underlying subtle track glow */}
      <div className="absolute inset-0 bg-[#3D5A80]/10 backdrop-blur-xs" />

      {/* Animated Glowing Accent Bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: isRtl ? 'right' : 'left',
        }}
        className="relative h-full w-full bg-gradient-to-r from-[#5B7CA3] via-[#3D5A80] to-[#2E486B] shadow-[0_0_12px_rgba(61,90,128,0.75),0_0_4px_rgba(143,168,200,0.9)]"
      >
        {/* Soft Glowing Leading Edge Bead */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#E5EEF7] shadow-[0_0_10px_#3D5A80,0_0_5px_#fff] ${
            isRtl ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'
          }`}
        />
      </motion.div>
    </div>
  );
};
