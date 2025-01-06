import type { FC } from 'react';
import { DesignSize } from '../DesignEnums/designEnums';

interface SpinnerProps {
  size?: DesignSize;
  layout?: 'INLINE' | 'OVERLAY';
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

export const Spinner: FC<SpinnerProps> = ({ size = 'MEDIUM', layout = 'INLINE' }) => {
  if (layout === 'INLINE') {
    return (
      <div className="flex justify-center items-center">
        <div className={`relative ${dimensions[size]}`}>
          <div className={`absolute w-full h-full rounded-full ${borderWidth[size]} border-purple-200/30`}></div>
          <div className={`absolute w-full h-full rounded-full ${borderWidth[size]} border-purple-600 border-t-transparent animate-spin`}></div>
        </div>
      </div>
    );
  } else if (layout === 'OVERLAY') {
    return (
      <div className="absolute inset-0 backdrop-blur-sm flex justify-center pt-8 z-50 transition-all duration-500 ease-in-out bg-white/50">
        <div className="justify-center items-center">
          <div className={`relative ${dimensions[size]}`}>
            <div className={`absolute w-full h-full rounded-full ${borderWidth[size]} border-purple-200/30`}></div>
            <div className={`absolute w-full h-full rounded-full ${borderWidth[size]} border-purple-600 border-t-transparent animate-spin`}></div>
          </div>
        </div>
      </div>
    );
  }
}
