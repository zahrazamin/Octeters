import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import SectionHeader from '../ui/SectionHeader';
import SectionDivider from '../ui/SectionDivider';

// ─── Mockup 1: CI/CD Pipeline ─────────────────────────────────────────────
const STAGES = [
  { label: 'Build',  cls: 'why1-node-1', connCls: 'why1-conn-1' },
  { label: 'Test',   cls: 'why1-node-2', connCls: 'why1-conn-2' },
  { label: 'Deploy', cls: 'why1-node-3', connCls: null },
];

const LOG_LINES = [
  { cls: 'why1-log-1', icon: '▸', text: 'Installing dependencies…' },
  { cls: 'why1-log-2', icon: '✓', text: 'Build passed (4.2s)',   green: true },
  { cls: 'why1-log-3', icon: '✓', text: 'Tests 47/47 passed',    green: true },
];

function DeployMockup() {
  return (
    <div className="mockup-container why-mockup" style={{ background: '#0d1117' }}>
      <div className="mockup-header" style={{ background: '#161b22', borderBottom: '1px solid rgba(26,111,255,0.15)' }}>
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--accent-light)' }}>pipeline · main</span>
        <div className="why1-live-badge" style={{ marginLeft: 'auto', fontSize: 8, color: 'var(--green)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 3 }}>
          <div className="cs3-status-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
          running
        </div>
      </div>

      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8, height: 'calc(100% - 29px)', overflow: 'hidden' }}>

        {/* Stage nodes */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {STAGES.map(({ label, cls, connCls }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', flex: connCls ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div className={`why1-node ${cls}`} style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 8, transition: 'all 0.3s',
                }} />
                <span style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}>{label}</span>
              </div>
              {connCls && (
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 6px', marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
                  <div className={connCls} style={{ position: 'absolute', inset: 0, background: 'var(--accent)', width: '0%' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Log lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {LOG_LINES.map(({ cls, icon, text, green }) => (
            <div key={cls} className={cls} style={{ display: 'flex', gap: 5, alignItems: 'center', opacity: 0 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: green ? 'var(--green)' : 'var(--text-muted)', flexShrink: 0 }}>{icon}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: green ? 'var(--text-secondary)' : 'var(--text-muted)' }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Deploy toast */}
        <div className="why1-toast" style={{
          opacity: 0, transform: 'translateY(6px)',
          marginTop: 'auto',
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
          borderRadius: 6, padding: '5px 10px',
        }}>
          <span style={{ color: 'var(--green)', fontSize: 10 }}>✓</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--green)' }}>v2.4.1 deployed to prod</span>
        </div>

      </div>
    </div>
  );
}

// ─── Mockup 2: Auto-Scaling ───────────────────────────────────────────────
const BARS = [
  { h: 22, cls: null },
  { h: 28, cls: null },
  { h: 24, cls: null },
  { h: 42, cls: 'why2-bar-spike' },
  { h: 68, cls: 'why2-bar-peak' },
  { h: 55, cls: 'why2-bar-high' },
  { h: 38, cls: null },
  { h: 25, cls: null },
];

const PODS = Array.from({ length: 12 }, (_, i) => i);

function ScaleMockup() {
  return (
    <div className="mockup-container why-mockup" style={{ background: '#0a0e18' }}>
      <div className="mockup-header" style={{ background: '#0f1420', borderBottom: '1px solid rgba(26,111,255,0.15)' }}>
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--accent-light)' }}>autoscaler · prod</span>
        <span style={{ marginLeft: 'auto', fontSize: 8, color: 'var(--amber)', fontFamily: 'var(--font-mono)' }}>scaling…</span>
      </div>

      <div style={{ padding: '8px 12px', height: 'calc(100% - 29px)', display: 'flex', flexDirection: 'column', gap: 7, overflow: 'hidden' }}>

        {/* Bar chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 52, flex: '0 0 52px' }}>
          {BARS.map(({ h, cls }, i) => (
            <div key={i} className={cls ?? undefined} style={{
              flex: 1,
              height: h,
              borderRadius: '2px 2px 0 0',
              background: cls ? 'rgba(26,111,255,0.5)' : 'rgba(26,111,255,0.2)',
              alignSelf: 'flex-end',
              transition: 'height 0.3s ease',
            }} />
          ))}
        </div>

        {/* Metric row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 8, color: 'var(--text-muted)' }}>
            <span style={{ fontSize: 7, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Req/s </span>
            <span className="why2-rps" style={{ color: 'var(--accent-light)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>1,024</span>
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 8, color: 'var(--text-muted)' }}>
            <span style={{ fontSize: 7, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>P99 </span>
            <span style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>44ms</span>
          </div>
        </div>

        {/* Pod grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, alignItems: 'center' }}>
          {PODS.map(i => (
            <div key={i} className={`why2-pod-${i + 1}`} style={{
              height: 8, borderRadius: 2,
              background: 'rgba(26,111,255,0.15)',
              border: '1px solid rgba(26,111,255,0.2)',
            }} />
          ))}
        </div>

        {/* Scale badge */}
        <div className="why2-badge" style={{
          opacity: 0, transform: 'translateY(4px)',
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'rgba(26,111,255,0.1)', border: '1px solid rgba(26,111,255,0.22)',
          borderRadius: 6, padding: '4px 9px',
        }}>
          <span style={{ fontSize: 9, color: 'var(--accent-light)', fontFamily: 'var(--font-mono)' }}>
            Auto-scaled: 3 → 12 instances ✓
          </span>
        </div>

      </div>
    </div>
  );
}

// ─── Mockup 3: Uptime / SLA ───────────────────────────────────────────────
const SLA_ROWS = [
  { label: 'Avg response', value: '44ms',  delta: '↓ 62%', deltaColor: 'var(--green)',   cls: 'why3-row-1' },
  { label: 'Incidents (Q)',value: '0',     delta: '—',      deltaColor: 'var(--text-muted)', cls: 'why3-row-2' },
  { label: 'SLA',          value: '100%',  delta: '✓',      deltaColor: 'var(--green)',   cls: 'why3-row-3' },
];

function SupportMockup() {
  return (
    <div className="mockup-container why-mockup">
      <div className="mockup-header">
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--text-muted)' }}>uptime · 90-day</span>
      </div>

      <div style={{ padding: '8px 12px', height: 'calc(100% - 29px)', display: 'flex', gap: 10, overflow: 'hidden' }}>

        {/* Left: big uptime stat */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 70, flexShrink: 0 }}>
          <div style={{ position: 'relative', width: 56, height: 56 }}>
            <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="28" cy="28" r="23" fill="none" stroke="rgba(26,111,255,0.12)" strokeWidth="3" />
              <circle
                className="why3-ring"
                cx="28" cy="28" r="23"
                fill="none"
                stroke="url(#why3Grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="144.5"
                strokeDashoffset="144.5"
              />
              <defs>
                <linearGradient id="why3Grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--violet)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="why3-stat" style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              opacity: 0,
            }}>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>99.9%</span>
            </div>
          </div>
          <span style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', marginTop: 4, textAlign: 'center' }}>uptime</span>
        </div>

        {/* Right: metric rows + sparkline */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'center' }}>
          {SLA_ROWS.map(({ label, value, delta, deltaColor, cls }) => (
            <div key={cls} className={cls} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0 }}>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>{label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{value}</span>
                <span style={{ fontSize: 8, color: deltaColor, fontFamily: 'var(--font-mono)' }}>{delta}</span>
              </div>
            </div>
          ))}

          {/* Spark — 30 green blocks */}
          <div className="why3-spark" style={{ opacity: 0, display: 'flex', gap: 2, marginTop: 3 }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 6, borderRadius: 1,
                background: i < 28 ? 'rgba(16,185,129,0.45)' : 'rgba(245,158,11,0.4)',
              }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Card data ────────────────────────────────────────────────────────────
