import * as RadixTooltip from '@radix-ui/react-tooltip';
import { type ReactNode } from 'react';

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

export enum TooltipSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  direction?: TooltipDirection;
  size?: TooltipSize;
}

const sizeClasses = {
  [TooltipSize.SMALL]: 'max-w-[200px]',
  [TooltipSize.MEDIUM]: 'max-w-[300px]',
  [TooltipSize.LARGE]: 'max-w-[400px]',
};

export const Tooltip = ({
  content,
  children,
  direction = TooltipDirection.TOP,
  size = TooltipSize.MEDIUM,
}: TooltipProps) => {
  const [side, align] = direction.includes('-')
    ? direction.split('-')
    : [direction, 'center'];

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side as 'top' | 'right' | 'bottom' | 'left'}
            align={align as 'start' | 'center' | 'end'}
            className={`select-none rounded bg-white px-[15px] py-2.5 text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade ${sizeClasses[size]}`}
            sideOffset={5}
          >
            {content}
            <RadixTooltip.Arrow className="fill-white" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
