import { Link } from 'react-router-dom';

interface ShinyButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
}

export function ShinyButton({ children, to, onClick, className = '' }: ShinyButtonProps) {
  if (to) {
    return (
      <Link to={to} className={`shiny-cta ${className}`}>
        <span>{children}</span>
      </Link>
    );
  }
  return (
    <button className={`shiny-cta ${className}`} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
}
