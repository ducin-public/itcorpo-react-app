import type { LucideIcon } from 'lucide-react';
import { Button } from './Button';
import { DesignFill, DesignSize } from '../DesignLanguage';
import { cn } from '../cn';

interface ActionButton {
  icon: LucideIcon;
  text: string;
  onClick: () => void;
  size?: DesignSize
  fill?: DesignFill
}

interface ActionButtonsProps {
  actions: ActionButton[];
  className?: string;
}

export const ActionButtons = ({ actions, className = '' }: ActionButtonsProps) => {
  return (
    <span className="flex space-x-2">
      {actions.map(({ icon, text, onClick, size, fill }) => (
        <Button
          key={text}
          icon={icon}
          size={size || 'SMALL'}
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
