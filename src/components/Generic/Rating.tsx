import { useState } from 'react';
import { LucideIcon, Star } from 'lucide-react';

type RatingProps = {
  scale?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  icon?: LucideIcon;
  activeColor?: string;
};

export const Rating = ({ 
  scale = 5, 
  value, 
  onChange, 
  className = '',
  icon: Icon = Star,
  activeColor = '#fbbf24'
}: RatingProps) => {
  const [localValue, setLocalValue] = useState(value);
  const [hoverValue, setHoverValue] = useState(0);
  const displayValue = hoverValue || localValue;

  const handleValueChange = (newValue: number) => {
    setLocalValue(newValue);
    onChange(newValue);
    setHoverValue(0);
  };

  return (
    <div className={`flex ${className}`}>
      {Array.from({ length: scale }, (_, index) => (
        <div
          key={index}
          className="w-6 h-6"
          onClick={() => handleValueChange(index + 1)}
          onMouseEnter={() => setHoverValue(index + 1)}
          onMouseLeave={() => setHoverValue(0)}
        >
          <Icon
            className="w-6 h-6 cursor-pointer"
            fill={index < displayValue ? activeColor : '#e5e7eb'}
            strokeWidth={0}
          />
        </div>
      ))}
    </div>
  );
};
