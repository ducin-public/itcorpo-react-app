import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../cn';
import { DesignSize, DesignFill } from '../DesignEnums/designEnums';
import { MessageType, styles } from '../DesignEnums/MessageType';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  fill?: DesignFill;
  size?: DesignSize;
  messageType?: MessageType;
  fullWidth?: boolean;
}

const sizeStyles: Record<DesignSize, string> = {
  SMALL: 'px-3 py-1 text-xs leading-3',
  MEDIUM: 'px-4 py-2',
  LARGE: 'px-6 py-3 text-xl'
};

const fillStyles: Record<DesignFill, (type: MessageType) => string> = {
  SOLID: (type: MessageType) => `text-white border ${styles[type].backgroundGradientDark} ${styles[type].borderDark} ${styles[type].backgroundHover}`,
  OUTLINED: (type: MessageType) => `${styles[type].text} border ${styles[type].border} ${styles[type].backgroundGradient} ${styles[type].backgroundDarkHover}`,
};

const disabledStyles = `opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 border-gray-300`;

export const Button = ({
  fill = 'SOLID',
  size = 'MEDIUM',
  messageType = 'ACCENT',
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
        disabled ? disabledStyles : fillStyles[fill](messageType),
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
};
