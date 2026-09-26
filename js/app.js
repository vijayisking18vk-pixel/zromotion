/**
 * ZROMOTION — Minimalist Digital Marketing Agency
 * Master Script: Lenis Smooth Scroll, Three.js 3D Hero, GSAP & ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', () => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initLenisSmoothScroll();
  initThreeJsHero(isReducedMotion);
  initGsapScrollAnimations(isReducedMotion);
  initStickyNav();
  initMobileMenu();
  initMagneticButtons();
  initModals();
});

/* ==========================================================================
   1. LENIS INERTIAL SMOOTH SCROLLING + GSAP TICKER
   ========================================================================== */
let lenis = null;

function initLenisSmoothScroll() {
  if (typeof Lenis === 'undefined') return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Anchor links smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -60 });
        }
      }
    });
  });
}

/* ==========================================================================
   2. THREE.JS REAL-TIME 3D OBJECT IN HERO (Floating Purple Chrome & Glass)
   ========================================================================== */
function initThreeJsHero(isReducedMotion) {
  const container = document.getElementById('hero-canvas-wrap');
  const canvas = document.getElementById('hero-canvas');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 5.2;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x3B0764, 2.2);
  scene.add(ambientLight);

  const keyLight = new THREE.PointLight(0xA855F7, 4.0, 50);
  keyLight.position.set(4, 3, 4);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xDDD6FE, 2.5, 50);
  fillLight.position.set(-4, -2, 3);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x7C3AED, 3.5, 50);
  rimLight.position.set(0, 4, -3);
  scene.add(rimLight);

  // 3D Geometry: High-end abstract continuous Torus Knot sculpture
  const geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 160, 32, 2, 3);

  // Physical Chrome / Royal Purple Iridescent Glass Material
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x4C1D95,
    emissive: 0x1E0A3C,
    roughness: 0.14,
    metalness: 0.88,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.95,
    transmission: 0.22,
    ior: 1.5,
    flatShading: false
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Subtle inner wireframe accent for futuristic technical depth
  const wireGeometry = new THREE.TorusKnotGeometry(1.205, 0.385, 40, 12, 2, 3);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xC084FC,
    wireframe: true,
    transparent: true,
    opacity: 0.12
  });
  const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
  mesh.add(wireMesh);

  // Mouse interaction state
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Responsive resize
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    if (!isReducedMotion) {
      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Slow elegant 3D rotation + mouse tilt
      mesh.rotation.x = elapsedTime * 0.25 + mouse.y * 0.45;
      mesh.rotation.y = elapsedTime * 0.35 + mouse.x * 0.45;

      // Subtle vertical floating motion
      mesh.position.y = Math.sin(elapsedTime * 1.1) * 0.12;

      // Light response to cursor
      keyLight.position.x = 4 + mouse.x * 2;
      keyLight.position.y = 3 - mouse.y * 2;
    }

    renderer.render(scene, camera);
  }

  animate();

  // Scroll Trigger Parallax for 3D Mesh
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !isReducedMotion) {
    gsap.to(mesh.position, {
      y: -1.2,
      z: -1.5,
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  }
}

/* ==========================================================================
   3. GSAP & SCROLLTRIGGER ANIMATIONS
   ========================================================================== */
function initGsapScrollAnimations(isReducedMotion) {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || isReducedMotion) {
    // If reduced motion or gsap unavailable, ensure elements are visible
    document.querySelectorAll('.stat-count').forEach((el) => {
      el.textContent = el.getAttribute('data-val');
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Hero Section Entrance Timeline
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero-brand-tag', { opacity: 0, y: 20, duration: 0.8, delay: 0.2 })
    .from('.hero-heading', { opacity: 0, y: 40, duration: 1.0 }, '-=0.5')
    .from('.hero-subtext', { opacity: 0, y: 25, duration: 0.8 }, '-=0.6')
    .from('.hero-btn-row .btn', { opacity: 0, y: 20, stagger: 0.15, duration: 0.7 }, '-=0.5')
    .from('.hero-canvas-wrap', { opacity: 0, scale: 0.85, duration: 1.2 }, '-=0.8')
    .from('.hero-scroll-indicator', { opacity: 0, y: 15, duration: 0.8 }, '-=0.6');

  // About Section Reveals & Counters
  gsap.from('.about-large-text', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 80%'
    },
    opacity: 0,
    y: 40,
    duration: 1.0,
    ease: 'power3.out'
  });

  gsap.from('.about-desc-paragraph', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 75%'
    },
    opacity: 0,
    y: 30,
    duration: 0.9,
    delay: 0.2,
    ease: 'power3.out'
  });

  // Animated Numbers Counter in About
  document.querySelectorAll('.stat-count').forEach((counter) => {
    const target = parseFloat(counter.getAttribute('data-val'));
    const isDecimal = counter.getAttribute('data-decimal') === 'true';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val);
          },
          onComplete: () => {
            counter.textContent = isDecimal ? target.toFixed(1) : target;
          }
        });
      }
    });
  });

  // Services Rows Stagger Reveal
  gsap.from('.service-row', {
    scrollTrigger: {
      trigger: '.services-list',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Selected Work Cards Reveal & Scale Parallax
  document.querySelectorAll('.work-card').forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      },
      opacity: 0,
      y: 45,
      duration: 0.9,
      ease: 'power3.out'
    });
  });

  // Process Steps Stagger Reveal
  gsap.from('.process-step-item', {
    scrollTrigger: {
      trigger: '.process-grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 35,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Final CTA Reveal
  gsap.from('.cta-content > *', {
    scrollTrigger: {
      trigger: '.final-cta-section',
      start: 'top 75%'
    },
    opacity: 0,
    y: 40,
    stagger: 0.18,
    duration: 1.0,
    ease: 'power3.out'
  });
}

/* ==========================================================================
   4. STICKY NAVIGATION BAR SCROLL SPY
   ========================================================================== */
function initStickyNav() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   5. MOBILE FULLSCREEN OVERLAY MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-icon-btn');
  const overlay = document.getElementById('mobile-nav-overlay');
  const links = document.querySelectorAll('.mobile-link, .mobile-menu-cta');

  if (!menuBtn || !overlay) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.forEach((l) => {
    l.addEventListener('click', closeMenu);
  });

  function openMenu() {
    menuBtn.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuBtn.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   6. MAGNETIC CTA BUTTONS
   ========================================================================== */
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .service-row-arrow');

  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

/* ==========================================================================
   7. CASE STUDY & INQUIRY MODALS
   ========================================================================== */
const CASE_STUDIES = {
  aurelia: {
    title: 'Aurelia Skin',
    tagline: 'Botanical Luxury Identity & Digital Flagship',
    category: 'Beauty & Skincare Branding',
    metrics: '+340% DTC Revenue • Vogue & Elle Features',
    image: 'assets/images/aurelia.jpg',
    challenge:
      'Aurelia Skin formulated a groundbreaking cellular skincare elixir but required an aesthetic identity that felt rare, tactile, and indisputably premium on global shelves.',
    solution:
      'We engineered a minimalist visual identity centered on frosted glass aesthetics, warm gold serif typography, and organic lavender hues, coupled with a high-converting digital flagship.',
    impact:
      'DTC revenue surged by 340% in six months, selling out three production runs within 48 hours and establishing Aurelia as a prestige category icon.'
  },
  nexa: {
    title: 'Nexa Finance',
    tagline: 'Algorithmic Wealth Creation Reimagined',
    category: 'Fintech Growth Campaign',
    metrics: '1.8M App Downloads • 4.2x Blended ROAS',
    image: 'assets/images/nexa.jpg',
    challenge:
      'Fintech consumers were intimidated by complex algorithmic trading. Nexa needed to demystify sophisticated portfolio management with institutional authority and intuitive warmth.',
    solution:
      'We designed an electric violet dark glassmorphic brand language with holographic analytics and scaled paid acquisition funnels across Meta and Google.',
    impact:
      'Acquired 1.8M verified active app users within nine months, lowering customer acquisition costs (CAC) by 46% with a sustained 4.2x ROAS.'
  },
  velora: {
    title: 'Velora Living',
    tagline: 'Modernist Architectural Interior Sanctuaries',
    category: 'Luxury Lifestyle & Interiors',
    metrics: '$42M Attributed Pipeline • Design Award Winner',
    image: 'assets/images/velora.jpg',
    challenge:
      'Velora designs bespoke sculptural furniture for ultra-high-net-worth collectors. Their previous presence lacked the spatial scale and architectural gravity of their physical pieces.',
    solution:
      'We built a cinematic digital monograph with raw concrete textures, purple ambient architectural lights, and a private VIP lookbook portal for luxury architects.',
    impact:
      'Directly drove $42M in private client commissions within the first year and captured the International Architectural Digest Design Award.'
  },
  kairo: {
    title: 'Kairo Fitness',
    tagline: 'High-Octane Athletic Cyberpunk Movement',
    category: 'Athletic Fashion & Performance',
    metrics: '14M+ Video Views • +220% Subscription MRR',
    image: 'assets/images/kairo.jpg',
    challenge:
      'Standing out in an athletic apparel market crowded with monotone athletic brands required an electrifying, culture-first narrative.',
    solution:
      'We crafted a high-energy kinetic campaign filmed in subterranean neon-lit tracks with glowing electric purple lines and activated 25 elite runner ambassadors.',
    impact:
      'Over 14M organic views in 60 days, driving a 220% increase in recurring apparel subscriptions and high-retention community loyalty.'
  },
  mysa: {
    title: 'Mysa Coffee',
    tagline: 'Scandinavian Specialty Coffee Roastery',
    category: 'Artisanal Coffee & Retail Launch',
    metrics: 'Sold Out in 48h • 100k+ Bags Shipped',
    image: 'assets/images/mysa.jpg',
    challenge:
      'Single-origin coffee had become commoditized with identical Kraft paper bags. Mysa needed a soulful identity that honored Scandinavian roasting precision.',
    solution:
      'We designed tactile matte black packaging with deep violet hot-stamped foil, paired with a cult community digital drop model.',
    impact:
      'Over 100,000 bags shipped globally in year one and an instant 48-hour sell-out of their debut harvest release.'
  },
  arc: {
    title: 'Arc Studio',
    tagline: 'Explorations in Generative Light & Code',
    category: 'Interactive Web Experience',
    metrics: 'Awwwards Site of the Day • FWA of the Day',
    image: 'assets/images/arc.jpg',
    challenge:
      'Arc Studio required a digital flagship that didn’t just describe their creative technology capability, but actively proved it as an exploratory digital exhibition.',
    solution:
      'We developed a WebGL-powered 3D fluid typography environment running at 60fps that dynamically responds to cursor movement and ambient audio.',
    impact:
      'Awarded Awwwards Site of the Day, FWA of the Day, and generated over 3.2M global design impressions.'
  }
};

function initModals() {
  // Case Study Modal
  const caseModal = document.getElementById('case-modal');
  const projectCards = document.querySelectorAll('.work-card');

  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-project');
      const data = CASE_STUDIES[pid];
      if (data && caseModal) {
        document.getElementById('modal-img').src = data.image;
        document.getElementById('modal-img').alt = data.title;
        document.getElementById('modal-cat').textContent = data.category;
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-tagline').textContent = data.tagline;
        document.getElementById('modal-metrics').textContent = data.metrics;
        document.getElementById('modal-challenge').textContent = data.challenge;
        document.getElementById('modal-solution').textContent = data.solution;
        document.getElementById('modal-impact').textContent = data.impact;

        caseModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Project Inquiry Modal
  const inquiryModal = document.getElementById('inquiry-modal');
  const openInquiryBtns = document.querySelectorAll('.open-inquiry-modal');

  openInquiryBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (inquiryModal) {
        inquiryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Modals
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    const closeBtn = overlay.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(overlay));
    }
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
    }
  });

  function closeModal(overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Inquiry Form Submission
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting...';

      setTimeout(() => {
        alert('Thank you. Your project enquiry is on our radar. We will be in touch shortly.');
        closeModal(inquiryModal);
        inquiryForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Project Enquiry';
      }, 900);
    });
  }
}
