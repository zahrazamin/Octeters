import { useParams } from 'react-router-dom';

export default function CaseStudyDetailPage() {
  const { caseId } = useParams();
  return (
    <div style={{ paddingTop: '72px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container section">
        <p className="text-label" style={{ marginBottom: '16px' }}>Case Study</p>
        <h1 className="text-h1" style={{ marginBottom: '24px', textTransform: 'uppercase' }}>
          {caseId}
        </h1>
        <p className="text-body-lg">Coming soon.</p>
      </div>
    </div>
  );
}
