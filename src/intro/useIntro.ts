import { useEffect, type RefObject, type MutableRefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { runCurtainReveal } from './curtain';
import { initLenis } from '../lib/lenis';

interface UseIntroRefs {
  overlayRef: RefObject<HTMLDivElement | null>;
  canvasRef:  RefObject<HTMLCanvasElement | null>;
  lettersRef: MutableRefObject<(HTMLSpanElement | null)[]>;
  skipRef:    RefObject<HTMLButtonElement | null>;
}

// Per-letter target opacity and color: O(dim/blue) → s(bright/white)
export const LETTER_OPACITIES = [0.28, 0.38, 0.50, 0.62, 0.72, 0.83, 0.92, 1.00];
export const LETTER_COLORS    = [
  '#6070A0', // O — 0.28 — muted blue, dissolves into dark
  '#B0BEDE', // c — 0.38 — cool blue-grey
  '#B0BEDE', // t — 0.50
  '#B0BEDE', // e — 0.62
  '#E8EEFF',  // t — 0.72 — slight blue tint
  '#E8EEFF',  // e — 0.83
  '#FFFFFF',  // r — 0.92 — clean white, fully lit
  '#FFFFFF',  // s — 1.00
];

function triggerHeroAnimations(): void {
  initLenis();
  ScrollTrigger.refresh();
}

function drawLight(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  pulse: number,
  isMobile: boolean,
): void {
  ctx.clearRect(0, 0, w, h);

  // Near-pure black base
  ctx.fillStyle = '#000005';
  ctx.fillRect(0, 0, w, h);

  const lightX = isMobile ? w * 0.95 : w * 1.02;

  // Layer 1: white-blue point light anchored to right edge
  const main = ctx.createRadialGradient(lightX, h * 0.48, 0, lightX, h * 0.48, w * 0.55);
  main.addColorStop(0.00, `rgba(220, 235, 255, ${(0.80 * pulse).toFixed(3)})`);
  main.addColorStop(0.15, `rgba(140, 180, 255, ${(0.40 * pulse).toFixed(3)})`);
  main.addColorStop(0.35, `rgba(26,  111, 255, ${(0.15 * pulse).toFixed(3)})`);
  main.addColorStop(0.60, `rgba(10,   60, 200, ${(0.05 * pulse).toFixed(3)})`);
  main.addColorStop(1.00, 'rgba(0, 0, 0, 0.00)');
  ctx.fillStyle = main;
  ctx.fillRect(0, 0, w, h);

  // Layer 2: very faint brand-blue atmosphere, right-center
  const atmos = ctx.createRadialGradient(w * 0.78, h * 0.50, 0, w * 0.78, h * 0.50, w * 0.38);
  atmos.addColorStop(0.00, `rgba(26, 111, 255, ${(0.08 * pulse).toFixed(3)})`);
  atmos.addColorStop(0.50, `rgba(26, 111, 255, ${(0.03 * pulse).toFixed(3)})`);
  atmos.addColorStop(1.00, 'rgba(0, 0, 0, 0.00)');
  ctx.fillStyle = atmos;
  ctx.fillRect(0, 0, w, h);
}

export function useIntro(refs: UseIntroRefs): void {
  useEffect(() => {
    const { overlayRef, canvasRef, lettersRef, skipRef } = refs;
    const overlay = overlayRef.current;
    const canvas  = canvasRef.current;
    if (!overlay || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let time = 0;
    let curtainTriggered = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const mobile = (): boolean => window.innerWidth < 768;

    const sizeCanvas = (): void => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    sizeCanvas();

    const killAndReset = (): void => {
      timers.forEach(clearTimeout);
      timers.length = 0;
      cancelAnimationFrame(rafId);
      lettersRef.current.forEach(el => {
        if (!el) return;
        gsap.killTweensOf(el);
        gsap.set(el, { opacity: 0, y: 12 });
      });
      if (skipRef.current) {
        gsap.killTweensOf(skipRef.current);
        gsap.set(skipRef.current, { opacity: 0 });
      }
      gsap.killTweensOf(canvas);
      gsap.set(canvas, { opacity: 0 });
    };

    // ── Return visit: fast curtain fade ──────────────────────────────
    const seen = sessionStorage.getItem('octeters_intro_seen');
    if (seen === 'true') {
      gsap.to('#intro-curtain', {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => {
          document.getElementById('intro-curtain')?.remove();
          overlay.style.display = 'none';
          triggerHeroAnimations();
        },
      });
      return;
    }

    // ── Reduced motion ────────────────────────────────────────────────
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      sizeCanvas();
      drawLight(ctx, canvas.width, canvas.height, 1, mobile());
      gsap.set(canvas, { opacity: 1 });
      lettersRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: LETTER_OPACITIES[i] ?? 1, y: 0 });
      });
      const t = setTimeout(() => {
        runCurtainReveal(null, null, () => {
          document.getElementById('intro-curtain')?.remove();
          overlay.style.display = 'none';
          sessionStorage.setItem('octeters_intro_seen', 'true');
          triggerHeroAnimations();
        });
      }, 800);
      return () => clearTimeout(t);
    }

    // ── Full intro ────────────────────────────────────────────────────

    gsap.set(canvas, { opacity: 0 });
    lettersRef.current.forEach(el => { if (el) gsap.set(el, { opacity: 0, y: 12 }); });
    if (skipRef.current) gsap.set(skipRef.current, { opacity: 0 });
    // Animate loop — runs immediately; canvas CSS opacity controls visibility
    const animate = (): void => {
      time += 0.008;
      const pulse = 0.92 + Math.sin(time) * 0.08;
      drawLight(ctx, canvas.width, canvas.height, pulse, mobile());
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = (): void => { sizeCanvas(); };
    window.addEventListener('resize', onResize);

    function startCurtainReveal(): void {
      if (curtainTriggered) return;
      curtainTriggered = true;
      timers.forEach(clearTimeout);
      if (skipRef.current) skipRef.current.style.pointerEvents = 'none';

      // Letters fade out right → left
      const letters = lettersRef.current;
      letters.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
          delay: (letters.length - 1 - i) * 0.06,
        });
      });

      // Canvas fade + curtain slide
      runCurtainReveal(canvas, null, () => {
        document.getElementById('intro-curtain')?.remove();
        cancelAnimationFrame(rafId);
        if (overlay) overlay.style.display = 'none';
        sessionStorage.setItem('octeters_intro_seen', 'true');
        triggerHeroAnimations();
      });
    }

    // t = 0.0s — light source blooms in slowly (1.8s, dramatic)
    gsap.to(canvas, { opacity: 1, duration: 1.8, ease: 'power2.out' });

    // t = 1.4s — letters stagger in left → right, slow and weighted
    lettersRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: LETTER_OPACITIES[i] ?? 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.4 + i * 0.1,
      });
    });

    // t = 3.2s — skip button appears (during hold)
    timers.push(setTimeout(() => {
      if (skipRef.current) gsap.to(skipRef.current, { opacity: 1, duration: 0.4 });
    }, 3200));

    // t = 4.2s — auto reveal (0.8s cinematic hold after text settles ~3.0s)
    timers.push(setTimeout(startCurtainReveal, 4200));

    const handleSkip = (): void => startCurtainReveal();
    skipRef.current?.addEventListener('click', handleSkip);

    return () => {
      killAndReset();
      skipRef.current?.removeEventListener('click', handleSkip);
      window.removeEventListener('resize', onResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
