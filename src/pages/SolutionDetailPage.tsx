import { useParams } from 'react-router-dom';

export default function SolutionDetailPage() {
  const { solutionId } = useParams();
  return (
    <div style={{ paddingTop: '72px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container section">
        <p className="text-label" style={{ marginBottom: '16px' }}>Solution</p>
        <h1 className="text-h1" style={{ marginBottom: '24px', textTransform: 'capitalize' }}>
          {solutionId?.replace(/-/g, ' ')}
        </h1>
        <p className="text-body-lg">Coming soon.</p>
      </div>
    </div>
  );
}
