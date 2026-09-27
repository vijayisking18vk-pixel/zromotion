import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/cr/Navbar';
import CustomCursor from './components/cr/CustomCursor';
import Preloader from './components/cr/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import ZonePage from './pages/ZonePage';
import Contact from './pages/Contact';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const lenisRef = useRef(null);
  const isHome = location.pathname === '/';

  // Determine if preloader should show (only first visit to home)
  const showPreloader = isHome && !sessionStorage.getItem('cr_preloader_shown');

  useEffect(() => {
    if (showPreloader) {
      sessionStorage.setItem('cr_preloader_shown', '1');
    }
  }, []);

  // Init Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      {/* Film grain overlay */}
      <div className="cr-grain" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Preloader — homepage first visit only */}
      {showPreloader && (
        <Preloader onComplete={() => document.body.classList.add('is-ready')} />
      )}

      {/* Persistent navigation */}
      <Navbar />

      {/* Scroll reset */}
      <ScrollToTop />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ecr-coastal" element={<ZonePage slug="ecr-coastal" />} />
        <Route path="/green-belt" element={<ZonePage slug="green-belt" />} />
        <Route path="/city-central" element={<ZonePage slug="city-central" />} />
        <Route path="/signature-homes" element={<ZonePage slug="signature-homes" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reach-us" element={<Contact />} />
        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
