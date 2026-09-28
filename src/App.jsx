import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/cr/Navbar';
import CustomCursor from './components/cr/CustomCursor';
import Preloader from './components/cr/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Journal from './pages/Journal';
import Article from './pages/Article';
import Contact from './pages/Contact';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const lenisRef = useRef(null);
  const isHome = location.pathname === '/';

  // Preloader only on first home visit
  const showPreloader = isHome && !sessionStorage.getItem('cr_preloader_shown');

  useEffect(() => {
    if (showPreloader) sessionStorage.setItem('cr_preloader_shown', '1');
  }, []);

  // Lenis smooth scroll — re-init on route change
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [location.pathname]);

  return (
    <>
      <div className="cr-grain" aria-hidden="true" />
      <CustomCursor />

      {showPreloader && (
        <Preloader onComplete={() => document.body.classList.add('is-ready')} />
      )}

      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/journal"  element={<Journal />} />
        <Route path="/journal/:id" element={<Article />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="/reach-us" element={<Contact />} />
        <Route path="*"         element={<Home />} />
      </Routes>
    </>
  );
}
