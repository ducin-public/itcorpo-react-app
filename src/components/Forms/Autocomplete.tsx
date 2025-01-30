import { useState, useRef, useEffect } from 'react';

import { TextInput } from './TextInput';
import { styles } from '../DesignLanguage';
import { cn } from '../cn';

interface Option {
  id: string;
  label: string;
}

interface AutocompleteProps {
  value: string;
  onChange: (key: string) => void;
  options: Option[];
  label: string;
  placeholder?: string;
  maxItems?: number;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  renderInput?: (params: { 
    value: string; 
    onChange: (value: string) => void;
    onFocus: () => void;
    disabled?: boolean;
    error?: boolean;
  }) => React.ReactNode;
}

const generateOptionStyles = ({ isHighlighted }: { isHighlighted: boolean }) => {
  return cn(
    'px-4 py-2 cursor-pointer transition-colors',
    {
      [styles.ACCENT.background]: isHighlighted,
      [styles.ACCENT.backgroundHover]: !isHighlighted,
    }
  );
};

const generateDropdownStyles = () => {
  return cn(
    'absolute top-[62px] z-10 w-full bg-white border rounded-lg shadow-lg',
    'max-h-60 overflow-y-auto',
    styles.ACCENT.border
  );
};

export const Autocomplete = ({
  value,
  onChange,
  options,
  label,
  placeholder = 'Search...',
  maxItems = 5,
  disabled = false,
  error = false,
  className,
  renderInput,
}: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options
    .filter(option => 
      option.label.toLowerCase().includes(value.toLowerCase())
    )
    .slice(0, maxItems);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <strong key={i} className={styles.ACCENT.text}>{part}</strong> : part
    );
  };

  const defaultInput = (
    <TextInput
      label={label}
      value={value}
      onChange={onChange}
      onFocus={() => !disabled && setIsOpen(true)}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
    />
  );

  return (
    <div ref={wrapperRef} className={cn('relative', className)}>
      {renderInput ? 
        renderInput({ 
          value, 
          onChange, 
          onFocus: () => !disabled && setIsOpen(true),
          disabled,
          error,
        }) : 
        defaultInput
      }
      
      {isOpen && !disabled && filteredOptions.length > 0 && (
        <ul className={generateDropdownStyles()}>
          {filteredOptions.map((option, index) => (
            <li
              key={option.id}
              className={generateOptionStyles({ isHighlighted: index === highlightedIndex })}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
            >
              {highlightMatch(option.label, value)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
