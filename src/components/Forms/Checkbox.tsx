import { styles } from '../DesignLanguage';

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
};

export const Checkbox = ({ 
  id, 
  label, 
  checked, 
  onChange,
  disabled = false,
  error,
  className = '' 
}: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={`h-4 w-4 rounded 
            ${disabled 
              ? 'cursor-not-allowed opacity-50' 
              : error 
                ? `${styles.ALERT.accent} ${styles.ALERT.text} ${styles.ALERT.focusRing}`
                : `${styles.ACCENT.accent} ${styles.ACCENT.text} ${styles.ACCENT.focusRing}`
            }`}
        />
        <label 
          htmlFor={id} 
          className={`text-sm 
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
