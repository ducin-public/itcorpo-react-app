import type { InputHTMLAttributes } from 'react';
import { styles } from '../DesignEnums/MessageType';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (phrase: string) => void;
  error?: string;
}

export const TextInput = ({ label, value, onChange, error, type = 'text', id, ...props }: TextInputProps) => {
  const inputId = id || `text-input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div>
      <label htmlFor={inputId} className={`block text-sm font-medium mb-1 ${styles.ACCENT.text}`}>
        {label}
        <input
          id={inputId}
          type={type}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition mt-1 ${styles.ACCENT.focusRing} ${styles.ACCENT.border}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      </label>
      {error && <p className={`mt-1 text-sm ${styles.ALERT.text}`}>{error}</p>}
    </div>
  );
};
