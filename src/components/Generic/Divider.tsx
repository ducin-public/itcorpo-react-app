import { cn } from '../cn';
import { styles } from '../DesignLanguage';

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <hr 
      className={cn(
        `h-0.5 my-4 border-0 bg-gradient-to-r from-white via-${styles.ACCENT.mainColor}-500 to-white`,
        className
      )} 
    />
  );
}
