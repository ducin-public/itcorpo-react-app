import { type ClassValue } from 'clsx';
import { styles } from './ColorVariants';

export const styleConstants = {
  LABEL_TEXT_SIZE: 'text-sm',
  CONTROL_TEXT: 'px-2 py-1 text-base font-normal',
  CONTROL_PLACEHOLDER_COLOR: 'text-gray-400',
  CONTROL_PLACEHOLDER_DISABLED: 'text-gray-400 bg-gray-100',
  CONTROL_HEIGHT: 'h-[40px]',
  CONTROL_MIN_HEIGHT: 'min-h-[40px]',
  CONTROL_OUTER_WRAPPER: 'w-full mb-1',
};

type ControlStylesParams = {
  disabled?: boolean;
  error?: boolean;
  value: boolean;
}
export const controlStyles = ({ disabled, error, value }: ControlStylesParams): ClassValue[] => {
  return [
    styleConstants.CONTROL_TEXT,
    styleConstants.CONTROL_MIN_HEIGHT,
    {
      [`${styleConstants.CONTROL_PLACEHOLDER_DISABLED} border-gray-300 opacity-50 cursor-not-allowed`]: disabled,
      [`bg-white ${styles.ALERT.text} ${styles.ALERT.border} ${styles.ALERT.borderHover} ${styles.ALERT.focusRing} ${styles.ALERT.placeholder}`]: error,
      [`bg-white ${styles.DEFAULT.text} ${styles.ACCENT.border} ${styles.ACCENT.borderHover} ${styles.ACCENT.focusRing}`]: !error && value && !disabled,
      [`bg-white ${styleConstants.CONTROL_PLACEHOLDER_COLOR} ${styles.ACCENT.border} ${styles.ACCENT.borderHover} ${styles.ACCENT.focusRing}`]: !error && !value && !disabled,
    }
  ]
}
