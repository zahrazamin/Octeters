import { useEffect, useRef } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { gsap } from '../../lib/gsap';
import SectionDivider from '../ui/SectionDivider';

const chartData = [
  { name: 'Jan', value: 8 },
  { name: 'Feb', value: 22 },
  { name: 'Mar', value: 38 },
  { name: 'Apr', value: 52 },
  { name: 'May', value: 71 },
  { name: 'Jun', value: 95 },
  { name: 'Jul', value: 130 },
];

const STATS = [
  { value: '50+',   label: 'Platforms Delivered' },
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '3',     label: 'Continents Served' },
  { value: '24/7',  label: 'Post-Launch Support' },
];

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { value: number }[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-default)',
      borderRadius: 8,
      padding: '6px 12px',
      fontFamily: 'var(--font-heading)',
      fontSize: 13,
      color: 'var(--text-primary)',
    }}>
      {payload[0].value}
    </div>
  );
}

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.metrics-heading',
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        }
      );

      gsap.fromTo('.metrics-stat',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.metrics-stats-row', start: 'top 85%', once: true },
        }
      );

      gsap.fromTo('.metrics-chart-wrap',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.metrics-chart-wrap', start: 'top 88%', once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SectionDivider />

      <section
        ref={sectionRef}
        style={{ padding: '0 0 80px' }}
      >
        <div
          className="container"
          style={{ paddingTop: 128, paddingBottom: 0, textAlign: 'left' }}
        >
          {/* Heading block */}
          <h2
            className="metrics-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(22px, 3.5vw, 40px)',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: 64,
              maxWidth: '900px',
              opacity: 0,
            }}
          >
            Powering teams with real-time insights.{' '}
            <span
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(16px, 2.2vw, 28px)',
                fontWeight: 400,
                fontFamily: 'var(--font-sans)',
              }}
            >
              Our end-to-end delivery model helps you ship faster, manage clients,
              and scale with confidence — from day one to enterprise.
            </span>
          </h2>

          {/* Stats row */}
          <div
            className="metrics-stats-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px 32px',
            }}
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="metrics-stat" style={{ opacity: 0 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(26px, 3.5vw, 36px)',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    marginBottom: 6,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 15,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Area chart */}
        <div
          className="metrics-chart-wrap"
          style={{
            width: '100%',
            height: 200,
            marginTop: 48,
            opacity: 0,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="metricsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1A6FFF" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#1A6FFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1A6FFF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#metricsGrad)"
                dot={false}
                activeDot={{ r: 4, fill: '#1A6FFF', stroke: '#1A6FFF' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <SectionDivider />
    </>
  );
}
