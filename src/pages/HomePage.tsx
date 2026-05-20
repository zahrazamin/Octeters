import HeroSection from '../components/home/HeroSection';
import VerticalsSection from '../components/home/VerticalsSection';
import ServicesSection from '../components/home/ServicesSection';
import ProcessSection from '../components/home/ProcessSection';
import CaseStudiesSection from '../components/home/CaseStudiesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import WhySection from '../components/home/WhySection';

export default function HomePage() {
  return (
    <div style={{ position: 'relative', background: 'var(--bg-primary)' }}>

      {/* ── Global background: grid + orbs spanning full page height ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Grid covers the entire page height */}
        <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />

        {/* Orbs distributed across the full scroll height */}

        {/* Top cluster */}
        <div className="orb orb-indigo"  style={{ width: 700, height: 700, top: '0%',   left: '-10%'  }} />
        <div className="orb orb-violet"  style={{ width: 500, height: 500, top: '2%',   right: '-8%'  }} />

        {/* Upper-mid cluster */}
        <div className="orb orb-indigo"  style={{ width: 560, height: 560, top: '18%',  right: '-6%', opacity: 0.7 }} />
        <div className="orb orb-violet"  style={{ width: 420, height: 420, top: '22%',  left: '-8%',  opacity: 0.8 }} />

        {/* Mid cluster */}
        <div className="orb orb-indigo"  style={{ width: 640, height: 640, top: '38%',  left: '-12%'  }} />
        <div className="orb orb-violet"  style={{ width: 480, height: 480, top: '42%',  right: '-6%', opacity: 0.75 }} />

        {/* Lower-mid cluster */}
        <div className="orb orb-indigo"  style={{ width: 580, height: 580, top: '60%',  right: '-8%'  }} />
        <div className="orb orb-violet"  style={{ width: 500, height: 500, top: '64%',  left: '-6%',  opacity: 0.8 }} />

        {/* Bottom cluster */}
        <div className="orb orb-indigo"  style={{ width: 620, height: 620, top: '82%',  left: '-10%'  }} />
        <div className="orb orb-violet"  style={{ width: 520, height: 520, top: '85%',  right: '-8%', opacity: 0.7 }} />
      </div>

      {/* ── Page sections ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <VerticalsSection />
        <ServicesSection />
        <ProcessSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <WhySection />
      </div>

    </div>
  );
}
