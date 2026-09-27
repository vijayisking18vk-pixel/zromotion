import React, { useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'framer-motion';

export default function HeroBackgroundBubble({ containerRef }) {
  const prefersReducedMotion = useReducedMotion();

  // ---------------------------------------------------------------------------
  // 1. POINTER MOVEMENT (SPRING PHYSICS & PARALLAX)
  // ---------------------------------------------------------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseRotate = useMotionValue(0);

  // Enhanced reactive spring physics for higher sensitivity and fluid response
  const springConfig = { damping: 22, stiffness: 180, mass: 0.5 };
  const smoothPointerX = useSpring(mouseX, springConfig);
  const smoothPointerY = useSpring(mouseY, springConfig);
  const smoothPointerRotate = useSpring(mouseRotate, springConfig);

  // Dynamic light reflection coordinates inside the bubble (reacting to pointer)
  const highlightX = useTransform(smoothPointerX, [-75, 75], [-45, 45]);
  const highlightY = useTransform(smoothPointerY, [-55, 55], [-35, 35]);

  useEffect(() => {
    // If reduced motion is preferred or if touch device, skip mouse tracking
    if (prefersReducedMotion || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }

    const container = containerRef?.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates (-1 to 1) from hero center
      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

      // High-sensitivity displacement range
      const isTablet = window.innerWidth < 1024;
      const maxDistX = isTablet ? 40 : 75; // Increased horizontal sensitivity (~75px)
      const maxDistY = isTablet ? 30 : 55; // Increased vertical sensitivity (~55px)
      const maxDeg = isTablet ? 2.5 : 4.5; // Dynamic tilt (~4.5deg)

      mouseX.set(normX * maxDistX);
      mouseY.set(normY * maxDistY);
      mouseRotate.set(normX * maxDeg);
    };

    const handleMouseLeave = () => {
      // Smoothly return bubble to original resting position with zero abrupt snap
      mouseX.set(0);
      mouseY.set(0);
      mouseRotate.set(0);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, prefersReducedMotion, mouseX, mouseY, mouseRotate]);

  // ---------------------------------------------------------------------------
  // 2. SCROLL ANIMATION (SCOPED EXCLUSIVELY TO HERO SECTION PROGRESS)
  // ---------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale from 0.98 to 1.08 as user scrolls down hero
  const scrollScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  // Vertical shift of 40-75px
  const scrollYRaw = useTransform(scrollYProgress, [0, 1], [0, 65]);
  // Subtle rotation of -2.5deg to +2.5deg
  const scrollRotateRaw = useTransform(scrollYProgress, [0, 1], [0, 2.8]);
  // Opacity subtlety from 1 down to 0.90
  const scrollOpacityRaw = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.96, 0.88]);

  // Respect prefers-reduced-motion
  const scrollScale = prefersReducedMotion ? 1 : scrollScaleRaw;
  const scrollY = prefersReducedMotion ? 0 : scrollYRaw;
  const scrollRotate = prefersReducedMotion ? 0 : scrollRotateRaw;
  const scrollOpacity = prefersReducedMotion ? 1 : scrollOpacityRaw;
  const pointerX = prefersReducedMotion ? 0 : smoothPointerX;
  const pointerY = prefersReducedMotion ? 0 : smoothPointerY;
  const pointerRotate = prefersReducedMotion ? 0 : smoothPointerRotate;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {/* 
        LAYER 1: SCROLL TRANSFORM WRAPPER 
        Handles vertical parallax, scale, and subtle scroll rotation safely isolated
      */}
      <motion.div
        style={{
          y: scrollY,
          scale: scrollScale,
          rotate: scrollRotate,
          opacity: scrollOpacity,
          willChange: 'transform, opacity',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 
          LAYER 2: POINTER PARALLAX WRAPPER (SPRING PHYSICS)
          Smoothly follows cursor with soft liquid spring lag without conflicting with scroll
        */}
        <motion.div
          style={{
            x: pointerX,
            y: pointerY,
            rotate: pointerRotate,
            willChange: 'transform',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 
            THE ORGANIC LAVENDER BUBBLE
            - Soft translucent edges
            - Light lavender and soft purple gradient
            - Gentle internal 3D light reflection
            - Living organic border-radius
          */}
          <div
            className="hero-lavender-bubble"
            style={{
              width: 'clamp(480px, 54vw, 720px)',
              height: 'clamp(460px, 50vw, 680px)',
              borderRadius: '62% 38% 54% 46% / 48% 62% 38% 52%',
              background: 'radial-gradient(circle at 38% 34%, #DDD6FE 0%, #C4B5FD 32%, #B9A6F2 70%, rgba(140, 122, 230, 0.88) 100%)',
              boxShadow: `
                0 30px 70px rgba(185, 166, 242, 0.32),
                inset 0 -25px 45px rgba(140, 122, 230, 0.35),
                inset 0 25px 45px rgba(255, 255, 255, 0.75)
              `,
              position: 'relative',
              filter: 'drop-shadow(0 20px 40px rgba(185, 166, 242, 0.22))',
              overflow: 'hidden',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform, border-radius',
              animation: 'bubbleOrganicBreath 14s ease-in-out infinite alternate',
            }}
          >
            {/* Internal Highlight Reflection 1 (Reacts to Pointer & Scroll) */}
            <motion.div
              style={{
                position: 'absolute',
                top: '18%',
                left: '26%',
                width: 'clamp(180px, 24vw, 300px)',
                height: 'clamp(160px, 20vw, 260px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0) 75%)',
                filter: 'blur(16px)',
                x: highlightX,
                y: highlightY,
                pointerEvents: 'none',
              }}
            />

            {/* Subtle secondary specular light crest */}
            <div
              style={{
                position: 'absolute',
                bottom: '15%',
                right: '22%',
                width: '160px',
                height: '140px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(246, 244, 255, 0.1) 50%, transparent 70%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
              }}
            />

            {/* Translucent rim sheen */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, transparent 60%, rgba(140, 122, 230, 0.25) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scoped CSS animation for gentle, living organic morph */}
      <style>{`
        @keyframes bubbleOrganicBreath {
          0% {
            border-radius: 62% 38% 54% 46% / 48% 62% 38% 52%;
          }
          33% {
            border-radius: 52% 48% 65% 35% / 58% 42% 58% 42%;
          }
          66% {
            border-radius: 44% 56% 40% 60% / 42% 58% 44% 56%;
          }
          100% {
            border-radius: 58% 42% 48% 52% / 54% 46% 62% 38%;
          }
        }
      `}</style>
    </div>
  );
}
