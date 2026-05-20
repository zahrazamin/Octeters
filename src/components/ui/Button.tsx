import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  /** External URL */
  href?: string;
  /** Internal route */
  to?: string;
  onClick?: () => void;
  /** Pulsing glow halo — use on final CTA only */
  glow?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  glow = false,
  size = 'md',
  className = '',
  type = 'button',
}: ButtonProps) {
  const cls = [
    'btn',
    variant === 'primary' ? 'btn-primary' : 'btn-secondary',
    glow ? 'btn-glow' : '',
    size === 'sm' ? 'text-xs' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const smStyle = size === 'sm' ? { padding: '10px 20px', fontSize: '13px' } : undefined;

  if (to) {
    return (
      <Link to={to} className={cls} style={smStyle}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} style={smStyle} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={cls} style={smStyle} onClick={onClick}>
      {children}
    </button>
  );
}
