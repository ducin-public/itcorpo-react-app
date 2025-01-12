import { styles, type DesignSize, type VariantType } from '../DesignLanguage';
import { cn } from '../cn';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  size?: DesignSize;
  variant?: VariantType;
}

const sizeClasses = {
  SMALL: 'text-sm',
  MEDIUM: 'text-base',
  LARGE: 'text-lg',
};

export const Text = ({ children, className = '', size = 'MEDIUM', variant = 'DEFAULT' }: TextProps) => (
  <span 
    className={cn(
      'font-normal',
      sizeClasses[size],
      styles[variant].text,
      className
    )}
  >
    {children}
  </span>
);
