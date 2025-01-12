import type { InputHTMLAttributes } from 'react';
import { styleConstants, styles } from '../DesignLanguage';
import { cn } from '../cn';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (phrase: string) => void;
  error?: string;
}

export const TextInput = ({ label, value, onChange, error, type = 'text', id, ...props }: TextInputProps) => {
  const inputId = id || `text-input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className='w-full'>
      <label htmlFor={inputId} className={`block ${styleConstants.LABEL_TEXT_SIZE} font-medium mb-1 ${styles.ACCENT.text}`}>
        {label}
        <input
          id={inputId}
          type={type}
          className={cn(
            styles.ACCENT.focusRing,
            styles.ACCENT.border,
            styleConstants.MIN_CONTROL_HEIGHT,
            `w-full px-2 py-1 text-base border rounded-lg focus:ring-2 focus:border-transparent outline-none transition mt-1`
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      </label>
      {error && <p className={`mt-1 text-sm ${styles.ALERT.text}`}>{error}</p>}
    </div>
  );
};
