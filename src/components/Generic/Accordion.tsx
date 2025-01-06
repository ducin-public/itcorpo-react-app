import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../cn';
import { styles } from '../DesignEnums/MessageType';

interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion = ({ items, className }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`overflow-hidden rounded-lg border ${styles.DEFAULT.border} bg-white shadow-sm`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className={`w-full px-4 py-3 flex justify-between items-center bg-white ${styles.ACCENT.backgroundHover} transition-colors duration-200`}
          >
            <span className={`font-medium ${styles.DEFAULT.textDark}`}>{item.title}</span>
            <ChevronDown
              className={cn(
                `h-5 w-5 ${styles.ACCENT.text} transition-transform duration-200`,
                openIndex === index ? 'rotate-180' : ''
              )}
            />
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-200',
              openIndex === index ? 'max-h-[500px]' : 'max-h-0'
            )}
          >
            <div className={`px-4 py-3 ${styles.DEFAULT.text} bg-white border-t ${styles.DEFAULT.border}`}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