const DIFFERENTIATORS = [
  {
    Mockup: DeployMockup,
    title: 'Ship in weeks, not months',
    desc: 'CI/CD from day one, weekly demos, and a bias for shipping. You see working software every sprint — never a six-week design phase with nothing to show.',
  },
  {
    Mockup: ScaleMockup,
    title: 'Architecture that handles growth',
    desc: "We design systems for 10× before you need it. Auto-scaling, horizontal services, sensible caching — your infrastructure won't become a problem you regret at launch.",
  },
  {
    Mockup: SupportMockup,
    title: 'Partners beyond the launch',
    desc: 'We stay on after go-live. Monitoring, on-call support, quarterly retainers — you get a team that has skin in the game, not a handoff document and a wave goodbye.',
  },
];

// ─── Main section ─────────────────────────────────────────────────────────
export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      // ── Parallax: orbs ───────────────────────────────────────────────
      gsap.to('.why-orb-1', {
        y: -110,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.to('.why-orb-2', {
        y: -65, x: -15,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // ── Stagger card depth parallax ──────────────────────────────────
      gsap.utils.toArray<HTMLElement>('.why-card').forEach((card, i) => {
        gsap.to(card, {
          y: -(8 + i * 9),
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      // ── Scroll reveals ───────────────────────────────────────────────
      gsap.fromTo('.why-header-wrap',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 76%', once: true } },
      );

      gsap.fromTo('.why-card',
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: '.why-grid', start: 'top 80%', once: true } },
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        style={{ background: 'var(--bg-secondary)', padding: '100px 0 96px', position: 'relative', overflow: 'hidden' }}
      >
        {/* ── Orbs ─────────────────────────────────────────────────────── */}
        <div className="why-orb-1 orb orb-indigo" style={{
          width: 600, height: 600,
          top: -200, right: -180,
          position: 'absolute', zIndex: 0,
        }} />
        <div className="why-orb-2 orb orb-violet" style={{
          width: 360, height: 360,
          bottom: -90, left: -80,
          position: 'absolute', zIndex: 0,
          opacity: 0.55,
        }} />

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          <div className="why-header-wrap" style={{ opacity: 0 }}>
            <SectionHeader
              label="WHY OCTETERS"
              heading="Built different, delivered different"
              centered
            />
          </div>

          <div className="why-grid">
            {DIFFERENTIATORS.map(({ Mockup, title, desc }) => (
              <div key={title} className="card card-lg why-card" style={{ opacity: 0, display: 'flex', flexDirection: 'column' }}>

                {/* Mockup */}
                <div style={{ marginBottom: 22, borderRadius: 8, overflow: 'hidden' }}>
                  <Mockup />
                </div>

                {/* Text */}
                <h3 className="text-h3" style={{ marginBottom: 12 }}>{title}</h3>
                <p className="text-body-sm" style={{ lineHeight: 1.7 }}>{desc}</p>

              </div>
            ))}
          </div>

        </div>
      </section>
      <SectionDivider />
    </>
  );
}
