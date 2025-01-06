import { ReactNode } from 'react';

import { Button } from './Button';
import { cn } from '../cn';
import { DesignFill, DesignSize } from '../DesignEnums/designEnums';
import { MessageType } from '../DesignEnums/MessageType';

type ButtonGroupItem = {
  id: string;
  label: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  fill?: DesignFill;
  messageType?: MessageType;
};

type ButtonGroupProps = {
  items: ButtonGroupItem[];
  fill?: DesignFill;
  size?: DesignSize;
  messageType?: MessageType;
  className?: string;
};

export const ButtonGroup = ({
  items,
  fill = 'SOLID',
  size = 'MEDIUM',
  messageType = 'ACCENT',
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
          messageType={item.messageType || messageType}
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

