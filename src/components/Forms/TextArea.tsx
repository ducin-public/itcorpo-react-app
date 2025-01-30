import type { TextareaHTMLAttributes } from 'react';
import { controlStyles, styleConstants, styles } from '../DesignLanguage';

import { cn } from '../cn';

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}

const generateStyles = ({ disabled, error, value }: Pick<TextAreaProps, 'disabled' | 'error' | 'value'>) => {
  return cn(
    controlStyles({ disabled, error, value: Boolean(value) }),
    'px-4 py-2 rounded-lg transition border',
    'focus:outline-none focus:ring-2 focus:border-transparent',
    styleConstants.CONTROL_OUTER_WRAPPER,
  );
};

export const TextArea = ({
  label,
  value,
  onChange,
  error,
  placeholder = "Enter text...",
  disabled,
  rows = 4,
  id,
  ...props
}: TextAreaProps) => {
  const textareaId = id || `textarea-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={styleConstants.CONTROL_OUTER_WRAPPER}>
      <label htmlFor={textareaId} className={`block ${styleConstants.LABEL_TEXT_SIZE} font-medium ${styles.ACCENT.text} mb-1`}>
        {label}
        <textarea
          id={textareaId}
          className={generateStyles({ disabled, error, value })}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          {...props}
        />
      </label>
    </div>
  );
};
