import type { ReactNode } from 'react';
import { Paragraph } from '../Typography/Paragraph';

export interface CardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const Card = ({ title, description, children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      {description && (
        <Paragraph size="SMALL" className="text-gray-600 mb-4">
          {description}
        </Paragraph>
      )}
      {children}
    </div>
  );
};
