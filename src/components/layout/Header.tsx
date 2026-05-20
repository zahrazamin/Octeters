import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

const SERVICES = [
  { label: 'Product Engineering',    to: '/services/product-engineering' },
  { label: 'Custom Software',        to: '/services/custom-software' },
  { label: 'Generative AI',          to: '/services/generative-ai' },
  { label: 'Cloud + DevOps',         to: '/services/cloud-devops' },
  { label: 'E-Commerce',             to: '/services/ecommerce' },
  { label: 'QA + Managed Support',   to: '/services/qa-support' },
];

const SOLUTIONS = [
  { label: 'MVP Launch',             to: '/solutions/mvp-launch' },
  { label: 'Legacy Modernization',   to: '/solutions/legacy-modernization' },
  { label: 'AI Enablement',          to: '/solutions/ai-enablement' },
  { label: 'Commerce Growth',        to: '/solutions/commerce-growth' },
  { label: 'Marketplace / Portal',   to: '/solutions/marketplace-portal' },
];

const TOP_NAV = [
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Company',      to: '/company' },
  { label: 'Resources',    to: '/resources' },
];

function DropdownMenu({ items }: { items: { label: string; to: string }[] }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        padding: '8px',
        minWidth: '220px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        zIndex: 100,
      }}
    >
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          style={{
            display: 'block',
            padding: '10px 14px',
            borderRadius: '8px',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(26,111,255,0.08)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
            (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [servicesOpen,   setServicesOpen]   = useState(false);
  const [solutionsOpen,  setSolutionsOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-heading)',
    fontSize: '15px',
    fontWeight: 500,
    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'color 0.2s',
  });

  const dropdownBtnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-heading)',
    fontSize: '15px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'color 0.2s',
  };

  return (
    <header
      className={scrolled ? 'glass' : ''}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      <div style={{ padding: '0 40px', width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: '72px',
          }}
        >
          {/* Logo — left */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Octeters
            </span>
          </Link>

          {/* Desktop nav — center */}
          <nav
            className="desktop-only"
            style={{ alignItems: 'center', gap: '4px' }}
          >
            {/* Services */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button style={dropdownBtnStyle}>
                Services <ChevronDown size={13} />
              </button>
              {servicesOpen && <DropdownMenu items={SERVICES} />}
            </div>

            {/* Solutions */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button style={dropdownBtnStyle}>
                Solutions <ChevronDown size={13} />
              </button>
              {solutionsOpen && <DropdownMenu items={SOLUTIONS} />}
            </div>

            {TOP_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => navLinkStyle(isActive)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + mobile controls — right */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
            <div className="desktop-only">
              <Button to="/contact" variant="primary" size="sm">Book a Call</Button>
            </div>
            <div className="mobile-only" style={{ alignItems: 'center', gap: '12px' }}>
              <Button to="/contact" variant="primary" size="sm">Book a Call</Button>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '6px', display: 'flex' }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            style={{
              borderTop: '1px solid var(--border-default)',
              padding: '16px 0 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                padding: '8px 12px 4px',
                margin: 0,
              }}
            >
              Services
            </p>
            {SERVICES.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  padding: '9px 12px',
                  borderRadius: '8px',
                }}
              >
                {item.label}
              </Link>
            ))}

            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                padding: '16px 12px 4px',
                margin: 0,
              }}
            >
              Solutions
            </p>
            {SOLUTIONS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  padding: '9px 12px',
                  borderRadius: '8px',
                }}
              >
                {item.label}
              </Link>
            ))}

            <div
              style={{
                borderTop: '1px solid var(--border-default)',
                marginTop: '12px',
                paddingTop: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              {TOP_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    padding: '9px 12px',
                    borderRadius: '8px',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
