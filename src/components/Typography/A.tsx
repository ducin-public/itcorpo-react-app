import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../cn';
import { DesignSize } from '../DesignEnums/designEnums';
import { styles } from '../DesignEnums/MessageType';

const sizeClasses: Record<DesignSize, string> = {
  SMALL: 'text-sm',
  MEDIUM: 'text-base',
  LARGE: 'text-lg',
};

type AProps = ComponentPropsWithoutRef<'a'> & {
  size?: DesignSize;
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
