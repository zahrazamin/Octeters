import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      style={{
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        color: 'var(--text-muted)',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = 'var(--accent-light)';
        el.style.borderColor = 'var(--border-accent)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = 'var(--text-muted)';
        el.style.borderColor = 'var(--border-default)';
      }}
    >
      {children}
    </a>
  );
}

const FOOTER_SERVICES = [
  ['Product Engineering',  '/services/product-engineering'],
  ['Custom Software',      '/services/custom-software'],
  ['Generative AI',        '/services/generative-ai'],
  ['Cloud + DevOps',       '/services/cloud-devops'],
  ['E-Commerce',           '/services/ecommerce'],
  ['QA + Support',         '/services/qa-support'],
] as const;

const FOOTER_SOLUTIONS = [
  ['MVP Launch',           '/solutions/mvp-launch'],
  ['Legacy Modernization', '/solutions/legacy-modernization'],
  ['AI Enablement',        '/solutions/ai-enablement'],
  ['Commerce Growth',      '/solutions/commerce-growth'],
  ['Marketplace / Portal', '/solutions/marketplace-portal'],
] as const;

const FOOTER_COMPANY = [
  ['About',    '/company'],
  ['Careers',  '/company#careers'],
  ['Contact',  '/contact'],
] as const;

const FOOTER_RESOURCES = [
  ['Blog',          '/resources'],
  ['Case Studies',  '/case-studies'],
] as const;

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: readonly (readonly [string, string])[];
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--text-muted)',
          marginBottom: '16px',
        }}
      >
        {heading}
      </p>
      {links.map(([label, to]) => (
        <Link
          key={to}
          to={to}
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--text-muted)',
            marginBottom: '10px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')
          }
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-default)',
      }}
    >
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div style={{ minWidth: '180px' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Octeters
            </span>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '20px',
                maxWidth: '200px',
              }}
            >
              AI-enabled software platforms for operations, commerce, and marketplaces.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <SocialLink href="#" label="Twitter / X">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialLink>
              <SocialLink href="#" label="LinkedIn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialLink>
              <SocialLink href="#" label="GitHub">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </SocialLink>
            </div>
          </div>

          <FooterColumn heading="Services"   links={FOOTER_SERVICES} />
          <FooterColumn heading="Solutions"  links={FOOTER_SOLUTIONS} />
          <FooterColumn heading="Company"    links={FOOTER_COMPANY} />
          <FooterColumn heading="Resources"  links={FOOTER_RESOURCES} />
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-default)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              margin: 0,
            }}
          >
            © 2024 Octeters. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {(
              [
                ['Privacy', '/privacy'],
                ['Terms',   '/terms'],
              ] as const
            ).map(([label, to]) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')
                }
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
