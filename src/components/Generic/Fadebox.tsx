import React, { useState, useEffect, ReactNode } from 'react';
import classNames from 'classnames';

export const Fadebox: React.FC<{ children: ReactNode }> = (props) => {
  const [fadeOut, setFadeOut] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFadeOut(fade => !fade);
    }, 3000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const boxClass = classNames(
    'fixed z-50 w-80 right-12 bottom-12 p-4 rounded-lg border border-gray-300 bg-white shadow-lg transition-all duration-1000',
    {
      'opacity-0 translate-x-full': fadeOut,
      'opacity-100 translate-x-0': !fadeOut,
    }
  );

  return <div className={boxClass}>
    {props.children}
  </div>;
};
