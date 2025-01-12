import { useRef } from 'react';
import { ButtonChoice } from './ButtonChoice';
import { styleConstants, styles } from '../DesignLanguage';

export type FilterMode = 'ANY' | 'ALL';

type FilteringChoiceProps = {
    value: FilterMode;
    onChange: (value: FilterMode) => void;
    label?: string;
};

export const FilteringChoice = ({ 
    value,
    onChange,
    label = 'Filtering'
}: FilteringChoiceProps) => {
    const id = useRef(`filtering-${Math.random().toString(36).substr(2, 9)}`);
    
    return (
        <div>
            <label 
                htmlFor={id.current}
                className={`${styleConstants.LABEL_TEXT_SIZE} ${styles.ACCENT.text} block font-medium mb-1`}
            >
                {label}
            </label>
            <ButtonChoice<'ANY' | 'ALL'>
                id={id.current}
                options={[
                    { value: 'ANY', label: 'Any' },
                    { value: 'ALL', label: 'All' }
                ]}
                value={value}
                onChange={onChange}
                size="MEDIUM"
            />
        </div>
    );
};

