import { gsap } from 'gsap';

/**
 * Animate out the intro (canvas + text fade, curtain slides up).
 * The #intro-curtain div is injected in index.html before React mounts.
 */
export function runCurtainReveal(
  canvasEl: HTMLElement | null,
  textEl: HTMLElement | null,
  onComplete: () => void,
): void {
  const tl = gsap.timeline({ onComplete });

  const targets = [canvasEl, textEl].filter(Boolean) as HTMLElement[];

  if (targets.length) {
    tl.to(targets, { opacity: 0, duration: 0.6, ease: 'power2.in' });
  }

  tl.to(
    '#intro-curtain',
    { y: '-100vh', duration: 1.2, ease: 'power3.inOut' },
    targets.length ? '-=0.2' : '0',
  );
}
