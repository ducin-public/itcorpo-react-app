import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { ChevronDown, X } from 'lucide-react';

import type { CountryDialCodeFormat } from './dialCodes';
import { countriesDialCodes } from './dialCodes';
import { controlStyles, styleConstants, styles } from '../DesignLanguage';
import { cn } from '../cn';

interface PhoneInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  label: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

const generateInputStyles = ({ disabled, error, value }: Pick<PhoneInputProps, 'disabled' | 'error' | 'value'>) => {
  return cn(
    controlStyles({ disabled, error, value: Boolean(value) }),
    styleConstants.CONTROL_HEIGHT,
    'w-full flex-1 px-3 pr-8 border rounded-r-lg font-mono transition',
    'focus:ring-2 focus:border-transparent outline-none',
  );
};

const generateButtonStyles = ({ disabled, error, isOpen }: { disabled?: boolean; error?: boolean; isOpen: boolean }) => {
  return cn(
    controlStyles({ disabled, error, value: false }),
    styleConstants.CONTROL_HEIGHT,
    'flex mb-1 items-center space-x-1 px-3 py-1 border border-r-0 rounded-l-lg transition-colors',
    {
      [`${styles.ALERT.border} ${styles.ALERT.background}`]: !disabled && error,
      [`${styles.ACCENT.border} ${styles.ACCENT.background} ${styles.ACCENT.backgroundHover}`]: !disabled && !error,
      'ring-2': isOpen,
      [`${styles.ALERT.focusRing}`]: isOpen && error,
      [`${styles.ACCENT.focusRing}`]: isOpen && !error,
    }
  );
};

export const PhoneInput = ({ 
  value,
  onChange,
  label,
  disabled = false,
  error,
  className = ''
}: PhoneInputProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countriesDialCodes[6]); // Poland as default

  const formatForDisplay = (number: string): string => {
    const format = selectedCountry.format;
    let result = '';
    let numberIndex = 0;

    for (const char of format) {
      if (numberIndex >= number.length) {
        result += char === 'X' ? '_' : char;
      } else if (char === 'X') {
        result += number[numberIndex++];
      } else {
        result += char;
      }
    }

    return result;
  };

  const getRequiredLength = (format: string): number => {
    return format.split('').filter(char => char === 'X').length;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newDigits = e.target.value.replace(/[^0-9]/g, '');
    const maxLength = getRequiredLength(selectedCountry.format);
    const trimmedDigits = newDigits.slice(0, maxLength);
    
    const fullNumber = `${selectedCountry.dialCode}${trimmedDigits}`;
    const isValid = trimmedDigits.length === maxLength;
    
    onChange(fullNumber, isValid);
  };

  const handleCountryChange = (country: CountryDialCodeFormat) => {
    if (disabled) return;
    setShowDropdown(false);
    setSelectedCountry(country);
    const isValid = value.length === getRequiredLength(country.format);
    onChange(`${country.dialCode}${value}`, isValid);
  };

  const handleClear = () => {
    onChange('', false);
  };

  return (
    <div className={cn(styleConstants.CONTROL_OUTER_WRAPPER, className)}>
      <label className={cn(styleConstants.LABEL_TEXT_SIZE, 'block font-medium mb-1', styles.ACCENT.text)}>
        {label}
      </label>
      <div className="relative flex w-full">
        <button
          type="button"
          disabled={disabled}
          aria-label="Select country code"
          className={generateButtonStyles({ disabled, error, isOpen: showDropdown })}
          onClick={() => !disabled && setShowDropdown(!showDropdown)}
        >
          <span className="text-xl">{selectedCountry.flag}</span>
          <span className={cn('text-sm', disabled ? 'text-gray-400' : styles.ACCENT.textDark)}>
            {selectedCountry.dialCode}
          </span>
          <ChevronDown className={cn('w-4 h-4', disabled ? 'text-gray-400' : styles.ACCENT.text)} />
        </button>

        <div className="relative flex-1">
          <input
            type="tel"
            value={formatForDisplay(value)}
            onChange={handleInputChange}
            disabled={disabled}
            className={generateInputStyles({ disabled, error, value })}
          />
          {value && !disabled && (
            <button
              type="button"
              className={cn(
                'absolute right-2 top-5 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors',
                'focus:outline-none focus:ring-2',
                styles.ACCENT.focusRing
              )}
              onClick={handleClear}
              aria-label="Clear input"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
        
        {showDropdown && !disabled && (
          <div className={cn(
            'absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border rounded-lg shadow-lg z-10',
            styles.ACCENT.border
          )}>
            {countriesDialCodes.map((country) => (
              <button
                key={country.code}
                type="button"
                className={cn(
                  'flex items-center space-x-3 w-full px-4 py-2 text-left transition-colors',
                  styles.ACCENT.backgroundHover
                )}
                onClick={() => handleCountryChange(country)}
              >
                <span className="text-xl">{country.flag}</span>
                <span className={cn('text-sm', styles.ACCENT.textDark)}>{country.name}</span>
                <span className={cn('text-sm ml-auto', styles.ACCENT.text)}>{country.dialCode}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
