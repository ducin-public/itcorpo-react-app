import React, { useState, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface DateRangePickerProps {
  selected: DateRange;
  onSelect: (range: DateRange) => void;
  className?: string;
  disabled?: boolean;
  disabledDays?: Date[];
  fromLabel?: string;
  toLabel?: string;
}

export function DateRangePicker({
  selected,
  onSelect,
  className = '',
  disabled = false,
  disabledDays,
}: DateRangePickerProps) {
  const [privateSelected, setPrivateSelected] = useState<DateRange | undefined>(
    selected?.from ? selected : undefined
  );

  useEffect(() => {
    setPrivateSelected(selected?.from ? selected : undefined);
  }, [selected]);

  const handleSelect = (range: DateRange | undefined) => {
    setPrivateSelected(range);
    onSelect(range || { from: undefined, to: undefined });
  };

  return (
    <div 
      className={`bg-white p-4 rounded-lg shadow ${className}`}
      style={{
        '--rdp-accent-color': '#059669', // emerald-600
        '--rdp-background-color': '#ecfdf5', // emerald-50
        '--rdp-accent-background-color': '#059669', // emerald-600
        '--rdp-today-color': '#059669', // emerald-600
        '--rdp-selected-border': '2px solid #059669', // emerald-600
        '--rdp-range_middle-background-color': '#d1fae5', // emerald-100
        '--rdp-range_middle-color': '#065f46', // emerald-800
        '--rdp-range_start-background': '#059669', // emerald-600
        '--rdp-range_end-background': '#059669', // emerald-600
      } as React.CSSProperties}
    >
      <DayPicker
        mode="range"
        selected={privateSelected}
        onSelect={handleSelect}
        disabled={disabled || disabledDays}
        classNames={{
          day_selected: "bg-emerald-600 text-white hover:bg-emerald-600",
          day_today: "text-emerald-600 font-bold",
          day: "hover:bg-emerald-50",
          day_range_middle: "bg-emerald-100 text-emerald-900",
          day_range_start: "bg-emerald-600 text-white rounded-l",
          day_range_end: "bg-emerald-600 text-white rounded-r",
          nav_button_previous: "hover:bg-emerald-50",
          nav_button_next: "hover:bg-emerald-50",
          caption_label: "font-medium",
        }}
      />
    </div>
  );
}
