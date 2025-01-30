import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { controlStyles, styleConstants, styles } from '../DesignLanguage';
import { cn } from '../cn';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

const generateStyles = ({ disabled, error, value }: Pick<PasswordInputProps, 'disabled' | 'error' | 'value'>) => {
  return cn(
    controlStyles({ disabled, error, value: Boolean(value) }),
    'w-full mt-1 rounded-lg border transition outline-none pr-10',
    styleConstants.CONTROL_OUTER_WRAPPER,
  );
};

export const PasswordInput = ({ 
  value, 
  onChange, 
  label, 
  placeholder,
  disabled = false,
  error,
  className
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styleConstants.CONTROL_OUTER_WRAPPER}>
      <label className={`block ${styleConstants.LABEL_TEXT_SIZE} font-medium ${styles.ACCENT.text} mb-1`}>
        {label}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={cn(generateStyles({ disabled, error, value }), className)}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              { "cursor-not-allowed opacity-50": disabled }
            )}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye className={`w-5 h-5 ${styles.ACCENT.text}`} />
            ) : (
              <EyeOff className={`w-5 h-5 ${styles.ACCENT.text}`} />
            )}
          </button>
        </div>
      </label>
    </div>
  );
};
