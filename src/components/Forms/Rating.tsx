import { Star, Heart, ThumbsUp, Sun, Pill } from 'lucide-react';
import { useState } from 'react';

export enum RatingIcon {
  STAR = 'STAR',
  HEART = 'HEART',
  THUMBS_UP = 'THUMBS_UP',
  SUN = 'SUN',
  PILL = 'PILL'
}

const iconComponents = {
  [RatingIcon.STAR]: Star,
  [RatingIcon.HEART]: Heart,
  [RatingIcon.THUMBS_UP]: ThumbsUp,
  [RatingIcon.SUN]: Sun,
  [RatingIcon.PILL]: Pill,
};

type RatingProps = {
  scale?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  icon?: RatingIcon;
  activeColor?: string;
};

export const Rating = ({ 
  scale = 5, 
  value, 
  onChange, 
  className = '',
  icon = RatingIcon.STAR,
  activeColor = '#fbbf24' // default gold color
}: RatingProps) => {
  const [localValue, setLocalValue] = useState(value);
  const [hoverValue, setHoverValue] = useState(0);
  const displayValue = hoverValue || localValue;

  const Icon = iconComponents[icon];

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
