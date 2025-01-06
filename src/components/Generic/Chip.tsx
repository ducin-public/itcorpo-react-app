import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '../cn';
import { DesignSize, DesignFill } from '../DesignEnums/designEnums';
import { MessageType, styles } from '../DesignEnums/MessageType';

interface ChipProps {
  children: ReactNode;
  fill?: DesignFill;
  size?: DesignSize;
  messageType?: MessageType;
  icon?: LucideIcon;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

const fillStyles: Record<DesignFill, (type: MessageType) => string> = {
  SOLID: (type: MessageType) => `border ${styles[type].backgroundGradientDark} ${styles[type].borderDark} ${styles[type].borderDarkHover} text-white`,
  OUTLINED: (type: MessageType) => `border ${styles[type].background} ${styles[type].textDark} ${styles[type].border} `
};

const sizeStyles: Record<DesignSize, string> = {
  SMALL: 'text-xs px-2 py-0.5',
  MEDIUM: 'text-sm px-2.5 py-1',
  LARGE: 'text-base px-3 py-1.5'
};

export function Chip({ 
  children, 
  fill = 'SOLID',
  messageType = 'ACCENT',
  size = 'MEDIUM',
  icon: Icon, 
  onClick,
  onRemove,
  className 
}: ChipProps) {
  return (
    <span 
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        `focus:outline-none focus:ring-2 focus:ring-offset-1 ${styles[messageType].focusRing}`,
        fillStyles[fill](messageType),
        sizeStyles[size],
        (onClick || onRemove) && `cursor-pointer ${styles[messageType].textHoverLight}`,
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
      {Icon && (
        <Icon 
          className={cn(
            'cursor-pointer transition-colors',
            size === 'SMALL' && 'ml-1 h-3 w-3',
            size === 'MEDIUM' && 'ml-1.5 h-4 w-4',
            size === 'LARGE' && 'ml-2 h-5 w-5'
          )}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
        />
      )}
    </span>
  );
}
