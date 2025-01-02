import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../cn';
import { Size } from '../DesignEnums/Sizes';
import { Variant } from '../DesignEnums/Variants';
import { styles } from '../DesignEnums/MessageType';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const sizeStyles: Record<Size, string> = {
  SMALL: 'px-3 py-1.5 text-sm',
  MEDIUM: 'px-4 py-2',
  LARGE: 'px-6 py-3 text-lg'
};

const variantStyles: { [key in Variant]: string } = {
  PRIMARY: `text-white ${styles.ACCENT.backgroundGradientDark} ${styles.ACCENT.backgroundDarkHover}`,
  SECONDARY: `border ${styles.DEFAULT.backgroundGradient} ${styles.DEFAULT.border} ${styles.DEFAULT.text} ${styles.DEFAULT.backgroundHover}`,
  OUTLINED: `border ${styles.ACCENT.borderDark} ${styles.ACCENT.text} ${styles.ACCENT.backgroundGradient} ${styles.ACCENT.backgroundHover}`
};

export const Button = ({
  variant = 'PRIMARY',
  size = 'MEDIUM',
  fullWidth,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'transition duration-200 rounded-lg',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
};
