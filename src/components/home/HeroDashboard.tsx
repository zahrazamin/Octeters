import { LayoutDashboard, FolderOpen, Users, Activity, Settings, Search } from 'lucide-react';

/* ── Sidebar nav items ──────────────────────────────────────── */
const NAV = [
  { Icon: LayoutDashboard, label: 'Dashboard' },
  { Icon: FolderOpen,       label: 'Projects'  },
  { Icon: Users,            label: 'Clients'   },
  { Icon: Activity,         label: 'Analytics' },
  { Icon: Settings,         label: 'Settings'  },
] as const;

/* ── Table data ─────────────────────────────────────────────── */
const TASKS = [
  { name: 'Platform onboarding', status: 'Completed',  dot: 'status-green' },
  { name: 'API integration',     status: 'Processing', dot: 'status-amber' },
  { name: 'Data migration',      status: 'Pending',    dot: 'status-gray'  },
  { name: 'UI deployment',       status: 'Completed',  dot: 'status-green' },
] as const;

/* ── Shared micro styles ────────────────────────────────────── */
const card: React.CSSProperties = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-default)',
  borderRadius: '8px',
};

export default function HeroDashboard() {
  return (
    <div
      aria-hidden="true"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 48px 96px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        userSelect: 'none',
        position: 'relative',
      }}
    >

      {/* ── Title bar ─────────────────────────────────────────── */}
      <div style={{
        background: 'var(--bg-elevated)',
        borderBottom: '1px solid var(--border-default)',
        padding: '9px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        {/* Window dots */}
        <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
          {(['#EF4444', '#F59E0B', '#10B981'] as const).map((c) => (
            <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.75 }} />
          ))}
        </div>

        {/* Search bar */}
        <div style={{
          flex: 1, ...card,
          padding: '5px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-muted)',
          borderRadius: '6px',
        }}>
          <Search size={11} />
          <span style={{ flex: 1, fontSize: '10px' }}>Search tasks, clients...</span>
          <span className="hero-cursor-blink" style={{ color: 'var(--accent-light)', fontWeight: 'bold', lineHeight: 1 }}>|</span>
        </div>

        {/* Avatar */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: '28px', height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1A6FFF, #00B4D8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', fontWeight: 600, color: '#fff',
            fontFamily: 'var(--font-heading)',
          }}>JD</div>
          <div className="hero-online-pulse" style={{
            position: 'absolute', bottom: 0, right: 0,
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: 'var(--green)',
            border: '1.5px solid var(--bg-elevated)',
          }} />
        </div>
      </div>

      {/* ── Body: sidebar + content ────────────────────────────── */}
      <div style={{ display: 'flex' }}>

        {/* Sidebar */}
        <div style={{
          width: '115px',
          borderRight: '1px solid var(--border-default)',
          padding: '10px 8px',
          flexShrink: 0,
          position: 'relative',
        }}>
          {/* Sliding active indicator */}
          <div
            className="hero-sidebar-active"
            style={{
              position: 'absolute',
              left: '8px', right: '8px',
              height: '30px',
              background: 'rgba(26, 111, 255, 0.12)',
              borderRadius: '6px',
              borderLeft: '2px solid var(--accent)',
              top: '10px',
              zIndex: 0,
            }}
          />

          {/* Nav items */}
          {NAV.map(({ Icon, label }) => (
            <div
              key={label}
              style={{
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '0 8px',
                color: 'var(--text-muted)',
                position: 'relative',
                zIndex: 1,
                cursor: 'default',
                borderRadius: '6px',
              }}
            >
              <Icon size={12} strokeWidth={1.5} />
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap', overflow: 'hidden' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '12px', overflow: 'hidden', minWidth: 0 }}>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
            <div style={{ ...card, padding: '10px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '10px', marginBottom: '4px' }}>Revenue</p>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px', fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: '4px',
              }}>$124K</p>
              <p style={{ color: 'var(--green)', fontSize: '10px' }}>↑ 12% this week</p>
            </div>
            <div style={{ ...card, padding: '10px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '10px', marginBottom: '4px' }}>Active Users</p>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px', fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: '4px',
              }}>847</p>
              <p style={{ color: 'var(--blue)', fontSize: '10px' }}>+23 today</p>
            </div>
          </div>

          {/* Tasks table */}
          <div style={{ ...card, overflow: 'hidden', marginBottom: '10px' }}>
            {/* Header */}
            <div style={{
              borderBottom: '1px solid var(--border-default)',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '10px', fontWeight: 600,
                color: 'var(--text-secondary)',
              }}>Active Tasks</span>
              <span style={{
                background: 'rgba(26,111,255,0.12)',
                color: 'var(--accent-light)',
                borderRadius: '9999px',
                padding: '1px 8px',
                fontSize: '9px',
                fontFamily: 'var(--font-heading)',
              }}>4 active</span>
            </div>

            {/* Rows */}
            {TASKS.map(({ name, status, dot }, i) => (
              <div
                key={name}
                className={`hero-table-row hero-table-row-${i + 1}`}
                style={{
                  padding: '7px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: i < TASKS.length - 1 ? '1px solid var(--border-default)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0 }}>
                  <div style={{
                    width: '6px', height: '6px',
                    borderRadius: '2px',
                    border: '1px solid var(--border-hover)',
                    background: 'var(--bg-card)',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    color: 'var(--text-secondary)',
                    fontSize: '10px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>{name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                  <div className={`status-dot ${dot}`} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px', whiteSpace: 'nowrap' }}>{status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart + mini stats row */}
          <div style={{ display: 'flex', gap: '8px' }}>

            {/* Chart card */}
            <div style={{ ...card, flex: 1, padding: '8px 10px', overflow: 'hidden' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '10px', marginBottom: '6px' }}>Revenue trend</p>
              <div className="hero-chart-clip">
                <svg
                  width="100%"
                  height="52"
                  viewBox="0 0 200 52"
                  preserveAspectRatio="none"
                  style={{ display: 'block', overflow: 'visible' }}
                >
                  <defs>
                    <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#1A6FFF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#1A6FFF" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path
                    d="M0,47 L22,40 L44,35 L66,30 L88,34 L110,23 L132,17 L154,11 L176,7 L200,4 L200,52 L0,52 Z"
                    fill="url(#heroChartGrad)"
                  />
                  {/* Line */}
                  <polyline
                    points="0,47 22,40 44,35 66,30 88,34 110,23 132,17 154,11 176,7 200,4"
                    fill="none"
                    stroke="#1A6FFF"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Mini stat cards */}
            <div style={{ width: '78px', display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
              <div style={{ ...card, padding: '7px 8px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '9px', marginBottom: '2px' }}>Conversion</p>
                <p style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '14px', fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>3.8%</p>
              </div>
              <div style={{ ...card, padding: '7px 8px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '9px', marginBottom: '2px' }}>Avg. deal</p>
                <p style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '14px', fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>$2.4K</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Toast notification ─────────────────────────────────── */}
      <div
        className="hero-toast"
        style={{
          position: 'absolute',
          top: '50px',
          right: '12px',
          ...card,
          borderColor: 'rgba(26,111,255,0.3)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          zIndex: 20,
          minWidth: '170px',
        }}
      >
        <div style={{
          width: '20px', height: '20px',
          borderRadius: '50%',
          background: 'rgba(16,185,129,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          fontSize: '11px',
          color: 'var(--green)',
        }}>✓</div>
        <div>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '11px', fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1px',
          }}>3 tasks completed</p>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Just now</p>
        </div>
      </div>

    </div>
  );
}
