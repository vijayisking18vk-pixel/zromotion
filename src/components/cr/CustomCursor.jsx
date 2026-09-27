import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * SmoothCursor — React Bits-style simple cursor
 * A small filled dot that tracks exactly + a larger ring with spring follow.
 * No labels, no hover states, minimal and clean.
 */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const rafId   = useRef(null);

  useEffect(() => {
    // Only on true pointer devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Dot follows instantly via GSAP (feels sharp)
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
        ease: 'none',
      });
    };

    // Ring follows with spring physics via GSAP quickTo
    const xTo = gsap.quickTo(ringRef.current, 'x', {
      duration: 0.55,
      ease: 'power3.out',
    });
    const yTo = gsap.quickTo(ringRef.current, 'y', {
      duration: 0.55,
      ease: 'power3.out',
    });

    const onMoveRing = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', onMove,     { passive: true });
    window.addEventListener('mousemove', onMoveRing, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousemove', onMoveRing);
    };
  }, []);

  return (
    <>
      {/* Dot — sharp, instant */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--cr-ink)',
          pointerEvents: 'none',
          zIndex: 10001,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />

      {/* Ring — spring follow */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(27, 35, 64, 0.35)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
    </>
  );
}
