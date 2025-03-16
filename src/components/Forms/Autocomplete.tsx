import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import { TextInput } from './TextInput';
import { styles } from '../DesignLanguage';
import { cn } from '../cn';

export interface Option {
  id: string;
  label: string;
}

interface AutocompleteProps {
  value: string;
  onChange: (key: string) => void;
  fetchOptions: (phrase: string) => Promise<Option[]>;
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

export function Autocomplete({
  value,
  onChange,
  fetchOptions,
  label,
  placeholder = 'Search...',
  maxItems = 5,
  disabled = false,
  error = false,
  className,
  renderInput,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<number>();

  // Sync input value with selected option only when value (id) changes
  useEffect(() => {
    const fetchInitialLabel = async () => {
      if (value) {
        // If we don't have the option in current options, fetch it
        if (!options.some(opt => opt.id === value)) {
          try {
            const fetchedOptions = await fetchOptions(value);
            const selectedOption = fetchedOptions.find(opt => opt.id === value);
            if (selectedOption) {
              setInputValue(selectedOption.label);
            }
          } catch (error) {
            console.error('Failed to fetch initial option:', error);
          }
        } else {
          // If we have the option in current options, use it
          const selectedOption = options.find(opt => opt.id === value);
          if (selectedOption) {
            setInputValue(selectedOption.label);
          }
        }
      }
    };
    
    fetchInitialLabel();
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!inputValue) {
      setOptions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const fetchedOptions = await fetchOptions(inputValue);
        setOptions(fetchedOptions.slice(0, maxItems));
      } catch (error) {
        console.error('Failed to fetch options:', error);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [inputValue, fetchOptions, maxItems]);

  const handleChange = (newValue: string) => {
    setInputValue(newValue);
    setIsOpen(true);

    if (!newValue) {
      onChange('');
    }
  };

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
      value={inputValue}
      onChange={handleChange}
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
          value: inputValue, 
          onChange: handleChange, 
          onFocus: () => !disabled && setIsOpen(true),
          disabled,
          error,
        }) : 
        defaultInput
      }
      
      {isOpen && !disabled && (isLoading || options.length > 0) && (
        <ul className={generateDropdownStyles()}>
          {isLoading ? (
            <li className="px-4 py-2 text-gray-500 flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </li>
          ) : (
            options.map((option, index) => (
              <li
                key={option.id}
                className={generateOptionStyles({ isHighlighted: index === highlightedIndex })}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => {
                  onChange(option.id); // Send id to parent
                  setInputValue(option.label); // Display label in input
                  setIsOpen(false);
                }}
              >
                {highlightMatch(option.label, inputValue)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
