import React from 'react';
import { DayPicker, DateRange, DayPickerProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type DateRangePickerProps = Omit<DayPickerProps, 'selected' | 'onSelect'> & {
  selected: DateRange;
  onSelect: (range: DateRange) => void;
  className?: string;
  footer?: React.ReactNode;
}

export function DateRangePicker({
  selected,
  onSelect,
  className = '',
  disabled,
  footer
}: DateRangePickerProps) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={(range) => onSelect(range || { from: undefined, to: undefined })}
        disabled={disabled}
        footer={footer}
        weekStartsOn={1}
        numberOfMonths={2}
        showOutsideDays
        title='Select date...'
        classNames={{
          selected: `bg-purple-500 border-purple-500 hover:bg-purple:400 text-white`,
          day: "hover:bg-purple-300",
          button_previous: "text-red-500 hover:bg-purple-200 hover:text-purple-700",
          button_next: "text-red-500 hover:bg-purple-200 hover:text-purple-700",
          today: "text-purple-600 font-extrabold",
          disabled: "text-gray-300 hover:bg-transparent",
          outside: "text-gray-400",
          range_start: "bg-purple-500 rounded-l-full",
          range_middle: "bg-purple-200 opacity-50",
          range_end: "bg-purple-500 rounded-r-full",
        }}
      />
    </div>
  );
}
