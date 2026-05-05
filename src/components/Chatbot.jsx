import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import botIcon from '../assets/images/chatbot-icon.webp';

/* ─── Portfolio knowledge base — system prompt ──────────────────── */
const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Fadegnon Elvire, développeuse Full Stack Python & React.
Tu réponds uniquement aux questions concernant Elvire, son portfolio, ses compétences, ses services et comment la contacter.
Sois concis, professionnel et chaleureux. Réponds dans la même langue que l'utilisateur (français, anglais, espagnol ou japonais).

Informations clés sur Elvire :
• Nom : Fadegnon Elvire
• Rôle : Développeuse Full Stack Python & React
• Expérience : 3+ ans
• Projets livrés : 20+
• Satisfaction client : 100%
• Disponibilité : Remote worldwide, ouverte aux projets freelance

Compétences :
• Backend : Python, Django, FastAPI, Flask, REST API, GraphQL
• Frontend : React, JavaScript, TypeScript, Next.js, Tailwind CSS, HTML/CSS
• Bases de données : PostgreSQL, MySQL, Redis, MongoDB
• DevOps : Docker, Git/GitHub, Linux, CI/CD, Nginx

Services proposés :
• Développement Web Sur Mesure
• Backend Python (Django / FastAPI)
• Création d'APIs REST
• Frontend React
• Optimisation Base de Données
• Automatisation Python

Projets réalisés :
• Plateforme de gestion scolaire (Web App)
• Dashboard analytique entreprise (Dashboard)
• API de réservation hôtelière (API)
• Boutique e-commerce avec Stripe (E-commerce)
• Outil d'automatisation RH (Automatisation)

Contact : section "Contact" du portfolio, disponible pour discussion.

Si une question est hors périmètre, redirige poliment vers les sujets du portfolio d'Elvire.`;

/* ─── i18n helpers ──────────────────────────────────────────────── */
const SUGGESTIONS = {
  fr: ['Quelles sont tes compétences ?', 'Quels services proposes-tu ?', 'Comment te contacter ?', 'Montre-moi tes projets'],
  en: ['What are your skills?', 'What services do you offer?', 'How to contact you?', 'Show me your projects'],
  es: ['¿Cuáles son tus habilidades?', '¿Qué servicios ofreces?', '¿Cómo contactarte?', 'Muéstrame tus proyectos'],
  ja: ['スキルは何ですか？', 'どんなサービスを提供？', '連絡方法は？', 'プロジェクトを見せて'],
};

const PLACEHOLDER = {
  fr: 'Écrivez votre message…',
  en: 'Write your message…',
  es: 'Escribe tu mensaje…',
  ja: 'メッセージを入力…',
};

const WELCOME = {
  fr: 'Bonjour 👋 Je suis l\'assistante virtuelle d\'Elvire. Posez-moi vos questions sur ses compétences, services ou projets !',
  en: 'Hello 👋 I\'m Elvire\'s virtual assistant. Ask me anything about her skills, services or projects!',
  es: '¡Hola 👋! Soy la asistente virtual de Elvire. ¡Pregúntame sobre sus habilidades, servicios o proyectos!',
  ja: 'こんにちは 👋 Elvireのバーチャルアシスタントです。スキルやサービス、プロジェクトについて何でも聞いてください！',
};

/* ─── Animated typing dots ──────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '6px 2px' }}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          style={{ width: 7, height: 7, borderRadius: '50%', background: '#0AC4E0', display: 'block' }}
          animate={{ y: [0, -7, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 0.75, delay: i * 0.16, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Message bubble ────────────────────────────────────────────── */
function MessageBubble({ msg, colors, isDark }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 12, alignItems: 'flex-end', gap: 8 }}
    >
      {/* Avatar for assistant */}
      {!isUser && (
        <img
          src={botIcon}
          alt="Assistant"
          style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0, objectFit: 'cover',
            background: 'rgba(10,196,224,0.12)', border: '1.5px solid rgba(10,196,224,0.3)',
            padding: 3,
          }}
        />
      )}

      <div style={{
        maxWidth: '76%',
        padding: '10px 15px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
        fontSize: 15,
        lineHeight: 1.65,
        fontFamily: 'DM Sans, sans-serif',
        background: isUser
          ? 'linear-gradient(135deg, #0B2D72, #0992C2)'
          : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(9,146,194,0.07)'),
        color: isUser ? '#fff' : colors.textPrimary,
        border: isUser ? 'none' : `1px solid ${isDark ? 'rgba(10,196,224,0.15)' : 'rgba(9,146,194,0.2)'}`,
        boxShadow: isUser ? '0 4px 18px rgba(9,146,194,0.3)' : 'none',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {msg.content}
      </div>
    </motion.div>
  );
}

