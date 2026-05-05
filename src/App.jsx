import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import About        from './components/About';
import Skills       from './components/Skills';
import Projects     from './components/Projects';
import Services     from './components/Services';
import Testimonials from './components/Testimonials';
import Contact      from './components/Contact';
import Footer       from './components/Footer';
import SnowflakesFX from './components/SnowflakesFX';
import Chatbot      from './components/Chatbot';

function AppInner() {
  const { theme, colors } = useApp();
  return (
    <div data-theme={theme} style={{ minHeight: '100vh', background: colors.bgPrimary, transition: 'background 0.4s ease, color 0.4s ease', position: 'relative' }}>
      <SnowflakesFX />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
