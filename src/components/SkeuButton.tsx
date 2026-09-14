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
    sm: 'px-3.5 py-1.5 text-xs font-medium rounded-full gap-1.5',
    md: 'px-5 py-2.5 text-sm font-medium rounded-full gap-2',
    lg: 'px-7 py-3.5 text-base font-medium rounded-full gap-2.5',
  }[size];

  const variantClasses = {
    primary: 'neu-button-primary',
    secondary: 'neu-button',
    dark: 'neu-button-primary',
    accent: 'neu-button text-[#243B5D]',
  }[variant];

  const baseClasses = `
    inline-flex items-center justify-center cursor-pointer select-none
    focus:outline-none focus:ring-2 focus:ring-[#8FA8C8]/40 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
    tracking-normal transition-all duration-200 whitespace-nowrap
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
