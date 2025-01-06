import { FC, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Checkbox } from './Checkbox';
import { styles } from '../DesignLanguage';

export type Layout = 'VERTICAL' | 'HORIZONTAL' | 'PANEL' | 'TABLE';

export interface Option {
  id: string;
  label: string;
  value: string;
  description?: ReactNode | ReactNode[];
}

type CheckboxGroupProps = {
  header: React.ReactNode;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
  layout?: Layout;
};

const PanelCheckbox = ({ options, localValues, handleChange, name }: { 
  options: Option[], 
  localValues: string[], 
  handleChange: (value: string, checked: boolean) => void,
  name: string 
}) => (
  <div className="bg-white rounded-md -space-y-px" role="group">
    {options.map((option, optionIdx) => (
      <label
        key={option.value}
        className={`relative border p-4 flex cursor-pointer focus:outline-none ${
          optionIdx === 0 ? 'rounded-tl-md rounded-tr-md' : ''
        } ${
          optionIdx === options.length - 1 ? 'rounded-bl-md rounded-br-md' : ''
        } ${
          localValues.includes(option.value)
            ? `${styles.ACCENT.background} z-10` 
            : `border-gray-200 ${styles.ACCENT.backgroundHover}`
        }`}
      >
        <div className="flex items-center h-5">
          <Checkbox
            id={`${name}-${option.value}`}
            checked={localValues.includes(option.value)}
            onChange={(checked) => handleChange(option.value, checked)}
            label=""
            className="h-4 w-4"
          />
        </div>
        <div className="ml-3 flex flex-col">
          <span className={`block text-sm font-medium ${
            localValues.includes(option.value) ? styles.ACCENT.textDark : 'text-gray-900'
          }`}>
            {option.label}
          </span>
          {option.description && (
            <div className={`mt-1 text-sm ${
              localValues.includes(option.value) ? styles.ACCENT.text : 'text-gray-500'
            }`}>
              {option.description}
            </div>
          )}
        </div>
      </label>
    ))}
  </div>
);

const TableCheckbox = ({ options, localValues, handleChange, name }: {
  options: Option[],
  localValues: string[],
  handleChange: (value: string, checked: boolean) => void,
  name: string
}) => {
  if (!options.every(option => Array.isArray(option.description))) {
    throw new Error('Table layout requires description to be an array of ReactNodes for each column');
  }

  const descriptionColumns = (options[0].description as ReactNode[]).length;
  const columnWidth = `${Math.floor(70 / descriptionColumns)}%`;

  return (
    <div className="divide-y divide-gray-200">
      <div className="relative">
        {options.map((option) => (
          <div 
            key={option.id}
            className={`relative flex items-center p-4 ${
              localValues.includes(option.value) ? `${styles.ACCENT.background} z-10` : styles.ACCENT.backgroundHover
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
                <Checkbox
                  id={`${name}-${option.value}`}
                  checked={localValues.includes(option.value)}
                  onChange={(checked) => handleChange(option.value, checked)}
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

export const CheckboxGroup: FC<CheckboxGroupProps> = ({ 
  header,
  options, 
  values, 
  onChange,
  layout = 'VERTICAL', 
  className = '' 
}) => {
  const [localValues, setLocalValues] = useState<string[]>(values);

  const handleChange = (value: string, checked: boolean) => {
    const newValues = checked
      ? [...localValues, value]
      : localValues.filter((v) => v !== value);
    
    setLocalValues(newValues);
    onChange(newValues);
  };

  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  const containerClasses = layout === 'VERTICAL' 
    ? 'space-y-4' 
    : 'flex flex-row flex-wrap gap-4';

  if (layout === 'PANEL') {
    return (
      <div className={className}>
        {header && <div className={`text-sm font-medium ${styles.ACCENT.textDark} mb-4`}>{header}</div>}
        <PanelCheckbox 
          options={options} 
          localValues={localValues} 
          handleChange={handleChange}
          name={header?.toString() ?? 'checkbox-group'}
        />
      </div>
    );
  }

  if (layout === 'TABLE') {
    return (
      <div className={className}>
        {header && <div className={`text-sm font-medium ${styles.ACCENT.textDark} mb-4`}>{header}</div>}
        <TableCheckbox 
          options={options} 
          localValues={localValues} 
          handleChange={handleChange}
          name={header?.toString() ?? 'checkbox-group'}
        />
      </div>
    );
  }

  return (
    <div className={`${containerClasses} ${className}`}>
      {header && <div className={`text-sm font-medium ${styles.ACCENT.textDark} mb-2 w-full`}>{header}</div>}
      {options.map((option) => (
        <div key={option.id} className="flex flex-col">
          <Checkbox
            id={option.id}
            label={option.label}
            checked={localValues.includes(option.value)}
            onChange={(checked) => handleChange(option.value, checked)}
          />
          {option.description && !Array.isArray(option.description) && (
            <div className="ml-6 mt-1 text-sm text-gray-500">
              {option.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

