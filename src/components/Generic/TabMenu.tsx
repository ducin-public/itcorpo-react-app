import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { styles } from '../DesignLanguage/ColorVariants';

type TabItem = {
  label: string;
  icon?: LucideIcon;
} & (
  | { link: string }
  | { onClick: () => void }
);

interface TabMenuProps {
  items: readonly TabItem[];
  selectedValue: string;
  onNavigate: (path: string) => void;
}

export function TabMenu({ items, selectedValue, onNavigate }: TabMenuProps) {
  return (
    <div className="flex space-x-1 border-b border-gray-200 mb-2">
      {items.map((item) => {
        const isActive = 'link' in item && item.link === selectedValue;
        const Icon = item.icon;
        
        return (
          <button
            key={'link' in item ? item.link : item.label}
            onClick={() => {
              if ('link' in item) {
                onNavigate(item.link);
              } else {
                item.onClick();
              }
            }}
            className={`
              flex items-center px-4 py-2 rounded-t-lg transition-colors
              ${isActive 
                ? `${styles.ACCENT.text} ${styles.ACCENT.border} border-b-2 -mb-[2px]` 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
            `}
          >
            {Icon && (
              <Icon 
                className={`w-5 h-5 mr-2 ${isActive ? styles.ACCENT.text : 'text-gray-400'}`} 
              />
            )}
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
