import { useEffect, useRef, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { v4 as uuid } from 'uuid';

import { controlStyles, styleConstants, styles } from '../DesignLanguage';
import { ValidationError } from './ValidationError';
import { cn } from '../cn';

interface MultiSelectProps {
  options: Record<string, string>;
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  placeholder?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
}

const generateStyles = ({ disabled, error, value }: Pick<MultiSelectProps, 'disabled' | 'error' | 'value'>) => {
  return cn(
    controlStyles({ disabled, error, value: Boolean(value) }),
    'border rounded-md p-1 py-0 flex items-center flex-wrap gap-2',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'z-[100] relative',
  );
};

const generateTagStyles = () => cn(
  'text-sm border py-1 px-2 rounded-md flex items-center gap-1',
  styles.ACCENT.background,
  styles.ACCENT.border
);

export const MultiSelect = ({ 
  options, 
  value,
  onChange, 
  label,
  placeholder = 'Select...',
  error,
  disabled,
  className = ''
}: MultiSelectProps) => {
  const selectId = useRef(`multiselect-${uuid()}`);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLabels = Object.entries(options)
    .filter(([key]) => value.includes(key))  // Fixed: check if key is in value array
    .map(([_, label]) => label);

  return (
    <div className={cn(
      styleConstants.CONTROL_OUTER_WRAPPER,
      styleConstants.CONTROL_HEIGHT,
    )} ref={containerRef}>
      <label 
        htmlFor={selectId.current}
        className={`${styleConstants.LABEL_TEXT_SIZE} ${styles.ACCENT.text} block font-medium`}
      >
        {label}
      </label>
      <div className="relative">
        <div
          id={selectId.current}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          tabIndex={0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={selectId.current}
          className={generateStyles({ disabled, error, value })}
        >
          {selectedLabels.length > 0 ? (
            selectedLabels.map(label => (
              <span key={label} className={generateTagStyles()}>
                {label}
                {!disabled && (
                  <X
                    size={14}
                    className={`cursor-pointer ${styles.ALERT.textHover}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const newValue = value.filter(v => options[v] !== label);
                      onChange(newValue);
                    }}
                  />
                )}
              </span>
            ))
          ) : (
            <span className={cn(
              styleConstants.CONTROL_TEXT,
              styleConstants.CONTROL_PLACEHOLDER_COLOR,
              {
                [styles.ALERT.text]: error,
              }
            )}>
              {placeholder}
            </span>
          )}
          <ChevronDown size={20} className="ml-auto" />
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-[100] w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {Object.entries(options).map(([optionValue, label]) => (
              <div
                key={optionValue}
                className={cn(
                  'p-2 cursor-pointer',
                  styles.ACCENT.backgroundHover,
                  { [styles.ACCENT.background]: value.includes(optionValue) }
                )}
                onClick={() => {
                  const newValue = value.includes(optionValue)
                    ? value.filter(v => v !== optionValue)
                    : [...value, optionValue];
                  onChange(newValue);
                  setIsOpen(false);
                }}
              >
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <ValidationError>{error}</ValidationError>}
    </div>
  );
};
