import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyMobileBar from './components/StickyMobileBar';
import Home from './pages/Home';
import About from './pages/About';
import PostTemplate from './pages/PostTemplate';

// Hard-redirect helper to cleanly transition from React SPA router to static listings app
function ListingsRedirect() {
  useEffect(() => {
    window.location.replace('/listings/index.html');
  }, []);
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)' }}>
      <p style={{ color: 'var(--c-ink-muted)', fontSize: '1.1rem' }}>Loading Chennai Rents Map...</p>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState('ta'); // 'ta' (Tamil) or 'en' (English)
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    // respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      requestAnimationFrame(raf);
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ta' ? 'en' : 'ta'));
  };

  return (
    <div className="chennai-rents-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header lang={lang} onToggleLang={handleToggleLang} />

      <div style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/about" element={<About lang={lang} />} />
            <Route path="/listings" element={<ListingsRedirect />} />
            <Route path="/listings/*" element={<ListingsRedirect />} />
            <Route path="/map" element={<ListingsRedirect />} />
            <Route path="/:slug" element={<PostTemplate lang={lang} />} />
            <Route path="/rent/:slug" element={<PostTemplate lang={lang} />} />
            <Route path="/guide/:slug" element={<PostTemplate lang={lang} />} />
            <Route path="*" element={<Home lang={lang} />} />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer lang={lang} />
      <StickyMobileBar />
      
      {/* Desktop Insta FAB */}
      <a
        href="https://www.instagram.com/chennai_rents"
        target="_blank"
        rel="noopener noreferrer"
        className="desktop-insta-fab instagram-pulse"
        aria-label="Follow Chennai Rents on Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      </a>
    </div>
  );
}
