import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import SectionHeader from '../ui/SectionHeader';
import SectionDivider from '../ui/SectionDivider';

// ─── Typing hook (Marketplace search bar) ─────────────────────────────────
function useTyping(text: string) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    let idx = 0;

    function type() {
      idx++;
      setDisplayed(text.slice(0, idx));
      t = idx < text.length ? setTimeout(type, 90) : setTimeout(reset, 1800);
    }
    function reset() {
      setDisplayed('');
      idx = 0;
      t = setTimeout(type, 500);
    }

    t = setTimeout(type, 800);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return displayed;
}

// ─── Revenue ticker hook (E-Commerce card) ────────────────────────────────
function useRevenueTicker() {
  const [revenue, setRevenue] = useState(12847);
  useEffect(() => {
    const id = setInterval(() => {
      setRevenue(v => (v >= 13450 ? 12847 : v + Math.floor(Math.random() * 38 + 14)));
    }, 900);
    return () => clearInterval(id);
  }, []);
  return revenue;
}

// ─── Mockup 1: B2B CRM ────────────────────────────────────────────────────
const CRM_TASKS = [
  { label: 'Review Q3 report', n: 1 },
  { label: 'Send proposal',    n: 2 },
  { label: 'Update forecast',  n: 3 },
];
const CRM_NAV = ['Clients', 'Deadlines', 'Workflows', 'Reports'];

