import { FC } from 'react';
import { styleConstants, styles } from '../DesignLanguage';

type RadioProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
};

export const Radio: FC<RadioProps> = ({ 
  id, 
  name,
  label, 
  value,
  checked, 
  onChange,
  disabled = false,
  error,
  className = '' 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center space-x-3">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={`h-4 w-4 border-gray-300
            ${disabled 
              ? 'cursor-not-allowed opacity-50' 
              : error 
                ? `${styles.ALERT.accent} ${styles.ALERT.text} ${styles.ALERT.focusRing}` 
                : `${styles.ACCENT.accent} ${styles.ACCENT.text} ${styles.ACCENT.focusRing}`
            }
          `}
        />
        <label 
          htmlFor={id} 
          className={`${styleConstants.LABEL_TEXT_SIZE}
            ${disabled 
              ? 'cursor-not-allowed text-gray-400' 
              : error 
                ? styles.ALERT.text 
                : styles.DEFAULT.text
            }`}
        >
          {label}
        </label>
      </div>
      {error && (
        <span className={`mt-1 text-xs ${styles.ALERT.text}`}>
          {error}
        </span>
      )}
    </div>
  );
};
