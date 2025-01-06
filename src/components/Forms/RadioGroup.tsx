import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Radio } from './Radio';
import { styles } from '../DesignLanguage';

export type Layout = 'VERTICAL' | 'HORIZONTAL' | 'PANEL' | 'TABLE';

export interface Option {
  id: string;
  label: string;
  value: string;
  description?: ReactNode | ReactNode[];
  duration?: string;
  price?: string;
}

type RadioGroupProps = {
  header: React.ReactNode;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  layout?: Layout;
};

const PanelRadio = ({ options, localValue, handleChange, name }: { 
  options: Option[], 
  localValue: string, 
  handleChange: (value: string) => void,
  name: string 
}) => (
  <div className="bg-white rounded-md -space-y-px" role="radiogroup">
    {options.map((option, optionIdx) => (
      <label
        key={option.value}
        className={`relative border p-4 flex cursor-pointer focus:outline-none ${
          optionIdx === 0 ? 'rounded-tl-md rounded-tr-md' : ''
        } ${
          optionIdx === options.length - 1 ? 'rounded-bl-md rounded-br-md' : ''
        } ${
          localValue === option.value 
            ? `${styles.ACCENT.background} z-10` 
            : `border-gray-200 ${styles.ACCENT.backgroundHover}`
        }`}
      >
        <div className="flex items-center h-5">
          <Radio
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={localValue === option.value}
            onChange={handleChange}
            label=""
            className="h-4 w-4"
          />
        </div>
        <div className="ml-3 flex flex-col">
          <span 
            id={`${name}-${option.value}-label`}
            className={`block text-sm font-medium ${
              localValue === option.value ? `${styles.ACCENT.textDark}` : 'text-gray-900'
            }`}
          >
            {option.label}
          </span>
          {option.description && (
            <div 
              id={`${name}-${option.value}-description`}
              className={`mt-1 text-sm ${
                localValue === option.value ? `${styles.ACCENT.textDark}` : 'text-gray-500'
              }`}
            >
              {option.description}
            </div>
          )}
        </div>
      </label>
    ))}
  </div>
);

const TableRadio = ({ options, localValue, handleChange, name }: {
  options: Option[],
  localValue: string,
  handleChange: (value: string) => void,
  name: string
}) => {
  // Validate that all options have array descriptions for table layout
  if (!options.every(option => Array.isArray(option.description))) {
    throw new Error('Table layout requires description to be an array of ReactNodes for each column');
  }

  // Calculate the percentage width for description columns
  const descriptionColumns = (options[0].description as ReactNode[]).length;
  const columnWidth = `${Math.floor(70 / descriptionColumns)}%`;

  return (
    <div className="divide-y divide-gray-200">
      <div className="relative">
        {options.map((option) => (
          <div 
            key={option.id}
            className={`relative flex items-center p-4 ${
              localValue === option.value ? `${styles.ACCENT.background} z-10` : styles.ACCENT.backgroundHover
            }`}
          >
            <div 
              className="min-w-0 flex-1 gap-4"
              style={{
                display: 'grid',
                gridTemplateColumns: `30% ${Array(descriptionColumns).fill(columnWidth).join(' ')}`
              }}
            >
              <div className="flex items-center pr-4">
                <Radio
                  id={`${name}-${option.value}`}
                  name={name}
                  value={option.value}
                  checked={localValue === option.value}
                  onChange={handleChange}
                  label=""
                />
                <label 
                  htmlFor={`${name}-${option.value}`}
                  className="ml-3 cursor-pointer"
                >
                  <span className="block text-sm font-medium text-gray-900">
                    {option.label}
                  </span>
                </label>
              </div>
              {(option.description as ReactNode[]).map((column, idx) => (
                <div key={idx} className="text-sm text-gray-700 flex items-center">
                  {column}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RadioGroup = ({ 
  header, 
  options, 
  value, 
  onChange, 
  layout = 'VERTICAL',
  className = '' 
}: RadioGroupProps) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const containerClasses = layout === 'VERTICAL' 
    ? 'space-y-4' 
    : 'flex flex-row flex-wrap gap-4';

  if (layout === 'PANEL') {
    return (
      <div className={className}>
        {header && <div className={`text-sm font-medium ${styles.ACCENT.textDark} mb-4`}>{header}</div>}
        <PanelRadio 
          options={options} 
          localValue={localValue} 
          handleChange={handleChange}
          name={header?.toString() ?? 'radio-group'}
        />
      </div>
    );
  }

  if (layout === 'TABLE') {
    return (
      <div className={className}>
        {header && <div className={`text-sm font-medium ${styles.ACCENT.textDark} mb-4`}>{header}</div>}
        <TableRadio 
          options={options} 
          localValue={localValue} 
          handleChange={handleChange}
          name={header?.toString() ?? 'radio-group'}
        />
      </div>
    );
  }

  return (
    <div className={`${containerClasses} ${className}`}>
      {header && <div className={`text-sm font-medium ${styles.ACCENT.textDark} mb-2 w-full`}>{header}</div>}
      {options.map((option) => (
        <div key={option.id} className="flex flex-col">
          <Radio
            id={option.id}
            name={header?.toString() ?? 'radio-group'}
            label={option.label}
            value={option.value}
            checked={localValue === option.value}
            onChange={handleChange}
          />
          {option.description && (
            <div className="ml-6 mt-1 text-sm text-gray-500">
              {option.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

