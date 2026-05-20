export default function ResourcesPage() {
  return (
    <div style={{ paddingTop: '72px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container section" style={{ textAlign: 'center' }}>
        <p className="text-label" style={{ marginBottom: '16px' }}>Resources & Insights</p>
        <h1 className="text-h1" style={{ marginBottom: '24px' }}>Resources & Insights</h1>
        <p className="text-body-lg" style={{ maxWidth: '480px', margin: '0 auto 32px' }}>
          Articles, guides, and case studies — coming soon.
        </p>
        <a href="/contact" className="btn btn-secondary">
          Book a Call in the meantime →
        </a>
      </div>
    </div>
  );
}
