import type { LucideIcon } from 'lucide-react';

import { Chip, type ChipFill } from './Chip';
import { cn } from '../cn';
import { Size } from '../DesignEnums/Sizes';
import { MessageType } from '../DesignEnums/MessageType';

interface ChipListProps {
  items: string[];
  fill?: ChipFill;
  messageType?: MessageType;
  size?: Size;
  icon?: LucideIcon;
  onRemove?: (item: string) => void;
  onClick?: (item: string) => void;
  className?: string;
}

export function ChipList({ 
  items, 
  fill = 'SOLID',
  messageType = 'ACCENT',
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
          messageType={messageType}
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
