
import { cn } from '../cn';
import { styles } from '../DesignEnums/MessageType';
import { DesignSize } from '../DesignEnums/designEnums';

interface ParagraphProps {
  children: React.ReactNode;
  size?: DesignSize;
  className?: string;
}

const sizeClasses: Record<DesignSize, string> = {
  SMALL: 'text-sm',
  MEDIUM: 'text-base',
  LARGE: 'text-lg',
};

export function Paragraph({ children, size = 'MEDIUM', className }: ParagraphProps) {
  return (
    <p className={cn(
      'leading-relaxed mb-4',
      styles.DEFAULT.text,
      sizeClasses[size],
      className
    )}>
      {children}
    </p>
  );
}
