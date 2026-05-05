import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Coffee, Rocket, Users } from 'lucide-react';
import elvirePic from '../assets/images/portrait/elvire-about.png';
import { useApp } from '../context/AppContext';

const ICONS = [MapPin, Coffee, Rocket, Users];

const fn = (delay=0) => ({
  initial:{opacity:0,y:22}, whileInView:{opacity:1,y:0},
  viewport:{once:true}, transition:{duration:0.6,delay,ease:[0.22,1,0.36,1]},
});

export default function About() {
  const { t, colors, theme } = useApp();
  const isDark = theme === 'dark';
  const highlights = t('about.highlights');

  return (
    <section id="apropos" aria-label="À propos d'Elvire Fadegnon" style={{ background: colors.bgSecondary, borderTop:`1px solid ${colors.secBorder}` }}>
      <div className="section">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Photo mobile — visible uniquement sur mobile, en haut */}
          <motion.div {...fn(0)} className="lg:hidden" style={{ textAlign:'center' }}>
            <div style={{ position:'relative', display:'inline-block', maxWidth:320, width:'100%' }}>
              <div style={{ position:'absolute',inset:0,borderRadius:28,
                background: isDark ? 'linear-gradient(135deg,rgba(9,146,194,0.06) 0%,rgba(11,45,114,0.12) 100%)' : 'linear-gradient(135deg,rgba(9,146,194,0.05) 0%,rgba(9,146,194,0.1) 100%)',
                border:`1px solid ${colors.cardBorder}` }}/>
              <motion.img
                src={elvirePic}
                alt="Elvire Fadegnon — Photo professionnelle, développeuse Full Stack Python et React"
                title="Elvire Fadegnon, développeuse Full Stack"
                loading="lazy"
                animate={{ y:[0,-8,0] }} transition={{ duration:7,repeat:Infinity,ease:'easeInOut' }}
                style={{ position:'relative',zIndex:1,width:'100%',maxHeight:400,objectFit:'contain',objectPosition:'center',
                  display:'block',margin:'0 auto',
                  filter: isDark ? 'drop-shadow(0 20px 40px rgba(9,146,194,0.3))' : 'none',
                }}
                draggable={false}/>
            </div>
          </motion.div>

          {/* Left — Photo desktop */}
          <motion.div {...fn(0)} className="relative hidden lg:block" style={{ alignSelf:'stretch' }}>
            <div style={{ position:'absolute',inset:0,borderRadius:28,
              background: isDark ? 'linear-gradient(135deg,rgba(9,146,194,0.06) 0%,rgba(11,45,114,0.12) 100%)' : 'linear-gradient(135deg,rgba(9,146,194,0.05) 0%,rgba(9,146,194,0.1) 100%)',
              border:`1px solid ${colors.cardBorder}` }}/>
            <div style={{ position:'absolute',bottom:'-5%',left:'-5%',width:260,height:260,borderRadius:'50%',
              background:'radial-gradient(circle,rgba(9,146,194,0.15) 0%,transparent 65%)',filter:'blur(50px)',pointerEvents:'none' }}/>
            <motion.img
              src={elvirePic}
              alt="Elvire Fadegnon — Photo professionnelle, développeuse Full Stack Python et React"
              title="Elvire Fadegnon, développeuse Full Stack"
              loading="lazy"
              animate={{ y:[0,-8,0] }} transition={{ duration:7,repeat:Infinity,ease:'easeInOut' }}
              style={{ position:'relative',zIndex:1,width:'100%',maxHeight:640,objectFit:'contain',objectPosition:'center',
                display:'block',margin:'0 auto' }}
              draggable={false}/>
            {/* Badge exp */}
            <motion.div initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:0.4}}
              style={{ position:'absolute',bottom:32,right:-16,zIndex:10,padding:'14px 18px',borderRadius:16,
                background: isDark ? 'rgba(11,25,41,0.95)' : 'rgba(255,255,255,0.95)',
                border:'1px solid rgba(10,196,224,0.2)',boxShadow:'0 12px 40px rgba(0,0,0,0.3)',backdropFilter:'blur(12px)' }}>
              <p style={{ fontFamily:'Outfit,sans-serif',fontWeight:900,fontSize:'28px',color:'#0AC4E0',lineHeight:1,marginBottom:3 }}>3+</p>
              <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:'13.5px',color: colors.textMuted }}>{t('about.badge1')}</p>
            </motion.div>
            {/* Badge projets */}
            <motion.div initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:0.5}}
              style={{ position:'absolute',top:40,right:-16,zIndex:10,padding:'14px 18px',borderRadius:16,
                background: isDark ? 'rgba(11,25,41,0.95)' : 'rgba(255,255,255,0.95)',
                border:'1px solid rgba(9,146,194,0.2)',boxShadow:'0 12px 40px rgba(0,0,0,0.3)',backdropFilter:'blur(12px)' }}>
              <p style={{ fontFamily:'Outfit,sans-serif',fontWeight:900,fontSize:'28px',color:'#0992C2',lineHeight:1,marginBottom:3 }}>20+</p>
              <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:'13.5px',color: colors.textMuted }}>{t('about.badge2')}</p>
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <div>
            <motion.p className="label" {...fn(0.05)}>{t('about.label')}</motion.p>
            <motion.h2 className="section-title" {...fn(0.1)} style={{ color: colors.textPrimary }}>
              {t('about.title1')}<br/>
              <span className="text-grad">{t('about.title2')}</span>
            </motion.h2>
            <motion.p {...fn(0.16)} style={{ fontFamily:'DM Sans,sans-serif',fontSize:'clamp(15px,2.5vw,17px)',lineHeight:1.85,color: colors.textMuted,marginBottom:'1.4rem' }}>
              {t('about.p1')}
            </motion.p>
            <motion.p {...fn(0.2)} style={{ fontFamily:'DM Sans,sans-serif',fontSize:'clamp(15px,2.5vw,17px)',lineHeight:1.85,color: colors.textMuted,marginBottom:'2.5rem' }}>
              {t('about.p2')}
            </motion.p>

            <motion.ul {...fn(0.25)} style={{ display:'flex',flexDirection:'column',gap:14,marginBottom:'2.5rem' }}>
              {highlights.map((h, i) => {
                const Icon = ICONS[i];
                return (
                  <motion.li key={i} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}}
                    viewport={{once:true}} transition={{delay:0.28+i*0.08}}
                    style={{ display:'flex',alignItems:'center',gap:12 }}>
                    <div style={{ width:34,height:34,borderRadius:10,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',
                      background:'rgba(10,196,224,0.08)',border:'1px solid rgba(10,196,224,0.18)',color:'#0AC4E0' }}>
                      <Icon size={16}/>
                    </div>
                    <span style={{ fontFamily:'DM Sans,sans-serif',fontSize:'clamp(14px,2vw,16px)',color: colors.textSecondary }}>{h}</span>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div {...fn(0.45)} style={{ display:'flex',gap:14,flexWrap:'wrap' }}>
              <a href="#contact" className="btn-primary">{t('about.cta1')}</a>
              <a href="#projets" className="btn-ghost">{t('about.cta2')}</a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
