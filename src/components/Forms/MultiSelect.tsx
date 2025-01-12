import { useEffect, useState, useRef } from 'react';
import { ChevronDown, X } from 'lucide-react';

import { styleConstants, styles } from '../DesignLanguage';

interface MultiSelectProps {
  options: Array<{ label: string; value: string }>;
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  placeholder?: string;
  className?: string;
}

export const MultiSelect = ({ 
  options, 
  value: externalValue, 
  onChange, 
  label,
  placeholder = 'Select...', 
  className = '' 
}: MultiSelectProps) => {
  const selectId = useRef(`multiselect-${Math.random().toString(36).substr(2, 9)}`);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(externalValue);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalValue(externalValue);
  }, [externalValue]);

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

  const selectedLabels = options
    .filter(option => internalValue.includes(option.value))
    .map(option => option.label);

  const handleValueChange = (newValue: string[]) => {
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full" ref={containerRef}>
      <label 
        htmlFor={selectId.current}
        className={`${styleConstants.LABEL_TEXT_SIZE} ${styles.ACCENT.text} block font-medium mb-1`}
      >
        {label}
      </label>
      <div className="relative">
        <div
          id={selectId.current}
          onClick={() => setIsOpen(!isOpen)}
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
          className={`${styles.ACCENT.focusRing} ${styles.ACCENT.border} ${styleConstants.MIN_CONTROL_HEIGHT} cursor-pointer border rounded-md p-1 flex items-center flex-wrap gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
        >
          {selectedLabels.length > 0 ? (
            selectedLabels.map(label => (
              <span key={label} className={`text-sm ${styles.ACCENT.background} ${styles.ACCENT.border} border py-1 px-2 rounded-md flex items-center gap-1`}>
                {label}
                <X
                  size={14}
                  className={`cursor-pointer ${styles.ALERT.textHover}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    const newValue = internalValue.filter(v => 
                      options.find(opt => opt.value === v)?.label !== label
                    );
                    handleValueChange(newValue);
                  }}
                />
              </span>
            ))
          ) : (
            <span className="px-2 text-gray-400">{placeholder}</span>
          )}
          <ChevronDown size={20} className="ml-auto" />
        </div>

        {isOpen && (
          <div className="absolute z-[100] w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map(option => (
              <div
                key={option.value}
                className={`p-2 cursor-pointer ${styles.ACCENT.backgroundHover} ${
                  internalValue.includes(option.value) ? styles.ACCENT.background : ''
                }`}
                onClick={() => {
                  const newValue = internalValue.includes(option.value)
                    ? internalValue.filter(v => v !== option.value)
                    : [...internalValue, option.value];
                  handleValueChange(newValue);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
