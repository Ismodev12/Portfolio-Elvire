import React, { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme]    = useState('dark');   // 'dark' | 'light'
  const [lang,  setLang]     = useState('fr');      // 'fr' | 'en' | 'es' | 'ja'

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const t = (path) => {
    const keys = path.split('.');
    let val = translations[lang];
    for (const k of keys) { val = val?.[k]; }
    return val ?? path;
  };

  /* Colour tokens — used as inline style values in components */
  const colors = theme === 'dark' ? {
    bgPrimary:   '#060F1E',
    bgSecondary: '#071624',
    bgTertiary:  '#0B1929',
    textPrimary: '#f1f5f9',
    textSecondary:'#94a3b8',
    textMuted:   '#475569',
    cardBg:      'rgba(255,255,255,0.03)',
    cardBorder:  'rgba(255,255,255,0.07)',
    secBorder:   'rgba(255,255,255,0.05)',
  } : {
    bgPrimary:   '#F8FAFC',
    bgSecondary: '#F0F4F8',
    bgTertiary:  '#E8EEF4',
    textPrimary: '#0F172A',
    textSecondary:'#334155',
    textMuted:   '#64748b',
    cardBg:      'rgba(255,255,255,0.85)',
    cardBorder:  'rgba(0,0,0,0.09)',
    secBorder:   'rgba(0,0,0,0.07)',
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, setLang, t, colors }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
