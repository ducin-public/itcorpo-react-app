import { cn } from '../cn';
import { styles } from '../DesignEnums/MessageType';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const H1 = ({ children, className = '' }: HeadingProps) => (
  <h1 className={cn('text-2xl font-bold mb-4', styles.DEFAULT.text, className)}>
    {children}
  </h1>
);

export const H2 = ({ children, className = '' }: HeadingProps) => (
  <h2 className={cn('text-xl font-bold mb-3', styles.DEFAULT.text, className)}>
    {children}
  </h2>
);

export const H3 = ({ children, className = '' }: HeadingProps) => (
  <h3 className={cn('text-lg font-semibold mb-2', styles.DEFAULT.text, className)}>
    {children}
  </h3>
);

export const H4 = ({ children, className = '' }: HeadingProps) => (
  <h4 className={cn('text-base font-semibold mb-2', styles.DEFAULT.text, className)}>
    {children}
  </h4>
);
