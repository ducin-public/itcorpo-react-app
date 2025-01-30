import { ChevronDown } from 'lucide-react';
import { controlStyles, DesignSize, styleConstants, styles } from '../DesignLanguage';
import { cn } from '../cn';

interface DropdownProps {
  label: string;
  options: Record<string, string>;
  onChange: (key: string) => void;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  size?: DesignSize;
}

const sizeClasses: Record<DesignSize, string> = {
  SMALL: 'h-8 text-sm',
  MEDIUM: 'h-10 text-base',
  LARGE: 'h-12 text-lg'
};

const generateStyles = ({ disabled, error, value }: Pick<DropdownProps, 'disabled' | 'error' | 'value'>) => {
  return cn(
    controlStyles({ disabled, error, value: Boolean(value) }),
    'w-full rounded-lg border appearance-none cursor-pointer transition pr-10',
    `focus:outline-none focus:ring-2 focus:border-transparent`,
  );
};

export function Dropdown({
  label,
  options,
  onChange,
  value,
  size = 'MEDIUM',
  placeholder = 'Select...',
  disabled = false,
  error,
}: DropdownProps) {
  const selectId = `dropdown-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={styleConstants.CONTROL_OUTER_WRAPPER}>
      <label htmlFor={selectId} className={`block ${styleConstants.LABEL_TEXT_SIZE} font-medium ${styles.ACCENT.text}`}>
        {label}
        <div className="relative">
          <select
            id={selectId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={cn(
              sizeClasses[size],
              generateStyles({ disabled, error, value })
            )}
          >
            <option value="">{placeholder}</option>
            {Object.entries(options).map(([key, optionValue]) => (
              <option key={key} value={key}>
                {optionValue}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
        </div>
      </label>
    </div>
  );
}
