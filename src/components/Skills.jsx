import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

/* ── Tech logo imports ── */
import imgPython     from '../assets/tech-logos/python.jpg';
import imgDjango     from '../assets/tech-logos/django.webp';
import imgFastapi    from '../assets/tech-logos/fastapi.webp';
import imgFlask      from '../assets/tech-logos/flask.svg';
import imgGraphql    from '../assets/tech-logos/graphql.png';
import imgReact      from '../assets/tech-logos/react.png';
import imgJs         from '../assets/tech-logos/javascript.svg';
import imgTailwind   from '../assets/tech-logos/tailwind.png';
import imgTs         from '../assets/tech-logos/typescript.png';
import imgNextjs     from '../assets/tech-logos/nextjs.svg';
import imgHtml       from '../assets/tech-logos/html5.png';
import imgPostgres   from '../assets/tech-logos/postgresql.png';
import imgMysql      from '../assets/tech-logos/mysql.svg';
import imgRedis      from '../assets/tech-logos/redis.svg';
import imgMongodb    from '../assets/tech-logos/mongodb.svg';
import imgDocker     from '../assets/tech-logos/docker.png';
import imgGithub     from '../assets/tech-logos/github.svg';
import imgLinux      from '../assets/tech-logos/linux.png';
import imgCicd       from '../assets/tech-logos/ci-cd.svg';
import imgNginx      from '../assets/tech-logos/nginx.webp';

const SKILL_DATA = {
  backend:  ['Python','Django','FastAPI','REST API','Flask','GraphQL'],
  frontend: ['React','JavaScript','Tailwind CSS','TypeScript','Next.js','HTML / CSS'],
  data:     ['PostgreSQL','MySQL','Redis','MongoDB'],
  devops:   ['Docker','Git / GitHub','Linux','CI/CD','Nginx'],
};
const IMGS = {
  'Python':       imgPython,
  'Django':       imgDjango,
  'FastAPI':      imgFastapi,
  'Flask':        imgFlask,
  'GraphQL':      imgGraphql,
  'React':        imgReact,
  'JavaScript':   imgJs,
  'Tailwind CSS': imgTailwind,
  'TypeScript':   imgTs,
  'Next.js':      imgNextjs,
  'HTML / CSS':   imgHtml,
  'PostgreSQL':   imgPostgres,
  'MySQL':        imgMysql,
  'Redis':        imgRedis,
  'MongoDB':      imgMongodb,
  'Docker':       imgDocker,
  'Git / GitHub': imgGithub,
  'Linux':        imgLinux,
  'CI/CD':        imgCicd,
  'Nginx':        imgNginx,
};
const ICONS = { 'REST API':'API' };

function SkillCard({ name, colors, isDark }) {
  return (
    <motion.div initial={{opacity:0,scale:0.88}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.88}}
      transition={{duration:0.3}}
      style={{ width:'140px', flexShrink:0, padding:'24px 16px',borderRadius:18,background: colors.cardBg,
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
            style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:14 }}>
            {SKILL_DATA[active].map(name => <SkillCard key={name} name={name} colors={colors} isDark={isDark}/>)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
