import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function CursorFX() {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  /* Halo extérieur — suit avec inertie douce */
  const haloX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const haloY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  /* Point central — suit instantanément */
  const dotX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const dotY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* Masquer le curseur natif globalement */
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => { document.body.style.cursor = ''; };
  }, []);

  /* N'afficher que sur desktop */
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

  return (
    <>
      {/* Halo lumineux */}
      <motion.div
        style={{
          position: 'fixed',
          left: haloX,
          top: haloY,
          x: '-50%',
          y: '-50%',
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: `1.5px solid rgba(10,196,224,0.55)`,
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: isDark ? 'screen' : 'multiply',
        }}
      />

      {/* Anneau intermédiaire — glow doux */}
      <motion.div
        style={{
          position: 'fixed',
          left: haloX,
          top: haloY,
          x: '-50%',
          y: '-50%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10,196,224,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 99998,
        }}
      />

      {/* Point central */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          x: '-50%',
          y: '-50%',
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: '#0AC4E0',
          boxShadow: '0 0 10px rgba(10,196,224,0.9)',
          pointerEvents: 'none',
          zIndex: 100000,
        }}
      />
    </>
  );
}
