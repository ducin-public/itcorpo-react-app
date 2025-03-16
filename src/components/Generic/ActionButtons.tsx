import type { LucideIcon } from 'lucide-react';
import { Button } from './Button';
import { DesignFill, DesignSize } from '../DesignLanguage';
import { cn } from '../cn';

interface ActionButton {
  icon: LucideIcon;
  text: string;
  onClick: () => void;
  fill?: DesignFill
}

interface ActionButtonsProps {
  actions: ActionButton[];
  className?: string;
  size?: DesignSize
}

export const ActionButtons = ({ actions, size = 'SMALL', className = '' }: ActionButtonsProps) => {
  return (
    <span className="flex space-x-2">
      {actions.map(({ icon, text, onClick, fill }) => (
        <Button
          key={text}
          icon={icon}
          size={size}
          fill={fill || 'OUTLINED'}
          onClick={onClick}
          className={cn('my-1', className)}
        >
          {text}
        </Button>
      ))}
    </span>
  );
};
