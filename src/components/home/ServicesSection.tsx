import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Layers, Brain, Cloud, ShoppingCart, Shield } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import SectionHeader from '../ui/SectionHeader';
import SectionDivider from '../ui/SectionDivider';

// ─── Mockup 1: Code Editor ────────────────────────────────────────────────
function CodeEditorMockup() {
  return (
    <div className="mockup-container svc-mockup">
      <div className="mockup-header">
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--text-muted)' }}>main.ts</span>
      </div>
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div className="svc1-line-1" style={{ display: 'flex', gap: 7, opacity: 0, alignItems: 'baseline' }}>
          <span style={{ color: 'var(--text-muted)', minWidth: 8, fontSize: 8 }}>1</span>
          <span style={{ color: '#4D94FF' }}>const app = buildMVP()</span>
        </div>
        <div className="svc1-line-2" style={{ display: 'flex', gap: 7, opacity: 0, alignItems: 'baseline' }}>
          <span style={{ color: 'var(--text-muted)', minWidth: 8, fontSize: 8 }}>2</span>
          <span style={{ color: 'var(--green)' }}>app.test({'{ coverage: 94 }'})</span>
        </div>
        <div className="svc1-line-3" style={{ display: 'flex', gap: 7, opacity: 0, alignItems: 'baseline' }}>
          <span style={{ color: 'var(--text-muted)', minWidth: 8, fontSize: 8 }}>3</span>
          <span style={{ color: 'var(--text-primary)' }}>
            app.deploy()
            <span className="svc1-cursor-wrap" style={{ display: 'inline-block', opacity: 0 }}>
              <span className="hero-cursor-blink" style={{ color: 'var(--accent-light)', marginLeft: 1 }}>▋</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Mockup 2: Multi-panel + Modal ────────────────────────────────────────
function MultiPanelMockup() {
  return (
    <div className="mockup-container svc-mockup">
      <div className="mockup-header">
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--text-muted)' }}>Platform</span>
      </div>
      <div style={{ display: 'flex', height: 'calc(100% - 29px)', position: 'relative', overflow: 'hidden' }}>
        {/* Sidebar strip */}
        <div style={{
          width: 20, background: 'var(--bg-elevated)',
          borderRight: '1px solid var(--border-default)',
          display: 'flex', flexDirection: 'column', gap: 6,
          padding: '8px 3px', flexShrink: 0,
        }}>
          {[true, false, false].map((active, i) => (
            <div key={i} style={{
              height: 3, borderRadius: 2,
              background: active ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
            }} />
          ))}
        </div>
        {/* Main content */}
        <div style={{ flex: 1, padding: '6px 8px', position: 'relative', overflow: 'hidden' }}>
          {/* Background app skeleton */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[70, 55, 40].map((w, i) => (
              <div key={i} style={{ height: 3, width: `${w}%`, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }} />
            ))}
          </div>
          {/* Modal — slides up */}
          <div className="svc2-modal" style={{
            position: 'absolute', inset: 4,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-accent)',
            borderRadius: 6, padding: '6px 8px',
            display: 'flex', flexDirection: 'column', gap: 5,
            transform: 'translateY(100%)', opacity: 0,
            overflow: 'hidden',
          }}>
            <div style={{ fontSize: 9, color: 'var(--accent-light)', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
              New Project
            </div>
            <div className="svc2-field-1" style={{ opacity: 0 }}>
              <div style={{ fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>Name</div>
              <div style={{
                height: 11, background: 'rgba(255,255,255,0.05)',
                borderRadius: 3, border: '1px solid var(--border-accent)',
                display: 'flex', alignItems: 'center', paddingLeft: 4,
              }}>
                <span className="svc2-cursor" style={{ fontSize: 8, color: 'var(--accent-light)' }}>▋</span>
              </div>
            </div>
            <div className="svc2-field-2" style={{ opacity: 0 }}>
              <div style={{ fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>Email</div>
              <div style={{ height: 11, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mockup 3: AI Chat ────────────────────────────────────────────────────
function ChatMockup() {
  return (
    <div className="mockup-container svc-mockup">
      <div className="mockup-header">
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--text-muted)' }}>AI Assistant</span>
      </div>
      <div style={{ padding: '7px 10px', display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
        {/* User message */}
        <div className="svc3-user" style={{ opacity: 0, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{
            background: 'rgba(26,111,255,0.18)',
            border: '1px solid rgba(26,111,255,0.25)',
            borderRadius: '7px 7px 2px 7px',
            padding: '3px 7px', fontSize: 9,
            color: 'var(--accent-light)',
          }}>
            Analyze Q3 revenue
          </div>
        </div>
        {/* Typing dots */}
        <div className="svc3-dots-wrap" style={{ opacity: 0, display: 'flex', gap: 3, alignItems: 'center', paddingLeft: 2 }}>
          <div className="svc3-dot" />
          <div className="svc3-dot" style={{ animationDelay: '0.2s' }} />
          <div className="svc3-dot" style={{ animationDelay: '0.4s' }} />
        </div>
        {/* AI response */}
        <div className="svc3-response" style={{ opacity: 0 }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border-default)',
            borderRadius: '2px 7px 7px 7px',
            padding: '3px 7px', fontSize: 9,
            color: 'var(--text-secondary)', lineHeight: 1.5,
          }}>
            Revenue up 23% — Q3 growth driven by enterprise...
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mockup 4: Terminal ───────────────────────────────────────────────────
function TerminalMockup() {
  return (
    <div className="mockup-container svc-mockup" style={{ background: '#0d1117' }}>
      <div className="mockup-header" style={{ background: '#161b22' }}>
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--text-muted)' }}>terminal</span>
      </div>
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div className="svc4-cmd" style={{ fontSize: 9, color: 'var(--green)', opacity: 0 }}>
          $ deploying to production...
        </div>
        <div className="svc4-progress-wrap" style={{ opacity: 0 }}>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
            <div className="svc4-progress" style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--green))', width: '0%', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>building image...</div>
        </div>
        <div className="svc4-complete" style={{ fontSize: 9, color: 'var(--green)', opacity: 0 }}>
          ✓ Deploy complete · 2.4s
        </div>
      </div>
    </div>
  );
}

// ─── Mockup 5: Checkout ───────────────────────────────────────────────────
function CheckoutMockup() {
  return (
    <div className="mockup-container svc-mockup">
      <div className="mockup-header">
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--text-muted)' }}>Checkout</span>
      </div>
      <div style={{ padding: '7px 10px', display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
        {/* Product row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border-default)',
            borderRadius: 4, padding: '3px 8px',
            fontSize: 9, color: 'var(--text-secondary)',
          }}>
            Premium Plan
          </div>
          <div style={{ position: 'relative', lineHeight: 1 }}>
            <span style={{ fontSize: 13 }}>🛒</span>
            <span className="svc5-badge" style={{
              position: 'absolute', top: -3, right: -5,
              background: 'var(--accent)', color: 'white',
              fontSize: 7, fontWeight: 700,
              width: 10, height: 10, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0, transform: 'scale(0.5)',
              fontFamily: 'var(--font-heading)',
            }}>
              1
            </span>
          </div>
        </div>
        <div style={{ height: 1, background: 'var(--border-default)' }} />
        {/* Pay button */}
        <div className="svc5-paybtn" style={{
          background: 'linear-gradient(135deg, var(--accent), var(--violet))',
          borderRadius: 5, padding: '4px 8px',
          fontSize: 9, color: 'white',
          fontFamily: 'var(--font-heading)', fontWeight: 600,
          textAlign: 'center',
          opacity: 0, transform: 'translateY(100%)',
        }}>
          💳 Pay $49.00
        </div>
        {/* Confirmation */}
        <div className="svc5-confirm" style={{ fontSize: 9, color: 'var(--green)', opacity: 0 }}>
          ✓ Order placed — confirmation sent
        </div>
      </div>
    </div>
  );
}

// ─── Mockup 6: Test Runner ────────────────────────────────────────────────
function TestRunnerMockup() {
  return (
    <div className="mockup-container svc-mockup" style={{ background: '#0d1117' }}>
      <div className="mockup-header" style={{ background: '#161b22' }}>
        <div className="mockup-dot" style={{ background: '#EF4444' }} />
        <div className="mockup-dot" style={{ background: '#F59E0B' }} />
        <div className="mockup-dot" style={{ background: '#10B981' }} />
        <span style={{ marginLeft: 6, fontSize: 9, color: 'var(--text-muted)' }}>test runner</span>
      </div>
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div className="svc6-running" style={{ fontSize: 9, color: 'var(--text-muted)', opacity: 0 }}>
          $ running 24 tests...
        </div>
        <div className="svc6-progress-wrap" style={{ opacity: 0 }}>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
            <div className="svc6-progress" style={{ height: '100%', background: 'var(--green)', width: '0%', borderRadius: 2 }} />
          </div>
        </div>
        <div className="svc6-passed" style={{ fontSize: 9, color: 'var(--green)', opacity: 0 }}>
          24/24 passed ✓
        </div>
        <div className="svc6-coverage" style={{ fontSize: 9, color: 'var(--text-muted)', opacity: 0 }}>
          Coverage: 94%
        </div>
      </div>
    </div>
  );
}

// ─── Card data ────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'product-engineering',
    Icon: Rocket,
    title: 'Product Engineering',
    description: 'From idea to production in weeks, not months.',
    Mockup: CodeEditorMockup,
  },
  {
    id: 'custom-software',
    Icon: Layers,
    title: 'Custom Software + Web Platforms',
    description: 'SaaS, portals, APIs, modernization — platforms that last.',
    Mockup: MultiPanelMockup,
  },
  {
    id: 'generative-ai',
    Icon: Brain,
    title: 'Generative AI',
    description: 'Production AI — not demos. LLMs, RAG, agents with guardrails.',
    Mockup: ChatMockup,
  },
  {
    id: 'cloud-devops',
    Icon: Cloud,
    title: 'Cloud + DevOps',
    description: 'Infrastructure as code, CI/CD, Kubernetes, observability.',
    Mockup: TerminalMockup,
  },
  {
    id: 'e-commerce',
    Icon: ShoppingCart,
    title: 'E-Commerce',
    description: 'Headless commerce, subscriptions, payments, conversions.',
    Mockup: CheckoutMockup,
  },
  {
    id: 'qa-support',
    Icon: Shield,
    title: 'QA + Managed Support',
    description: 'Automated testing, security audits, post-launch support.',
    Mockup: TestRunnerMockup,
  },
];

// ─── Main section ─────────────────────────────────────────────────────────
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0,
          duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
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
            label="OUR CAPABILITIES"
            heading="End-to-end engineering, not just code"
            centered
          />

          <div className="services-grid">
            {SERVICES.map(({ id, Icon, title, description, Mockup }) => (
              <div
                key={id}
                className="card service-card"
                style={{ opacity: 0, display: 'flex', flexDirection: 'column', padding: '20px 20px 24px' }}
              >
                {/* Mini-mockup */}
                <div style={{ marginBottom: 16, borderRadius: 8, overflow: 'hidden' }}>
                  <Mockup />
                </div>

                {/* Icon + Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                  <Icon size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 15, fontWeight: 600,
                    color: 'var(--text-primary)', lineHeight: 1.3,
                    margin: 0,
                  }}>
                    {title}
                  </h3>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13, color: 'var(--text-muted)',
                  lineHeight: 1.6, marginBottom: 16,
                }}>
                  {description}
                </p>

                {/* Link */}
                <Link
                  to={`/services/${id}`}
                  className="service-cap-link"
                  style={{ marginTop: 'auto' }}
                >
                  See full capabilities →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider />
    </>
  );
}
