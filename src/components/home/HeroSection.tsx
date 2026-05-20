import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { AnimatedGroup } from '../ui/AnimatedGroup';
import HeroDashboard from './HeroDashboard';
import type { Variants } from 'framer-motion';

const springVariants = {
  item: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { type: 'spring', bounce: 0.3, duration: 1.5 },
    },
  } satisfies Variants,
};

const containerVariants: Variants = {
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.6 },
  },
};

const TRUST_LOGOS = [
  'TechCorp', 'BuildCo', 'LaunchPad', 'ScaleUp',
  'CloudSys', 'DevBase', 'NexaBuild', 'Orbify',
];

export default function HeroSection() {
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);
  const [trustHovered, setTrustHovered] = useState(false);

  useEffect(() => {
    const orb1 = orbRef1.current;
    const orb2 = orbRef2.current;
    if (!orb1 || !orb2) return;

    const ctx = gsap.context(() => {
      gsap.to(orb1, {
        y: -90,
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: '60% top', scrub: true },
      });
      gsap.to(orb2, {
        y: -55,
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: '60% top', scrub: true },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Hero content ──────────────────────────────────────── */}
      <section style={{ overflow: 'hidden', position: 'relative' }}>

        {/* Background orbs */}
        <div
          ref={orbRef1}
          aria-hidden
          className="orb orb-indigo"
          style={{
            position: 'absolute',
            width: 560,
            height: 560,
            top: '-12%',
            right: '-8%',
            zIndex: 0,
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />
        <div
          ref={orbRef2}
          aria-hidden
          className="orb orb-violet"
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            bottom: '15%',
            left: '-6%',
            zIndex: 0,
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />

        <div className="relative pt-24" style={{ zIndex: 1 }}>
          {/* Radial vignette — pulls content into the dark bg */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: -1,
              background: 'radial-gradient(125% 125% at 50% 100%, transparent 0%, var(--bg-primary) 72%)',
              pointerEvents: 'none',
            }}
          />

          {/* ── Text block ──────────────────────────────────── */}
          <div className="container">
            <div style={{ marginLeft: 0 }}>
              <AnimatedGroup
                variants={{ container: containerVariants, ...springVariants }}
              >
                {/* Badge */}
                <div>
                  <span
                    className="chip"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      cursor: 'default',
                    }}
                  >
                    AI-Enabled Software Platforms
                    <ChevronRight size={12} strokeWidth={2} />
                  </span>
                </div>

                {/* Headline */}
                <h1
                  className="text-display"
                  style={{
                    marginTop: 32,
                    maxWidth: '640px',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    textWrap: 'balance',
                  }}
                >
                  We Build{' '}
                  <span className="gradient-text">AI-Enabled</span>
                  <br />
                  Software Platforms
                </h1>

                {/* Sub */}
                <p
                  className="text-body-lg"
                  style={{
                    marginTop: 28,
                    maxWidth: '560px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  For operations, commerce, and marketplaces — from MVP to enterprise scale.
                </p>

                {/* CTAs */}
                <div
                  style={{
                    marginTop: 48,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-default)',
                      borderRadius: 14,
                      padding: 3,
                    }}
                  >
                    <Link to="/contact" className="btn btn-primary" style={{ borderRadius: 11 }}>
                      Book a Call
                    </Link>
                  </div>
                  <Link
                    to="/case-studies"
                    className="btn btn-secondary"
                    style={{ borderRadius: 11 }}
                  >
                    View Case Studies
                  </Link>
                </div>
              </AnimatedGroup>
            </div>
          </div>

          {/* ── App preview ─────────────────────────────────── */}
          <AnimatedGroup
            variants={{ container: containerVariants, ...springVariants }}
          >
            <div
              style={{
                position: 'relative',
                marginTop: 64,
                overflow: 'hidden',
                padding: '0 8px',
              }}
            >
              {/* Gradient fade bottom */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 10,
                  background: 'linear-gradient(to bottom, transparent 35%, var(--bg-primary) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Dashboard card */}
              <div
                className="container"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 20,
                  border: '1px solid var(--border-default)',
                  padding: 16,
                  background: 'var(--bg-card)',
                  boxShadow: '0 4px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(26,111,255,0.06)',
                }}
              >
                <HeroDashboard />
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* ── Trust logos ─────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 64,
          paddingBottom: 96,
        }}
      >
        <div
          style={{
            position: 'relative',
            margin: '0 auto',
            maxWidth: '1024px',
            padding: '0 24px',
          }}
          onMouseEnter={() => setTrustHovered(true)}
          onMouseLeave={() => setTrustHovered(false)}
        >
          {/* Hover reveal label */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: trustHovered ? 1 : 0,
              transform: trustHovered ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 0.5s, transform 0.5s',
              pointerEvents: 'none',
            }}
          >
            <span
              className="text-label"
              style={{
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              Meet our clients
              <ChevronRight size={12} />
            </span>
          </div>

          {/* Logo grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '32px 48px',
              maxWidth: '640px',
              margin: '0 auto',
              transition: 'opacity 0.5s, filter 0.5s',
              opacity: trustHovered ? 0.3 : 1,
              filter: trustHovered ? 'blur(3px)' : 'blur(0px)',
            }}
          >
            {TRUST_LOGOS.map((name) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 28,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
