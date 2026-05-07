import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { useApp } from '../context/AppContext';

const LANG_OPTIONS = [
  { code:'fr', label:'Français', flag:'🇫🇷' },
  { code:'en', label:'English',  flag:'🇬🇧' },
  { code:'es', label:'Español',  flag:'🇪🇸' },
  { code:'ja', label:'日本語',    flag:'🇯🇵' },
];

export default function Navbar() {
  const { theme, toggleTheme, lang, setLang, t, colors } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('accueil');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  const links = [
    { name: t('nav.home'),     href:'#accueil',    id:'accueil'    },
    { name: t('nav.about'),    href:'#apropos',    id:'apropos'    },
    { name: t('nav.skills'),   href:'#competences',id:'competences'},
    { name: t('nav.projects'), href:'#projets',    id:'projets'    },
    { name: t('nav.services'), href:'#services',   id:'services'   },
    { name: t('nav.contact'),  href:'#contact',    id:'contact'    },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const observers = [];
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [lang]);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isDark = theme === 'dark';
  const navBg  = scrolled
    ? isDark ? 'rgba(6,15,30,0.88)' : 'rgba(248,250,252,0.92)'
    : 'transparent';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-400"
      style={{
        padding: scrolled ? '10px 0' : '18px 0',
        background: navBg,
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${isDark ? 'rgba(10,196,224,0.1)' : 'rgba(0,0,0,0.08)'}` : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <motion.a href="#accueil"
          initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
          className="flex items-center gap-3"
        >
          <img src={logo} alt="FE" className="w-9 h-9 rounded-full object-contain" />
          <span style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:'16px', color: colors.textPrimary }}>
            Fadegnon <span style={{ color:'#0AC4E0' }}>Elvire</span>
          </span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l, i) => {
            const isActive = active === l.id;
            return (
              <motion.a key={l.id} href={l.href}
                initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  padding:'8px 16px', borderRadius:99,
                  fontSize:'15px', fontWeight: isActive ? 600 : 400,
                  fontFamily:'DM Sans,sans-serif',
                  color: isActive ? '#0AC4E0' : colors.textSecondary,
                  background: isActive ? (isDark ? 'rgba(10,196,224,0.08)' : 'rgba(9,146,194,0.08)') : 'transparent',
                  transition:'all 0.2s', textDecoration:'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.color='#0AC4E0'; e.currentTarget.style.background = isDark ? 'rgba(10,196,224,0.08)' : 'rgba(9,146,194,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = isActive ? '#0AC4E0' : colors.textSecondary; e.currentTarget.style.background = isActive ? (isDark ? 'rgba(10,196,224,0.08)' : 'rgba(9,146,194,0.08)') : 'transparent'; }}
              >
                {l.name}
              </motion.a>
            );
          })}

          {/* ── Controls ── */}
          <div className="flex items-center gap-2 ml-4">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Mode clair' : 'Mode sombre'}
              style={{
                width:36, height:36, borderRadius:'50%',
                display:'flex', alignItems:'center', justifyContent:'center',
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
                color: isDark ? '#f1f5f9' : '#0F172A',
                cursor:'pointer', transition:'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#0AC4E0'; e.currentTarget.style.color='#0AC4E0'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = isDark ? '#f1f5f9' : '#0F172A'; }}
            >
              {isDark ? <Sun size={16}/> : <Moon size={16}/>}
            </button>

            {/* Language dropdown */}
            <div ref={langRef} style={{ position:'relative' }}>
              <button
                onClick={() => setLangOpen(v => !v)}
                style={{
                  display:'flex', alignItems:'center', gap:6,
                  padding:'6px 12px', borderRadius:99,
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
                  color: colors.textSecondary,
                  fontSize:'14px', fontFamily:'DM Sans,sans-serif', fontWeight:600,
                  cursor:'pointer', transition:'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#0AC4E0'; e.currentTarget.style.color='#0AC4E0'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = colors.textSecondary; }}
              >
                <Globe size={13}/>
                {LANG_OPTIONS.find(o => o.code === lang)?.flag}
                {lang.toUpperCase()}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity:0, y:-8, scale:0.96 }}
                    animate={{ opacity:1, y:0, scale:1 }}
                    exit={{ opacity:0, y:-8, scale:0.96 }}
                    transition={{ duration:0.18 }}
                    style={{
                      position:'absolute', top:'calc(100% + 8px)', right:0,
                      background: isDark ? 'rgba(11,25,41,0.97)' : '#ffffff',
                      border: `1px solid ${isDark ? 'rgba(10,196,224,0.15)' : 'rgba(0,0,0,0.1)'}`,
                      borderRadius:14, overflow:'hidden',
                      boxShadow:'0 16px 40px rgba(0,0,0,0.3)',
                      minWidth:140, zIndex:100,
                    }}
                  >
                    {LANG_OPTIONS.map(opt => (
                      <button key={opt.code}
                        onClick={() => { setLang(opt.code); setLangOpen(false); }}
                        style={{
                          display:'flex', alignItems:'center', gap:10,
                          width:'100%', padding:'10px 16px', border:'none',
                          background: lang === opt.code ? 'rgba(10,196,224,0.1)' : 'transparent',
                          color: lang === opt.code ? '#0AC4E0' : colors.textSecondary,
                          fontSize:'14.5px', fontFamily:'DM Sans,sans-serif', fontWeight: lang === opt.code ? 600 : 400,
                          cursor:'pointer', transition:'all 0.15s', textAlign:'left',
                        }}
                        onMouseEnter={e => { if(lang !== opt.code) { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'; }}}
                        onMouseLeave={e => { if(lang !== opt.code) { e.currentTarget.style.background='transparent'; }}}
                      >
                        <span style={{ fontSize:16 }}>{opt.flag}</span>
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <motion.a href="#contact"
              initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay:0.5 }}
              className="btn-primary !py-2.5 !px-5"
            >
              {t('nav.cta')}
            </motion.a>
          </div>
        </nav>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button onClick={toggleTheme}
            style={{ width:34, height:34, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', border:'none', color: colors.textPrimary, cursor:'pointer' }}>
            {isDark ? <Sun size={15}/> : <Moon size={15}/>}
          </button>
          <button className="text-slate-300" onClick={() => setOpen(!open)} style={{ color: colors.textPrimary }}>
            {open ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </div>

      {/* Mobile drawer — glisse de droite à gauche */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay sombre */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 9998,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(3px)',
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(300px, 85vw)',
                zIndex: 9999,
                display: 'flex', flexDirection: 'column',
                background: isDark ? 'rgba(6,15,30,0.98)' : 'rgba(248,250,252,0.98)',
                backdropFilter: 'blur(24px)',
                borderLeft: `1px solid ${isDark ? 'rgba(10,196,224,0.15)' : 'rgba(0,0,0,0.08)'}`,
                boxShadow: '-20px 0 60px rgba(0,0,0,0.4)',
                padding: '0 0 32px',
                overflowY: 'auto',
              }}
            >
              {/* Header drawer */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px 24px',
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
                marginBottom: 8,
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <img src={logo} alt="FE" style={{ width:32, height:32, borderRadius:'50%', objectFit:'contain' }}/>
                  <span style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:'15px', color: colors.textPrimary }}>
                    Fadegnon <span style={{ color:'#0AC4E0' }}>Elvire</span>
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width:34, height:34, borderRadius:'50%', border:'none', cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
                    color: colors.textPrimary, transition:'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(10,196,224,0.15)'; e.currentTarget.style.color='#0AC4E0'; }}
                  onMouseLeave={e => { e.currentTarget.style.background= isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'; e.currentTarget.style.color=colors.textPrimary; }}
                >
                  <X size={18}/>
                </button>
              </div>

              {/* Liens nav avec stagger */}
              <nav style={{ padding: '8px 16px', display:'flex', flexDirection:'column', gap:4, flex:1 }}>
                {links.map((l, i) => (
                  <motion.a
                    key={l.id}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.07, type:'spring', stiffness:280, damping:24 }}
                    style={{
                      fontFamily: 'DM Sans,sans-serif', fontSize: '16px',
                      fontWeight: active === l.id ? 600 : 400,
                      color: active === l.id ? '#0AC4E0' : colors.textSecondary,
                      padding: '13px 16px', borderRadius: 14,
                      textDecoration: 'none', display:'flex', alignItems:'center',
                      background: active === l.id
                        ? (isDark ? 'rgba(10,196,224,0.08)' : 'rgba(9,146,194,0.07)')
                        : 'transparent',
                      transition: 'background 0.2s, color 0.2s',
                      borderLeft: active === l.id ? '3px solid #0AC4E0' : '3px solid transparent',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(10,196,224,0.08)' : 'rgba(9,146,194,0.07)'; e.currentTarget.style.color='#0AC4E0'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = active===l.id ? (isDark ? 'rgba(10,196,224,0.08)' : 'rgba(9,146,194,0.07)') : 'transparent'; e.currentTarget.style.color = active===l.id ? '#0AC4E0' : colors.textSecondary; }}
                  >
                    {l.name}
                  </motion.a>
                ))}
              </nav>

              {/* Séparateur */}
              <div style={{ height:1, margin:'8px 24px 16px', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)' }}/>

              {/* Language switcher */}
              <div style={{ padding:'0 24px', marginBottom:20 }}>
                <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'12px', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color: colors.textMuted, marginBottom:10 }}>Langue</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {LANG_OPTIONS.map(opt => (
                    <button key={opt.code} onClick={() => setLang(opt.code)}
                      style={{
                        padding:'8px 14px', borderRadius:99, fontSize:'14px',
                        fontFamily:'DM Sans,sans-serif', fontWeight:600,
                        background: lang === opt.code ? 'rgba(10,196,224,0.15)' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                        color: lang === opt.code ? '#0AC4E0' : colors.textMuted,
                        border:`1px solid ${lang === opt.code ? 'rgba(10,196,224,0.35)' : 'transparent'}`,
                        cursor:'pointer', transition:'all 0.2s',
                      }}>
                      {opt.flag} {opt.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ padding:'0 24px' }}>
                <a href="#contact" onClick={() => setOpen(false)}
                  className="btn-primary justify-center"
                  style={{ display:'flex', width:'100%', textAlign:'center' }}>
                  {t('nav.cta')}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
