import React from 'react';

interface SkeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

export const SkeuButton: React.FC<SkeuButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  asLink = false,
  href,
  target,
  rel,
  className = '',
  disabled,
  ...rest
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm font-semibold rounded-xl gap-2',
    lg: 'px-6 py-3 text-base font-bold rounded-xl gap-2.5',
  }[size];

  const variantClasses = {
    primary: 'skeu-button-primary text-white',
    secondary: 'skeu-button-secondary text-slate-800 hover:text-slate-950',
    dark: 'skeu-button-dark text-white',
    accent: 'skeu-button-primary bg-gradient-to-b from-indigo-600 via-blue-700 to-blue-900 text-white',
  }[variant];

  const baseClasses = `
    inline-flex items-center justify-center cursor-pointer select-none
    focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-1
    disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
    tracking-tight transition-all duration-150 whitespace-nowrap
    ${sizeClasses}
    ${variantClasses}
    ${className}
  `;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0 flex items-center">{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === 'right' && <span className="shrink-0 flex items-center">{icon}</span>}
    </>
  );

  if (asLink && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={baseClasses}
        id={rest.id}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={rest.type || 'button'}
      className={baseClasses}
      disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  );
};
