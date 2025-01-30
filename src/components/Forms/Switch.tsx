import { styles } from '../DesignLanguage';
import { cn } from '../cn';

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
};

const generateStyles = ({ checked, disabled }: Pick<SwitchProps, 'checked' | 'disabled'>) => {
  return cn(
    'relative inline-flex h-6 w-11 items-center rounded-full',
    'transition-colors duration-300 ease-in-out',
    {
      [`${styles.ACCENT.backgroundDark} opacity-50`]: checked && disabled,
      [`${styles.ACCENT.backgroundDark}`]: checked && !disabled,
      'bg-gray-300 opacity-50': !checked && disabled,
      'bg-gray-300': !checked && !disabled,
      'cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
    }
  );
};

export const Switch = ({ checked, onChange, disabled = false, className = '', label }: SwitchProps) => (
  <label className="inline-flex items-center gap-2 cursor-pointer">
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(generateStyles({ checked, disabled }), className)}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 rounded-full bg-white',
          'transform transition-transform duration-300 ease-in-out',
          {
            'translate-x-6': checked,
            'translate-x-1': !checked,
          }
        )}
      />
    </button>
    {label && (
      <span className={`text-sm ${disabled ? 'text-gray-400' : styles.DEFAULT.textDark}`}>
        {label}
      </span>
    )}
  </label>
);
