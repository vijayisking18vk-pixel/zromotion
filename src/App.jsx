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
import NotFound from './pages/NotFound';
import HouseRentChennaiHub from './pages/HouseRentChennaiHub';
import AuthorPage from './pages/AuthorPage';
import Methodology from './pages/Methodology';
import Verification from './pages/Verification';
import Corrections from './pages/Corrections';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import DataDeletion from './pages/DataDeletion';
import { LEGACY_REDIRECTS, LOCALITIES } from './data/localities';

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
    // On touch devices (phones/tablets), native inertial touch momentum scroll is faster & smoother.
    // Run Lenis smooth-wheel physics only on desktop/pointer-fine devices.
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (isTouch || mediaQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
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
            {/* ── PRIMARY ROUTES ── */}
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/about" element={<About lang={lang} />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/corrections" element={<Corrections />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/data-deletion" element={<DataDeletion />} />

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

            {/* ── CHENNAI HOUSING PILLAR HUB & SUPPORTING GUIDES ── */}
            <Route path="/house-for-rent-in-chennai" element={<HouseRentChennaiHub />} />
            <Route path="/1-bhk-house-for-rent-in-chennai" element={<HouseRentChennaiHub customSlug="1-bhk-house-for-rent-in-chennai" />} />
            <Route path="/2-bhk-house-for-rent-in-chennai" element={<HouseRentChennaiHub customSlug="2-bhk-house-for-rent-in-chennai" />} />
            <Route path="/independent-house-for-rent-in-chennai" element={<HouseRentChennaiHub customSlug="independent-house-for-rent-in-chennai" />} />
            <Route path="/house-for-rent-in-chennai-under-10000" element={<HouseRentChennaiHub customSlug="house-for-rent-in-chennai-under-10000" />} />
            <Route path="/house-for-rent-in-chennai-under-7000" element={<HouseRentChennaiHub customSlug="house-for-rent-in-chennai-under-7000" />} />
            <Route path="/house-for-rent-in-chennai-under-5000" element={<HouseRentChennaiHub customSlug="house-for-rent-in-chennai-under-5000" />} />
            <Route path="/individual-house-for-rent-in-chennai-under-8000" element={<HouseRentChennaiHub customSlug="individual-house-for-rent-in-chennai-under-8000" />} />
            <Route path="/house-for-rent-in-chennai-without-brokers" element={<HouseRentChennaiHub customSlug="house-for-rent-in-chennai-without-brokers" />} />
            <Route path="/house-for-rent-in-anna-nagar-chennai" element={<HouseRentChennaiHub customSlug="house-for-rent-in-anna-nagar-chennai" />} />
            <Route path="/house-for-rent-in-porur-chennai" element={<HouseRentChennaiHub customSlug="house-for-rent-in-porur-chennai" />} />
            <Route path="/house-for-rent-in-t-nagar-chennai" element={<HouseRentChennaiHub customSlug="house-for-rent-in-t-nagar-chennai" />} />
            <Route path="/bachelor-rentals-in-chennai" element={<HouseRentChennaiHub customSlug="bachelor-rentals-in-chennai" />} />
            <Route path="/family-houses-for-rent-in-chennai" element={<HouseRentChennaiHub customSlug="family-houses-for-rent-in-chennai" />} />
            <Route path="/co-living-in-chennai" element={<HouseRentChennaiHub customSlug="co-living-in-chennai" />} />

            {/* ── AUTHOR & EDITORIAL PROFILE ── */}
            <Route path="/author/vijayrajkumar" element={<AuthorPage />} />
            <Route path="/author/r-vijayrajkumar" element={<AuthorPage />} />

            {/* ── CANONICAL LOCALITY ROUTES (/chennai/:locality) ── */}
            <Route path="/chennai/:locality" element={<LocalityPage />} />
            <Route path="/chennai/:locality/:intent" element={<LocalityPage />} />

            {/* ── REDIRECTS FOR /flats-for-rent-in-*-chennai TO /chennai/:locality/ ── */}
            {LOCALITIES.map((loc) => (
              <React.Fragment key={loc.slug}>
                <Route path={`/flats-for-rent-in-${loc.slug}-chennai`} element={<Navigate to={`/chennai/${loc.slug}/`} replace />} />
                <Route path={`/flats-for-rent-in-${loc.slug}-chennai/:intent`} element={<Navigate to={`/chennai/${loc.slug}/:intent/`} replace />} />
              </React.Fragment>
            ))}

            {/* ── GUIDE ROUTES (Canonical: /guides/:slug) ── */}
            <Route path="/guides/:slug" element={<PostTemplate lang={lang} />} />
            <Route path="/guide/:slug" element={<Navigate to={`/guides/:slug`} replace />} />

            {/* ── CONFIRMED 404 REDIRECTS ── */}
            <Route path="/flats-for-rent-in-adambakkam-chennai" element={<Navigate to="/chennai/velachery/" replace />} />
            <Route path="/flats-for-rent-in-besant-nagar-chennai" element={<Navigate to="/chennai/adyar/" replace />} />
            <Route path="/flats-for-rent-in-egmore-chennai" element={<Navigate to="/chennai/rentals/" replace />} />
            <Route path="/flats-for-rent-in-kodambakkam-chennai" element={<Navigate to="/chennai/t-nagar/" replace />} />
            <Route path="/flats-for-rent-in-mogappair-chennai" element={<Navigate to="/chennai/anna-nagar/" replace />} />
            <Route path="/flats-for-rent-in-mylapore-chennai" element={<Navigate to="/chennai/adyar/" replace />} />
            <Route path="/flats-for-rent-in-pallikaranai-chennai" element={<Navigate to="/chennai/medavakkam/" replace />} />
            <Route path="/flats-for-rent-in-vadapalani-chennai" element={<Navigate to="/chennai/valasaravakkam/" replace />} />
            <Route path="/flats-for-rent-in-virugambakkam-chennai" element={<Navigate to="/chennai/valasaravakkam/" replace />} />
            <Route path="/rent/rent-in-valasaravakkam" element={<Navigate to="/chennai/valasaravakkam/" replace />} />
            <Route path="/rent/rent-in-velachery" element={<Navigate to="/chennai/velachery/" replace />} />
            <Route path="/contact.html" element={<Navigate to="/contact/" replace />} />
            <Route path="/privacy.html" element={<Navigate to="/privacy/" replace />} />

            {/* Old locality slugs */}
            <Route path="/rent-in-velachery" element={<Navigate to="/chennai/velachery/" replace />} />
            <Route path="/rent-in-adyar" element={<Navigate to="/chennai/adyar/" replace />} />
            <Route path="/rent-in-valasaravakkam" element={<Navigate to="/chennai/valasaravakkam/" replace />} />
            <Route path="/rent-in-omr" element={<Navigate to="/chennai/omr/" replace />} />
            <Route path="/rent-in-porur" element={<Navigate to="/chennai/porur/" replace />} />
            <Route path="/rent-in-sholinganallur" element={<Navigate to="/chennai/sholinganallur/" replace />} />
            <Route path="/rent-in-taramani" element={<Navigate to="/chennai/taramani/" replace />} />
            <Route path="/rent-in-anna-nagar" element={<Navigate to="/chennai/anna-nagar/" replace />} />
            <Route path="/advance-deposit-chennai" element={<Navigate to="/guides/advance-deposit-chennai/" replace />} />
            <Route path="/tenant-rules-chennai" element={<Navigate to="/guides/tenant-rules-chennai/" replace />} />
            <Route path="/rent/:slug" element={<LegacyRedirect />} />
            <Route path="/:slug" element={<PostTemplate lang={lang} />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer lang={lang} />
      <StickyMobileBar />
    </div>
  );
}

