import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import SectionHeader from '../ui/SectionHeader';
import SectionDivider from '../ui/SectionDivider';

// ─── Data ─────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: 'Octeters built our entire platform from scratch in 14 weeks. The code quality and architecture looked like it came from a 20-person in-house team.',
    name: 'James R.',
    role: 'CTO',
    company: 'buy.ca',
    initials: 'JR',
    avatarColor: 'var(--accent)',
    avatarBg: 'rgba(26,111,255,0.12)',
  },
  {
    quote: "They understood our product vision better than any agency we've ever worked with. Every sprint shipped on time, every feature landed exactly as scoped.",
    name: 'Priya M.',
    role: 'Founder & CEO',
    company: 'MintCRM',
    initials: 'PM',
    avatarColor: 'var(--violet)',
    avatarBg: 'rgba(0,180,216,0.12)',
  },
  {
    quote: 'Rare to find a shop that does design and engineering at this calibre simultaneously. The UI polish alone would have cost us three senior designers.',
    name: 'Daniel K.',
    role: 'VP Product',
    company: 'Agent 360',
    initials: 'DK',
    avatarColor: 'var(--green)',
    avatarBg: 'rgba(16,185,129,0.12)',
  },
  {
    quote: 'We needed a partner who could move fast without breaking things. Octeters delivered exactly that — zero production incidents in the first six months.',
    name: 'Sofia T.',
    role: 'Head of Engineering',
    company: 'PropStack',
    initials: 'ST',
    avatarColor: 'var(--amber)',
    avatarBg: 'rgba(245,158,11,0.12)',
  },
  {
    quote: 'The team integrates like full-time employees, not contractors. Our codebase is more maintainable today than the day we handed it to them.',
    name: 'Marcus L.',
    role: 'CTO',
    company: 'TradeLoop',
    initials: 'ML',
    avatarColor: '#1A6FFF',
    avatarBg: 'rgba(26,111,255,0.12)',
  },
  {
    quote: 'Six months post-launch the system handles 10× expected load without a single architectural change. The engineering decisions they made were exactly right.',
    name: 'Ayesha N.',
    role: 'CPO',
    company: 'ShipFast',
    initials: 'AN',
    avatarColor: 'var(--accent-light)',
    avatarBg: 'rgba(77,148,255,0.12)',
  },
];

// Row B uses a shifted order so the two tracks look distinct
const ROW_B = [
  TESTIMONIALS[3],
  TESTIMONIALS[4],
  TESTIMONIALS[5],
  TESTIMONIALS[0],
  TESTIMONIALS[1],
  TESTIMONIALS[2],
];

// ─── Card ─────────────────────────────────────────────────────────────────
interface TCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarColor: string;
  avatarBg: string;
}

function TestimonialCard({ quote, name, role, company, initials, avatarColor, avatarBg }: TCardProps) {
  return (
    <div className="testi-card card">
      {/* Stars */}
      <div className="testi-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="var(--amber)">
            <path d="M7 1l1.55 3.14L12 4.76l-2.5 2.44.59 3.44L7 9.01 4.91 10.64l.59-3.44L3 4.76l3.45-.62L7 1z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="testi-quote">"{quote}"</p>

      {/* Divider */}
      <div className="testi-divider" />

      {/* Author */}
      <div className="testi-author">
        <div className="testi-avatar" style={{ borderColor: avatarColor, background: avatarBg }}>
          <span style={{ color: avatarColor }}>{initials}</span>
        </div>
        <div>
          <div className="testi-name">{name}</div>
          <div className="testi-role">{role}, {company}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      // ── Parallax: orbs ───────────────────────────────────────────────
      gsap.to('.testi-orb-1', {
        y: -100,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.to('.testi-orb-2', {
        y: -60, x: 20,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // ── Grid parallax ────────────────────────────────────────────────
      gsap.to('.testi-grid', {
        y: -25,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // ── Scroll reveals ───────────────────────────────────────────────
      gsap.fromTo('.testi-header-wrap',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 76%', once: true } },
      );

      gsap.fromTo('.testi-marquee-outer',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '.testi-marquee-outer', start: 'top 85%', once: true } },
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        style={{ background: 'var(--bg-primary)', padding: '100px 0 96px', position: 'relative', overflow: 'hidden' }}
      >
        {/* ── Orbs ─────────────────────────────────────────────────────── */}
        <div className="testi-orb-1 orb orb-violet" style={{
          width: 560, height: 560,
          bottom: -180, left: -160,
          position: 'absolute', zIndex: 0,
        }} />
        <div className="testi-orb-2 orb orb-indigo" style={{
          width: 380, height: 380,
          top: -100, right: -100,
          position: 'absolute', zIndex: 0,
          opacity: 0.6,
        }} />

        {/* ── Grid ─────────────────────────────────────────────────────── */}
        <div className="testi-grid grid-bg" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        }} />

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="testi-header-wrap" style={{ opacity: 0 }}>
            <SectionHeader
              label="SOCIAL PROOF"
              heading="Trusted by product teams"
              centered
            />
          </div>
        </div>

        {/* ── Marquee ───────────────────────────────────────────────── */}
        <div className="testi-marquee-outer" style={{ opacity: 0, position: 'relative', zIndex: 1 }}>
          {/* Row 1 — scrolls left */}
          <div className="testi-track testi-track-left">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>

          {/* Row 2 — scrolls right */}
          <div className="testi-track testi-track-right">
            {[...ROW_B, ...ROW_B].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>
      <SectionDivider />
    </>
  );
}
