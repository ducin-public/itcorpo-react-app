import { useState, useCallback } from 'react';

export function useToggle(defaultChecked = false) {
  const [value, setValue] = useState(defaultChecked);
  
  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return [value, toggle] as const;
}
