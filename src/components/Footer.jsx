import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Instagram } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AutoRickshawDoodle,
  RiponBuildingDoodle,
  FilterCoffeeDoodle,
  MallipooGarland,

} from './ChennaiDoodles';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

const doodleItems = [
  { Component: AutoRickshawDoodle, width: 85, height: 55, label: 'Chennai Autos' },
  { Component: RiponBuildingDoodle, width: 95, height: 60, label: 'Ripon Building' },
  { Component: FilterCoffeeDoodle, width: 45, height: 50, label: 'Filter Coffee' },
];

export default function Footer() {
  const prefersReduced = useReducedMotion();

  return (
    <footer
      style={{
        backgroundColor: 'var(--c-temple-green)',
        color: '#FDFBF7',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '4rem',
        paddingBottom: '5.5rem', // extra clearance for sticky mobile bar
      }}
    >
      {/* Mallipoo Garland — full-width decorative separator above content */}
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.15)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <MallipooGarland />
      </div>

      <div className="container" style={{ paddingTop: '3rem', position: 'relative', zIndex: 1 }}>

        {/* Main 3-Column Grid */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >

          {/* Col 1: Brand */}
          <div>
            {/* Image Logo + Tamil Brand Line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <img 
                src="/chennai-rents-logo-new.jpg" 
                alt="Chennai Rents" 
                style={{ 
                  height: '42px',
                  width: 'auto',
                  borderRadius: '4px',
                  objectFit: 'contain'
                }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '0.85rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: 900,
                    color: '#FDFBF7',
                    lineHeight: 1.2
                  }}
                >
                  நம்ம ஊரு
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 900,
                    color: 'var(--c-auto-yellow)',
                    lineHeight: 1
                  }}
                >
                  Rents
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'rgba(253,251,247,0.75)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.6rem',
              }}
            >
              Locality-First Rental Guide
            </p>

            {/* Tamil brand line */}
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--c-auto-yellow)',
                marginBottom: '1.1rem',
              }}
            >
              நம்ம ஊரு Rents
            </p>

            {/* Privacy badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.85rem',
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                borderRadius: '6px',
                fontSize: '0.82rem',
                color: 'var(--c-auto-yellow)',
              }}
            >
              <ShieldCheck size={16} />
              <span>No tracking here. We do not collect anything on this site.</span>
            </div>
          </div>

          {/* Col 2: Top Locality Guides */}
          <div>
            <h4
              style={{
                color: 'var(--c-auto-yellow)',
                marginBottom: '1rem',
                fontSize: '1rem',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Popular Localities
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.92rem',
              }}
            >
              {[
                { to: '/rent-in-valasaravakkam', label: 'Rent in Valasaravakkam' },
                { to: '/rent-in-velachery', label: 'Rent in Velachery' },
                { to: '/rent-in-adyar', label: 'Rent in Adyar' },
                { to: '/rent-in-omr', label: 'Rent in OMR IT Corridor' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} style={{ color: '#FDFBF7', textDecoration: 'none' }}>
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Renting Guides */}
          <div>
            <h4
              style={{
                color: 'var(--c-auto-yellow)',
                marginBottom: '1rem',
                fontSize: '1rem',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Renting Guides
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.92rem',
              }}
            >
              <li>
                <Link to="/advance-deposit-chennai" style={{ color: '#FDFBF7', textDecoration: 'none' }}>
                  → Advance Deposit: 10 Months vs Reality
                </Link>
              </li>
              <li>
                <Link to="/tenant-rules-chennai" style={{ color: '#FDFBF7', textDecoration: 'none' }}>
                  → Rental Agreements and Tenant Rights
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#FDFBF7', textDecoration: 'none' }}>
                  → About Chennai Rents
                </Link>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--c-auto-yellow)', fontWeight: 700 }}
                >
                  → Follow {INSTAGRAM_HANDLE} on Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Doodle Row — each with whileInView fade+slide animation */}
        <div
          style={{
            paddingBlock: '1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {doodleItems.map(({ Component, width, height, label }, i) => (
            <motion.div
              key={label}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.12, ease: 'easeOut' }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <Component width={width} height={height} />
              <span
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(253, 251, 247, 0.9)',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom signature line */}
        <div
          style={{
            paddingTop: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--c-auto-yellow)',
              letterSpacing: '0.02em',
            }}
          >
            Made in Chennai, for Chennai{' '}
            <Heart
              size={14}
              fill="var(--c-ripon-red)"
              color="var(--c-ripon-red)"
              style={{ display: 'inline', marginInline: '2px', verticalAlign: 'middle' }}
            />
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(253, 251, 247, 0.7)' }}>
            © {new Date().getFullYear()} Chennai Rents. Purely content and Instagram Reels.
          </p>
        </div>
      </div>



      {/* Responsive grid override */}
      <style>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
