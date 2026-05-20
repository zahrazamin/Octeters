import type { ReactNode } from 'react';

interface SectionHeaderProps {
  label: string;
  heading: string | ReactNode;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  heading,
  description,
  centered = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={className}
      style={{
        marginBottom: '64px',
        ...(centered
          ? { textAlign: 'center', maxWidth: '640px', margin: '0 auto 64px' }
          : {}),
      }}
    >
      <p className="text-label" style={{ marginBottom: '16px' }}>
        {label}
      </p>
      <h2 className="text-h2" style={{ marginBottom: description ? '24px' : 0 }}>
        {heading}
      </h2>
      {description && (
        <p className="text-body-lg">{description}</p>
      )}
    </div>
  );
}
