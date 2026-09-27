import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Attach hover listeners to links and buttons
    const handleElementHover = () => setIsHovered(true);
    const handleElementLeave = () => setIsHovered(false);

    const updateHoverTargets = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], .clickable, .marquee-wordmark, .liquid-card');
      targets.forEach((el) => {
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    updateHoverTargets();

    // Observe DOM changes to attach listeners to newly rendered elements
    const observer = new MutationObserver(updateHoverTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [isVisible, mouseX, mouseY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Precision inner dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Spring follower ring */}
      <motion.div
        className={`custom-cursor-ring ${isHovered ? 'is-hovered' : ''}`}
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 1.4 : 1,
        }}
      />
    </>
  );
}
