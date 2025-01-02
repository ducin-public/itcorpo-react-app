import { ReactNode } from 'react';

import { Button } from './Button';
import { Variant } from '../DesignEnums/Variants';
import { cn } from '../cn';

type ButtonGroupItem = {
  id: string;
  label: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

type ButtonGroupProps = {
  items: ButtonGroupItem[];
  variant?: Variant;
  className?: string;
};

export const ButtonGroup = ({ items, variant = 'PRIMARY', className = '' }: ButtonGroupProps) => {
  return (
    <div className={`inline-flex flex-row ${className}`}>
      {items.map((item, index) => (
        <Button
          key={item.id}
          onClick={item.onClick}
          variant={variant}
          disabled={item.disabled}
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

