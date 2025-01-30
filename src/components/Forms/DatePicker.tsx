import { DayPicker, DayPickerProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type DatePickerProps = Omit<DayPickerProps, 'selected' | 'onSelect'> & {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  className?: string;
  footer?: React.ReactNode;
}

export function DatePicker({
  selected,
  onSelect,
  className = '',
  disabled,
  footer
}: DatePickerProps) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
        footer={footer}
        weekStartsOn={1}
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
        }}
      />
    </div>
  );
}
