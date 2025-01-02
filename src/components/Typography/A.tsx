import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../cn';
import { Size } from '../DesignEnums/Sizes';
import { styles } from '../DesignEnums/MessageType';

const sizeClasses: Record<Size, string> = {
  SMALL: 'text-sm',
  MEDIUM: 'text-base',
  LARGE: 'text-lg',
};

type AProps = ComponentPropsWithoutRef<'a'> & {
  size?: Size;
};

export function A({ size = 'MEDIUM', className, ...props }: AProps) {
  return (
    <a
      {...props}
      className={cn(
        `underline transition-colors`,
        styles.ACCENT.text,
        styles.ACCENT.textHover,
        sizeClasses[size],
        className
      )}
    />
  );
}
