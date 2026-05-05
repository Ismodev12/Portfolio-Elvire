import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AVATARS = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=160',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=160',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=160',
];

const slideVariants = {
  enter: d => ({ opacity:0, x: d>0 ? 60 : -60, scale:0.97 }),
  center: { opacity:1, x:0, scale:1 },
  exit:  d => ({ opacity:0, x: d>0 ? -60 : 60, scale:0.97 }),
};

export default function Testimonials() {
  const { t, colors, theme } = useApp();
  const isDark = theme === 'dark';
  const items = t('testimonials.items');

  const [[index, dir], setSlide] = useState([0,0]);
  const [paused, setPaused] = useState(false);

  const go = useCallback(newDir => {
    setSlide(([cur]) => [(cur+newDir+items.length)%items.length, newDir]);
  }, [items.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [paused, go]);

  const item = items[index];

  const btnStyle = {
    width:42, height:42, borderRadius:'50%',
    display:'flex', alignItems:'center', justifyContent:'center',
    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)',
    border:`1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    color: colors.textMuted, cursor:'pointer', transition:'all 0.2s',
    flexShrink: 0,
  };

  return (
    <section id="temoignages" style={{ background: colors.bgSecondary, borderTop:`1px solid ${colors.secBorder}`, position:'relative',overflow:'hidden' }}>
      <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:400,borderRadius:'50%',
        background:'radial-gradient(ellipse,rgba(9,146,194,0.06) 0%,transparent 70%)',pointerEvents:'none' }}/>

      <div className="section" style={{ position:'relative',zIndex:1 }}>
        <div className="text-center mb-16">
          <motion.p className="label justify-center" initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            {t('testimonials.label')}
          </motion.p>
          <motion.h2 className="section-title" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.05}} style={{ color: colors.textPrimary }}>
            {t('testimonials.title').split(' ').map((w,i,arr) => i===arr.length-1 ? <span key={i} className="text-grad"> {w}</span> : <span key={i}>{i>0?' ':''}{w}</span>)}
          </motion.h2>
        </div>

        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}
          style={{ maxWidth:820,margin:'0 auto',position:'relative' }}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>

          <div style={{ position:'relative',borderRadius:24,
            background: isDark ? 'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(9,146,194,0.04) 100%)' : 'rgba(255,255,255,0.9)',
            border:`1px solid ${isDark ? 'rgba(10,196,224,0.12)' : 'rgba(0,0,0,0.08)'}`,
            overflow:'hidden',boxShadow:'0 32px 80px rgba(0,0,0,0.15)' }}>

            {/* Trait décoratif en haut */}
            <div style={{ position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,rgba(10,196,224,0.5),rgba(9,146,194,0.8),rgba(10,196,224,0.5),transparent)' }}/>

            {/* Guillemet déco — réduit sur mobile */}
            <div className="quote-deco" style={{ position:'absolute',top:16,right:20,fontFamily:'Georgia,serif',
              color: isDark ? 'rgba(10,196,224,0.04)' : 'rgba(9,146,194,0.07)',fontWeight:900,userSelect:'none',pointerEvents:'none',letterSpacing:-4 }}>"</div>

            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={index}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{duration:0.42,ease:[0.22,1,0.36,1]}}
                className="testimonial-inner"
              >
                {/* Bloc avatar + nom + étoiles */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, textAlign:'center' }}>
                  <div style={{ position:'relative' }}>
                    <div style={{ position:'absolute',inset:-3,borderRadius:'50%',background:'linear-gradient(135deg,#0992C2,#0AC4E0)',zIndex:0 }}/>
                    <div style={{ position:'absolute',inset:-6,borderRadius:'50%',background:'radial-gradient(circle,rgba(10,196,224,0.2) 0%,transparent 70%)',filter:'blur(8px)',zIndex:-1 }}/>
                    <img
                      src={AVATARS[index]}
                      alt={item.name}
                      style={{ width:72,height:72,borderRadius:'50%',objectFit:'cover',position:'relative',zIndex:1,border:'3px solid '+colors.bgPrimary }}
                    />
                  </div>
                  <div>
                    <p style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:16,color: colors.textPrimary }}>{item.name}</p>
                    <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:13,color: colors.textMuted,marginTop:2 }}>{item.role}</p>
                  </div>
                  <div style={{ display:'flex',gap:3 }}>
                    {[...Array(5)].map((_,j) => <Star key={j} size={13} style={{ color:'#0AC4E0',fill:'#0AC4E0' }}/>)}
                  </div>
                </div>

                {/* Texte du témoignage */}
                <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:'clamp(14px,2.5vw,16px)',lineHeight:1.85,
                  color: colors.textSecondary,fontStyle:'italic',position:'relative',zIndex:1,
                  textAlign:'center' }}>
                  "{item.text}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginTop:28 }}>
            <button onClick={() => go(-1)} style={btnStyle}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(10,196,224,0.4)'; e.currentTarget.style.color='#0AC4E0'; e.currentTarget.style.background='rgba(10,196,224,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'; e.currentTarget.style.color=colors.textMuted; e.currentTarget.style.background= isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'; }}>
              <ChevronLeft size={18}/>
            </button>
            <div style={{ display:'flex',gap:8,alignItems:'center' }}>
              {items.map((_,i) => <button key={i} onClick={() => setSlide([i,i>index?1:-1])}
                style={{ width: i===index ? 28 : 8,height:8,borderRadius:99,padding:0,border:'none',
                  background: i===index ? 'linear-gradient(90deg,#0992C2,#0AC4E0)' : (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'),
                  cursor:'pointer',transition:'all 0.35s ease',
                  boxShadow: i===index ? '0 0 10px rgba(10,196,224,0.4)' : 'none' }}/>)}
            </div>
            <button onClick={() => go(1)} style={btnStyle}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(10,196,224,0.4)'; e.currentTarget.style.color='#0AC4E0'; e.currentTarget.style.background='rgba(10,196,224,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'; e.currentTarget.style.color=colors.textMuted; e.currentTarget.style.background= isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'; }}>
              <ChevronRight size={18}/>
            </button>
          </div>

        </motion.div>
      </div>

      {/* Styles responsive */}
      <style>{`
        .quote-deco {
          font-size: 100px;
          line-height: 1;
        }
        .testimonial-inner {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 28px 20px 32px;
          align-items: center;
        }
        @media (min-width: 640px) {
          .quote-deco { font-size: 150px; }
          .testimonial-inner { padding: 36px 40px 40px; gap: 24px; }
        }
        @media (min-width: 768px) {
          .quote-deco { font-size: 180px; }
          .testimonial-inner {
            display: grid !important;
            grid-template-columns: auto 1fr;
            gap: 40px;
            padding: 48px 52px;
            align-items: center;
          }
          .testimonial-inner p:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
