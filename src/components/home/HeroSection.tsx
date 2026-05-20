import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AnimatedGroup } from '../ui/AnimatedGroup';
import HeroDashboard from './HeroDashboard';
import { ShinyButton } from '../ui/shiny-button';
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
  const [trustHovered, setTrustHovered] = useState(false);

  return (
    <>
      {/* ── Hero content ──────────────────────────────────────── */}
      <section style={{
          overflow: 'hidden',
          position: 'relative',
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}>

        <div className="relative pt-52" style={{ zIndex: 1 }}>

          {/* ── Text block ──────────────────────────────────── */}
          <div className="container">
            <AnimatedGroup variants={{ container: containerVariants, ...springVariants }}>

              {/* Badge */}
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'default',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.03))',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 9999,
                    padding: '3px 10px 3px 3px',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <span style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0.06))',
                    borderRadius: 9999,
                    padding: '2px 8px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#fff',
                    letterSpacing: '0.02em',
                  }}>
                    AI-Enabled
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 12,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.85)',
                    letterSpacing: '0.01em',
                  }}>
                    Software Platforms
                  </span>
                </span>
              </div>

              {/* Headline + Subtitle row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                gap: '24px',
                marginTop: 12,
              }}>
                {/* Left: headline */}
                <div>
                  <h1
                    className="text-display"
                    style={{
                      color: '#fff',
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    We Build AI-Enabled
                    <br />
                    Software Platforms
                  </h1>
                </div>

                {/* Right: subtitle + CTAs */}
                <div style={{ maxWidth: '340px', transform: 'translateX(-40px)' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 16,
                      color: '#fff',
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    Leverage AI to build software platforms for operations, commerce, and marketplaces. More capabilities in fewer sprints — guided by your own business data.
                  </p>
                  <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ShinyButton to="/contact">Book a Call</ShinyButton>
                    <Link to="/case-studies" className="btn btn-secondary" style={{ borderRadius: 11 }}>
                      View Case Studies
                    </Link>
                  </div>
                </div>
              </div>

            </AnimatedGroup>
          </div>

          {/* ── App preview ─────────────────────────────────── */}
          <AnimatedGroup
            variants={{ container: containerVariants, ...springVariants }}
          >
            <div
              style={{
                position: 'relative',
                marginTop: 32,
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
