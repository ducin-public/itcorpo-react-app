import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
  className?: string;
  disabled?: boolean;
  disabledDays?: Date[];
  footer?: React.ReactNode;
}

export function DatePicker({
  selected,
  onSelect,
  className = '',
  disabled = false,
  disabledDays,
  footer
}: DatePickerProps) {
  const [privateSelected, setPrivateSelected] = useState<Date | null>(selected);

  useEffect(() => {
    setPrivateSelected(selected);
  }, [selected]);

  const handleSelect = (date: Date | null) => {
    setPrivateSelected(date);
    onSelect(date);
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <DayPicker
        mode="single"
        selected={privateSelected}
        onSelect={handleSelect}
        disabled={disabled || disabledDays}
        footer={footer}
        classNames={{
            // se
            // selected: `bg-amber-500 border-amber-500 text-white`,
          day_selected: "bg-emerald-600 text-white hover:bg-emerald-600",
        //   day_today: "text-emerald-600 font-bold",
        //   day: "hover:bg-emerald-50",
        //   nav_button_previous: "hover:bg-emerald-50",
        //   nav_button_next: "hover:bg-emerald-50",
        //   caption_label: "font-medium",
        }}
      />
    </div>
  );
}
