import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import SectionHeader from '../ui/SectionHeader';
import SectionDivider from '../ui/SectionDivider';

// ─── Pipeline constants ───────────────────────────────────────────────────
const NODE_X = ['8%', '36%', '63%', '88%'];
const NODE_LABELS = ['Discovery', 'Design', 'Build', 'Launch'];

const STATUSES = [
  { cls: 'pipe-status-1', label: 'New',        color: 'var(--text-muted)', bg: 'rgba(107,114,128,0.14)' },
  { cls: 'pipe-status-2', label: 'In Review',  color: 'var(--amber)',      bg: 'rgba(245,158,11,0.14)'  },
  { cls: 'pipe-status-3', label: 'Building',   color: 'var(--blue)',       bg: 'rgba(26,111,255,0.14)'  },
  { cls: 'pipe-status-4', label: 'Delivered',  color: 'var(--green)',      bg: 'rgba(16,185,129,0.14)'  },
];

// ─── Pipeline file card ───────────────────────────────────────────────────
function PipelineCard({ delay }: { delay: string }) {
  return (
    <div className="pipe-card" style={{ animationDelay: delay }}>
      {/* File icon + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
          <path d="M1 0h5.5L9 2.5V11a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1z" fill="rgba(26,111,255,0.15)" stroke="var(--accent)" strokeWidth="0.8" />
          <path d="M5.5 0v2.5H9" stroke="var(--accent)" strokeWidth="0.8" fill="none" />
        </svg>
        <span style={{ fontSize: 8, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
          project_brief.pdf
        </span>
      </div>
      {/* Status badges — one visible at a time */}
      <div style={{ position: 'relative', height: 14 }}>
        {STATUSES.map(({ cls, label, color, bg }) => (
          <span
            key={cls}
            className={cls}
            style={{
              position: 'absolute', left: 0, top: 0,
              fontSize: 7, fontWeight: 600, color, background: bg,
              padding: '2px 5px', borderRadius: 3,
              fontFamily: 'var(--font-heading)',
              opacity: 0, whiteSpace: 'nowrap',
              animationDelay: delay,
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Step card data ───────────────────────────────────────────────────────
const STEPS = [
  { num: '01', title: 'Discovery & Scope',     desc: 'We learn your business, define outcomes, estimate honestly.' },
  { num: '02', title: 'Design & Architecture', desc: 'UI/UX design, system architecture, tech stack decision.' },
  { num: '03', title: 'Build & Ship',          desc: 'Agile sprints, weekly demos, CI/CD from day one.' },
  { num: '04', title: 'Launch & Support',      desc: 'Go live with confidence. Long-term support after launch.' },
];

// ─── Main section ─────────────────────────────────────────────────────────
export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      // ── Parallax: orbs drift upward at different rates ───────────────
      gsap.to('.proc-orb-1', {
        y: -130,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.to('.proc-orb-2', {
        y: -75,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.to('.proc-orb-3', {
        y: -45, x: 25,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // ── Parallax: grid drifts slower ─────────────────────────────────
      gsap.to('.proc-grid', {
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // ── Parallax: pipeline floats up subtly ───────────────────────────
      gsap.to('.proc-pipeline-wrap', {
        y: -18,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // ── Scroll reveals ────────────────────────────────────────────────
      gsap.fromTo('.proc-header-wrap',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 76%', once: true } },
      );

      gsap.fromTo('.proc-pipeline-inner',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.proc-pipeline-wrap', start: 'top 82%', once: true } },
      );

      gsap.fromTo('.process-step-card',
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.process-steps-grid', start: 'top 84%', once: true } },
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
        {/* ── Decorative orbs ──────────────────────────────────────────── */}
        <div className="proc-orb-1 orb orb-indigo" style={{
          width: 640, height: 640,
          top: -220, left: -180,
          position: 'absolute', zIndex: 0,
        }} />
        <div className="proc-orb-2 orb orb-violet" style={{
          width: 440, height: 440,
          bottom: -120, right: -120,
          position: 'absolute', zIndex: 0,
        }} />
        <div className="proc-orb-3 orb orb-indigo" style={{
          width: 280, height: 280,
          top: '38%', right: '12%',
          position: 'absolute', zIndex: 0,
          opacity: 0.45,
        }} />

        {/* ── Grid ─────────────────────────────────────────────────────── */}
        <div className="proc-grid grid-bg" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        }} />

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div className="proc-header-wrap" style={{ opacity: 0 }}>
            <SectionHeader
              label="HOW WE WORK"
              heading="From first call to live product"
              centered
            />
          </div>

          {/* Pipeline — desktop only */}
          <div className="proc-pipeline-wrap" style={{ marginBottom: 72 }}>
            <div className="proc-pipeline-inner" style={{ opacity: 0 }}>
              <div className="process-pipeline">

                {/* Track line with flowing dashes */}
                <div className="pipe-track" style={{
                  position: 'absolute',
                  top: 44, left: '8%', right: '8%', height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(26,111,255,0.25) 20%, rgba(26,111,255,0.45) 50%, rgba(26,111,255,0.25) 80%, transparent)',
                }}>
                  <div className="pipe-flow-dashes" />
                </div>

                {/* Stage nodes */}
                {NODE_X.map((x, i) => (
                  <div key={i} style={{ position: 'absolute', top: 37, left: x, transform: 'translateX(-50%)' }}>
                    <div className={`pipe-node-dot pipe-node-${i + 1}`} />
                    <div style={{
                      position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
                      fontSize: 9, color: 'var(--text-muted)', whiteSpace: 'nowrap',
                      fontFamily: 'var(--font-sans)', letterSpacing: '0.04em',
                    }}>
                      {NODE_LABELS[i]}
                    </div>
                  </div>
                ))}

                {/* File cards — two staggered for continuous flow */}
                <PipelineCard delay="0s" />
                <PipelineCard delay="-6s" />

              </div>
            </div>
          </div>

          {/* Step cards */}
          <div className="process-steps-grid">
            {STEPS.map(({ num, title, desc }, i) => (
              <div
                key={num}
                className={`card process-step-card proc-step-glow-${i + 1}`}
                style={{ opacity: 0 }}
              >
                <div className="proc-step-num">{num}</div>
                <h4 className="text-h4" style={{ marginBottom: 10 }}>{title}</h4>
                <p className="text-body-sm">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
      <SectionDivider />
    </>
  );
}
