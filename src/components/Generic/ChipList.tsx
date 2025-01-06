import type { LucideIcon } from 'lucide-react';

import { Chip } from './Chip';
import { cn } from '../cn';
import { DesignFill, DesignSize, VariantType } from '../DesignLanguage';

interface ChipListProps {
  items: string[];
  fill?: DesignFill;
  variant?: VariantType;
  size?: DesignSize;
  icon?: LucideIcon;
  onRemove?: (item: string) => void;
  onClick?: (item: string) => void;
  className?: string;
}

export function ChipList({ 
  items, 
  fill = 'SOLID',
  variant = 'ACCENT',
  size = 'MEDIUM',
  icon, 
  onRemove,
  onClick,
  className 
}: ChipListProps) {
  if (!items?.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <Chip 
          key={item} 
          fill={fill}
          variant={variant}
          size={size}
          icon={icon}
          onRemove={onRemove ? () => onRemove(item) : undefined}
          onClick={onClick ? () => onClick(item) : undefined}
        >
          {item}
        </Chip>
      ))}
    </div>
  );
}
