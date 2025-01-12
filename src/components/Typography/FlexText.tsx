import { cn } from '../cn';

type FlexTextProps = {
    children: React.ReactNode;
    className?: string;
};

export const FlexText = ({ 
    children, 
    className 
}: FlexTextProps) => (
    <div className={cn('flex items-baseline gap-2', className)}>
        {children}
    </div>
);
