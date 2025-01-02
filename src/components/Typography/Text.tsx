import type { Size } from '../DesignEnums/Sizes';
import { styles, type MessageType } from '../DesignEnums/MessageType';
import { cn } from '../cn';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  size?: Size;
  messageType?: MessageType;
}

const sizeClasses = {
  SMALL: 'text-sm',
  MEDIUM: 'text-base',
  LARGE: 'text-lg',
};

export const Text = ({ children, className = '', size = 'MEDIUM', messageType = 'DEFAULT' }: TextProps) => (
  <span 
    className={cn(
      'font-normal',
      sizeClasses[size],
      styles[messageType].text,
      className
    )}
  >
    {children},
  </span>
);
