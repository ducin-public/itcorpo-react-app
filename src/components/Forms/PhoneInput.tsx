import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import type { CountryDialCodeFormat } from './dialCodes';
import { countriesDialCodes } from './dialCodes';
import { styleConstants, styles } from '../DesignLanguage';

type PhoneInputProps = {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  label: string;
  required?: boolean;
  className?: string;
};

export const PhoneInput = ({ 
  value,
  onChange,
  label,
  required = false,
  className = ''
}: PhoneInputProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [selectedCountry, setSelectedCountry] = useState(countriesDialCodes[6]); // Poland as default

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

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
    const newDigits = e.target.value.replace(/[^0-9]/g, '');
    const maxLength = getRequiredLength(selectedCountry.format);
    const trimmedDigits = newDigits.slice(0, maxLength);
    
    const fullNumber = `${selectedCountry.dialCode}${trimmedDigits}`;
    const isValid = trimmedDigits.length === maxLength;
    
    setLocalValue(trimmedDigits);
    onChange(fullNumber, isValid);
  };

  const handleCountryChange = (country: CountryDialCodeFormat) => {
    setShowDropdown(false);
    setSelectedCountry(country);
    // Trigger onChange with new country code
    const isValid = localValue.length === getRequiredLength(country.format);
    onChange(`${country.dialCode}${localValue}`, isValid);
  };

  return (
    <label className={`block space-y-1 ${className}`}>
      <span className={`${styleConstants.LABEL_TEXT_SIZE} block font-medium ${styles.ACCENT.text}`}>
        {label}
      </span>
      <div className="relative flex">
        <button
          type="button"
          aria-label="Select country code"
          className={`flex items-center space-x-1 px-3 py-2 border ${styles.ACCENT.border} border-r-0 rounded-l-lg ${styles.ACCENT.background} ${styles.ACCENT.backgroundHover} transition-colors`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="text-xl">{selectedCountry.flag}</span>
          <span className={`text-sm ${styles.ACCENT.textDark}`}>{selectedCountry.dialCode}</span>
          <svg className={`w-4 h-4 ${styles.ACCENT.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <input
          type="tel"
          value={formatForDisplay(localValue)}
          onChange={handleInputChange}
          className={`flex-1 px-4 py-2 border ${styles.ACCENT.border} rounded-r-lg focus:ring-2 ${styles.ACCENT.focusRing} focus:border-transparent outline-none transition font-mono`}
          placeholder={formatForDisplay('')}
          required={required}
          aria-required={required}
        />
        
        {showDropdown && (
          <div className={`absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border ${styles.ACCENT.border} rounded-lg shadow-lg z-10`}>
            {countriesDialCodes.map((country) => (
              <button
                key={country.code}
                type="button"
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left ${styles.ACCENT.backgroundHover} transition-colors`}
                onClick={() => handleCountryChange(country)}
              >
                <span className="text-xl">{country.flag}</span>
                <span className={`text-sm ${styles.ACCENT.textDark}`}>{country.name}</span>
                <span className={`text-sm ${styles.ACCENT.text} ml-auto`}>{country.dialCode}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </label>
  );
};
