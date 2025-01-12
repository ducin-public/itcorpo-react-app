import { useState, type ReactNode } from 'react';

import { DesignSize, styles } from '../DesignLanguage';
import { cn } from '../cn';

export enum TooltipDirection {
  TOP = 'top',
  TOP_LEFT = 'top-start',
  TOP_RIGHT = 'top-end',
  BOTTOM = 'bottom',
  BOTTOM_LEFT = 'bottom-start',
  BOTTOM_RIGHT = 'bottom-end',
  LEFT = 'left',
  RIGHT = 'right',
}

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  direction?: TooltipDirection;
  size?: DesignSize;
}

const sizeClasses: { [key in DesignSize]: string } = {
  SMALL: 'w-1/4 min-w-32 px-2 py-1 text-xs font-normal leading-tight',
  MEDIUM: 'w-2/4 min-w-64 px-3 py-2 text-sm font-medium leading-snug',
  LARGE: 'w-3/4 min-w-96 px-4 py-3 text-base font-normal leading-relaxed',
};

const directionClasses = {
  [TooltipDirection.TOP]: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  [TooltipDirection.TOP_LEFT]: 'bottom-full left-0 mb-2',
  [TooltipDirection.TOP_RIGHT]: 'bottom-full right-0 mb-2',
  [TooltipDirection.BOTTOM]: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  [TooltipDirection.BOTTOM_LEFT]: 'top-full left-0 mt-2',
  [TooltipDirection.BOTTOM_RIGHT]: 'top-full right-0 mt-2',
  [TooltipDirection.LEFT]: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  [TooltipDirection.RIGHT]: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
};

export const Tooltip = ({
  content,
  children,
  direction = TooltipDirection.TOP,
  size = "MEDIUM",
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(!visible)}
      >
        {children}
      </div>
      {visible && (
        <div
          className={cn(
            'absolute z-10 bg-white',
            styles.DEFAULT.text,
            'rounded shadow-lg border border-gray-200',
            sizeClasses[size],
            directionClasses[direction]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
