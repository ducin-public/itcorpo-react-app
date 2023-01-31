import React, { useState, useEffect, ReactNode } from 'react';
import classNames from 'classnames'

import './fadebox.css'

var id: ReturnType<typeof setInterval>

export const FadeBox: React.FC<{ children: ReactNode }> = (props) => {
  const [fadeOut, setFadeOut] = useState(true)

  useEffect(() => {
    id = setInterval(() => {
      setFadeOut(fade => !fade)
    }, 3000)
    return () => {
      clearInterval(id)
    }
  }, [])

  var boxClass = classNames({
    'fade-box': true,
    'fade-in': true,
    'fade-out': fadeOut,
  });

  return <div className={boxClass}>
    {props.children}
  </div>
}
