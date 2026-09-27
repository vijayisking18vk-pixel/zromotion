# Taste Skill: Anti-Slop Frontend & Web Design Protocol

Always enforce the **Taste Skill** guidelines on every web development, UI redesign, and frontend implementation task.

---

## 1. Brief Inference & One-Line "Design Read"
Before writing frontend code or setting up layouts, infer what the project genuinely demands instead of defaulting to generic AI patterns.
State in one clear line before code execution:
> **"Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>."**

- **Page kinds:** Landing (SaaS / consumer / studio / agency / event), portfolio, editorial, B2B platform.
- **Audience:** The audience dictates the aesthetic, typography, and density—not generic templates.
- **Ambiguity rule:** If the brief is ambiguous, ask at most **one** single clarifying question. If confident from context, state the Design Read and proceed.

---

## 2. The Three Dials (Baseline: 8 / 6 / 4)
Calibrate every layout, motion, and density decision using these three dials:
- **`DESIGN_VARIANCE: 8`** (1 = Strict Symmetry, 10 = High-Art Asymmetry / Editorial)
- **`MOTION_INTENSITY: 6`** (1 = Completely Static, 10 = Cinematic / Physics-Driven)
- **`VISUAL_DENSITY: 4`** (1 = Airy Art Gallery, 10 = Compact Data Dashboard)

### Preset Guidelines:
- **Mainstream SaaS:** `7 / 6 / 4`
- **Creative Studio / Agency:** `9 / 8 / 3`
- **Premium Consumer / Luxury:** `7 / 6 / 3`
- **Portfolio (Designer/Studio):** `8 / 7 / 3`
- **Portfolio (Developer):** `6 / 5 / 4`
- **Trust-First / Regulated / Accessibility:** `3-4 / 2-3 / 4-5`

---

## 3. Anti-Slop Discipline (Forbidden AI Tells)
Proactively eliminate stereotypical LLM frontend signatures:
1. **No Repetitive Three-Card Sections:** Never generate 3 identical cards with centered emoji/icons. Use asymmetric bento grids, full-width kinetic rows, editorial split columns, or list cascades.
2. **No AI-Purple Gradient Slop:** Do not default to purple/cyan gradients over dark background meshes. Curate distinct, brand-accurate palettes (e.g., warm stone, editorial charcoal, deep navy, terracotta, parchment).
3. **No Unthinking Default to Inter:** Reach for deliberate typefaces (Geist, Cabinet Grotesk, Outfit, Satoshi, PP Neue Montreal, Space Grotesk). 
4. **Serif Discipline:** Never use serif just because a brief says "creative". Only use serif when the brand literally calls for editorial/literary heritage. Specifically ban `Fraunces` and `Instrument Serif` as unthinking defaults.
5. **No Stock Persona Clichés:** Avoid "Jane Doe, VP at Acme" or "John Smith, Tech Enthusiast". Use real industry context or authentic client narratives.
6. **No Arbitrary Neon Outer Glows:** Use layered borders, subtle inner highlights, or tinted soft shadows instead of garish neon drop-shadows.
7. **No Pure #000000 or #FFFFFF:** Use off-blacks (e.g. `zinc-950`, `#0c0a09`, `#141018`) and off-whites to preserve visual depth.

---

## 4. Architecture & Engineering Guardrails
1. **Interactive Component Isolation:** 
   - Components using pointer physics, smooth scrolling, or heavy animations must be isolated client leaves (`'use client'` at the top in Next.js).
2. **Viewport Stability:**
   - NEVER use `h-screen` for hero sections. ALWAYS use `min-h-[100dvh]` to avoid mobile address bar jumps.
3. **CSS Grid over Flex Math:**
   - Do NOT use fragile percentage math (`w-[calc(33%-1rem)]`). ALWAYS use CSS Grid (`grid grid-cols-1 md:grid-cols-3 gap-6`).
4. **Motion Performance:**
   - Animate ONLY `transform` and `opacity`. Never animate `top`, `left`, `width`, or `height`.
   - **Hard Ban:** NEVER use `window.addEventListener('scroll', ...)` or React `useState` to track continuous scroll/pointer position (which collapses FPS). Use Motion's `useScroll`, `useTransform`, or GSAP `ScrollTrigger`.
5. **Accessibility & Reduced Motion:**
   - Any animation above intensity 3 MUST respect `prefers-reduced-motion` and collapse cleanly to instant/static states.
6. **Dark Mode by Design:**
   - Ensure WCAG AA contrast (AAA for hero copy) across both light and dark themes using semantic tokens. Test both modes.
