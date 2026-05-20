import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface RevealOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  start?: string;
  once?: boolean;
}

/** Fade-up reveal for a single element. */
export function useReveal<T extends Element>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      from = { opacity: 0, y: 30 },
      to   = { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      start = 'top 88%',
      once  = true,
    } = options;

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!, from, {
        ...to,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/** Staggered reveal for a list of child elements matching `selector`. */
export function useStagger<T extends Element>(
  selector: string,
  staggerAmount = 0.1,
  start = 'top 88%'
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: staggerAmount,
          scrollTrigger: {
            trigger: ref.current,
            start,
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [selector, staggerAmount, start]);

  return ref;
}

/** Section divider sweep — scaleX 0→1 on enter. */
export function useDividerReveal<T extends Element>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 95%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

export { ScrollTrigger };
