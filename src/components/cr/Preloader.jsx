import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = document.getElementById('site-preloader');
    if (!el) { onComplete?.(); return; }

    let current = 0;
    const duration = 2200; // ms
    const startTime = performance.now();

    // Rapid digit flicker then settle
    const flickerDigits = () => {
      if (!counterRef.current) return;
      counterRef.current.textContent = String(Math.floor(Math.random() * 100)).padStart(2, '0');
    };
    let flickerInterval = null;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease: fast start, slow finish
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * 100);

      if (current !== value) {
        current = value;
        setCount(value);
        const display = String(value).padStart(2, '0');
        const counterEl = document.getElementById('preloader-counter');
        if (counterEl) counterEl.textContent = display;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Done — exit
        const counterEl = document.getElementById('preloader-counter');
        if (counterEl) counterEl.textContent = '100';
        setTimeout(() => {
          gsap.to(el, {
            autoAlpha: 0,
            duration: 0.7,
            ease: 'power2.inOut',
            onComplete: () => {
              el.style.display = 'none';
              document.documentElement.classList.remove('site-preloader-pending');
              document.body.classList.add('is-ready');
              onComplete?.();
            },
          });
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return null; // The preloader DOM is already in index.html
}
