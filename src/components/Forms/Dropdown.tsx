import { cn } from '../cn';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Variant } from '../DesignEnums/Variants';
import { Size } from '../DesignEnums/Sizes';
import { styles } from '../DesignEnums/MessageType';

interface DropdownProps {
  label: string;
  items: Record<string, string>;
  onChanged: (key: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  value?: string;
  size?: Size;
  variant?: Variant;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  SMALL: 'h-8 text-sm',
  MEDIUM: 'h-10 text-base',
  LARGE: 'h-12 text-lg'
};

const variantClasses: Record<Variant, string> = {
  PRIMARY: `${styles.ACCENT.backgroundDark} ${styles.ACCENT.text} ${styles.ACCENT.borderDark} ${styles.ACCENT.backgroundDarkHover}`,
  SECONDARY: `${styles.ACCENT.background} ${styles.ACCENT.textDark} ${styles.ACCENT.border} ${styles.ACCENT.backgroundHover}`,
  OUTLINED: `bg-white ${styles.ACCENT.textDark} ${styles.ACCENT.border} ${styles.ACCENT.borderHover}`
};

export function Dropdown({
  label,
  items,
  onChanged,
  placeholder = 'Select...',
  disabled = false,
  error,
  value = '',
  size = 'MEDIUM',
  variant = 'OUTLINED',
  className
}: DropdownProps) {
  const [localState, setLocalState] = useState(value);
  const selectId = `dropdown-${label.replace(/\s+/g, '-').toLowerCase()}`;

  const handleChange = (key: string) => {
    setLocalState(key);
    onChanged(key);
  };

  return (
    <div className="relative">
      <label htmlFor={selectId} className={`block text-sm font-medium ${styles.ACCENT.text} mb-1`}>
        {label}
        <div className="relative mt-1">
          <select
            id={selectId}
            value={localState}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            className={cn(
              'w-full rounded-lg border px-3 pr-10 appearance-none cursor-pointer',
              `focus:outline-none focus:ring-2 ${styles.ACCENT.focusRing} focus:border-transparent`,
              'disabled:opacity-50 disabled:cursor-not-allowed',
              sizeClasses[size],
              variantClasses[variant],
              error && styles.ALERT.border,
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