import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Code2, Database, Terminal, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ICONS   = [Globe, Server, Code2, Layers, Database, Terminal];
const TAGS    = [
  ['Next.js','React','TypeScript'],
  ['Django','FastAPI','REST'],
  ['OpenAPI','JWT','GraphQL'],
  ['React','Tailwind','Framer'],
  ['PostgreSQL','MySQL','Redis'],
  ['Python','Celery','Cron'],
];
const ACCENT = { from:'#0992C2', to:'#0AC4E0' };

function ServiceCard({ item, accent, tags, index, Icon, colors, isDark }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity:0, y:32 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ delay: index * 0.09, duration:0.6, ease:[0.22,1,0.36,1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:'relative', overflow:'hidden', borderRadius:24,
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.88)',
        border:`1px solid ${hovered ? accent.from + '55' : colors.cardBorder}`,
        backdropFilter:'blur(12px)',
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px ${accent.from}22` : '0 2px 10px rgba(0,0,0,0.05)',
        transition:'all 0.38s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        padding:'32px 28px',
        minHeight:270,
      }}
    >
      {/* Glow ambiant */}
      <div style={{ position:'absolute',inset:0,borderRadius:'inherit',pointerEvents:'none',
        background:`radial-gradient(ellipse at 10% 10%, ${accent.from}16 0%, transparent 60%)`,
        opacity: hovered ? 1 : 0.5, transition:'opacity 0.4s' }}/>

      {/* Barre colorée en haut au hover */}
      <div style={{ position:'absolute',top:0,left:0,right:0,height:3,
        background:`linear-gradient(90deg, ${accent.from}, ${accent.to})`,
        borderRadius:'24px 24px 0 0',
        opacity: hovered ? 1 : 0, transition:'opacity 0.4s' }}/>

      {/* Contenu */}
      <div style={{ position:'relative',zIndex:1,height:'100%',display:'flex',flexDirection:'column' }}>

        {/* Icône */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:22 }}>
          <div style={{
            width:56, height:56, borderRadius:16, flexShrink:0,
            display:'flex', alignItems:'center', justifyContent:'center',
            background:`linear-gradient(135deg, ${accent.from}28, ${accent.to}14)`,
            border:`1.5px solid ${accent.from}38`,
            boxShadow: hovered ? `0 8px 24px ${accent.from}40` : 'none',
            transition:'all 0.4s',
            transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
            color: accent.to,
          }}>
            <Icon size={24}/>
          </div>
          {/* Orbe déco */}
          <div style={{
            width:70, height:70, borderRadius:'50%', flexShrink:0,
            background:`radial-gradient(circle, ${accent.from}18 0%, transparent 70%)`,
            filter:'blur(14px)', transform:'translate(16px,-16px)',
            opacity: hovered ? 1 : 0.3, transition:'opacity 0.4s',
          }}/>
        </div>

        {/* Titre */}
        <h3 style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:17,
          color: colors.textPrimary, lineHeight:1.3, marginBottom:10, flex:'none' }}>
          {item.title}
        </h3>

        {/* Description */}
        <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:15,lineHeight:1.78,
          color: colors.textMuted, flex:1, marginBottom:20 }}>
          {item.desc}
        </p>

        {/* Séparateur */}
        <div style={{ height:1, marginBottom:14,
          background: isDark
            ? 'linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)'
            : 'linear-gradient(90deg,transparent,rgba(0,0,0,0.07),transparent)' }}/>

        {/* Tags */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {tags.map(tag => (
            <span key={tag} style={{ fontFamily:'DM Sans,sans-serif',fontSize:13,fontWeight:600,
              padding:'3px 10px', borderRadius:99,
              background:`${accent.from}12`, color: accent.to,
              border:`1px solid ${accent.from}28` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { t, colors, theme } = useApp();
  const isDark = theme === 'dark';
  const items  = t('services.items');

  return (
    <section id="services"
      style={{ background: colors.bgTertiary, borderTop:`1px solid ${colors.secBorder}`, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute',top:'5%',right:'-8%',width:440,height:440,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(9,146,194,0.07) 0%,transparent 70%)',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',bottom:'5%',left:'-6%',width:360,height:360,borderRadius:'50%',
        background:'radial-gradient(circle,rgba(9,146,194,0.05) 0%,transparent 70%)',pointerEvents:'none' }}/>

      <div className="section" style={{ position:'relative', zIndex:1 }}>
        <div className="text-center mb-16">
          <motion.p className="label justify-center"
            initial={{ opacity:0,y:12 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>
            {t('services.label')}
          </motion.p>
          <motion.h2 className="section-title"
            initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:0.05 }}
            style={{ color: colors.textPrimary }}>
            {t('services.title').split(' ').map((w,i) =>
              i === 1 ? <span key={i} className="text-grad"> {w}</span> : <span key={i}>{i > 0 ? ' ' : ''}{w}</span>
            )}
          </motion.h2>
          <motion.p initial={{ opacity:0,y:12 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
            style={{ fontFamily:'DM Sans,sans-serif',fontSize:16,color: colors.textMuted,maxWidth:480,margin:'0 auto',lineHeight:1.75 }}>
            {t('services.subtitle')}
          </motion.p>
        </div>

        {/* Grille 3×2 uniforme */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {items.map((item, i) => (
            <ServiceCard key={i} item={item} accent={ACCENT}
              tags={TAGS[i]} index={i} Icon={ICONS[i]}
              colors={colors} isDark={isDark}/>
          ))}
        </div>
      </div>
    </section>
  );
}
