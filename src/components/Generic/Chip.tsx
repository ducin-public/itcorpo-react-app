import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '../cn';
import { Size } from '../DesignEnums/Sizes';
import { Variant } from '../DesignEnums/Variants';

export type ChipVariant = Variant | 'WARNING' | 'ERROR';

interface ChipProps {
  children: ReactNode;
  variant?: ChipVariant;
  size?: Size;
  icon?: LucideIcon;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<ChipVariant, string> = {
  PRIMARY: 'bg-green-100 text-green-800 hover:bg-green-200',
  SECONDARY: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  OUTLINED: 'border border-green-300 text-green-700 hover:bg-green-50',
  WARNING: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  ERROR: 'bg-red-100 text-red-800 hover:bg-red-200'
};

const sizeStyles: Record<Size, string> = {
  SMALL: 'text-xs px-2 py-0.5',
  MEDIUM: 'text-sm px-2.5 py-1',
  LARGE: 'text-base px-3 py-1.5'
};

export function Chip({ 
  children, 
  variant = 'PRIMARY', 
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
        'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1',
        variantStyles[variant],
        sizeStyles[size],
        onClick && 'cursor-pointer hover:text-green-700',
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
