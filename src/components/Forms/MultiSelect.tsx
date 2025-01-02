import { useEffect, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { styles } from '../DesignEnums/MessageType';

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
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(externalValue);

  useEffect(() => {
    setInternalValue(externalValue);
  }, [externalValue]);

  const selectedLabels = options
    .filter(option => internalValue.includes(option.value))
    .map(option => option.label);

  const handleValueChange = (newValue: string[]) => {
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full">
      <label className={`block text-sm font-medium ${styles.ACCENT.text} mb-1`}>
        {label}
      </label>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`cursor-pointer border rounded-md p-2 min-h-[40px] flex items-center flex-wrap gap-2 ${className}`}
        >
          {selectedLabels.length > 0 ? (
            selectedLabels.map(label => (
              <span key={label} className={`text-sm ${styles.ACCENT.background} px-2 rounded-md flex items-center gap-1`}>
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
            <span className="text-gray-400">{placeholder}</span>
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
