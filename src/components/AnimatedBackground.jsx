import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedBackground
 * theme="dark"  → Dégradé navy premium multicouche + orbs animés
 * theme="light" → Blanc pur avec orbs pastels animés
 */
const AnimatedBackground = ({ theme = 'dark' }) => {

  /* ══════════════════ THEME DARK ══════════════════ */
  if (theme === 'dark') {
    return (
      <>
        {/* ── Couche 1 : Dégradé de base diagonal chic ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                135deg,
                #020C1B 0%,
                #041221 20%,
                #071A30 40%,
                #0B2D72 65%,
                #071A30 80%,
                #020C1B 100%
              )
            `,
            pointerEvents: 'none',
          }}
        />

        {/* ── Couche 2 : Dégradé radial centré — halo bleu profond ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(9,146,194,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Couche 3 : Accent haut-gauche (coin lumineux) ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 55% 45% at 15% 10%, rgba(10,196,224,0.1) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Couche 4 : Accent bas-droite ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 55% 45% at 88% 90%, rgba(9,146,194,0.09) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Orb flottant 1 : Bleu ── */}
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            left: '-3%',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(9,146,194,0.45) 0%, transparent 70%)',
            filter: 'blur(90px)',
            animation: 'orbFloat 14s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        {/* ── Orb flottant 2 : Cyan ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '-8%',
            right: '-4%',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(10,196,224,0.35) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'orbFloat 17s ease-in-out infinite 5s',
            pointerEvents: 'none',
          }}
        />

        {/* ── Orb flottant 3 : Navy moyen (volume) ── */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            right: '20%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(11,45,114,0.5) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'orbFloat 20s ease-in-out infinite 9s',
            pointerEvents: 'none',
          }}
        />

        {/* ── Vague douce en bas ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '50%',
            width: '160%',
            height: '260px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(9,146,194,0.05) 100%)',
            borderRadius: '50%',
            animation: 'waveSlide 12s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        {/* ── Filet de lumière diagonale (effet prisme) ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(105deg, transparent 40%, rgba(10,196,224,0.03) 50%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Particules scintillantes ── */}
        {[
          { top: '14%', left: '22%',  size: 5, delay: '0s'   },
          { top: '38%', right: '12%', size: 4, delay: '1.8s' },
          { bottom: '28%', left: '32%', size: 6, delay: '3.2s' },
          { top: '62%', right: '32%', size: 3, delay: '0.9s' },
          { bottom: '12%', right: '48%', size: 4, delay: '2.5s' },
          { top: '20%', right: '40%', size: 3, delay: '4s'   },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: p.top, left: p.left, right: p.right, bottom: p.bottom,
              width: p.size, height: p.size,
              borderRadius: '50%',
              background: '#0AC4E0',
              boxShadow: `0 0 ${p.size * 3}px #0AC4E0`,
              animation: `sparkle 3.5s ease-in-out infinite ${p.delay}`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </>
    );
  }

  /* ══════════════════ THEME LIGHT ══════════════════ */
  return (
    <>
      {/* ── Base blanche pure ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#ffffff',
          pointerEvents: 'none',
        }}
      />

      {/* ── Dégradé radial bleu clair centré ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(9,146,194,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Accent haut-gauche ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 50% 40% at 10% 8%, rgba(10,196,224,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Accent bas-droite (crème doré) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 50% 40% at 92% 92%, rgba(246,231,188,0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Orb 1 : Bleu clair haut-gauche ── */}
      <div
        style={{
          position: 'absolute',
          top: '-12%', left: '-8%',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(9,146,194,0.14) 0%, transparent 65%)',
          filter: 'blur(90px)',
          animation: 'lightOrb 14s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* ── Orb 2 : Cyan bas-droite ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%', right: '-6%',
          width: '440px', height: '440px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10,196,224,0.12) 0%, transparent 65%)',
          filter: 'blur(100px)',
          animation: 'lightOrb 18s ease-in-out infinite 5s',
          pointerEvents: 'none',
        }}
      />

      {/* ── Orb 3 : Crème doré ── */}
      <div
        style={{
          position: 'absolute',
          top: '30%', right: '18%',
          width: '360px', height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(246,231,188,0.22) 0%, transparent 65%)',
          filter: 'blur(80px)',
          animation: 'lightOrb 22s ease-in-out infinite 10s',
          pointerEvents: 'none',
        }}
      />

      {/* ── Vague haute douce ── */}
      <div
        style={{
          position: 'absolute',
          top: '-90px', left: '50%',
          width: '150%', height: '280px',
          background: 'linear-gradient(180deg, rgba(9,146,194,0.05) 0%, transparent 100%)',
          borderRadius: '50%',
          animation: 'lightWave 13s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* ── Filet de lumière diagonal subtil ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(115deg, transparent 42%, rgba(9,146,194,0.025) 52%, transparent 62%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Particules légères ── */}
      {[
        { top: '16%',   left: '26%',  size: 5, delay: '0s',   color: 'rgba(9,146,194,0.45)' },
        { top: '42%',   right: '10%', size: 4, delay: '2s',   color: 'rgba(10,196,224,0.45)' },
        { bottom: '22%',left: '10%',  size: 6, delay: '1.2s', color: 'rgba(9,146,194,0.4)' },
        { bottom: '38%',right: '26%', size: 3, delay: '3.2s', color: 'rgba(246,231,188,0.8)' },
        { top: '70%',   left: '50%',  size: 4, delay: '0.7s', color: 'rgba(10,196,224,0.35)' },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: p.top, left: p.left, right: p.right, bottom: p.bottom,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `sparkle 4s ease-in-out infinite ${p.delay}`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
};

export default AnimatedBackground;
