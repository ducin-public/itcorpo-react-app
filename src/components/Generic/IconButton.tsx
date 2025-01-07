import { type ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

import { DesignSize, styles } from '../DesignLanguage';

const sizeClasses: { [key in DesignSize]: string } = {
  SMALL: 'h-8 w-8',
  MEDIUM: 'h-10 w-10',
  LARGE: 'h-12 w-12',
};

const iconSizeClasses: { [key in DesignSize]: string } = {
  SMALL: 'h-4 w-4',
  MEDIUM: 'h-5 w-5',
  LARGE: 'h-6 w-6',
};

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: LucideIcon;
  variant?: keyof typeof styles;
  size?: DesignSize;
  label?: string;
}

export const IconButton = ({
  icon: Icon,
  variant = 'DEFAULT',
  size = 'MEDIUM',
  label,
  className = '',
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center
        rounded-full
        ${sizeClasses[size]}
        ${styles[variant].background}
        ${styles[variant].text}
        shadow-[0_2px_10px] shadow-black/20
        transition-all duration-200
        hover:shadow-[0_4px_12px] hover:shadow-black/40 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles[variant].focusRing}
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[0_2px_10px]
        ${className}
      `}
      aria-label={label}
    >
      <Icon className={iconSizeClasses[size]} />
    </button>
  );
};