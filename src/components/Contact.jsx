import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useApp } from '../context/AppContext';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* ── Champ de formulaire ─────────────────────────── */
function Field({ label, name, type = 'text', value, onChange, placeholder, rows, colors, isDark }) {
  const [focused, setFocused] = useState(false);
  const base = {
    width: '100%',
    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
    border: `1.5px solid ${focused ? '#0AC4E0' : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)')}`,
    borderRadius: 12,
    padding: '14px 16px',
    color: colors.textPrimary,
    fontFamily: 'DM Sans,sans-serif',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.2s',
    boxShadow: focused ? '0 0 0 3px rgba(10,196,224,0.08)' : 'none',
    resize: 'none',
  };
  return (
    <div>
      <label style={{
        display: 'block', marginBottom: 8, fontSize: '13.5px', fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: focused ? '#0AC4E0' : colors.textMuted,
        fontFamily: 'DM Sans,sans-serif', transition: 'color 0.2s',
      }}>
        {label}
      </label>
      {rows
        ? <textarea name={name} value={value} onChange={onChange} rows={rows}
            placeholder={placeholder} required style={base}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}/>
        : <input type={type} name={name} value={value} onChange={onChange}
            placeholder={placeholder} required style={base}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}/>
      }
    </div>
  );
}

/* ── Section Contact ─────────────────────────────── */
export default function Contact() {
  const { t, colors, theme } = useApp();
  const isDark = theme === 'dark';
  const formRef = useRef(null);

  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const set = e => setForm({ ...form, [e.target.name]: e.target.value });

  const send = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        { publicKey: PUBLIC_KEY }
      );
      setStatus('success');
      setForm({ nom: '', email: '', sujet: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 6000);
  };

  const socials = [
    { icon: <FaGithub size={18}/>,   label: 'GitHub',   href: '#' },
    { icon: <FaLinkedin size={18}/>, label: 'LinkedIn',  href: '#' },
    { icon: <FaTwitter size={18}/>,  label: 'Twitter',   href: '#' },
  ];

  return (
    <section id="contact" style={{ background: colors.bgTertiary, borderTop: `1px solid ${colors.secBorder}` }}>
      <div className="section">
        <div className="text-center mb-14">
          <motion.p className="label justify-center"
            initial={{ opacity:0,y:12 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>
            {t('contact.label')}
          </motion.p>
          <motion.h2 className="section-title"
            initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:0.05 }}
            style={{ color: colors.textPrimary }}>
            {t('contact.title').split(' ').map((w,i,arr) =>
              i === arr.length - 1
                ? <span key={i} className="text-grad"> {w}</span>
                : <span key={i}>{i > 0 ? ' ' : ''}{w}</span>
            )}
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* ── Panneau gauche ──────────────────────── */}
          <motion.div initial={{ opacity:0,x:-24 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
            className="lg:col-span-2"
            style={{
              borderRadius: 24,
              background: 'linear-gradient(145deg,#0B2D72 0%,#0992C2 60%,#0AC4E0 100%)',
              padding: '44px 36px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden', minHeight: 480,
            }}>
            <div style={{ position:'absolute',bottom:'-30%',right:'-20%',width:300,height:300,borderRadius:'50%',background:'rgba(255,255,255,0.06)',pointerEvents:'none' }}/>
            <div style={{ position:'absolute',top:'-20%',left:'-15%',width:200,height:200,borderRadius:'50%',background:'rgba(255,255,255,0.05)',pointerEvents:'none' }}/>

            <div style={{ position:'relative', zIndex:1 }}>
              <h3 style={{ fontFamily:'Outfit,sans-serif',fontWeight:900,fontSize:26,color:'#fff',lineHeight:1.25,marginBottom:16 }}>
                {t('contact.panelTitle')}
              </h3>
              <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:16,lineHeight:1.8,color:'rgba(255,255,255,0.7)',marginBottom:40 }}>
                {t('contact.panelDesc')}
              </p>

              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                {[
                  { icon:<Mail size={18}/>,        label: t('contact.emailLabel'),    value:'salifoukayodeism@gmail.com', href:'mailto:salifoukayodeism@gmail.com' },
                  { icon:<MapPin size={18}/>,       label: t('contact.locationLabel'), value: t('contact.locationVal') },
                  { icon:<CheckCircle size={18}/>,  label: t('contact.statusLabel'),   value: t('contact.statusVal'), ping:true },
                ].map((item, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                    <div style={{ width:40,height:40,borderRadius:12,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.15)',color:'#fff',position:'relative' }}>
                      {item.ping && <span style={{ position:'absolute',top:4,right:4,width:8,height:8,borderRadius:'50%',background:'#4ade80',boxShadow:'0 0 8px #4ade80' }}/>}
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:12.5,color:'rgba(255,255,255,0.5)',marginBottom:3,textTransform:'uppercase',letterSpacing:'0.1em' }}>
                        {item.label}
                      </p>
                      {item.href
                        ? <a href={item.href} style={{ fontFamily:'DM Sans,sans-serif',fontSize:15,color:'#fff',fontWeight:600,wordBreak:'break-all' }}>{item.value}</a>
                        : <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:15,color:'#fff',fontWeight:600 }}>{item.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position:'relative',zIndex:1,display:'flex',gap:12,marginTop:40 }}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} aria-label={s.label}
                  style={{ width:40,height:40,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.15)',color:'#fff',transition:'all 0.2s',border:'1px solid rgba(255,255,255,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.28)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.15)'; e.currentTarget.style.transform='none'; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Formulaire ───────────────────────────── */}
          <motion.div initial={{ opacity:0,x:24 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
            className="lg:col-span-3"
            style={{ borderRadius:24, background: colors.cardBg, border:`1px solid ${colors.cardBorder}`, padding:'44px 40px' }}>

            <form ref={formRef} onSubmit={send} style={{ display:'flex', flexDirection:'column', gap:22 }}>
              {/* Champ caché pour l'adresse de destination */}
              <input type="hidden" name="to_email" value="salifoukayodeism@gmail.com"/>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label={t('contact.fieldName')}    name="nom"     value={form.nom}     onChange={set} placeholder={t('contact.placeholderName')}    colors={colors} isDark={isDark}/>
                <Field label={t('contact.fieldEmail')}   name="email"   type="email" value={form.email}   onChange={set} placeholder={t('contact.placeholderEmail')}   colors={colors} isDark={isDark}/>
              </div>
              <Field label={t('contact.fieldSubject')}  name="sujet"   value={form.sujet}   onChange={set} placeholder={t('contact.placeholderSubject')}  colors={colors} isDark={isDark}/>
              <Field label={t('contact.fieldMessage')}  name="message" value={form.message} onChange={set} placeholder={t('contact.placeholderMessage')}  rows={6} colors={colors} isDark={isDark}/>

              {/* Feedback */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div initial={{ opacity:0,y:-8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                    style={{ display:'flex',alignItems:'center',gap:10,padding:'13px 16px',borderRadius:12,fontSize:'15px',
                      background:'rgba(34,197,94,0.07)',border:'1px solid rgba(34,197,94,0.2)',color:'#4ade80',fontFamily:'DM Sans,sans-serif' }}>
                    <CheckCircle size={17}/> {t('contact.success')}
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity:0,y:-8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                    style={{ display:'flex',alignItems:'center',gap:10,padding:'13px 16px',borderRadius:12,fontSize:'15px',
                      background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.2)',color:'#f87171',fontFamily:'DM Sans,sans-serif' }}>
                    <AlertCircle size={17}/> {t('contact.error')}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bouton envoi */}
              <button type="submit" disabled={status === 'loading'}
                style={{
                  display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                  padding:'15px 28px', borderRadius:12, border:'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:'15px', color:'#fff',
                  background:'linear-gradient(135deg,#0B2D72,#0992C2,#0AC4E0)',
                  boxShadow:'0 8px 30px rgba(9,146,194,0.35)',
                  transition:'all 0.3s', opacity: status === 'loading' ? 0.75 : 1,
                }}
                onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.boxShadow='0 12px 40px rgba(10,196,224,0.45)'; e.currentTarget.style.transform='translateY(-2px)'; } }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='0 8px 30px rgba(9,146,194,0.35)'; e.currentTarget.style.transform='none'; }}
              >
                {status === 'loading'
                  ? <><Loader2 size={18} style={{ animation:'spin 0.8s linear infinite' }}/> {t('contact.sending') || 'Envoi en cours...'}</>
                  : <><Send size={17}/> {t('contact.submit')}</>
                }
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
