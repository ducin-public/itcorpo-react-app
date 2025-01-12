import { useState, useEffect, useRef } from 'react';

import { DesignSize, styles } from '../DesignLanguage';
import { cn } from '../cn';

type Option<T> = {
    value: T;
    label: string;
};

export type ButtonChoiceProps<T> = {
    value?: T;
    onChange?: (value: T) => void;
    options: [Option<T>, Option<T>, ...Option<T>[]];
    size?: DesignSize;
    className?: string;
    id?: string;
};

const sizeStyles: Record<DesignSize, string> = {
    'SMALL': 'px-2 py-1 text-xs h-[26px]',
    'MEDIUM': 'px-4 py-2 text-sm h-[40px]',
    'LARGE': 'px-6 py-3 text-base h-[50px]'
};

export const ButtonChoice = <T extends string>({ 
    value,
    onChange,
    size = 'MEDIUM',
    className = '',
    options,
    id = Math.random().toString(36).substr(2, 9)
}: ButtonChoiceProps<T>) => {
    const [localValue, setLocalValue] = useState(value ?? options[0].value);
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
                handleClick(options[index].value);
                break;
        }
    };

    useEffect(() => {
        if (focusIndex >= 0) {
            const buttons = document.querySelectorAll(`[data-group-id="${id}"] button`);
            (buttons[focusIndex] as HTMLButtonElement)?.focus();
        }
    }, [focusIndex, id]);

    const handleClick = (clickedValue: T) => {
        if (clickedValue === localValue) return;
        
        setLocalValue(clickedValue);
        onChange?.(clickedValue);
    };

    // Add this method to focus the first button
    const focusFirstButton = () => {
        firstButtonRef.current?.focus();
        setFocusIndex(0);
    };

    return (
        <div 
            className={`inline-flex rounded-md shadow-sm ${className}`}
            role="radiogroup"
            id={id}
            data-group-id={id}
            aria-label="Filtering options"
            onFocus={focusFirstButton}
        >
            {options.map((option, index) => (
                <button
                    key={option.value}
                    ref={index === 0 ? firstButtonRef : undefined}
                    type="button"
                    role="radio"
                    aria-checked={localValue === option.value}
                    onClick={() => handleClick(option.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => setFocusIndex(index)}
                    tabIndex={localValue === option.value ? 0 : -1}
                    className={cn(
                        `${sizeStyles[size]} font-medium border transition-all duration-200 ease-in-out`,
                        index === 0 ? 'rounded-l-lg' : '-ml-px',
                        index === options.length - 1 ? 'rounded-r-lg' : '',
                        styles.ACCENT.focusRing,
                        localValue === option.value
                            ? `${styles.ACCENT.backgroundDark} text-white` 
                            : `${styles.DEFAULT.text} ${styles.ACCENT.backgroundHover} ${styles.ACCENT.backgroundGradient} ${styles.ACCENT.border}`
                    )}>
                    {option.label}
                </button>
            ))}
        </div>
    );
};
