import type { TextareaHTMLAttributes } from 'react';
import { styles } from '../DesignEnums/MessageType';

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const TextArea = ({ label, value, onChange, error, rows = 4, id, ...props }: TextAreaProps) => {
  const textareaId = id || `textarea-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div>
      <label htmlFor={textareaId} className={`block text-sm font-medium ${styles.ACCENT.text} mb-1`}>
        {label}
        <textarea
          id={textareaId}
          className={`w-full px-4 py-2 border ${styles.ACCENT.border} rounded-lg focus:ring-2 ${styles.ACCENT.focusRing} focus:border-transparent outline-none transition mt-1`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          {...props}
        />
      </label>
      {error && <p className={`mt-1 text-sm ${styles.ALERT.text}`}>{error}</p>}
    </div>
  );
};
