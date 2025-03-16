import type { FC, PropsWithChildren } from 'react';
import { Spinner } from './Spinner';
import { DesignSize } from '../DesignLanguage';
import { cn } from '../cn';

interface SpinnerOverlayProps extends PropsWithChildren {
  overlay?: boolean;
  size?: DesignSize;
  align?: 'CENTER' | 'TOP' | 'LEFT';
}

const alignMap = {
  CENTER: 'items-center justify-center',
  TOP: 'items-start justify-center',
  LEFT: 'items-center justify-start'
};

export const SpinnerOverlay: FC<SpinnerOverlayProps> = ({
  overlay = false,
  size = 'MEDIUM',
  align = 'CENTER',
  children
}) => {
  return (
    <div className='relative'>
      {children}
      {overlay && (
        <div className={cn(
          alignMap[align],
          'absolute inset-0 flex bg-white bg-opacity-90'
        )}>
          <Spinner size={size} layout="INLINE" className='m-6' />
        </div>
      )}
    </div>
  );
};
