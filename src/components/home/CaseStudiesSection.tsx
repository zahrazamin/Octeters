import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import SectionHeader from '../ui/SectionHeader';
import SectionDivider from '../ui/SectionDivider';
import Button from '../ui/Button';

// ─── Mockup 1: buy.ca ─────────────────────────────────────────────────────
const BUYCA_LISTINGS = [
  { addr: '123 Queen St', price: '$489,000', score: '96%' },
  { addr: '456 King West', price: '$675,000', score: '87%' },
];
const BUYCA_PINS = [
  { top: '22%', left: '28%', cls: 'cs1-pin-1' },
  { top: '48%', left: '58%', cls: 'cs1-pin-2' },
  { top: '65%', left: '38%', cls: 'cs1-pin-3' },
];
const BUYCA_FILTERS = ['Condos', '2+ bed', '$500K–1M'];

function BuyCaMockup() {
  return (
    <div className="mockup-container cs-mockup">
      {/* Search bar */}
      <div style={{
        padding: '7px 12px',
        borderBottom: '1px solid var(--border-default)',
        background: 'var(--bg-elevated)',
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <circle cx="4.5" cy="4.5" r="3.2" stroke="var(--text-muted)" strokeWidth="1.2" />
          <line x1="7" y1="7" x2="10" y2="10" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {/* Typing text via CSS width animation */}
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', flex: 1 }}>
          <span className="cs1-search-text" style={{
            fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)',
            display: 'inline-block', width: 0, overflow: 'hidden', whiteSpace: 'nowrap',
          }}>
            Toronto condos, ON
          </span>
          <span className="prop-cursor" style={{ fontSize: 10, color: 'var(--accent-light)' }}>▋</span>
        </div>
        <div style={{ fontSize: 9, color: 'var(--accent-light)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Search</div>
      </div>

      {/* Body: listings + map */}
      <div style={{ display: 'flex', height: 'calc(100% - 31px - 26px)', overflow: 'hidden' }}>
        {/* Listings */}
        <div style={{ flex: 1, padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: 5, borderRight: '1px solid var(--border-default)', overflow: 'hidden' }}>
          {BUYCA_LISTINGS.map(({ addr, price, score }, i) => (
            <div key={addr} className={`cs1-listing-${i + 1}`} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-default)',
              borderRadius: 6, padding: '5px 8px',
              opacity: 0,
            }}>
              <div style={{ fontSize: 9.5, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>{addr}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                <span style={{ fontSize: 10, color: 'var(--accent-light)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{price}</span>
                <span style={{ fontSize: 8, color: 'var(--green)', background: 'rgba(16,185,129,0.12)', padding: '1px 5px', borderRadius: 3, fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                  AI {score}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div style={{ width: 90, background: 'rgba(26,111,255,0.04)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <svg width="90" height="100%" viewBox="0 0 90 130" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
            <line x1="0" y1="44" x2="90" y2="44" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            <line x1="0" y1="88" x2="90" y2="88" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            <line x1="30" y1="0" x2="30" y2="130" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            <line x1="62" y1="0" x2="62" y2="130" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
          </svg>
          {BUYCA_PINS.map(({ top, left, cls }) => (
            <div key={cls} className={cls} style={{ position: 'absolute', top, left, transform: 'translate(-50%, -100%)', opacity: 0 }}>
              <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
                <path d="M6.5 0C3 0 0 3 0 6.5c0 4.8 6.5 10.5 6.5 10.5S13 11.3 13 6.5C13 3 10 0 6.5 0z" fill="var(--accent)" />
                <circle cx="6.5" cy="6.5" r="2.2" fill="white" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ padding: '5px 8px', borderTop: '1px solid var(--border-default)', display: 'flex', gap: 4 }}>
        {BUYCA_FILTERS.map((f, i) => (
          <span key={f} className={`cs1-filter-${i + 1}`} style={{
            fontSize: 8, padding: '2px 6px',
            background: 'rgba(26,111,255,0.1)', border: '1px solid rgba(26,111,255,0.18)',
            borderRadius: 9999, color: 'var(--accent-light)', fontFamily: 'var(--font-sans)',
            opacity: 0,
          }}>{f}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Mockup 2: MintCRM ────────────────────────────────────────────────────
const MINT_CLIENTS = [
  { name: 'AlphaCorp',  note: 'Invoice due in 2d' },
  { name: 'BetaLLC',    note: 'Deadline: Jun 3'   },
  { name: 'GammaCo',    note: 'Meeting today'      },
];
const MINT_TIMELINE = [
  { time: '09:00', text: 'Contract signed',   done: true  },
  { time: '09:15', text: 'Invoice sent',      done: true  },
  { time: '09:30', text: 'Meeting booked',    done: false, isNew: true },
];

function MintCrmMockup() {
  return (
    <div className="mockup-container cs-mockup">
      <div className="mockup-header">
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--text-muted)' }}>MintCRM</span>
      </div>
      <div style={{ display: 'flex', height: 'calc(100% - 29px)', overflow: 'hidden' }}>
        {/* Client list */}
        <div style={{ width: '45%', borderRight: '1px solid var(--border-default)', padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: 4, overflow: 'hidden' }}>
          <div style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 2 }}>Clients</div>
          {MINT_CLIENTS.map(({ name, note }, i) => (
            <div key={name} className={`cs2-client-${i + 1}`} style={{
              display: 'flex', flexDirection: 'column', gap: 1,
              padding: '4px 6px',
              background: i === 0 ? 'rgba(26,111,255,0.08)' : 'transparent',
              borderRadius: 4,
              borderLeft: `2px solid ${i === 0 ? 'var(--accent)' : 'transparent'}`,
              opacity: 0,
            }}>
              <span style={{ fontSize: 9.5, color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>{name}</span>
              <span style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>{note}</span>
            </div>
          ))}
        </div>

        {/* Activity timeline */}
        <div style={{ flex: 1, padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
          <div style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 2 }}>Activity</div>
          {MINT_TIMELINE.map(({ time, text, done, isNew }, i) => (
            <div key={text} className={isNew ? 'cs2-new-item' : `cs2-item-${i + 1}`} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              opacity: isNew ? 0 : 0,
              ...(isNew ? { transform: 'translateX(-6px)' } : {}),
            }}>
              <span style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: 30 }}>{time}</span>
              {done && <span style={{ color: 'var(--green)', fontSize: 8 }}>✓</span>}
              {isNew && <span style={{ color: 'var(--accent-light)', fontSize: 7, fontWeight: 700, fontFamily: 'var(--font-heading)', background: 'rgba(26,111,255,0.15)', padding: '1px 4px', borderRadius: 3 }}>NEW</span>}
              <span style={{ fontSize: 9, color: done ? 'var(--text-muted)' : 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>{text}</span>
            </div>
          ))}
          {/* Progress bar */}
          <div className="cs2-progress-wrap" style={{ marginTop: 4, opacity: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>
              <span>Q2 Progress</span><span>72%</span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
              <div className="cs2-progress" style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--violet))', width: '0%', borderRadius: 2 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mockup 3: Agent 360 ──────────────────────────────────────────────────
function Agent360Mockup() {
  return (
    <div className="mockup-container cs-mockup" style={{ background: '#0a0e18' }}>
      <div className="mockup-header" style={{ background: '#0f1420', borderBottom: '1px solid rgba(26,111,255,0.2)' }}>
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--accent-light)' }}>Agent 360</span>
      </div>
      <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden', height: 'calc(100% - 29px)' }}>
        {/* Agent status bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(26,111,255,0.08)', border: '1px solid rgba(26,111,255,0.2)',
          borderRadius: 6, padding: '5px 8px',
        }}>
          <div className="cs3-status-dot" style={{
            width: 7, height: 7, borderRadius: '50%', background: 'var(--green)',
            flexShrink: 0,
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, color: 'var(--accent-light)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Agent Active</div>
            <div className="cs3-processing" style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', opacity: 0 }}>
              Processing: invoice_batch_Q3.pdf
            </div>
          </div>
        </div>

        {/* User message */}
        <div className="cs3-user-msg" style={{ opacity: 0, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{
            background: 'rgba(26,111,255,0.18)', border: '1px solid rgba(26,111,255,0.25)',
            borderRadius: '8px 8px 2px 8px', padding: '4px 8px',
            fontSize: 9, color: 'var(--accent-light)', maxWidth: '80%',
          }}>
            Process Q3 invoices and flag anomalies
          </div>
        </div>

        {/* Typing dots */}
        <div className="cs3-dots-wrap" style={{ opacity: 0, display: 'flex', gap: 3, alignItems: 'center' }}>
          <div className="svc3-dot" />
          <div className="svc3-dot" style={{ animationDelay: '0.2s' }} />
          <div className="svc3-dot" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Agent response */}
        <div className="cs3-response" style={{ opacity: 0 }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(26,111,255,0.15)',
            borderRadius: '2px 8px 8px 8px', padding: '4px 8px',
            fontSize: 9, color: 'var(--text-secondary)', lineHeight: 1.5,
          }}>
            Found <span style={{ color: 'var(--amber)', fontWeight: 600 }}>3 anomalies</span> — $12,400 variance flagged for review...
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Card data ────────────────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    id: 'buyca',
    Mockup: BuyCaMockup,
    client: 'buy.ca',
    what: 'PropTech platform with AI-powered search and investor tools',
    outcome: 'Data-rich listings platform serving Canadian real estate investors',
    tags: ['Marketplace', 'AI', 'PropTech'],
    link: '/case-studies/buyca',
  },
  {
    id: 'mintcrm',
    Mockup: MintCrmMockup,
    client: 'MintCRM',
    what: 'Vertical SaaS for accounting firm operations',
    outcome: 'Workflow automation for deadlines, clients, and team management',
    tags: ['SaaS', 'B2B Operations', 'Automation'],
    link: '/case-studies/mintcrm',
  },
  {
    id: 'agent360',
    Mockup: Agent360Mockup,
    client: 'Agent 360',
    what: 'AI-powered agent platform for intelligent automation',
    outcome: 'Autonomous agents handling complex business processes end-to-end',
    tags: ['AI', 'Agents', 'Platform'],
    link: '/case-studies/agent360',
  },
];

// ─── Main section ─────────────────────────────────────────────────────────
export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      // ── Parallax: orbs ──────────────────────────────────────────────
      gsap.to('.cs-orb-1', {
        y: -90,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.to('.cs-orb-2', {
        y: -55, x: -20,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // ── Parallax: staggered card depth ──────────────────────────────
      gsap.utils.toArray<HTMLElement>('.case-study-card').forEach((card, i) => {
        gsap.to(card, {
          y: -(10 + i * 8),
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      // ── Scroll reveals ───────────────────────────────────────────────
      gsap.fromTo('.cs-header-wrap',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 76%', once: true } },
      );

      gsap.fromTo('.case-study-card',
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.14,
          scrollTrigger: { trigger: '.cs-grid', start: 'top 80%', once: true } },
      );

      gsap.fromTo('.cs-footer',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.cs-grid', start: 'top 65%', once: true } },
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
        {/* Orbs */}
        <div className="cs-orb-1 orb orb-violet" style={{
          width: 500, height: 500,
          top: -160, right: -140,
          position: 'absolute', zIndex: 0,
        }} />
        <div className="cs-orb-2 orb orb-indigo" style={{
          width: 360, height: 360,
          bottom: -100, left: -80,
          position: 'absolute', zIndex: 0,
          opacity: 0.7,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div className="cs-header-wrap" style={{ opacity: 0 }}>
            <SectionHeader
              label="PROOF"
              heading="What we've built"
              centered
            />
          </div>

          {/* Cards */}
          <div className="cs-grid">
            {CASE_STUDIES.map(({ id, Mockup, client, what, outcome, tags, link }) => (
              <div key={id} className="card card-lg case-study-card" style={{ opacity: 0, display: 'flex', flexDirection: 'column' }}>

                {/* Mockup */}
                <div style={{ marginBottom: 22, borderRadius: 8, overflow: 'hidden' }}>
                  <Mockup />
                </div>

                {/* Client name */}
                <h3 className="text-h3" style={{ marginBottom: 10 }}>{client}</h3>

                {/* What we built */}
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 13,
                  color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 10,
                }}>
                  {what}
                </p>

                {/* Outcome */}
                <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 18 }}>
                  <span style={{ color: 'var(--green)', fontSize: 13, lineHeight: 1.6, flexShrink: 0 }}>✓</span>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {outcome}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' as const, marginBottom: 20 }}>
                  {tags.map(t => <span key={t} className="chip">{t}</span>)}
                </div>

                {/* Link */}
                <Link to={link} className="cs-read-link" style={{ marginTop: 'auto' }}>
                  Read case study →
                </Link>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="cs-footer" style={{ textAlign: 'center', marginTop: 56, opacity: 0 }}>
            <Button to="/case-studies" variant="secondary">
              View all case studies
            </Button>
          </div>

        </div>
      </section>
      <SectionDivider />
    </>
  );
}
