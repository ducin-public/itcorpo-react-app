import type { LucideIcon } from 'lucide-react';
import { Chip, type ChipVariant } from './Chip';
import { cn } from '../cn';
import { Size } from '../DesignEnums/Sizes';

interface ChipListProps {
  items: string[];
  variant?: ChipVariant;
  size?: Size;
  icon?: LucideIcon;
  onRemove?: (item: string) => void;
  onClick?: (item: string) => void;
  className?: string;
}

export function ChipList({ 
  items, 
  variant = 'PRIMARY', 
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
