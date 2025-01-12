import type { ComponentPropsWithoutRef } from 'react';
import { LucideIcon } from 'lucide-react';

import { cn } from '../cn';
import { DesignSize, DesignFill, VariantType, styles } from '../DesignLanguage';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  fill?: DesignFill;
  size?: DesignSize;
  variant?: VariantType;
  fullWidth?: boolean;
  icon?: LucideIcon
}

const sizeStyles: Record<DesignSize, string> = {
  SMALL: 'px-2 py-1 space-x-1 text-xs leading-3',
  MEDIUM: 'px-4 py-2 space-x-2',
  LARGE: 'px-6 py-3 space-x-3 text-xl'
};

const iconSize: Record<DesignSize, number> = {
  SMALL: 16,
  MEDIUM: 24,
  LARGE: 32,
};

const fillStyles: Record<DesignFill, (variant: VariantType) => string> = {
  SOLID: (variant) => `text-white border ${styles[variant].backgroundGradientDark} ${styles[variant].borderDark} ${styles[variant].backgroundHover}`,
  OUTLINED: (variant) => `${styles[variant].text} border ${styles[variant].border} ${styles[variant].backgroundGradient} ${styles[variant].backgroundDarkHover}`,
};

const disabledStyles = `opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 border-gray-300`;

export const Button = ({
  fill = 'SOLID',
  size = 'MEDIUM',
  variant = 'ACCENT',
  fullWidth,
  className,
  disabled,
  icon: Icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'transition duration-200 rounded-lg',
        Icon ? 'flex items-center' : '',
        !disabled && 'active:scale-95 active:shadow-inner',
        disabled ? disabledStyles : fillStyles[fill](variant),
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={iconSize[size]} />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  );
};
