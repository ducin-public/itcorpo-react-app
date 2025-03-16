import type { FC } from 'react';
import { DesignSize } from '../DesignLanguage';
import { cn } from '../cn';

interface SpinnerProps {
  size?: DesignSize;
  className?: string;
}

const dimensions = {
  SMALL: 'w-8 h-8',
  MEDIUM: 'w-12 h-12',
  LARGE: 'w-16 h-16'
};

const borderWidth = {
  SMALL: 'border',
  MEDIUM: 'border-2',
  LARGE: 'border-4'
};

export const Spinner: FC<SpinnerProps> = ({
  size = 'MEDIUM',
  className
}) => {
  return (
    <div className={cn(
      "flex justify-center items-center",
      className
    )}>
      <div className={`relative ${dimensions[size]}`}>
        <div className={`absolute w-full h-full rounded-full ${borderWidth[size]} border-purple-200/30`}></div>
        <div className={`absolute w-full h-full rounded-full ${borderWidth[size]} border-purple-600 border-t-transparent animate-spin`}></div>
      </div>
    </div>
  );
}
