import { cn } from '../cn';
import { DesignSize } from '../DesignEnums/designEnums';

export type ProgressMeterFill = 'SOLID' | 'GRADIENT';

interface ProgressMeterProps {
  value: number;
  label?: string;
  className?: string;
  size?: DesignSize;
  fill?: ProgressMeterFill;
  showValue?: boolean;
}

const sizeClasses: Record<DesignSize, string> = {
  SMALL: 'h-1.5',
  MEDIUM: 'h-2.5',
  LARGE: 'h-4'
};

const getProgressColor = (value: number, fill: ProgressMeterFill) => {
  if (fill === 'SOLID') {
    if (value <= 33) return 'bg-purple-200';
    if (value <= 66) return 'bg-purple-500';
    return 'bg-purple-700';
  }
  
  if (value <= 33) return 'bg-gradient-to-r from-purple-200 to-purple-300';
  if (value <= 66) return 'bg-gradient-to-r from-purple-200 to-purple-500';
  return 'bg-gradient-to-r from-purple-200 to-purple-700';
};

export function ProgressMeter({ 
  value, 
  className, 
  label, 
  size = 'MEDIUM',
  fill = 'GRADIENT',
  showValue = true 
}: ProgressMeterProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const progressColor = getProgressColor(clampedValue, fill);

  return (
    <div className={cn('w-full', className)} role="progressbar" aria-valuenow={clampedValue} aria-valuemin={0} aria-valuemax={100}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1.5">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-medium text-gray-700">{clampedValue}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-gray-100 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            progressColor
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
