import React from 'react';
import { useNavigate } from 'react-router-dom';

const ZONES = [
  {
    id: 'ecr-coastal',
    monogram: 'EC',
    name: 'ECR Coastal',
    description: 'OMR & ECR beachside apartments & villas',
    path: '/ecr-coastal',
    bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'green-belt',
    monogram: 'GB',
    name: 'Green Belt',
    description: 'IT corridor gated communities with parks',
    path: '/green-belt',
    bg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'city-central',
    monogram: 'CC',
    name: 'City Central',
    description: 'Mylapore, Nungambakkam & T. Nagar character homes',
    path: '/city-central',
    bg: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'signature-homes',
    monogram: 'SH',
    name: 'Signature Homes',
    description: 'One-of-a-kind penthouses, heritage bungalows & villas',
    path: '/signature-homes',
    bg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format&fit=crop',
  },
];

export default function CollectionOverlay({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleTileClick = (path) => {
    onClose();
    setTimeout(() => navigate(path), 400);
  };

  return (
    <div
      className={`cr-overlay${isOpen ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Our Collections"
    >
      {/* Close button */}
      <button
        className="cr-overlay__close"
        onClick={onClose}
        aria-label="Close collections overlay"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        Close
      </button>

      {ZONES.map((zone) => (
        <button
          key={zone.id}
          className="cr-overlay__tile"
          onClick={() => handleTileClick(zone.path)}
          aria-label={`Navigate to ${zone.name}`}
        >
          {/* Background photo */}
          <div
            className="cr-overlay__tile-bg"
            style={{ backgroundImage: `url(${zone.bg})` }}
            aria-hidden="true"
          />

          {/* Arrow indicator */}
          <div className="cr-overlay__tile-arrow" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Content */}
          <div className="cr-overlay__tile-content">
            <div className="cr-overlay__tile-monogram">{zone.monogram}</div>
            <div className="cr-overlay__tile-name">{zone.name}</div>
            <div className="cr-overlay__tile-desc">{zone.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
