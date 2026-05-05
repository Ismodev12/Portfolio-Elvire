import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import elvirePic from '../assets/images/portrait/elvire-portrait.png';
import { useApp } from '../context/AppContext';

const anim = (delay = 0) => ({
  initial:    { opacity:0, y:28 },
  animate:    { opacity:1, y:0 },
  transition: { duration:0.65, delay, ease:[0.22,1,0.36,1] },
});

export default function Hero() {
  const { t, colors, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <section id="accueil" aria-label="Accueil — Portfolio Elvire Fadegnon, développeuse Full Stack" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: colors.bgPrimary }}>
      <div className="orb" style={{ width:600,height:600,top:'-15%',right:'-8%', background:'radial-gradient(circle,rgba(9,146,194,0.22) 0%,transparent 65%)' }}/>
      <div className="orb" style={{ width:400,height:400,bottom:'-10%',left:'-5%', background:'radial-gradient(circle,rgba(11,45,114,0.4) 0%,transparent 65%)', animationDelay:'6s' }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-40 pb-16">
        <div className="grid lg:grid-cols-[1fr_46%] gap-6 xl:gap-8 items-center">

          <div className="max-w-2xl">
            {/* ── Titre — text reveal mot par mot ── */}
            <h1 style={{
              fontFamily:'Outfit,sans-serif', fontWeight:900,
              fontSize:'clamp(3.2rem,6.5vw,5.8rem)', letterSpacing:'-0.025em',
              lineHeight:1.08, marginBottom:'2.2rem',
            }}>
              {[
                { text: t('hero.role1'), gradient: false },
                { text: t('hero.role2'), gradient: true  },
                { text: t('hero.role3'), gradient: false },
              ].reduce((allWords, line, li) => {
                /* calcule l'index global de chaque mot pour le stagger */
                const prev = allWords.wordCount;
                const words = line.text.split(' ');
                allWords.wordCount += words.length;
                allWords.lines.push(
                  <div key={li} style={{ display:'block', overflow:'hidden', lineHeight:1.15, paddingBottom:'0.05em' }}>
                    {words.map((word, wi) => (
                      <span key={wi} style={{ display:'inline-block', overflow:'hidden', verticalAlign:'bottom' }}>
                        <motion.span
                          display="inline-block"
                          initial={{ y:'115%' }}
                          animate={{ y:'0%' }}
                          transition={{ duration:0.85, delay:0.08 + (prev + wi) * 0.13, ease:[0.22,1,0.36,1] }}
                          style={{
                            display:'inline-block',
                            marginRight: wi < words.length - 1 ? '0.28em' : 0,
                            ...(line.gradient ? {} : { color: colors.textPrimary }),
                          }}
                          className={line.gradient ? 'text-grad' : undefined}
                        >
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </div>
                );
                return allWords;
              }, { lines: [], wordCount: 0 }).lines}
            </h1>

            <motion.p {...anim(0.22)} style={{ fontFamily:'DM Sans,sans-serif', fontSize:'18px', color: colors.textMuted, maxWidth:460, lineHeight:1.85, marginBottom:'3rem' }}>
              {t('hero.subtitle')}
            </motion.p>

            <motion.div {...anim(0.32)} style={{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:'3.5rem' }}>
              <a href="#projets" className="btn-primary">
                {t('hero.cta1')} <ArrowRight size={16}/>
              </a>
              <a href="#contact" className="btn-ghost">
                <Download size={14}/> {t('hero.cta2')}
              </a>
            </motion.div>

            <motion.div {...anim(0.42)} style={{ display:'flex', alignItems:'center', gap:40, flexWrap:'wrap' }}>
              {[
                { n:'3+',   l: t('hero.stats.years') },
                { n:'20+',  l: t('hero.stats.projects') },
                { n:'100%', l: t('hero.stats.satisfaction') },
              ].map((s, i, arr) => (
                <React.Fragment key={i}>
                  <div>
                    <p style={{ fontFamily:'Outfit,sans-serif', fontWeight:900, fontSize:'2rem', color: colors.textPrimary, lineHeight:1, marginBottom:4 }}>{s.n}</p>
                    <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'14px', color: colors.textMuted }}>{s.l}</p>
                  </div>
                  {i < arr.length - 1 && <div style={{ width:1, height:36, background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)' }}/>}
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity:0, x:60 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.9, delay:0.1, ease:[0.22,1,0.36,1] }}
            className="hidden lg:block"
            style={{
              position:'absolute', top:0, right:0, bottom:0,
              width:'52%', zIndex:1, pointerEvents:'none',
            }}
          >
            <img
              src={elvirePic}
              alt="Elvire Fadegnon — Développeuse Full Stack Python et React, portrait professionnel"
              title="Elvire Fadegnon, développeuse Full Stack"
              loading="eager"
              fetchpriority="high"
              style={{
                width:'100%', height:'100%',
                objectFit:'contain', objectPosition:'bottom center',
                display:'block',
              }}
              draggable={false}
            />
          </motion.div>

        </div>
      </div>
    </section>

  );
}
