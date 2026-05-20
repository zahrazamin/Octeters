import {
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  ContainerAnimated,
  GalleryCol,
  GalleryContainer,
} from '../ui/AnimatedGallery';

const IMAGES_1 = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&auto=format&fit=crop&q=60',
];

const IMAGES_2 = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
];

const IMAGES_3 = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&auto=format&fit=crop&q=60',
];

export default function GallerySection() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Heading block — sits above the scroll canvas */}
      <ContainerStagger
        style={{
          position: 'relative',
          zIndex: 20,
          marginBottom: '-3rem',
          textAlign: 'center',
          padding: '80px 24px 0',
        }}
      >
        <ContainerAnimated>
          <span
            className="chip"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'default', marginBottom: 24 }}
          >
            Platforms We've Shipped
          </span>
        </ContainerAnimated>

        <ContainerAnimated>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Built to{' '}
            <span className="gradient-text">perform</span>
            {' '}at scale
          </h2>
        </ContainerAnimated>

        <ContainerAnimated>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: 520,
              margin: '20px auto 0',
            }}
          >
            From AI-powered operations tools to headless commerce — every platform ships production-ready.
          </p>
        </ContainerAnimated>
      </ContainerStagger>

      {/* Ambient glow behind the gallery */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          left: 0,
          width: '100%',
          height: '60vh',
          zIndex: 10,
          pointerEvents: 'none',
          background: 'rgba(33, 78, 238, 0.2)',
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Scroll-driven 3-column gallery */}
      <ContainerScroll style={{ height: '180vh' }}>
        <ContainerSticky style={{ height: '100svh' }}>
          <GalleryContainer>
            <GalleryCol yRange={['-10%', '2%']} style={{ marginTop: '-0.5rem' }}>
              {IMAGES_1.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Platform screenshot"
                  loading="lazy"
                  style={{ aspectRatio: '16/9', display: 'block', width: '100%', borderRadius: 8, objectFit: 'cover', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
                />
              ))}
            </GalleryCol>

            <GalleryCol yRange={['15%', '5%']} style={{ marginTop: '-50%' }}>
              {IMAGES_2.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Platform screenshot"
                  loading="lazy"
                  style={{ aspectRatio: '16/9', display: 'block', width: '100%', borderRadius: 8, objectFit: 'cover', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
                />
              ))}
            </GalleryCol>

            <GalleryCol yRange={['-10%', '2%']} style={{ marginTop: '-0.5rem' }}>
              {IMAGES_3.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Platform screenshot"
                  loading="lazy"
                  style={{ aspectRatio: '16/9', display: 'block', width: '100%', borderRadius: 8, objectFit: 'cover', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
                />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  );
}