function B2BCrmMockup() {
  return (
    <div className="mockup-container" style={{ height: 200, width: '100%' }}>
      <div className="mockup-header">
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
          CRM Dashboard
        </span>
      </div>

      <div style={{ display: 'flex', height: 'calc(100% - 29px)', overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 72, borderRight: '1px solid var(--border-default)', padding: '8px 0', flexShrink: 0 }}>
          {CRM_NAV.map((item, i) => (
            <div key={item} style={{
              padding: '4px 10px', fontSize: 9,
              color: i === 0 ? 'var(--accent-light)' : 'var(--text-muted)',
              background: i === 0 ? 'rgba(26,111,255,0.12)' : 'transparent',
              borderRight: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
              fontFamily: 'var(--font-sans)',
            }}>
              {item}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{
            fontSize: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)',
            marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            Tasks
          </div>

          {CRM_TASKS.map(({ label, n }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
              <div
                className={`crm-check-${n}`}
                style={{
                  width: 11, height: 11,
                  border: '1.5px solid rgba(107,114,128,0.4)',
                  borderRadius: 3,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span className={`crm-checkmark-${n}`} style={{ fontSize: 7, lineHeight: 1, color: 'white', opacity: 0 }}>
                  ✓
                </span>
              </div>
              <div style={{ position: 'relative', fontSize: 9.5, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
                {label}
                <span
                  className={`crm-strike-${n}`}
                  style={{ position: 'absolute', left: 0, top: '50%', height: '1px', transform: 'translateY(-50%)', background: 'var(--text-muted)', width: 0 }}
                />
              </div>
            </div>
          ))}

          {/* Progress bar */}
          <div style={{ marginTop: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8.5, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', marginBottom: 3 }}>
              <span>Project progress</span><span>72%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
              <div
                className="crm-progress"
                style={{ height: '100%', background: '#214EEE', borderRadius: 2, width: '55%' }}
              />
            </div>
          </div>

          {/* Activity feed */}
          <div style={{ marginTop: 8, borderTop: '1px solid var(--border-default)', paddingTop: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div className="crm-feed-1" style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', opacity: 0 }}>
              J.Smith viewed invoice
            </div>
            <div className="crm-feed-2" style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', opacity: 0 }}>
              M.Chen completed task
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mockup 2: E-Commerce ─────────────────────────────────────────────────
const PRODUCTS = [
  { price: '$49',  sale: false },
  { price: '$79',  sale: true  },
  { price: '$129', sale: false },
  { price: '$199', sale: false },
];
const TRACK_POSITIONS = ['10%', '36.6%', '63.3%', '90%'];

function EcommerceMockup() {
  const revenue = useRevenueTicker();
  return (
    <div className="mockup-container" style={{ height: 200, width: '100%' }}>
      <div className="mockup-header">
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
          Store Dashboard
        </span>
      </div>

      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 7, overflow: 'hidden', position: 'relative' }}>
        {/* 2×2 product grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
          {PRODUCTS.map((p, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-default)',
              borderRadius: 5, padding: '5px 7px',
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: 600 }}>
                {p.price}
              </span>
              {p.sale && (
                <span
                  className="ecom-sale"
                  style={{
                    position: 'absolute', top: -4, right: -4,
                    background: '#EF4444', color: 'white',
                    fontSize: 7, fontWeight: 700,
                    padding: '1px 4px', borderRadius: 3,
                    fontFamily: 'var(--font-heading)',
                    opacity: 0,
                  }}
                >
                  SALE
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Order tracking */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ position: 'relative', flex: 1, height: 10, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 1 }} />
            {TRACK_POSITIONS.map((pos, i) => (
              <div key={i} style={{
                position: 'absolute', left: pos, transform: 'translateX(-50%)',
                width: 6, height: 6, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.15)',
              }} />
            ))}
            <div
              className="ecom-track-dot"
              style={{
                position: 'absolute', left: '10%', transform: 'translateX(-50%)',
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 6px rgba(26,111,255,0.6)',
              }}
            />
          </div>
          <span style={{ fontSize: 8.5, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}>
            Order tracking
          </span>
        </div>

        {/* Revenue counter */}
        <div style={{ fontSize: 10, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
          Revenue:{' '}
          <span style={{ color: 'var(--green)', fontWeight: 600 }}>
            ${revenue.toLocaleString('en-US')}
          </span>
          <span style={{ color: 'var(--green)', fontSize: 9, marginLeft: 3 }}>↑</span>
        </div>

        {/* Payment confirmed toast */}
        <div
          className="ecom-payment-toast"
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 6, padding: '4px 8px',
            opacity: 0, transform: 'translateY(100%)',
          }}
        >
          <span style={{ color: 'var(--green)', fontSize: 9 }}>✓</span>
          <span style={{ fontSize: 9, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
            Payment confirmed
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Mockup 3: Marketplace / PropTech ─────────────────────────────────────
const LISTINGS = [
  { address: '123 Queen St',  price: '$489,000' },
  { address: '456 King West', price: '$675,000' },
];
const MAP_PINS = [
  { top: '25%', left: '30%', cls: 'prop-pin-1' },
  { top: '52%', left: '58%', cls: 'prop-pin-2' },
  { top: '68%', left: '38%', cls: 'prop-pin-3' },
];
const FILTERS = ['$500K–1M', '2+ bed', 'Downtown'];

function MarketplaceMockup() {
  const typed = useTyping('Toronto condos');
  return (
    <div className="mockup-container" style={{ height: 200, width: '100%' }}>
      {/* Search bar */}
      <div style={{
        padding: '7px 10px',
        borderBottom: '1px solid var(--border-default)',
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'var(--bg-elevated)',
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="4" cy="4" r="2.8" stroke="var(--text-muted)" strokeWidth="1.2" />
          <line x1="6.4" y1="6.4" x2="9" y2="9" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 9.5, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
          {typed}
          <span className="prop-cursor">▋</span>
        </span>
      </div>

      {/* Listings + Map */}
      <div style={{ display: 'flex', height: 'calc(100% - 29px - 26px)', overflow: 'hidden' }}>
        {/* Listings column */}
        <div style={{ flex: 1, padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 5, borderRight: '1px solid var(--border-default)', overflow: 'hidden' }}>
          {LISTINGS.map(({ address, price }, i) => (
            <div
              key={address}
              className={`prop-listing-${i + 1}`}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-default)',
                borderRadius: 5, padding: '4px 7px',
                opacity: 0,
              }}
            >
              <div style={{ fontSize: 9, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>{address}</div>
              <div style={{ fontSize: 9.5, color: 'var(--accent-light)', fontFamily: 'var(--font-heading)', fontWeight: 600, marginTop: 1 }}>{price}</div>
            </div>
          ))}
        </div>

        {/* Map column */}
        <div style={{ width: 80, background: 'rgba(26,111,255,0.04)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <svg width="80" height="100%" viewBox="0 0 80 120" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
            <line x1="0" y1="40" x2="80" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            <line x1="0" y1="80" x2="80" y2="80" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            <line x1="27" y1="0" x2="27" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            <line x1="54" y1="0" x2="54" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          </svg>
          {MAP_PINS.map(({ top, left, cls }) => (
            <div key={cls} className={cls} style={{ position: 'absolute', top, left, transform: 'translate(-50%, -100%)', opacity: 0 }}>
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                <path d="M6 0C2.686 0 0 2.686 0 6c0 4.5 6 10 6 10s6-5.5 6-10c0-3.314-2.686-6-6-6z" fill="var(--accent)" />
                <circle cx="6" cy="6" r="2" fill="white" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tags */}
      <div style={{ padding: '5px 8px', borderTop: '1px solid var(--border-default)', display: 'flex', gap: 4 }}>
        {FILTERS.map((f, i) => (
          <span
            key={f}
            className={`prop-filter-${i + 1}`}
            style={{
              fontSize: 8, padding: '2px 6px',
              background: 'rgba(26,111,255,0.12)',
              border: '1px solid rgba(26,111,255,0.2)',
              borderRadius: 9999,
              color: 'var(--accent-light)', fontFamily: 'var(--font-sans)',
              opacity: 0,
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Card data ────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 'b2b',
    Mockup: B2BCrmMockup,
    title: 'B2B Operations Software',
    description: 'Accounting platforms, professional services tools, client ops systems.',
    proofText: 'See MintCRM case study →',
    proofLink: '/case-studies/mintcrm',
    tags: ['SaaS', 'Automation', 'Workflows'],
  },
  {
    id: 'ecom',
    Mockup: EcommerceMockup,
    title: 'E-Commerce + Subscription Commerce',
    description: 'Headless storefronts, subscription engines, payment integrations.',
    proofText: 'High-ROI builds with ongoing optimization',
    proofLink: '/services',
    tags: ['Commerce', 'Payments', 'Headless'],
  },
  {
    id: 'marketplace',
    Mockup: MarketplaceMockup,
    title: 'Marketplaces & PropTech Platforms',
    description: 'Data-rich platforms, search portals, investor tools.',
    proofText: 'See buy.ca case study →',
    proofLink: '/case-studies/buyca',
    tags: ['Marketplace', 'PropTech', 'Search'],
  },
];

// ─── Main section ─────────────────────────────────────────────────────────
export default function VerticalsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.vertical-card',
        { opacity: 0, y: 48 },
        {
          opacity: 1, y: 0,
          duration: 0.85, ease: 'power3.out', stagger: 0.14,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        },
      );
      gsap.fromTo('.verticals-footer-note',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 60%', once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} style={{ padding: '100px 0 88px' }}>
        <div className="container">
          <SectionHeader
            label="WHAT WE BUILD"
            heading="Software for the industries that matter"
            description="We lead with three lanes where we have the deepest proof."
            centered
          />

          <div className="verticals-grid">
            {CARDS.map(({ id, Mockup, title, description, proofText, proofLink, tags }) => (
              <div
                key={id}
                className="card card-lg vertical-card"
                style={{ opacity: 0, display: 'flex', flexDirection: 'column' }}
              >
                {/* Mockup */}
                <div style={{ marginBottom: 20, borderRadius: 8, overflow: 'hidden' }}>
                  <Mockup />
                </div>

                {/* Title */}
                <h3 className="text-h3" style={{ marginBottom: 10 }}>{title}</h3>

                {/* Description */}
                <p className="text-body" style={{ marginBottom: 16 }}>{description}</p>

                {/* Proof link */}
                <Link
                  to={proofLink}
                  className="verticals-proof-link"
                  style={{ marginBottom: 20, display: 'inline-block' }}
                >
                  {proofText}
                </Link>

                {/* Tags — pushed to bottom */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
                  {tags.map(tag => <span key={tag} className="chip">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>

          <p
            className="verticals-footer-note"
            style={{ textAlign: 'center', marginTop: 48, fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', opacity: 0 }}
          >
            Building something different?{' '}
            <Link to="/contact" className="verticals-inline-link">
              We work across verticals. →
            </Link>
          </p>
        </div>
      </section>
      <SectionDivider />
    </>
  );
}
