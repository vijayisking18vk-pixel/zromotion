import React from 'react';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config';

/**
 * Mobile-only sticky bottom bar with ONE button only:
 * "Follow on Instagram" (Official @chennai_rents)
 * 48px touch-target, high contrast, instant mobile tap response
 */
export default function StickyMobileBar() {
  return (
    <div className="sticky-mobile-bar" aria-label="Mobile Instagram Quick Action">
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-dark"
        style={{
          width: '100%',
          maxWidth: '440px',
          justifyContent: 'center',
          padding: '0.75rem 1.25rem',
          fontSize: '0.95rem',
          fontWeight: 700,
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(30, 27, 24, 0.15)'
        }}
      >
        <Instagram size={18} />
        <span>Follow {INSTAGRAM_HANDLE} on Instagram</span>
      </a>
    </div>
  );
}
