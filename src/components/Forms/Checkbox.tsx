import { FC, useState, useEffect } from 'react';
import { styles } from '../DesignEnums/MessageType';

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export const Checkbox: FC<CheckboxProps> = ({ 
  id, 
  label, 
  checked, 
  onChange, 
  className = '' 
}) => {
  const [localChecked, setLocalChecked] = useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setLocalChecked(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    setLocalChecked(checked);
  }, [checked]);

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={localChecked}
        onChange={handleChange}
        className={`${styles.ACCENT.accent} ${styles.ACCENT.text} ${styles.ACCENT.focusRing} h-4 w-4 rounded`}
      />
      <label htmlFor={id} className={`text-sm ${styles.ACCENT.text}`}>
        {label}
      </label>
    </div>
  );
};
