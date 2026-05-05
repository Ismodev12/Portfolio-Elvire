import React, { useEffect, useRef } from 'react';

/* ─── Snowflake config ───────────────────────────── */
const FLAKE_COUNT = 72;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

class Flake {
  constructor(canvasW, canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.reset(true);
  }

  reset(initial = false) {
    this.x     = randomBetween(0, this.canvasW);
    this.y     = initial ? randomBetween(-this.canvasH, this.canvasH) : randomBetween(-40, -10);
    this.r     = randomBetween(1, 3.2);          // radius
    this.speed = randomBetween(0.35, 1.1);       // fall speed
    this.drift = randomBetween(-0.25, 0.25);     // horizontal drift
    this.alpha = randomBetween(0.35, 0.75);      // base opacity
    this.wobble      = randomBetween(0, Math.PI * 2);
    this.wobbleSpeed = randomBetween(0.008, 0.022);
  }

  update() {
    this.wobble += this.wobbleSpeed;
    this.x += this.drift + Math.sin(this.wobble) * 0.4;
    this.y += this.speed;
    if (this.y > this.canvasH + 20) this.reset();
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 230, 255, ${this.alpha})`;
    ctx.shadowColor = 'rgba(180, 220, 255, 0.6)';
    ctx.shadowBlur  = this.r * 3;
    ctx.fill();
    ctx.restore();
  }
}

/* ─── Component ─────────────────────────────────── */
export default function BackgroundFX() {
  const canvasRef = useRef(null);
  const flakesRef = useRef([]);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* Resize to full window */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Rebuild flakes on resize so they fill the new size
      flakesRef.current = Array.from(
        { length: FLAKE_COUNT },
        () => new Flake(canvas.width, canvas.height)
      );
    };
    resize();
    window.addEventListener('resize', resize);

    /* Animation loop */
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakesRef.current.forEach((f) => {
        f.update();
        f.draw(ctx);
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* ── Canvas for snowflakes ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 999,
          opacity: 1,
        }}
      />

      {/* ── Warm light orb — slow drift animation ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 998,
          overflow: 'hidden',
        }}
      >
        {/* Primary warm orb */}
        <div style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,190,80,0.18) 0%, rgba(240,140,40,0.1) 40%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'warmOrbDrift 28s ease-in-out infinite',
          top: '10%',
          left: '20%',
          willChange: 'transform',
        }} />

        {/* Secondary warm accent — offset phase */}
        <div style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,160,60,0.14) 0%, rgba(220,120,30,0.08) 50%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'warmOrbDrift 22s ease-in-out infinite reverse',
          bottom: '15%',
          right: '15%',
          willChange: 'transform',
        }} />

        {/* Tertiary — tiny warm twinkle */}
        <div style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,200,80,0.12) 0%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'warmOrbDrift 36s ease-in-out infinite 8s',
          top: '50%',
          left: '55%',
          willChange: 'transform',
        }} />
      </div>

      {/* ── Keyframes injected globally ── */}
      <style>{`
        @keyframes warmOrbDrift {
          0%   { transform: translate(0px,   0px)   scale(1);    }
          20%  { transform: translate(80px,  -60px)  scale(1.08); }
          40%  { transform: translate(-50px, 40px)  scale(0.96); }
          60%  { transform: translate(60px,  80px)  scale(1.05); }
          80%  { transform: translate(-80px, -40px) scale(0.98); }
          100% { transform: translate(0px,   0px)   scale(1);    }
        }
      `}</style>
    </>
  );
}
