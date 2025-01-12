import { useState } from 'react';

import { styles } from '../DesignLanguage';
import { cn } from '../cn';

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
};

export const Switch = ({ checked, onChange, disabled = false, className = '', label }: SwitchProps) => {
  const [localChecked, setLocalChecked] = useState(checked);

  const handleToggle = () => {
    if (!disabled) {
      const newValue = !localChecked;
      setLocalChecked(newValue);
      onChange(newValue);
    }
  };

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={localChecked}
        aria-label={label}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full',
          'transition-colors duration-300 ease-in-out',
          localChecked ? styles.ACCENT.backgroundDark : 'bg-gray-300',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          className
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 rounded-full bg-white',
            'transform transition-transform duration-300 ease-in-out',
            localChecked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
      {label && (
        <span className={`text-sm ${disabled ? 'text-gray-400' : styles.DEFAULT.textDark}`}>
          {label}
        </span>
      )}
    </label>
  );
};
