import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { H2 } from '../Typography/Headings';

interface WithId {
  id: string | number;
}

interface TileChooserProps<T extends WithId> {
  items: T[];
  selectedItem: T | null;
  onSelect: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  title: string;
}

export function TileChooser<T extends WithId>({ 
  items, 
  selectedItem, 
  onSelect, 
  renderItem,
  title,
}: TileChooserProps<T>) {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  useEffect(() => {
    setSelectedId(selectedItem?.id ?? null);
  }, [selectedItem]);

  const handleSelect = (item: T) => {
    setSelectedId(item.id);
    onSelect(item);
  };

  return (
    <div className="space-y-6">
      <H2>{title}</H2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Button
            key={item.id}
            onClick={() => handleSelect(item)}
            variant="SECONDARY"
            size="SMALL"
            className="w-full text-left p-0 overflow-hidden"
          >
            <div className={`p-4 ${
              item.id === selectedId
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-emerald-500'
            } border rounded-lg`}>
              {renderItem(item)}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
