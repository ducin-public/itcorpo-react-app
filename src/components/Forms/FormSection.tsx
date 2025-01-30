import type { PropsWithChildren } from 'react';
import { H3 } from '../Typography/Headings';
import { styles } from '../DesignLanguage';

export type FormSectionLayout = 'VERTICAL' | 'GRID';

interface FormSectionProps extends PropsWithChildren {
  label: string;
  className?: string;
  layout?: FormSectionLayout;
}

export const FormSection = ({ 
  label, 
  children, 
  className = '',
  layout = 'VERTICAL' 
}: FormSectionProps) => {
  const contentClassName = layout === 'GRID'
    ? "grid grid-cols-2 gap-4"
    : "space-y-4";

  return (
    <section className={`mb-8 ${className}`}>
      <H3 className={`mb-4 ${styles.ACCENT.text}`}>
        {label}
      </H3>
      <div className={`${contentClassName} rounded-lg border border-gray-200 bg-white p-6 shadow-sm`}>
        {children}
      </div>
    </section>
  );
};
