import { useState, useEffect } from 'react';
import { styles } from '../DesignEnums/MessageType';

export interface NumberRangeStrOrNumber {
  from?: number | string;
  to?: number | string;
}

export interface NumberRangeUpdate {
  from?: number;
  to?: number;
}

const toNumberOrUndefined = (value: number | string | undefined): number | undefined => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return value === '' ? undefined : parseFloat(value);
  return undefined;
}

interface NumberRangeInputProps {
  value: NumberRangeStrOrNumber;
  onChange: (range: NumberRangeUpdate) => void;
  label: string;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  prefix?: string;
  suffix?: string;
}

export const NumberRangeInput = ({
  value,
  onChange,
  label,
  fromPlaceholder,
  toPlaceholder,
  min,
  max,
  step = 1,
  className = '',
  disabled = false,
  required = false,
  prefix,
  suffix,
}: NumberRangeInputProps) => {
  const [localValue, setLocalValue] = useState<NumberRangeStrOrNumber>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleFromChange = (fromStr: string) => {
    const from = fromStr === '' ? undefined : Number(fromStr);
    if (typeof from == 'number' && isNaN(from)) {
      throw new Error('Invalid number'); // TODO: error handling
    }
    const newValue = {
      to: toNumberOrUndefined(localValue.to),
      from: toNumberOrUndefined(from),
    };
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleToChange = (toStr: string) => {
    const to = toStr === '' ? undefined : Number(toStr);
    if (typeof to == 'number' && isNaN(to)) {
      throw new Error('Invalid number'); // TODO: error handling
    }
    const newValue = {
      to: toNumberOrUndefined(to),
      from: toNumberOrUndefined(localValue.from),
    };
    setLocalValue(newValue);
    onChange(newValue);
  };

  const inputWrapperClassName = `
    flex items-stretch
    ${disabled ? 'cursor-not-allowed opacity-75' : ''}
  `;

  const inputClassName = `
    w-full px-3 py-2
    border ${disabled ? styles.DEFAULT.border : styles.ACCENT.border}
    focus:outline-none
    focus:ring-2 ${styles.ACCENT.focusRing}
    ${disabled ? 'cursor-not-allowed bg-gray-50' : ''}
  `;

  const affixClassName = `
    px-3 py-2 text-gray-500 text-sm
    border ${disabled ? styles.DEFAULT.border : styles.ACCENT.border}
    flex items-center
    ${disabled ? 'bg-gray-50' : styles.ACCENT.background}
    ${disabled ? 'cursor-not-allowed' : ''}
  `;

  const InputWithAffixes = ({ value, onChange, placeholder, id }: { 
    value: number | string, 
    onChange: (value: string) => void, 
    placeholder?: string,
    id?: string
  }) => (
    <div className={inputWrapperClassName}>
      {prefix && (
        <span className={`${affixClassName} rounded-l-lg border-r-0`}>
          {prefix}
        </span>
      )}
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        required={required}
        className={`
          ${inputClassName}
          ${!prefix && !suffix && 'rounded-lg border-x'}
          ${prefix && !suffix && 'border-l-0 rounded-r-lg border-r'}
          ${!prefix && suffix && 'border-r-0 rounded-l-lg border-l'}
          ${prefix && suffix && 'border-r-0 border-l-0 border-x-0'}
        `}
      />
      {suffix && (
        <span className={`${affixClassName} rounded-r-lg border-l-0`}>
          {suffix}
        </span>
      )}
    </div>
  );

  return (
    <div className={`${className}`}>
      <label
        htmlFor="range-from"
        className={`text-sm font-medium ${styles.ACCENT.text} mb-2 block`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <InputWithAffixes
            id="range-from"
            value={localValue.from || ''}
            onChange={handleFromChange}
            placeholder={fromPlaceholder}
          />
        </div>

        <span className="text-gray-400">—</span>

        <div className="flex-1">
          <InputWithAffixes
            value={localValue.to || ''}
            onChange={handleToChange}
            placeholder={toPlaceholder}
          />
        </div>
      </div>
    </div>
  );
};
