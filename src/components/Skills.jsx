import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const SKILL_DATA = {
  backend:  ['Python','Django','FastAPI','REST API','Flask','GraphQL'],
  frontend: ['React','JavaScript','Tailwind CSS','TypeScript','Next.js','HTML / CSS'],
  data:     ['PostgreSQL','MySQL','Redis','MongoDB'],
  devops:   ['Docker','Git / GitHub','Linux','CI/CD','Nginx'],
};
const IMGS = {
  'Python':      '/python.jpg',
  'Django':      '/django.webp',
  'FastAPI':     '/fast api.webp',
  'Flask':       '/flask.svg',
  'GraphQL':     '/GraphQL_Logo.svg.png',
  'React':       '/React-icon.svg.png',
  'JavaScript':  '/javascript-logo.svg',
  'Tailwind CSS':'/Tailwind_CSS_Logo.svg.png',
  'TypeScript':  '/Typescript_logo_2020.svg.png',
  'Next.js':     '/next-js.svg',
  'HTML / CSS':  '/HTML5_logo_and_wordmark.svg.png',
  'PostgreSQL':  '/Postgresql_elephant.svg.png',
  'MySQL':       '/mysql-logo.svg',
  'Redis':       '/redis-logo.svg',
  'MongoDB':     '/mongodb-icon-1.svg',
  'Docker':      '/docker.png',
  'Git / GitHub':'/github.svg',
  'Linux':       '/linux.png',
  'CI/CD':       '/ci-cd.svg',
  'Nginx':       '/nginx-ifln2zy9rfx05a4ec36x.webp',
};
const ICONS = { 'REST API':'API' };

function SkillCard({ name, colors, isDark }) {
  return (
    <motion.div initial={{opacity:0,scale:0.88}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.88}}
      transition={{duration:0.3}}
      style={{ padding:'24px 16px',borderRadius:18,background: colors.cardBg,
        border:`1px solid ${colors.cardBorder}`,display:'flex',flexDirection:'column',
        alignItems:'center',gap:14,cursor:'default',transition:'all 0.3s ease',position:'relative',overflow:'hidden' }}
      onMouseEnter={e => { e.currentTarget.style.background='rgba(9,146,194,0.08)'; e.currentTarget.style.borderColor='rgba(10,196,224,0.25)'; e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 20px 48px rgba(0,0,0,0.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.background=colors.cardBg; e.currentTarget.style.borderColor=colors.cardBorder; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
      <div style={{ width:58,height:58,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',
        background:'rgba(10,196,224,0.07)',border:'1px solid rgba(10,196,224,0.14)',overflow:'hidden',flexShrink:0 }}>
        {IMGS[name]
          ? <img src={IMGS[name]} alt={name} style={{ width:'68%',height:'68%',objectFit:'contain' }}/>
          : <span style={{ fontSize: ICONS[name]?.length > 2 ? 11 : 14, fontWeight:800, fontFamily:'Outfit,sans-serif', color:'#0AC4E0', letterSpacing:'-0.03em' }}>{ICONS[name]}</span>
        }
      </div>
      <p style={{ fontFamily:'Outfit,sans-serif',fontWeight:600,fontSize:'15px',color: colors.textSecondary,textAlign:'center',lineHeight:1.3 }}>{name}</p>
    </motion.div>
  );
}

export default function Skills() {
  const { t, colors, theme } = useApp();
  const isDark = theme === 'dark';
  const catKeys = ['backend','frontend','data','devops'];
  const catLabels = t('skills.cats');
  const [active, setActive] = useState('backend');

  return (
    <section id="competences" style={{ background: colors.bgTertiary, borderTop:`1px solid ${colors.secBorder}` }}>
      <div className="section">
        <div className="text-center mb-14">
          <motion.p className="label justify-center" initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>{t('skills.label')}</motion.p>
          <motion.h2 className="section-title" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.05}} style={{ color: colors.textPrimary }}>
            <span className="text-grad">{t('skills.title')}</span>
          </motion.h2>
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.1}}
            style={{ fontFamily:'DM Sans,sans-serif',fontSize:'16px',color: colors.textMuted,maxWidth:420,margin:'0 auto' }}>
            {t('skills.subtitle')}
          </motion.p>
        </div>

        <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.12}}
          style={{ display:'flex',justifyContent:'center',gap:10,flexWrap:'wrap',marginBottom:44 }}>
          {catKeys.map((key, i) => (
            <button key={key} onClick={() => setActive(key)}
              style={{ padding:'10px 24px',borderRadius:99,fontSize:'15px',fontWeight:600,fontFamily:'Outfit,sans-serif',cursor:'pointer',transition:'all 0.25s',
                background: active===key ? 'linear-gradient(135deg,#0B2D72,#0992C2)' : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'),
                color: active===key ? '#fff' : colors.textMuted,
                border:`1px solid ${active===key ? 'transparent' : colors.cardBorder}`,
                boxShadow: active===key ? '0 6px 24px rgba(9,146,194,0.35)' : 'none' }}>
              {catLabels[i]}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-14}} transition={{duration:0.28}}
            style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:14 }}>
            {SKILL_DATA[active].map(name => <SkillCard key={name} name={name} colors={colors} isDark={isDark}/>)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
