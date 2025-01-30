import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DesignSize, styleConstants, styles } from '../DesignLanguage';
import { cn } from '../cn';

type Option<T> = {
    value: T;
    label: string;
};

export type ButtonChoiceProps<T> = {
    value: T;
    onChange: (value: T) => void;
    options: [Option<T>, Option<T>, ...Option<T>[]];
    size?: DesignSize;
    className?: string;
    disabled?: boolean;
    id?: string;
};

const sizeStyles: Record<DesignSize, string> = {
    'SMALL': 'px-2 py-1 text-xs h-[26px]',
    'MEDIUM': 'px-4 py-2 text-sm h-[40px]',
    'LARGE': 'px-6 py-3 text-base h-[50px]'
};

const generateStyles = ({ isSelected, isFirst, isLast, size, disabled }: { 
    isSelected: boolean; 
    isFirst: boolean;
    isLast: boolean;
    size: DesignSize;
    disabled: boolean;
}) => {
    return cn(
        'font-medium border transition-all duration-200 ease-in-out',
        sizeStyles[size],
        styles.ACCENT.focusRing,
        {
            // Position styles
            'rounded-l-lg': isFirst,
            '-ml-px': !isFirst,
            'rounded-r-lg': isLast,
            // Common disabled state
            'cursor-not-allowed': disabled,
            // Selected + disabled: use opacity to create "light" version
            [`${styles.ACCENT.backgroundDark} ${styleConstants.CONTROL_PLACEHOLDER_DISABLED} bg-opacity-25`]: disabled && isSelected,
            // Not selected + disabled
            [`bg-gray-100 ${styleConstants.CONTROL_PLACEHOLDER_DISABLED} border-gray-300`]: disabled && !isSelected,
            // Normal states
            [`${styles.ACCENT.backgroundDark} text-white`]: !disabled && isSelected,
            [`${styles.DEFAULT.text} ${styles.ACCENT.backgroundHover} ${styles.ACCENT.backgroundGradient} ${styles.ACCENT.border}`]: !disabled && !isSelected,
        }
    );
};

export const ButtonChoice = <T extends string>({ 
    value,
    onChange,
    size = 'MEDIUM',
    className = '',
    options,
    disabled,
    id = uuid()
}: ButtonChoiceProps<T>) => {
    const [focusIndex, setFocusIndex] = useState<number>(-1);
    const firstButtonRef = useRef<HTMLButtonElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                setFocusIndex(index > 0 ? index - 1 : options.length - 1);
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                event.preventDefault();
                setFocusIndex(index < options.length - 1 ? index + 1 : 0);
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                onChange(options[index].value);
                break;
        }
    };

    useEffect(() => {
        if (focusIndex >= 0) {
            const buttons = document.querySelectorAll(`[data-group-id="${id}"] button`);
            (buttons[focusIndex] as HTMLButtonElement)?.focus();
        }
    }, [focusIndex, id]);

    const focusFirstButton = () => {
        firstButtonRef.current?.focus();
        setFocusIndex(0);
    };

    return (
        <div 
            className={cn('inline-flex rounded-md shadow-sm', { 'opacity-50': disabled }, className)}
            role="radiogroup"
            id={id}
            data-group-id={id}
            aria-label="Choice options"
            onFocus={focusFirstButton}
        >
            {options.map((option, index) => (
                <button
                    key={option.value}
                    ref={index === 0 ? firstButtonRef : undefined}
                    type="button"
                    role="radio"
                    disabled={disabled}
                    aria-checked={value === option.value}
                    onClick={() => !disabled && onChange(option.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => setFocusIndex(index)}
                    tabIndex={value === option.value ? 0 : -1}
                    className={generateStyles({ 
                        isSelected: value === option.value,
                        isFirst: index === 0,
                        isLast: index === options.length - 1,
                        size,
                        disabled: !!disabled
                    })}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};
