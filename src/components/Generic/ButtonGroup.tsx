import { ReactNode } from 'react';

import { Button } from './Button';
import { cn } from '../cn';
import { DesignFill, DesignSize, VariantType } from '../DesignLanguage';
import { LucideIcon } from 'lucide-react';

type ButtonGroupItem = {
  id: string;
  label: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  fill?: DesignFill;
  variant?: VariantType;
  icon?: LucideIcon
};

type ButtonGroupProps = {
  items: ButtonGroupItem[];
  fill?: DesignFill;
  size?: DesignSize;
  variant?: VariantType;
  className?: string;
};

export const ButtonGroup = ({
  items,
  fill = 'SOLID',
  size = 'MEDIUM',
  variant = 'ACCENT',
  className = ''
}: ButtonGroupProps) => {
  return (
    <div className={`inline-flex flex-row ${className}`}>
      {items.map((item, index) => (
        <Button
          key={item.id}
          onClick={item.onClick}
          size={size}
          fill={item.fill || fill}
          variant={item.variant || variant}
          disabled={item.disabled}
          {...(item.icon && { icon: item.icon })}
          className={cn(
            'rounded-none',
            index === 0 && 'rounded-l-lg',
            index === items.length - 1 && 'rounded-r-lg',
            '-ml-[1px] first:ml-0'
          )}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

