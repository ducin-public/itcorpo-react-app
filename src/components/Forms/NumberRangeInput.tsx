import { controlStyles, styleConstants, styles } from '../DesignLanguage';
import { cn } from '../cn';

export interface NumberRange {
  from?: number;
  to?: number;
}

interface NumberRangeInputProps {
  value: NumberRange;
  onChange: (range: NumberRange) => void;
  label: string;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
  errorFrom?: boolean;
  errorTo?: boolean;
  required?: boolean;
  prefix?: string;
  suffix?: string;
}

interface InputWithAffixesProps { 
  value: number | string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  error?: boolean;
}

const generateInputStyles = ({ disabled, error, value }: { 
  disabled: boolean;
  error?: boolean;
  value: number | string;
}) => {
  return cn(
    controlStyles({ disabled, error, value: Boolean(value) }),
    'w-full py-1 border focus:outline-none focus:ring-2',
  );
};

const generateAffixStyles = ({ disabled, error, isPrefix }: { 
  disabled: boolean;
  error?: boolean;
  isPrefix: boolean;
}) => {
  return cn(
    'min-w-[40px] px-3 py-2 text-sm border flex items-center justify-center',
    styleConstants.CONTROL_TEXT,
    {
      'bg-gray-50 cursor-not-allowed': disabled,
      [styleConstants.CONTROL_PLACEHOLDER_DISABLED]: !error,
      [`${styles.ALERT.border} ${styles.ALERT.background}`]: !disabled && error,
      [`${styles.ACCENT.border} ${styles.ACCENT.background}`]: !disabled && !error,
      [`${styles.ALERT.text}`]: error,
      [`${styles.DEFAULT.border}`]: disabled,
      [`${styles.ALERT.border}`]: !disabled && error,
      [`${styles.ACCENT.border}`]: !disabled && !error,
      'rounded-l-lg border-r-0': isPrefix,
      'rounded-r-lg border-l-0': !isPrefix,
    }
  );
};

const InputWithAffixes = ({
  value,
  onChange,
  placeholder,
  id,
  prefix,
  suffix,
  disabled = false,
  error,
  required = false,
  min,
  max,
  step,
}: InputWithAffixesProps) => {
  return (
    <div className={cn('flex items-stretch', { 'cursor-not-allowed opacity-75': disabled })}>
      {prefix && (
        <span className={generateAffixStyles({ disabled, error, isPrefix: true })}>
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
        className={cn(
          generateInputStyles({ disabled, error, value }),
          {
            'rounded-lg border-x': !prefix && !suffix,
            'border-l-0 rounded-r-lg border-r': prefix && !suffix,
            'border-r-0 rounded-l-lg border-l': !prefix && suffix,
            'border-r-0 border-l-0 border-x-0': prefix && suffix,
          }
        )}
      />
      {suffix && (
        <span className={generateAffixStyles({ disabled, error, isPrefix: false })}>
          {suffix}
        </span>
      )}
    </div>
  );
};

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
  errorFrom,
  errorTo,
}: NumberRangeInputProps) => {
  return (
    <div className={className}>
      <label
        htmlFor="range-from"
        className={cn(styleConstants.LABEL_TEXT_SIZE, 'font-medium block', styles.ACCENT.text)}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <InputWithAffixes
            id="range-from"
            value={value.from || ''}
            onChange={(fromStr) => {
              const from = fromStr === '' ? undefined : Number(fromStr);
              
              onChange({ ...value, from });
            }}
            placeholder={fromPlaceholder || 'From...'}
            prefix={prefix}
            suffix={suffix}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            required={required}
            error={errorFrom}
          />
        </div>
        <span className="text-gray-400">—</span>
        <div className="flex-1">
          <InputWithAffixes
            value={value.to || ''}
            onChange={(toStr) => {
              const to = toStr === '' ? undefined : Number(toStr);
              onChange({ ...value, to });
            }}
            placeholder={toPlaceholder || 'To...'}
            prefix={prefix}
            suffix={suffix}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            required={required}
            error={errorTo}
          />
        </div>
      </div>
    </div>
  );
};
