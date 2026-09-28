import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyMobileBar from './components/StickyMobileBar';
import Home from './pages/Home';
import About from './pages/About';
import PostTemplate from './pages/PostTemplate';

export default function App() {
  const [lang, setLang] = useState('ta'); // 'ta' (Tamil) or 'en' (English)

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ta' ? 'en' : 'ta'));
  };

  return (
    <div className="chennai-rents-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── HEADER WITH LOGO, AUTO-STRIPE & NAV ── */}
      <Header lang={lang} onToggleLang={handleToggleLang} />

      {/* ── PAGE CONTENT ── */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
          
          {/* Direct Locality & Guide URLs (e.g. /rent-in-valasaravakkam, /advance-deposit-chennai) */}
          <Route path="/:slug" element={<PostTemplate lang={lang} />} />
          <Route path="/rent/:slug" element={<PostTemplate lang={lang} />} />
          <Route path="/guide/:slug" element={<PostTemplate lang={lang} />} />
          
          {/* Fallback */}
          <Route path="*" element={<Home lang={lang} />} />
        </Routes>
      </div>

      {/* ── FOOTER WITH TEMPLE GREEN & KOLAM BORDER ── */}
      <Footer lang={lang} />

      {/* ── MOBILE-ONLY STICKY INSTAGRAM ACTION BAR ── */}
      <StickyMobileBar />
    </div>
  );
}
