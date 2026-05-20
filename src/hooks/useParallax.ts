import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Moves an element at `speed` × the section's scroll range.
 * speed = 0.3 → element moves 30% as fast as the page (orbs, grids).
 * speed = -0.15 → slight upward drift (testimonial quote mark).
 */
export function useParallax<T extends Element>(speed = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const section = ref.current.closest('section') ?? document.body;

    const ctx = gsap.context(() => {
      gsap.to(ref.current!, {
        yPercent: -20 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Hero mockup 3D tilt — settles from rotateX(5deg) to 0 over the first 300px of scroll.
 */
export function useHeroMockupRise<T extends Element>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!,
        { rotateX: 5, y: 40, transformPerspective: 1000 },
        {
          rotateX: 0,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '+=300',
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Scales an element from 1x to 1.1x as it approaches viewport center.
 * Used for the CTA orb convergence effect.
 */
export function useScaleOnScroll<T extends Element>(from = 1, to = 1.1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!,
        { scale: from },
        {
          scale: to,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [from, to]);

  return ref;
}

export { ScrollTrigger };