/* ─── Main component ────────────────────────────────────────────── */
export default function Chatbot() {
  const { colors, theme, lang } = useApp();
  const isDark = theme === 'dark';

  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [showSugg, setShowSugg]   = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const apiKey         = import.meta.env.VITE_GEMINI_API_KEY;

  /* Inject welcome message on first open */
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: WELCOME[lang] ?? WELCOME.fr }]);
      setShowSugg(true);
    }
  }, [open]);

  /* Update welcome language if chat is fresh */
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: WELCOME[lang] ?? WELCOME.fr }]);
    }
  }, [lang]);

  /* Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  /* Focus input on open */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  /* ── Send message (SDK officiel @google/generative-ai) ─────────── */
  async function sendMessage(text) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    setInput('');
    setShowSugg(false);

    const updated = [...messages, { role: 'user', content: userText }];
    setMessages(updated);
    setLoading(true);

    /* Construire l'historique SDK — exclure les messages assistant en tête
       (message de bienvenue local) et le dernier message user (envoyé séparément) */
    const rawHistory = updated.slice(-12);
    const firstUserIdx = rawHistory.findIndex(m => m.role === 'user');
    const trimmedHistory = firstUserIdx >= 0 ? rawHistory.slice(firstUserIdx) : [];

    /* L'historique SDK = tous les messages SAUF le dernier (qui est userText) */
    const sdkHistory = trimmedHistory.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const geminiModel = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-lite',
        systemInstruction: SYSTEM_PROMPT,
      });

      const chat = geminiModel.startChat({
        history: sdkHistory,
        generationConfig: { maxOutputTokens: 600, temperature: 0.75 },
      });

      const result = await chat.sendMessage(userText);
      const reply  = result.response.text()?.trim() ?? '…';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('[Chatbot Gemini]', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Désolée, une erreur s\'est produite. Vérifiez la clé API ou réessayez dans quelques instants.',
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function resetChat() {
    setMessages([{ role: 'assistant', content: WELCOME[lang] ?? WELCOME.fr }]);
    setShowSugg(true);
    setInput('');
  }

  const suggestions = SUGGESTIONS[lang] ?? SUGGESTIONS.fr;

  /* ── Render ────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Floating button ──────────────────────────────────────── */}
      <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999 }}>
        {/* Glow pulse when closed */}
        {!open && (
          <>
            <motion.div
              style={{ position: 'absolute', inset: -5, borderRadius: '50%', background: 'rgba(10,196,224,0.2)' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: 'rgba(10,196,224,0.08)' }}
              animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.4, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        <motion.button
          id="chatbot-toggle"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(o => !o)}
          aria-label="Ouvrir le chatbot"
          style={{
            width: 62, height: 62, borderRadius: '50%', cursor: 'pointer',
            padding: 0, overflow: 'hidden',
            background: 'linear-gradient(135deg, #0B2D72, #0AC4E0)',
            border: '2.5px solid rgba(10,196,224,0.5)',
            boxShadow: open
              ? '0 8px 32px rgba(9,146,194,0.5)'
              : '0 8px 36px rgba(9,146,194,0.55), 0 0 0 4px rgba(10,196,224,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ fontSize: 22, color: '#fff', display: 'flex', lineHeight: 1 }}
              >✕</motion.span>
            ) : (
              <motion.img
                key="bot"
                src={botIcon}
                alt="Chatbot"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ width: 36, height: 36, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* Tooltip */}
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            style={{
              position: 'absolute', right: 70, top: '50%', transform: 'translateY(-50%)',
              background: isDark ? 'rgba(6,15,30,0.95)' : 'rgba(248,250,252,0.95)',
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: 10, padding: '6px 12px', whiteSpace: 'nowrap',
              fontSize: 13, fontFamily: 'DM Sans,sans-serif', color: colors.textSecondary,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
            }}
          >
            💬 Une question ? Demandez-moi !
          </motion.div>
        )}
      </div>

      {/* ── Chat window ──────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 24, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{
              position: 'fixed',
              bottom: 104,
              right: 28,
              zIndex: 9998,
              width: 'min(390px, calc(100vw - 40px))',
              height: 'min(580px, calc(100vh - 150px))',
              borderRadius: 24,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              background: isDark
                ? 'rgba(5,12,26,0.96)'
                : 'rgba(248,250,252,0.97)',
              backdropFilter: 'blur(24px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
              border: `1px solid ${isDark ? 'rgba(10,196,224,0.2)' : 'rgba(9,146,194,0.2)'}`,
              boxShadow: isDark
                ? '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(10,196,224,0.06), inset 0 1px 0 rgba(255,255,255,0.04)'
                : '0 30px 80px rgba(9,146,194,0.18)',
            }}
          >
            {/* ── Header ─────────────────────────────────────────── */}
            <div style={{
              padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
              background: isDark
                ? 'linear-gradient(135deg, rgba(11,45,114,0.3), rgba(9,146,194,0.15))'
                : 'linear-gradient(135deg, rgba(9,146,194,0.08), rgba(10,196,224,0.05))',
              borderBottom: `1px solid ${colors.cardBorder}`,
              flexShrink: 0,
            }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={botIcon}
                  alt="Assistant"
                  style={{
                    width: 42, height: 42, borderRadius: '50%', objectFit: 'cover',
                    background: 'linear-gradient(135deg,#0B2D72,#0AC4E0)',
                    border: '2px solid rgba(10,196,224,0.4)', padding: 5,
                    filter: isDark ? 'brightness(0) invert(1)' : 'none',
                  }}
                />
                {/* Online indicator */}
                <motion.div
                  style={{
                    position: 'absolute', bottom: 1, right: 1,
                    width: 10, height: 10, borderRadius: '50%', background: '#22d3a5',
                    border: `2px solid ${isDark ? '#050C1A' : '#F8FAFC'}`,
                  }}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: 16, color: colors.textPrimary }}>
                  Assistant d'Elvire
                </div>
                <div style={{ fontSize: 12.5, color: '#22d3a5', fontFamily: 'DM Sans,sans-serif', fontWeight: 500, marginTop: 1 }}>
                  En ligne · Propulsé par Gemini AI
                </div>
              </div>

              {/* Reset button */}
              <button
                onClick={resetChat}
                title="Nouvelle conversation"
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: colors.textMuted, fontSize: 18, lineHeight: 1,
                  padding: '4px 8px', borderRadius: 8, transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0AC4E0'; e.currentTarget.style.background = 'rgba(10,196,224,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.background = 'transparent'; }}
              >↺</button>
            </div>

            {/* ── Messages ───────────────────────────────────────── */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px 14px 8px',
              scrollbarWidth: 'thin', scrollbarColor: 'rgba(9,146,194,0.25) transparent',
            }}>
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} colors={colors} isDark={isDark} />
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 12 }}
                >
                  <img
                    src={botIcon} alt=""
                    style={{
                      width: 28, height: 28, borderRadius: '50%', objectFit: 'cover',
                      background: 'linear-gradient(135deg,#0B2D72,#0AC4E0)',
                      border: '1.5px solid rgba(10,196,224,0.3)', padding: 3, flexShrink: 0,
                      filter: isDark ? 'brightness(0) invert(1)' : 'none',
                    }}
                  />
                  <div style={{
                    padding: '10px 16px', borderRadius: '4px 18px 18px 18px',
                    background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(9,146,194,0.07)',
                    border: `1px solid ${isDark ? 'rgba(10,196,224,0.15)' : 'rgba(9,146,194,0.2)'}`,
                  }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick suggestions ──────────────────────────────── */}
            <AnimatePresence>
              {showSugg && messages.length <= 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ padding: '4px 12px 10px', display: 'flex', flexWrap: 'wrap', gap: 6, flexShrink: 0 }}
                >
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 + 0.1 }}
                      onClick={() => sendMessage(s)}
                      style={{
                        padding: '6px 13px', borderRadius: 99, fontSize: 13, cursor: 'pointer',
                        fontFamily: 'DM Sans,sans-serif', fontWeight: 500,
                        background: 'transparent',
                        color: '#0AC4E0',
                        border: '1px solid rgba(10,196,224,0.3)',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(10,196,224,0.1)'; e.currentTarget.style.borderColor = '#0AC4E0'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(10,196,224,0.3)'; }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input bar ──────────────────────────────────────── */}
            <div style={{
              padding: '10px 12px 12px',
              borderTop: `1px solid ${colors.cardBorder}`,
              display: 'flex', gap: 8, alignItems: 'flex-end',
              background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.015)',
              flexShrink: 0,
            }}>
              <textarea
                ref={inputRef}
                id="chatbot-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={PLACEHOLDER[lang] ?? PLACEHOLDER.fr}
                rows={1}
                disabled={loading}
                style={{
                  flex: 1, resize: 'none', outline: 'none',
                  border: `1.5px solid ${colors.cardBorder}`,
                  borderRadius: 14, padding: '10px 14px',
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(9,146,194,0.04)',
                  color: colors.textPrimary,
                  fontSize: 15, fontFamily: 'DM Sans,sans-serif',
                  transition: 'border-color 0.2s',
                  maxHeight: 110, overflowY: 'auto',
                  scrollbarWidth: 'thin',
                  lineHeight: 1.5,
                  opacity: loading ? 0.6 : 1,
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(10,196,224,0.55)'}
                onBlur={e => e.target.style.borderColor = colors.cardBorder}
              />

              <motion.button
                id="chatbot-send"
                whileHover={{ scale: loading || !input.trim() ? 1 : 1.08 }}
                whileTap={{ scale: loading || !input.trim() ? 1 : 0.9 }}
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                  border: 'none',
                  background: input.trim() && !loading
                    ? 'linear-gradient(135deg, #0B2D72, #0992C2)'
                    : (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'),
                  color: input.trim() && !loading ? '#fff' : colors.textMuted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17, transition: 'all 0.25s',
                  boxShadow: input.trim() && !loading ? '0 4px 16px rgba(9,146,194,0.45)' : 'none',
                }}
              >
                {loading
                  ? <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-block' }}
                    >⟳</motion.span>
                  : <span style={{ marginLeft: 2 }}>➤</span>
                }
              </motion.button>
            </div>

            {/* Branding footer */}
            <div style={{
              textAlign: 'center', padding: '4px 0 10px',
              fontSize: 12, color: colors.textMuted,
              fontFamily: 'DM Sans,sans-serif', flexShrink: 0,
            }}>
              Propulsé par{' '}
              <span style={{ color: '#0AC4E0', fontWeight: 600 }}>Gemini AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

