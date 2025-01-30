import type { ReactNode } from 'react';
import { H3 } from '../Typography/Headings';

interface DetailLine {
  label: string;
  value: ReactNode;
}

interface DetailsSectionProps {
  title: string;
  lines: DetailLine[];
}

export const DetailsSection = ({ title, lines }: DetailsSectionProps) => {
  return (
    <div>
      <H3 className="text-lg font-semibold text-gray-900 mb-4">{title}</H3>
      <div className="space-y-2">
        {lines.map(({ label, value }, index) => (
          <div key={index} className="text-sm">
            <span className="text-gray-500">{label}:</span>{' '}
            <span className="text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
