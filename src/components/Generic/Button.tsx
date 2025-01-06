import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../cn';
import { DesignSize, DesignFill, VariantType, styles } from '../DesignLanguage';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  fill?: DesignFill;
  size?: DesignSize;
  variant?: VariantType;
  fullWidth?: boolean;
}

const sizeStyles: Record<DesignSize, string> = {
  SMALL: 'px-3 py-1 text-xs leading-3',
  MEDIUM: 'px-4 py-2',
  LARGE: 'px-6 py-3 text-xl'
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
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'transition duration-200 rounded-lg',
        !disabled && 'active:scale-95 active:shadow-inner',
        disabled ? disabledStyles : fillStyles[fill](variant),
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
};
