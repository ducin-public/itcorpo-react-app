import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { DesignSize, styleConstants, styles } from '../DesignLanguage';
import { cn } from '../cn';

interface DropdownProps {
  label: string;
  items: Record<string, string>;
  onChanged: (key: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  value?: string;
  size?: DesignSize;
  className?: string;
}

const sizeClasses: Record<DesignSize, string> = {
  SMALL: 'h-8 text-sm',
  MEDIUM: 'h-10 text-base',
  LARGE: 'h-12 text-lg'
};

const generateStyles = ({ disabled, error, value }: Pick<DropdownProps, 'disabled' | 'error' | 'value'>) => {
  const pureDisabledStyles = 'opacity-50 cursor-not-allowed text-gray-500 bg-gray-100 border-gray-300'
  const nonErrorStyles = `${Boolean(value) ? styles.ACCENT.text : 'text-gray-400'} ${styles.ACCENT.border} ${styles.ACCENT.borderHover}`
  const errorStyles = `${styles.ALERT.text} ${styles.ALERT.border} ${styles.ALERT.borderHover}`
  return cn(
    'bg-white',
    disabled && pureDisabledStyles,
    error ? errorStyles : nonErrorStyles,
  )
}

export function Dropdown({
  label,
  items,
  onChanged,
  placeholder = 'Select...',
  disabled = false,
  error,
  value = '',
  size = 'MEDIUM',
  className
}: DropdownProps) {
  const [localState, setLocalState] = useState(value);
  const selectId = `dropdown-${label.replace(/\s+/g, '-').toLowerCase()}`;

  const handleChange = (key: string) => {
    setLocalState(key);
    onChanged(key);
  };

  return (
    <div className="w-full">
      <label htmlFor={selectId} className={`block ${styleConstants.LABEL_TEXT_SIZE} font-medium ${error ? styles.ALERT.text : styles.ACCENT.text} mb-1`}>
        {label}
        <div className="relative mt-1">
          <select
            id={selectId}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            className={cn(
              'w-full rounded-lg border px-3 pr-10 appearance-none cursor-pointer',
              `focus:outline-none focus:ring-2 ${styles.ACCENT.focusRing} focus:border-transparent`,
              styleConstants.MIN_CONTROL_HEIGHT,
              generateStyles({ disabled, error, value }),
              sizeClasses[size],
              className
            )}
          >
            <option value="">{placeholder}</option>
            {Object.entries(items).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
        </div>
      </label>
      {error && (
        <p className={`mt-1 text-sm ${styles.ALERT.text}`}>{error}</p>
      )}
    </div>
  );
}
