import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

/* ── Flocon de neige SVG ───────────────────────────
   Flocon stylisé à 6 branches avec détails fins
─────────────────────────────────────────────────── */
const Snowflake = ({ size = 80, opacity = 0.55, color = '#4fc3f7' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    {/* Branche principale verticale */}
    <line x1="50" y1="5" x2="50" y2="95" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Branche principale horizontale */}
    <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Branche diagonale \ */}
    <line x1="18" y1="18" x2="82" y2="82" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Branche diagonale / */}
    <line x1="82" y1="18" x2="18" y2="82" stroke={color} strokeWidth="3" strokeLinecap="round" />

    {/* Petites branches sur axe vertical — haut */}
    <line x1="50" y1="22" x2="38" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="22" x2="62" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Petites branches sur axe vertical — bas */}
    <line x1="50" y1="78" x2="38" y2="88" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="78" x2="62" y2="88" stroke={color} strokeWidth="2" strokeLinecap="round" />

    {/* Petites branches sur axe horizontal — gauche */}
    <line x1="22" y1="50" x2="12" y2="38" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="50" x2="12" y2="62" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Petites branches sur axe horizontal — droite */}
    <line x1="78" y1="50" x2="88" y2="38" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="78" y1="50" x2="88" y2="62" stroke={color} strokeWidth="2" strokeLinecap="round" />

    {/* Petites branches diagonale \ */}
    <line x1="32" y1="32" x2="24" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="32" x2="20" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="68" y1="68" x2="76" y2="80" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="68" y1="68" x2="80" y2="76" stroke={color} strokeWidth="2" strokeLinecap="round" />

    {/* Petites branches diagonale / */}
    <line x1="68" y1="32" x2="76" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="68" y1="32" x2="80" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="68" x2="24" y2="80" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="68" x2="20" y2="76" stroke={color} strokeWidth="2" strokeLinecap="round" />

    {/* Centre */}
    <circle cx="50" cy="50" r="5" fill={color} opacity="0.8" />
  </svg>
);

/* ── 4 flocons de neige ─────────────────────────── */
const FLAKES = [
  { left: '8%',  size: 90,  opacity: 0.50, delay: 0,  duration: 30, color: '#81d4fa', driftX: ['0px','35px','10px','50px','20px'],  rotate: [0, 90, 180, 270, 360] },
  { left: '30%', size: 60,  opacity: 0.40, delay: 8,  duration: 24, color: '#4fc3f7', driftX: ['0px','20px','-5px','30px','10px'],  rotate: [0, -120, -240, -360, -480] },
  { left: '58%', size: 110, opacity: 0.45, delay: 3,  duration: 36, color: '#29b6f6', driftX: ['0px','-30px','5px','-20px','0px'],  rotate: [0, 60, 120, 180, 240] },
  { left: '82%', size: 75,  opacity: 0.42, delay: 15, duration: 27, color: '#0288d1', driftX: ['0px','25px','-10px','40px','15px'], rotate: [0, -90, -180, -270, -360] },
];

export default function SnowflakesFX() {
  const { theme } = useApp();
  if (theme !== 'light') return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
    }}>
      {FLAKES.map((f, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', left: f.left, bottom: `-${f.size + 20}px` }}
          animate={{
            y: ['0px', `-${(typeof window !== 'undefined' ? window.innerHeight : 900) + f.size + 20}px`],
            x: f.driftX,
            rotate: f.rotate,
          }}
          transition={{
            duration: f.duration,
            ease: 'linear',
            repeat: Infinity,
            delay: f.delay,
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          <Snowflake size={f.size} opacity={f.opacity} color={f.color} />
        </motion.div>
      ))}
    </div>
  );
}
