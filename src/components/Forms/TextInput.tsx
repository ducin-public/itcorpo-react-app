import { type InputHTMLAttributes, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { X } from 'lucide-react';

import { controlStyles, styleConstants, styles } from '../DesignLanguage';
import { cn } from '../cn';
import { ValidationError } from './ValidationError';

const generateStyles = ({ disabled, error, value }: Pick<TextInputProps, 'disabled' | 'error' | 'value'>) => {
  return cn(
    controlStyles({ disabled, error, value: Boolean(value) }),
    'border rounded-lg transition outline-none',
    'focus:ring-2 focus:border-transparent',
    styleConstants.CONTROL_OUTER_WRAPPER,
    'pr-8',
  );
};

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const TextInput = ({ 
  label, 
  value, 
  onChange,
  error, 
  placeholder = "Enter text...", 
  type = 'text',
  disabled,
  id, 
  ...props 
}: TextInputProps) => {
  const inputId = useRef((id || uuid()) || `text-input-${label.replace(/\s+/g, '-').toLowerCase()}`);

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={styleConstants.CONTROL_OUTER_WRAPPER}>
      <label htmlFor={inputId.current} className={`block ${styleConstants.LABEL_TEXT_SIZE} font-medium ${styles.ACCENT.text}`}>
        {label}
        <div className="relative">
          <input
            id={inputId.current}
            type={type}
            disabled={disabled}
            className={generateStyles({ disabled, error, value })}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            {...props}
          />
          {value && !disabled && (
            <button
              type="button"
              className={cn(
                'focus:outline-none focus:ring-2',
                styles.ACCENT.focusRing,
                "absolute right-2 top-5 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              )}
              onClick={handleClear}
              aria-label="Clear input"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
      </label>
      {error && <ValidationError>{error}</ValidationError>}
    </div>
  );
};
