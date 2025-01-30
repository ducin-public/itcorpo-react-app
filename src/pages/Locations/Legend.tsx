import { X } from 'lucide-react';
import { cn } from "../../components/cn";
import { H3 } from "../../components/Typography/Headings";
import { styles } from '../../components/DesignLanguage';

type LegendItem = {
  name: string;
  color: string;
}

interface LegendProps<TItem extends LegendItem> {
  header: React.ReactNode;
  items: TItem[];
  selectedItem?: TItem;
  onItemSelect: (item: TItem) => void;  // renamed from onItemClick
  onClearSelection: () => void;
}

export function Legend<TItem extends LegendItem>({ 
  header, 
  items, 
  selectedItem,
  onItemSelect,  // renamed from onItemClick
  onClearSelection 
}: LegendProps<TItem>) {
  const sortedLocations = [...items]
    .sort((a, b) => {
      // If either item is selected, handle specially
      if (selectedItem) {
        if (a.name === selectedItem.name) return -1;
        if (b.name === selectedItem.name) return 1;
      }
      // Otherwise sort alphabetically
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="absolute bottom-4 left-4 bg-gray-50 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <H3 className="mb-2">{header}</H3>
      <div className="relative">
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
          {sortedLocations.map((item) => (
            <div
              key={item.name}
              className={cn(
                "flex items-center gap-2 w-full rounded transition-colors",
                selectedItem?.name === item.name
                  ? cn("bg-slate-100", styles.ACCENT.border, "border")
                  : ""
              )}
            >
              <button
                onClick={() => onItemSelect(item)}  // renamed from onItemClick
                className={cn(
                  "flex items-center gap-2 flex-1 p-1",
                  !selectedItem || selectedItem.name !== item.name
                    ? "hover:bg-slate-50 rounded"
                    : ""
                )}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </button>
              {selectedItem?.name === item.name && (
                <button
                  onClick={onClearSelection}
                  className={cn(
                    "p-1 rounded-full hover:bg-gray-200 transition-colors mr-1",
                    "focus:outline-none focus:ring-2",
                    styles.ACCENT.focusRing
                  )}
                  aria-label="Clear selection"
                >
                  <X size={14} className="text-gray-400" />
                </button>
              )}
            </div>
          ))}
        </div>
        {items.length > 5 && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
};
