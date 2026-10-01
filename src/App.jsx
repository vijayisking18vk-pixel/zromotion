import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyMobileBar from './components/StickyMobileBar';
import Home from './pages/Home';
import About from './pages/About';
import PostTemplate from './pages/PostTemplate';
import ChennaiHub from './pages/ChennaiHub';
import LocalityPage from './pages/LocalityPage';
import { LEGACY_REDIRECTS } from './data/localities';

// ─── Legacy Redirect Handler ──────────────────────────────────────────────────
// Handles old URLs like /rent-in-velachery → /chennai/velachery
function LegacyRedirect() {
  const { pathname } = useLocation();
  const target = LEGACY_REDIRECTS[pathname];
  if (target) return <Navigate to={target} replace />;
  // Fallback: /rent/:slug → /guide/:slug for guide posts
  return <PostTemplate />;
}

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
  const [lang, setLang] = useState('ta');
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      requestAnimationFrame(raf);
    }

    return () => { lenis.destroy(); };
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
            {/* ── PRIMARY ROUTES ── */}
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/about" element={<About lang={lang} />} />
            {/* ── LISTINGS & MAP (Direct to Chennai Rents Map app) ── */}
            <Route path="/listings" element={<ListingsRedirect />} />
            <Route path="/listings/*" element={<ListingsRedirect />} />
            <Route path="/map" element={<ListingsRedirect />} />

            {/* ── SEO GEO ROUTES ── */}
            {/* City hub */}
            <Route path="/chennai/rentals" element={<ChennaiHub />} />
            {/* City-level BHK hubs */}
            <Route path="/chennai/1-bhk-for-rent" element={<ChennaiHub bhk="1" />} />
            <Route path="/chennai/2-bhk-for-rent" element={<ChennaiHub bhk="2" />} />
            <Route path="/chennai/3-bhk-for-rent" element={<ChennaiHub bhk="3" />} />
            <Route path="/chennai/pg" element={<ChennaiHub pg />} />
            {/* Locality hub */}
            <Route path="/chennai/:locality" element={<LocalityPage />} />
            {/* Locality + intent combos (BHK, PG, furnished, budget) */}
            <Route path="/chennai/:locality/:intent" element={<LocalityPage />} />

            {/* ── GUIDE ROUTES (new canonical) ── */}
            <Route path="/guide/:slug" element={<PostTemplate lang={lang} />} />

            {/* ── LEGACY REDIRECTS ── */}
            {/* Old locality slugs */}
            <Route path="/rent-in-velachery" element={<Navigate to="/chennai/velachery" replace />} />
            <Route path="/rent-in-adyar" element={<Navigate to="/chennai/adyar" replace />} />
            <Route path="/rent-in-valasaravakkam" element={<Navigate to="/chennai/valasaravakkam" replace />} />
            <Route path="/rent-in-omr" element={<Navigate to="/chennai/perungudi" replace />} />
            <Route path="/rent-in-porur" element={<Navigate to="/chennai/porur" replace />} />
            <Route path="/rent-in-sholinganallur" element={<Navigate to="/chennai/sholinganallur" replace />} />
            <Route path="/rent-in-taramani" element={<Navigate to="/chennai/taramani" replace />} />
            {/* Old guide slugs */}
            <Route path="/advance-deposit-chennai" element={<Navigate to="/guide/advance-deposit-chennai" replace />} />
            <Route path="/tenant-rules-chennai" element={<Navigate to="/guide/tenant-rules-chennai" replace />} />
            {/* Old /rent/:slug paths */}
            <Route path="/rent/:slug" element={<LegacyRedirect />} />
            {/* Old bare :slug paths for posts */}
            <Route path="/:slug" element={<PostTemplate lang={lang} />} />
            {/* Catch-all */}
            <Route path="*" element={<Home lang={lang} />} />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer lang={lang} />
      <StickyMobileBar />

      {/* Desktop Instagram FAB */}
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

