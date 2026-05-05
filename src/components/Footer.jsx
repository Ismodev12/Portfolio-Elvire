import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import { useApp } from '../context/AppContext';

const socials = [
  { icon: <FaGithub size={16}/>,   href:'#', label:'GitHub'   },
  { icon: <FaLinkedin size={16}/>, href:'#', label:'LinkedIn'  },
  { icon: <FaTwitter size={16}/>,  href:'#', label:'Twitter'   },
];

export default function Footer() {
  const { t, colors, theme } = useApp();
  const isDark = theme === 'dark';

  const navLinks = [
    { name: t('nav.home'),     href:'#accueil'     },
    { name: t('nav.about'),    href:'#apropos'     },
    { name: t('nav.skills'),   href:'#competences' },
    { name: t('nav.projects'), href:'#projets'     },
    { name: t('nav.services'), href:'#services'    },
    { name: t('nav.contact'),  href:'#contact'     },
  ];

  const linkColor    = isDark ? '#475569' : '#64748b';
  const borderColor  = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)';
  const socialBg     = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const socialBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)';

  return (
    <footer style={{ background: isDark ? '#060F1E' : '#F0F4F8', borderTop:`1px solid ${borderColor}` }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:24,paddingBottom:32,borderBottom:`1px solid ${borderColor}`,marginBottom:28 }}>

          {/* Logo */}
          <a href="#accueil" style={{ display:'flex',alignItems:'center',gap:12,textDecoration:'none' }}>
            <img src={logo} alt="FE" style={{ width:36,height:36,borderRadius:'50%',objectFit:'contain' }}/>
            <div>
              <p style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:'15px',color: colors.textPrimary,lineHeight:1.2 }}>
                Fadegnon <span style={{ color:'#0AC4E0' }}>Elvire</span>
              </p>
              <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:'13.5px',color: colors.textMuted,marginTop:2 }}>
                {t('footer.tagline')}
              </p>
            </div>
          </a>

          {/* Nav */}
          <nav style={{ display:'flex',gap:4,flexWrap:'wrap' }}>
            {navLinks.map(l => (
              <a key={l.name} href={l.href}
                style={{ fontFamily:'DM Sans,sans-serif',fontSize:'15px',color: linkColor,padding:'6px 12px',borderRadius:8,textDecoration:'none',transition:'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color='#0AC4E0'}
                onMouseLeave={e => e.currentTarget.style.color=linkColor}>
                {l.name}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div style={{ display:'flex',gap:10 }}>
            {socials.map((s,i) => (
              <a key={i} href={s.href} aria-label={s.label}
                style={{ width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',
                  color: linkColor,background: socialBg,border:`1px solid ${socialBorder}`,transition:'all 0.2s',textDecoration:'none' }}
                onMouseEnter={e => { e.currentTarget.style.color='#0AC4E0'; e.currentTarget.style.borderColor='rgba(10,196,224,0.35)'; e.currentTarget.style.background='rgba(10,196,224,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.color=linkColor; e.currentTarget.style.borderColor=socialBorder; e.currentTarget.style.background=socialBg; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12 }}>
          <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:'14px',color: colors.textMuted }}>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
