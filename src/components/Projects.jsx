import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const PROJECT_IMGS = [
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
];
const PROJECT_TECH = [['Django','React','PostgreSQL'],['React','FastAPI','Chart.js'],['Python','Flask','Redis'],['Next.js','Django','Stripe'],['Python','Selenium','React']];

function ProjectCard({ p, img, tech, live, source, colors, isDark }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article layout initial={{opacity:0,scale:0.94}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.94}}
      transition={{duration:0.3}} style={{ borderRadius:20,background: colors.cardBg, border:`1px solid ${colors.cardBorder}`,overflow:'hidden',display:'flex',flexDirection:'column',transition:'all 0.3s' }}>
      <div style={{ position:'relative',height:210,overflow:'hidden',cursor:'pointer' }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <img src={img} alt={p.title}
          style={{ width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.6s ease, filter 0.4s ease',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',filter: hovered ? 'brightness(0.3)' : 'brightness(0.8)' }}/>
        <span style={{ position:'absolute',top:14,left:14,padding:'4px 12px',borderRadius:99,fontSize:'13px',fontWeight:700,
          background:'linear-gradient(90deg,#0B2D72,#0992C2)',color:'#fff',fontFamily:'Outfit,sans-serif',letterSpacing:'0.05em',
          transition:'opacity 0.3s',opacity: hovered ? 0 : 1,pointerEvents:'none' }}>{p.cat}</span>
        <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,
          opacity: hovered ? 1 : 0,transition:'opacity 0.35s ease',pointerEvents: hovered ? 'auto' : 'none' }}>
          <motion.a href="#" target="_blank" rel="noopener noreferrer"
            animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }} transition={{ duration:0.3,delay:0.05 }}
            style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'10px 24px',borderRadius:99,
              background:'linear-gradient(135deg,#0992C2,#0AC4E0)',color:'#fff',fontFamily:'Outfit,sans-serif',
              fontWeight:700,fontSize:13,boxShadow:'0 8px 24px rgba(10,196,224,0.4)',textDecoration:'none' }}>
            <ExternalLink size={15}/> {live}
          </motion.a>
          <motion.a href="#" target="_blank" rel="noopener noreferrer"
            animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }} transition={{ duration:0.3,delay:0.12 }}
            style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'10px 24px',borderRadius:99,
              background:'rgba(255,255,255,0.1)',backdropFilter:'blur(8px)',color:'#f1f5f9',fontFamily:'Outfit,sans-serif',
              fontWeight:600,fontSize:13,border:'1px solid rgba(255,255,255,0.2)',textDecoration:'none' }}>
            <FaGithub size={15}/> {source}
          </motion.a>
        </div>
      </div>
      <div style={{ padding:'22px 22px 20px',flex:1,display:'flex',flexDirection:'column' }}>
        <h3 style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:'16px',color: colors.textPrimary,marginBottom:8 }}>{p.title}</h3>
        <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:'15px',lineHeight:1.7,color: colors.textMuted,flex:1,marginBottom:16 }}>{p.desc}</p>
        <div style={{ display:'flex',flexWrap:'wrap',gap:6 }}>
          {tech.map(t => (
            <span key={t} style={{ padding:'3px 10px',borderRadius:99,fontSize:'13px',fontWeight:600,fontFamily:'DM Sans,sans-serif',
              color:'#0992C2',background:'rgba(9,146,194,0.1)',border:'1px solid rgba(9,146,194,0.2)' }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { t, colors, theme } = useApp();
  const isDark = theme === 'dark';
  const items   = t('projects.items');
  const filters = t('projects.filters');
  const [filter, setFilter] = useState(filters[0]);

  const allKey  = filters[0];
  const catMap  = items.map((p, i) => ({ ...p, img: PROJECT_IMGS[i], tech: PROJECT_TECH[i] }));
  const list    = filter === allKey ? catMap : catMap.filter(p => p.cat === filter);

  return (
    <section id="projets" style={{ background: colors.bgSecondary, borderTop:`1px solid ${colors.secBorder}` }}>
      <div className="section">
        <div className="text-center mb-14">
          <motion.p className="label justify-center" initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>{t('projects.label')}</motion.p>
          <motion.h2 className="section-title" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.05}} style={{ color: colors.textPrimary }}>
            {t('projects.title').split(' ').map((word, i) => i === 1
              ? <span key={i} className="text-grad"> {word}</span>
              : <span key={i}>{i > 0 ? ' ' : ''}{word}</span>)}
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding:'8px 20px',borderRadius:99,fontSize:'15px',fontWeight:600,fontFamily:'Outfit,sans-serif',cursor:'pointer',transition:'all 0.2s',
                background: filter===f ? 'linear-gradient(90deg,#0992C2,#0AC4E0)' : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'),
                color: filter===f ? '#fff' : colors.textMuted,
                border:`1px solid ${filter===f ? 'transparent' : colors.cardBorder}`,
                boxShadow: filter===f ? '0 4px 20px rgba(9,146,194,0.35)' : 'none' }}>
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {list.map((p, i) => <ProjectCard key={p.title} p={p} img={p.img} tech={p.tech} live={t('projects.live')} source={t('projects.source')} colors={colors} isDark={isDark}/>)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
